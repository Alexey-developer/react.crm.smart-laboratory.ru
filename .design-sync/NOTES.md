# design-sync notes — react-crm-components

This repo has no publishable component-library `dist/`; `.design-sync/entry-pkg/`
is a synthetic Vite lib build that compiles a hand-written barrel
(`index.ts`, re-exporting every storied component from `src/`) into a real
JS+CSS artifact the converter can esbuild-bundle. `vite.lib.config.ts` exists
ONLY to run this repo's own `.scss` imports through Sass (esbuild alone can't);
every third-party package is marked Rollup `external` so esbuild — not
Vite — bundles it fresh (its react-shim plugin needs to see the raw import).

## Fixes (symptom → root cause → fix)

- **Icons/some colors invisible in every preview** → Font Awesome (`<i
  className="fa-solid fa-…">`, used by ActionButton/AlertCard/CollapseCard/
  Breadcrumbs/Filter/Sort/etc.) is imported only by `.storybook/preview.tsx`
  (now `src/storybook/globalStyles.ts`), which is outside every bundle
  design-sync's converter builds — esbuild's own JS-graph-derived CSS and
  `cfg.cssEntry` (the entry-pkg's compiled output) never see it. **[GENERAL]**
  Fix: `.design-sync/entry-pkg/fontawesome-classes.css` is
  `src/assets/fontawesome/v6.5.1/css/all.css` with every `@font-face` block
  stripped (regenerate command in its own header comment), imported as a
  side-effect from `entry-pkg/index.ts` — pure class/glyph-mapping text, no
  `url()` refs, so Vite has nothing to base64-inline. Each `--fa-*` custom
  property is tagged `/* @kind other */` so Claude Design's token export does
  not mis-classify FA internals as palette tokens. Regenerate via
  `node .design-sync/entry-pkg/regenerate-fontawesome-classes.mjs` after an
  FA version bump. The actual font FILES ship separately via `cfg.extraFonts`
  pointing at `src/assets/fontawesome/v6.5.1/css/design-sync-fonts.css` — a minimal
  subset (Pro solid 900 + regular 400 only), with `url(../webfonts/…)` beside
  `all.css` so `extractFonts()` resolves files the same way as before. Do NOT
  full `all.css`: it includes FA5 legacy aliases and duplicate weight-400
  `@font-face` blocks that make Claude Design's read-only `fonts/fonts.css`
  invalid. Do NOT import the raw `all.css` (with fonts) directly into
  `entry-pkg/index.ts` — Vite's CSS pipeline base64-inlines every referenced
  font in lib+`cssCodeSplit:false` mode regardless of `assetsInlineLimit`,
  producing a 32MB `_ds_bundle.css` (confirmed empirically, twice).
  `sharp-*.css` are NOT imported — nothing in `src/` uses `fa-sharp-*`
  classes (grep before adding them back if that changes) — hence
  `[FONT_MISSING] "Font Awesome 6 Sharp"` in every build: accepted, no
  sharp icon is ever rendered so the missing face is invisible in practice.
  Same reasoning covers `[FONT_MISSING] "Font Awesome 6 Brands"` and
  `"Font Awesome 6 Duotone"` — grepped, nothing in `src/` uses `fa-brands`/
  `fab fa-*`/`fa-duotone`/`fad fa-*` classes or brand-icon names
  (github/twitter/facebook/etc.); `design-sync-fonts.css`'s minimal subset
  intentionally ships only Pro solid 900 + regular 400. `[FONT_MISSING]
  "oxygen-sans"` is a pre-existing, separately-accepted gap (system-font
  substitute).

- **`useQueryClient()` throws "No QueryClient set" / `useLocation()` throws
  "may be used only in the context of a `<Router>`"** (CustomSelect,
  CustomSimpleSelect, Filter, Breadcrumbs, CustomAvatar, IncludedEmployees)
  → **[GENERAL]** dual-module-instance problem: `src/storybook/
  storyDecorators.tsx` (which supplies `withStoryQuerySeeds`/`withStoryRouter`
  as PER-STORY `decorators:` entries — design-sync's `compose()` only reads
  story/meta-level decorators, never `.storybook/preview.tsx`'s global ones,
  since `cfg.provider` is set) is compiled by a SEPARATE esbuild pass per
  preview. Its own fresh copies of `@tanstack/react-query` and
  `react-router-dom` create their OWN Context objects — different ones than
  what `PreviewProviders` (compiled into the ONE shared `_ds_bundle.js`)
  provides — so a hook reading "the" context in one bundle can't see a
  provider mounted by the other, even though the tree LOOKS correctly
  nested. Same class of problem `reactShim` already solves for
  react/react-dom/react-is/scheduler, just not extended to these two.
  Fix: re-export `useQueryClient` (from `@tanstack/react-query`) and
  `MemoryRouter`/`useInRouterContext` (from `react-router-dom`) from
  `entry-pkg/index.ts`, and add both packages to `cfg.storyImports.shim` —
  every story-side import of them now redirects to the SAME instance
  `PreviewProviders` uses. `react-redux` (`useDispatch`, used by
  `withStoryReduxState` for CustomSpin/CustomPagination/PhoneInput) does NOT
  need this — empirically works unshimmed; not yet understood why, not
  chased further since it isn't broken. **If a NEW story decorator needs a
  hook from a package not already in the shim list, check for this class of
  bug first** (silently-missing-provider, not a straightforward crash).

- **Breadcrumbs' preview showed the SAME text ("Проекты") for every story;
  real Storybook (after adding a naive `withStoryRouter`) started throwing/
  hanging with a hidden empty `#storybook-root`** → nested `<MemoryRouter>`:
  `AppDecorator` (real Storybook's global decorator, `.storybook/preview.tsx`)
  already wraps EVERY story in a `MemoryRouter` driven by
  `parameters.router.initialEntries`; `PreviewProviders` (design-sync's
  `cfg.provider`) used to hardcode its own `<MemoryRouter
  initialEntries={['/projects']}>` too. React Router forbids nesting two
  `<Router>` — a real (loud, in real Storybook) or silent (design-sync,
  masked by the dual-instance bug above — the inner MemoryRouter was
  invisible to the actual component anyway) invariant violation either way.
  Fix (symmetric, both sides): `PreviewProviders` no longer provides ANY
  router. `AppDecorator`'s router (`StoryMemoryRouter` in
  `src/storybook/AppDecorator.tsx`) and `storyDecorators.tsx`'s
  `withStoryRouter` both check `useInRouterContext()` first and skip
  wrapping if already inside one — so whichever runs first (AppDecorator,
  outermost, in real Storybook; `withStoryRouter`, now the only router
  source, in design-sync) wins, and the other becomes a no-op.
  **Any of the 16 components that transitively renders a react-router
  `<Link>`/hook (CustomAvatar, IncludedEmployees — no `router:` parameter of
  their own, just need SOME router present) needs `withStoryRouter` in its
  own story `decorators:` now** — PreviewProviders no longer supplies a
  default. If a NEW component's design-sync preview throws
  "useLocation()/useNavigate() may be used only in the context of a
  `<Router>`", this is why.

- **CustomSpin's "Hidden" story (`reduxState.spin.isSpinning: false`)** →
  intentionally skipped (`cfg.overrides.CustomSpin.skip`, matches storybook
  id `primitives-customspin--hidden`) — the component renders antd `<Spin
  spinning={false} fullscreen>`, which is CORRECTLY blank (nothing to
  compare visually). The "Spinning" story's PRODUCT CARD render is also
  blank under the compare harness's frozen-motion capture (antd's spin
  indicator needs animation to appear) — confirmed benign, not a real
  defect; grade recorded with a note, not left ungraded.

