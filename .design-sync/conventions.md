## Wrapping and setup

Every screen you build MUST be wrapped once, at the root, in `<PreviewProviders>` (a real bundle export — `window.SmartLabCrm.PreviewProviders`). It supplies everything the components read from context: a Redux store (theme, current user, phone-prefix, spin, filters…), a `QueryClientProvider` (react-query), an `I18nextProvider` (react-i18next, defaults to Russian — `'ru'`), and an antd `ConfigProvider` with Russian locale + this system's theme tokens. Components call `useSelector`/`useQueryClient`/`useTranslation` directly — without this wrapper they throw or render unstyled/untranslated. Do not build your own Redux store or QueryClientProvider; reuse this one.

```jsx
<PreviewProviders>
  <YourScreen />
</PreviewProviders>
```

One thing `PreviewProviders` deliberately does NOT supply: a router. Any component using `<Link>`, `useNavigate`, `useLocation`, or `useParams` (e.g. `Breadcrumbs`) needs its own router ancestor (e.g. wrap with `react-router-dom`'s `MemoryRouter`) somewhere between `PreviewProviders` and that component.

## Styling idiom

Components are self-styled via CSS Modules — their look ships fully baked into `_ds_bundle.css`, reachable through `styles.css`'s `@import` chain. Don't write custom CSS to restyle a shipped component; compose it via props instead.

On top of that, a small **semantic status-color vocabulary** is layered onto specific elements via plain `className` strings (not a utility-class framework — just these four words, optionally combined): `success` (green), `warning` (orange), `danger` (red), and `transparent` (fill→tint variant, combine as e.g. `"danger transparent"`). Confirmed on `ActionButton`'s `className` prop (typed `TColorType`) and the same words theme antd `Tag`/`Badge`/`Ribbon` elements the same way (`src/layouts/MainLayout/common.scss`). When you need a status color anywhere in a new layout, reach for one of these four words rather than inventing a hex value.

Brand/semantic colors, if you need raw values for your own layout glue (spacing, panels, etc. — never for restyling a shipped component): primary `rgb(115, 103, 240)`, success `rgb(40, 199, 111)`, warning `rgb(255, 159, 67)`, danger `rgb(234, 84, 85)`, border-radius `8px`. Icons are Font Awesome class strings passed as plain props (e.g. `icon="fa-solid fa-trash"`, `"fa-solid fa-pen-to-square"`) — solid/regular/light/thin/duotone/brands subsets all ship; sharp does not.

## Where the truth lives

Read `styles.css` and its `@import`s before styling anything by hand — it's the complete, real stylesheet closure every design receives. Each component's own `<Name>.d.ts` (props) and `<Name>.prompt.md` (usage + real story-derived examples) are per-component ground truth and take precedence over this file for that component's API.

## Example

```jsx
<PreviewProviders>
  <AlertCard message="Statistics.time_spent" description="…" type="success" />
  <ActionButton title="Actions.delete" icon="fa-solid fa-trash" className="danger transparent" useConfirm />
</PreviewProviders>
```
