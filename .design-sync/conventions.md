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

Brand/semantic colors, if you need raw values for your own layout glue (spacing, panels, etc. — never for restyling a shipped component): primary `rgb(115, 103, 240)`, success `rgb(40, 199, 111)`, warning `rgb(255, 159, 67)`, danger `rgb(234, 84, 85)`, border-radius `8px`. Icons are Font Awesome class strings passed as plain props (e.g. `icon="fa-solid fa-trash"`, `"fa-solid fa-pen-to-square"`) — only **solid** and **regular** ship; light, thin, duotone, brands, and sharp classes render with missing or wrong glyphs.

## Where the truth lives

Read `styles.css` and its `@import`s before styling anything by hand — it's the complete, real stylesheet closure every design receives. Each component's own `<Name>.d.ts` (props) and `<Name>.prompt.md` (usage + real story-derived examples) are per-component ground truth and take precedence over this file for that component's API.

## Example

```jsx
<PreviewProviders>
  <AlertCard message="Statistics.time_spent" description="…" type="success" />
  <ActionButton title="Actions.delete" icon="fa-solid fa-trash" className="danger transparent" useConfirm />
</PreviewProviders>
```

## UI reference sites (inspiration only)

When proposing **new** layouts or variants not covered by shipped primitives, use these
live CRM/SaaS admin demos for **pattern ideas** — not as copy-paste sources. Our
visual ancestor is **Vuexy**; match its card chrome, vertical-menu CRM density, and
form rhythm using shipped components + tokens below.

**Rules:** (1) Compose from synced components first; custom markup only in Claude
Design `templates/`. (2) Colors/radius from our tokens only — never sample hex from
reference sites. (3) No third-party CSS/JS from demos. (4) Icons: `fa-solid` /
`fa-regular` only (light, thin, brands, duotone, sharp do **not** ship).

### Catalog (hubs + entry points)

| # | Theme | Hub | Entry points |
|---|---|---|---|
| 1 Metronic 8 | Enterprise dashboards, datatables | [demo1 index](https://preview.keenthemes.com/metronic8/demo1/index.html) · [React dashboard](https://preview.keenthemes.com/metronic8/react/demo1/dashboard) | [customers/list](https://preview.keenthemes.com/metronic8/demo1/?page=apps/customers/list) · [inbox/listing](https://preview.keenthemes.com/metronic8/demo1/?page=apps/inbox/listing) · [subscriptions/list](https://preview.keenthemes.com/metronic8/demo1/?page=apps/subscriptions/list) |
| 2 **Vuexy** (primary) | Cards, lists, forms, email — closest to our UI | [HTML dark hub](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/) · [Vue email](https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-4/apps/email) | [dashboards-crm](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/dashboards-crm.html) · [app-user-list](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/app-user-list.html) · [app-kanban](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/app-kanban.html) · [form-layouts-vertical](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/form-layouts-vertical.html) · [tables-datatables-basic](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/tables-datatables-basic.html) · [app-email](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/app-email.html) |
| 3 CORK | Mailbox, scrumboard, todo, forms, tables | [demo4 index](https://designreset.com/cork/ltr/demo4/index.html) | [mailbox](https://designreset.com/cork/ltr/demo4/apps_mailbox.html) · [scrumboard](https://designreset.com/cork/ltr/demo4/apps_scrumboard.html) · [todo](https://designreset.com/cork/ltr/demo4/apps_todoList.html) · [form_layouts](https://designreset.com/cork/ltr/demo4/form_layouts.html) · [table_dt_basic](https://designreset.com/cork/ltr/demo4/table_dt_basic.html) |
| 4 Backpack | Laravel admin, file manager | [elFinder](https://demo.backpackforlaravel.com/admin/elfinder#elf_l1_Lw) | — |
| 5 OneUI | Form layouts, input groups, tables | [be_forms_layouts](https://demo.pixelcave.com/oneui/be_forms_layouts.html) | [be_forms_input_groups](https://demo.pixelcave.com/oneui/be_forms_input_groups.html) · [be_tables_datatables](https://demo.pixelcave.com/oneui/be_tables_datatables.html) |

### Where to look per shipped component

- **DefaultCard / CollapseCard / AlertCard** → Vuexy cards; Cork dashboards
- **Filter / Sort / CustomPagination** → Vuexy list toolbars; Metronic datatables
- **Breadcrumbs** → Vuexy / Metronic app headers
- **CustomSelect / CustomSimpleSelect / PhoneInput** → Vuexy forms; OneUI layout catalog
- **CustomAvatar / IncludedEmployees** → Vuexy team lists
- **Skeleton / CustomSpin / PageSuspenseFallback** → Vuexy loading states
- **EntityFileField / MediaGallery / VideoPlayer** → Vuexy `app-file-manager`, `extended-ui-media-player`
- **InfiniteScroll** → Vuexy list/table toolbars (same hub as Filter/Sort/CustomPagination)

Browse inside each demo (nested pages) when hunting a specific pattern. Business
rules and legacy CRM screens are **not** in this bundle — the human adds ontology
excerpts or screenshots via prompt or `templates/` docs.

**Priority sitemap** (full table in repo `.design-sync/ui-references.md`):

| Component | Start here |
|---|---|
| DefaultCard / CollapseCard | Vuexy `cards-basic`, `cards-advance`, `ui-collapse` |
| AlertCard | Vuexy `ui-alerts` |
| ActionButton | Vuexy `ui-buttons` |
| Filter / Sort / CustomPagination | Vuexy `tables-datatables-basic`; CORK `table_dt_ordering_sorting` |
| Breadcrumbs | Vuexy `ui-pagination-breadcrumbs` |
| CustomSelect / PhoneInput | Vuexy `forms-selects`, `forms-input-groups`; OneUI `be_forms_input_groups` |
| CustomAvatar / IncludedEmployees | Vuexy `extended-ui-avatar`, `pages-profile-teams` |
| Skeleton / CustomSpin / PageSuspenseFallback | Vuexy `extended-ui-blockui`, `ui-spinners` |
| EntityFileField / MediaGallery / VideoPlayer | Vuexy `app-file-manager`, `extended-ui-media-player` |
| InfiniteScroll | Vuexy `tables-datatables-basic` (scroll/load-more patterns) |
| Entity index (templates) | Vuexy `app-user-list`; Metronic `apps/customers/list` |
| Tasks kanban (templates) | Vuexy `app-kanban`; CORK `apps_scrumboard` |
| Mailbox (templates) | Vuexy `app-email`; CORK `apps_mailbox` |