- **`[GRID_OVERFLOW]` on Skeleton's "Loading" story** → the shimmer bars
  render wider than the grid cell. `cfg.overrides.Skeleton.cardMode:
  "column"` (full card width per story) — presentation-only, no re-grade
  needed per the skill doc's own rule.

- **Global button/reset styles (`.smart-btn` + `.warning`/`.success`/
  `.danger`/`.transparent` variants — ActionButton/CollapseCard use them via
  plain className strings) missing from every preview** → same class of bug
  as the Font Awesome one above: shipped only through `.storybook/
  preview.tsx` → `globalStyles.ts`, invisible to `entry-pkg`'s own bundle
  graph. **[GENERAL]** Fix: `entry-pkg/index.ts` now imports
  `../../src/layouts/MainLayout/reset.css` and `common.scss` directly as
  side-effects — safe (no `url()`-referenced assets, unlike Font Awesome).

- **Skeleton/DefaultCard "Loading" story shimmer bars render in the WRONG
  color** (light lavender/dark-theme colors instead of storybook's dark-gray
  light-theme colors) — **[GENERAL]**, root cause in `src/storybook/
  PreviewProviders.tsx` (design-sync's own preview wrapper, `cfg.provider`),
  not the converter: it seeded `createStoryStore({ theme: {...}, currentUser:
  {...} })` with LOWERCASE preloadedState keys, but `createStoryStore`'s
  rootReducer keys are PascalCase (`Theme`, `CurrentUser` — see
  `src/storybook/createStoryStore.ts`). Redux Toolkit silently drops
  preloadedState keys that don't match a reducer key, so `Theme`'s state
  fell back to its OWN slice default — `localStorage.getItem('currentTheme')
  ?? 'dark'` — which is `'dark'` in a fresh headless browser (no
  localStorage). Real Storybook's `AppDecorator.tsx` has the SAME
  lowercase-key typo but masks it with a follow-up `dispatch(setCurrentTheme
  (reduxTheme))` effect that `PreviewProviders` lacked. Fix: renamed
  `PreviewProviders`'s preloadedState keys to `Theme`/`CurrentUser` (correct
  casing) — no dispatch-effect workaround needed once the keys match. Any
  component reading `useSelector(selectCurrentTheme)` was affected; only
  Skeleton/DefaultCard's Loading story made it visually obvious. **If a new
  component looks theme-inverted in preview only, check `PreviewProviders`'s
  preloadedState keys against `createStoryStore.ts`'s rootReducer keys
  first** — this class of bug (camelCase parameter vs PascalCase reducer
  key) is silent, no build warning, no console error visible in the capture.

