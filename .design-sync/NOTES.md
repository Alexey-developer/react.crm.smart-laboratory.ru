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
  pointing at `.design-sync/entry-pkg/fontawesome-fonts.css` — a minimal
  subset (Pro solid 900 + regular 400 only). Do NOT point `extraFonts` at the
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
  `[FONT_MISSING] "oxygen-sans"` is a pre-existing, separately-accepted gap
  (system-font substitute).

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

## Re-sync risks (read this before trusting a fast/no-op re-sync)

- The FA icon subset (`fontawesome-classes.css`) is generated from
  `all.css` v6.5.1 by `regenerate-fontawesome-classes.mjs` (`@font-face`
  stripped, `--fa-*` tagged `/* @kind other */`). If Font Awesome is upgraded
  in `src/assets/fontawesome/`, regenerate that script — no build warning
  will fire. `fontawesome-fonts.css` (`extraFonts`) must stay minimal; add a
  weight there only when a storied component actually uses that FA style.
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
- `[FONT_MISSING]` for "Font Awesome 6 Sharp" and "oxygen-sans" is accepted
  and expected on every future build — not a regression to chase.
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