- **PhoneInput's prefix-dropdown selected-value label ("+7"/"+994") is
  blank in the preview but shown correctly in storybook** — graded `close`,
  NOT fixed. Root cause: `PhoneInput.stories.tsx`'s inline decorator wraps
  `<Story>` in `StoryForm` (`src/storybook/StoryForm.tsx`, per-story
  compiled — a SEPARATE esbuild pass from the main bundle since `antd` isn't
  in `cfg.storyImports.shim`). `StoryForm`'s antd `<Form>` is therefore a
  DIFFERENT bundled copy of antd than the one `PhoneInput`'s own `<Select>`/
  `<Form.Item>` use (main bundle) — same dual-module-instance class as the
  react-query/react-router-dom bugs already documented below, but for antd's
  Form context. The masked text INPUT still shows "+7" correctly because
  that comes straight from `'+' + useSelector(selectPrefix)`, not from Form
  context — only the Select's initialValues-driven label is affected.
  **Tried and reverted**: adding `"antd"` to `cfg.storyImports.shim` DOES
  unify the instance, but broke 8 OTHER components outright (CustomSelect,
  CustomSimpleSelect, EditableTextarea, Filter, PhoneInput, AlertCard,
  CustomSpin, DefaultCard all rendered with an empty root) — antd's export
  surface is too large/interconnected to shim wholesale via a bare substring
  match. **Do not re-attempt a blanket `"antd"` shim.** A real fix would need
  a narrower resolution rule (e.g. shim only `antd`'s `Form`/`ConfigProvider`
  subpath, or fork `story-imports.mjs`) — not attempted this sync, cosmetic-
  only impact, accepted as `close`.

- **EditableTextarea's Jodit editor placeholder text differs by locale**
  ("Start writing..." in storybook vs "Напишите что-либо" in the preview,
  Advanced Mode/Advanced Long Content stories) — graded `close`, NOT
  fixable via config. Root cause: Jodit's OWN internal i18n auto-detection
  (no `Jodit.lang`/`language` config set anywhere in `src/` — grepped, none
  found), independent of the app's `react-i18next` (`storybookI18n`, which
  correctly defaults to `'ru'` on both sides). Jodit's locale guess differs
  between storybook's `iframe.html` harness and design-sync's own preview
  HTML harness — not something `cfg.*` can influence, and the harness
  (`emit.mjs`/`bundle.mjs`) is app-contract surface, never fork.

- **A "Dark" story's `globals: {theme: 'dark'}` alone renders LIGHT in every
  design-sync preview** (EntityFileField/MediaGallery/VideoPlayer, added
  2026-07-21) → **[GENERAL]** `PreviewProviders` (design-sync's `cfg.provider`)
  never reads Storybook's `context.globals` at all — that mechanism only
  exists inside real Storybook's `AppDecorator`. A story that sets ONLY
  `globals: {theme: 'dark'}` (the pattern that already works for real
  Storybook's toolbar) is therefore invisible to design-sync; it needs the
  SAME per-story override real Storybook decorators use for everything else
  (spin/prefix/etc — see `withStoryReduxState` below): add `decorators:
  [withStoryReduxState]` to the story's `meta` (or merge into an existing
  decorators array) AND set `parameters.reduxState.theme.currentTheme:
  'dark'` on the `Dark` story itself (keep `globals` too — harmless, and
  what the real Storybook toolbar/addon-themes still key off). **If a NEW
  component's Dark/Light-toggle story renders in the wrong theme in
  design-sync only, add this pairing first** — `PageSuspenseFallback`
  already had it correctly from the start, which is why only the OTHER 3
  needed the fix.
- **Even after adding `withStoryReduxState` + `parameters.reduxState.theme`,
  the Dark story STILL rendered light in design-sync** → **[GENERAL]**, a
  second, deeper bug: `PreviewProviders.tsx` had its own
  `useEffect(() => document.body.setAttribute('data-theme', 'light'), [])`.
  React fires mount effects bottom-up (children before parents);
  `withStoryReduxState`'s effect (a descendant, inside `PreviewProviders`)
  fired FIRST and correctly set `dark`, but `PreviewProviders`'s OWN effect —
  the ancestor — fired LAST and unconditionally overwrote it back to
  `light`. Fix: changed `PreviewProviders`'s effect from `useEffect` to
  `useLayoutEffect`. React flushes ALL layout effects across the whole
  committed tree before ANY passive `useEffect` runs anywhere, so this
  default-light write now always lands before any story-level
  `withStoryReduxState` override, regardless of parent/child ordering within
  the same effect type. **Any future default set in `PreviewProviders` that
  a per-story decorator is meant to override must stay `useLayoutEffect`,
  not `useEffect`** — reverting to `useEffect` silently reintroduces this
  exact bug with no build warning.
- **`InfiniteScroll`'s "Basic" story kept auto-loading pages in the preview
  (20+ items, stuck on "Loading…") while storybook settled at 7 visible
  items** → **[GENERAL, narrow]** the story's OWN wrapper CSS,
  `InfiniteScroll.stories.module.scss`, is a **SCSS** CSS Module — the
  per-story compile pass (raw esbuild, no Sass preprocessing; only
  `entry-pkg`'s Vite build has a Sass loader) does not compile `.module.scss`
  the way it compiles `.module.css` (confirmed empirically: the compiled
  preview JS contained zero `max-height`/`border` CSS text for this file —
  the import silently resolved to an empty module, so `styles.demo` was
  `undefined` and the class never landed on the DOM node at all). Without
  `.demo`'s `max-height: 240px`, the component's OWN `.root { max-height:
  360px }` won by default, so 12 initial items never overflowed the (taller)
  box, and `InfiniteScroll`'s "fill-until-overflow" `ResizeObserver` logic
  kept calling `onLoadMore` for real. Fix: renamed the file to
  `InfiniteScroll.stories.module.css` (plain CSS, SCSS `$variables` resolved
  to their literal values from `variables.scss`, kept the `!important` on
  `max-height` since real Storybook and design-sync's harness insert
  story-CSS vs component-CSS in different orders and equal-specificity
  cascade order isn't reliable either way) and updated the story's import.
  **`InfiniteScroll` is the only component using a story-local `.module.scss`
  file** (grepped) — if a future story adds one, expect the same silent
  empty-import failure; either avoid SCSS-only features in story-local CSS
  Modules (use `.module.css`) or extend `.ds-sync/lib/story-imports.mjs`
  with a real Sass loader (not attempted — narrow, single-component impact
  didn't justify forking the converter).
- **`PageSuspenseFallback`'s "Dark" story: design-sync's preview correctly
  goes dark, but real Storybook's OWN reference render stays light** (card +
  page background never flip, confirmed at full resolution — not a capture
  artifact) → graded `close`, NOT fixed; a genuine real-Storybook-side issue,
  outside design-sync's reach. This is the only one of the 4 new "Dark"
  stories where real Storybook's own render is unreliable — the other 3
  (EntityFileField/MediaGallery/VideoPlayer) correctly go dark in BOTH
  panels. Likely cause: this story is the only one combining `layout:
  'fullscreen'` + `@storybook/addon-themes`'s `withThemeByDataAttribute`
  (global, `.storybook/preview.tsx`) + its own `withStoryReduxState`
  decorator, all three writing `document.body[data-theme]`; not chased
  further into Storybook's own addon internals. **If this recurs on another
  component, or a human confirms/denies it live in Storybook, update this
  note** — don't re-diagnose from scratch.

## Re-sync risks (read this before trusting a fast/no-op re-sync)

- `PreviewProviders.tsx`'s default-theme write MUST stay `useLayoutEffect`,
  never `useEffect` — see the Fixes entry above. No build warning catches a
  regression; only a Dark-story component silently rendering light in every
  preview would.
- Any NEW component with a Light/Dark toggle story needs BOTH `globals:
  {theme: ...}` (real Storybook) AND `decorators: [withStoryReduxState]` +
  `parameters.reduxState.theme.currentTheme` (design-sync) — `globals` alone
  is invisible to design-sync's `PreviewProviders`. Check this first if a new
  component's theme story renders correctly in real Storybook but wrong in
  design-sync.
- A story-local CSS Module MUST be `.module.css`, not `.module.scss` — the
  per-story compile pass has no Sass preprocessing (only `entry-pkg`'s Vite
  build does). An `.module.scss` import silently resolves empty (no build
  error), so every class from it is `undefined` in the preview. Only
  `InfiniteScroll` has a story-local CSS Module today; re-check this if
  another story adds one.
- `PageSuspenseFallback`'s Dark story is graded `close` because real
  Storybook's OWN reference render doesn't apply the dark theme (not a
  design-sync bug) — see the Fixes entry above. Don't re-open this as a
  design-sync regression on a future re-sync; it's a pre-existing real-app/
  real-Storybook inconsistency.
- The FA icon subset (`fontawesome-classes.css`) is generated from
  `all.css` v6.5.1 by `regenerate-fontawesome-classes.mjs` (`@font-face`
  stripped, `--fa-*` tagged `/* @kind other */`). If Font Awesome is upgraded
  in `src/assets/fontawesome/`, regenerate that script — no build warning
  will fire. `design-sync-fonts.css` (`extraFonts`, beside `all.css`) must stay
  minimal; add a weight there only when a storied component actually uses that FA style.
- `cfg.storyImports.shim` for `@tanstack/react-query`/`react-router-dom` is
  load-bearing for EVERY component whose story uses `storyDecorators.tsx`.
  Adding a new story decorator that imports a THIRD package needing shared
  React context (another data/router/state library) will hit the same
  silent-missing-provider class of bug unless also shimmed + re-exported.
- `PreviewProviders` provides NO router by design now. Any new synced
  component that uses `<Link>`, `useNavigate`, `useLocation`, or
  `useParams` — even transitively, even without its own `router:` story
  parameter — needs `withStoryRouter` added to its story's `decorators:`,
  or its design-sync preview will throw.
- `[FONT_MISSING]` for "Font Awesome 6 Sharp", "Font Awesome 6 Brands",
  "Font Awesome 6 Duotone", and "oxygen-sans" is accepted and expected on
  every future build — not a regression to chase, as long as `src/` still
  has no `fa-sharp-*`/`fa-brands`/`fab fa-*`/`fa-duotone`/`fad fa-*` usage
  (re-grep if that changes).
- `PreviewProviders`'s `createStoryStore` preloadedState keys must stay
  PascalCase (`Theme`, `CurrentUser`) matching `createStoryStore.ts`'s
  rootReducer — a future edit that "helpfully" lowercases them re-introduces
  the silent theme-default-to-dark bug (see Fixes above). No build-time
  check catches this; only a visual diff (skeleton/theme-aware components
  rendering inverted) will.
- PhoneInput's prefix-dropdown label mismatch (`close`, not fixed — see
  Fixes above) will keep re-surfacing every re-sync as long as `antd` isn't
  shimmed. Don't "fix" it by blanket-shimming `"antd"` — confirmed to break
  8 other components. If ever revisited, scope the shim narrower than the
  whole package.
- The esbuild converter's Go binary can OOM-crash on this machine
  (`fatal error: runtime: cannot allocate memory`, preview builds fail with
  "The service is no longer running") if a leftover `storybook dev`
  process (`npm run storybook` / port 6006) is left running alongside the
  build — it alone consumed ~7.6GB RSS in one observed case. Design-sync
  only needs the STATIC `sb-reference` build, never a live dev server. If a
  rebuild crashes with an esbuild service/memory error, check `tasklist` /
  `wmic process where "name='node.exe'" get CommandLine,ProcessId` for a
  `storybook dev` process first before assuming a config change broke
  something.

## Orphaned remote font files (resolved 2026-07-13)

- Previously flagged: `fonts/fa-brands-400.*`, `fa-duotone-900.*`,
  `fa-light-300.*`, `fa-thin-100.*`, `fa-v4compatibility.*` were leftover
  in the project from before the minimal-subset fix — the re-sync driver's
  per-component delete tracking doesn't cover aux/font files, so they
  weren't auto-cleaned. Deleted via a one-off `finalize_plan` scoped to
  those 10 exact paths + `delete_files`. Reminder for next time this
  recurs: the anchored-resync diff still won't catch aux/font orphans —
  a manual sweep is needed if the font subset changes again.

## conventions.md drift (resolved 2026-07-13)

- Previously flagged: line 19 oversold the icon surface ("solid/regular/
  light/thin/duotone/brands all ship; sharp does not") against a build that
  actually ships only Pro solid 900 + regular 400. Fixed — conventions.md's
  icon sentence now reads "only solid and regular ship; light, thin,
  duotone, brands, and sharp classes render with missing or wrong glyphs."
  Re-verified against this build's `[FONT_MISSING]` list; no further action.
- **UI references** — curated CRM/SaaS demo links for the design agent live in
  `.design-sync/conventions.md` (synced via `readmeHeader`) and the extended catalog
  in `.design-sync/ui-references.md` (repo-only; mirror URL/rule changes into
  `conventions.md` before `/design-sync`). Claude Design `templates/` is the only
  in-project folder for custom pages/docs without re-sync.
