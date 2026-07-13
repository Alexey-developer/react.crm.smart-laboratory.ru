# UI reference catalog — Smart Lab CRM

Curated live demos for **pattern inspiration** when designing new CRM screens or
component variants in Claude Design. Maintained in the source repo; the actionable
subset is inlined into `conventions.md` (design-sync `readmeHeader` → README +
design-agent system prompt).

**Not synced as a separate file** — edit here, then mirror critical rules + URLs into
`conventions.md` before `/design-sync`.

## Visual ancestor

**Vuexy** (#2 below) is the primary aesthetic reference. Smart Lab CRM was built
from the same family: vertical sidebar, soft cards, purple primary, light/dark pairs,
8px radius. When in doubt, match Vuexy density and chrome using **shipped** primitives
(`DefaultCard`, `AlertCard`, `Filter`, …) and tokens — do not paste Vuexy markup or CSS.

## Rules for the design agent

1. **Inspiration only** — browse reference UIs for layout ideas, spacing rhythm, and
   component *patterns* (toolbar above table, card grid, mailbox split-pane, etc.).
2. **Shipped components first** — compose from the synced library; add custom markup
   only in `templates/` when no primitive fits.
3. **Tokens only** — colors, radius, shadows from Design Tokens / `styles.css`; never
   sample hex from reference sites.
4. **No new dependencies** — no Bootstrap/Vuexy/Metronic assets; antd + our bundle only.
5. **Semantic classes** — `success`, `warning`, `danger`, `transparent` on buttons/tags;
   Font Awesome via `icon="fa-solid fa-…"` (solid + regular ship; light/thin/brands do not).
6. **i18n keys** — user-visible strings as translation keys (`Actions.delete`), not hardcoded
   Russian/English in reusable pieces.

## Reference sites

### 1. Metronic 8 — enterprise admin breadth

General enterprise CRM/admin patterns: dense dashboards, datatables, multi-level nav.

**Hubs:**
- https://preview.keenthemes.com/metronic8/demo1/index.html
- https://preview.keenthemes.com/metronic8/react/demo1/dashboard

**Entry points:**
- https://preview.keenthemes.com/metronic8/demo1/?page=apps/customers/list — CRM entity list
- https://preview.keenthemes.com/metronic8/demo1/?page=apps/inbox/listing — mailbox / notifications
- https://preview.keenthemes.com/metronic8/demo1/?page=apps/subscriptions/list — datatable + toolbar

**Use for:** dashboard stat cards, datatable + toolbar combos, app shell density.

### 2. Vuexy — primary visual match (HTML + React)

Closest to our production look. Prefer these when choosing card shapes, list pages,
form density, and email/mailbox-style apps.

**Hubs:**
- https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/
- https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-4/apps/email

**Entry points** (append filename to hub path):
- `…/dashboards-crm.html` — CRM dashboard widgets
- `…/app-user-list.html` — entity index table
- `…/app-kanban.html` — tasks board
- `…/form-layouts-vertical.html` — stacked edit form
- `…/tables-datatables-basic.html` — list + filter toolbar
- `…/app-email.html` — mailbox split pane

Full URLs:
- https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/dashboards-crm.html
- https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/app-user-list.html
- https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/app-kanban.html
- https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/form-layouts-vertical.html
- https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/tables-datatables-basic.html
- https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/app-email.html

**Use for:** card layouts (`DefaultCard`, `CollapseCard`), list index pages, form rows,
vertical menu CRM chrome, email/mailbox split views, filter bars above content.

### 3. CORK — workspace apps (mailbox, scrumboard, todo)

Focused app patterns inside an admin shell — good for secondary CRM tools.

**Hub:**
- https://designreset.com/cork/ltr/demo4/index.html

**Entry points:**
- https://designreset.com/cork/ltr/demo4/apps_mailbox.html — mailbox
- https://designreset.com/cork/ltr/demo4/apps_scrumboard.html — kanban
- https://designreset.com/cork/ltr/demo4/apps_todoList.html — todo list
- https://designreset.com/cork/ltr/demo4/form_layouts.html — multi-column forms
- https://designreset.com/cork/ltr/demo4/table_dt_basic.html — datatable baseline

**Use for:** mailbox/notification layouts, kanban/scrumboard (tasks), todo lists,
sidebar + content split panes, form sections, table footers.

### 4. Backpack for Laravel — admin utilities

Laravel admin patterns, file picker / elFinder integration style.

- https://demo.backpackforlaravel.com/admin/elfinder#elf_l1_Lw

**Use for:** file manager UX, admin CRUD list/detail rhythm (legacy CRM parity).

### 5. OneUI — form layouts

Form layout catalog — sections, grids, input groups.

**Entry points:**
- https://demo.pixelcave.com/oneui/be_forms_layouts.html — inline / horizontal / grid forms
- https://demo.pixelcave.com/oneui/be_forms_input_groups.html — prefix addons (`PhoneInput`)
- https://demo.pixelcave.com/oneui/be_tables_datatables.html — datatable patterns

**Use for:** multi-column forms, `PhoneInput` / select rows, `CustomForm`-style field
grouping (wave 3 — compose manually in `templates/` until `CustomForm` ships).

## Sitemap: URL → Smart Lab component (curated)

Scraped nav menus (2026-07): Vuexy 149 pages, Metronic 211, CORK 107, OneUI 155.
Below — **priority links** mapped to shipped primitives and near-term CRM screens.
Browse nested pages inside each demo when a row isn't exact enough.

**Vuexy base (dark vertical menu):**  
`https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/`

### Shipped primitives (design-sync)

| Component / pattern | Best reference URL | What to copy |
|---|---|---|
| **DefaultCard** | [Vuexy `cards-basic`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/cards-basic.html) | Card chrome, header/body padding, soft shadow |
| **DefaultCard** (stats) | [Vuexy `cards-statistics`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/cards-statistics.html) | KPI numbers, subtitle, icon corner |
| **DefaultCard** (ribbon) | [Vuexy `cards-advance`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/cards-advance.html) | Ribbon, actions row, nested content |
| **CollapseCard** | [Vuexy `ui-collapse`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/ui-collapse.html) | Expand/collapse header, chevron affordance |
| **AlertCard** | [Vuexy `ui-alerts`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/ui-alerts.html) | success/warning/danger banners |
| **ActionButton** | [Vuexy `ui-buttons`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/ui-buttons.html) | Icon+label, semantic color buttons |
| **ActionButton** (row) | [CORK `element_buttons_group`](https://designreset.com/cork/ltr/demo4/element_buttons_group.html) | Button groups in card footers |
| **Filter** + toolbar | [Vuexy `tables-datatables-basic`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/tables-datatables-basic.html) | Filter row above table, export buttons |
| **Sort** | [CORK `table_dt_ordering_sorting`](https://designreset.com/cork/ltr/demo4/table_dt_ordering_sorting.html) | Column sort affordance in table header |
| **CustomPagination** | [Vuexy `ui-pagination-breadcrumbs`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/ui-pagination-breadcrumbs.html) | Pagination sizing, page jump |
| **Breadcrumbs** | [Vuexy `ui-pagination-breadcrumbs`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/ui-pagination-breadcrumbs.html) | App breadcrumb trail under header |
| **Breadcrumbs** | [CORK `element_breadcrumbs`](https://designreset.com/cork/ltr/demo4/element_breadcrumbs.html) | Simpler breadcrumb variants |
| **CustomSelect** | [Vuexy `forms-selects`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/forms-selects.html) | Searchable select, tags, multi |
| **CustomSelect** (API) | [CORK `form_select2`](https://designreset.com/cork/ltr/demo4/form_select2.html) | Remote/search select density |
| **CustomSimpleSelect** | [Vuexy `forms-custom-options`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/forms-custom-options.html) | Radio/checkbox styled options |
| **PhoneInput** | [Vuexy `forms-input-groups`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/forms-input-groups.html) | Prefix addon + masked field |
| **PhoneInput** | [OneUI `be_forms_input_groups`](https://demo.pixelcave.com/oneui/be_forms_input_groups.html) | Inline label + prefix groups |
| **PhoneInput** | [CORK `form_input_mask`](https://designreset.com/cork/ltr/demo4/form_input_mask.html) | Masked input patterns |
| **CustomAvatar** | [Vuexy `extended-ui-avatar`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/extended-ui-avatar.html) | Avatar sizes, status dot |
| **IncludedEmployees** | [Vuexy `pages-profile-teams`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/pages-profile-teams.html) | Stacked avatars, member list |
| **Skeleton** | [Vuexy `extended-ui-blockui`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/extended-ui-blockui.html) | Block loading over card body |
| **CustomSpin** | [Vuexy `ui-spinners`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/ui-spinners.html) | Fullscreen/overlay spin |
| **CustomSpin** | [CORK `element_loader`](https://designreset.com/cork/ltr/demo4/element_loader.html) | Loader on content area |

### CRM screens (wave 3 — not synced; compose in `templates/`)

| Screen / future component | Best reference URL | What to copy |
|---|---|---|
| **Entity index** (list) | [Vuexy `app-user-list`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/app-user-list.html) | Index table + row actions + avatar column |
| **Entity index** | [Metronic `customers/list`](https://preview.keenthemes.com/metronic8/demo1/?page=apps/customers/list) | Dense CRM list, status badges |
| **Entity show** (tabs) | [Vuexy `app-user-view-account`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/app-user-view-account.html) | Left summary + tabbed detail |
| **CustomForm** / edit | [Vuexy `form-layouts-vertical`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/form-layouts-vertical.html) | Label-on-top field stack |
| **CustomForm** | [OneUI `be_forms_layouts`](https://demo.pixelcave.com/oneui/be_forms_layouts.html) | Inline / horizontal / grid forms |
| **CustomForm** | [CORK `form_layouts`](https://designreset.com/cork/ltr/demo4/form_layouts.html) | Multi-column form sections |
| **Projects dashboard** | [Vuexy `dashboards-crm`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/dashboards-crm.html) | CRM-specific dashboard widgets |
| **Projects dashboard** | [Vuexy `index`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/index.html) | Analytics cards grid (ancestor layout) |
| **Tasks kanban** | [Vuexy `app-kanban`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/app-kanban.html) | Column board, card drag style |
| **Tasks kanban** | [CORK `apps_scrumboard`](https://designreset.com/cork/ltr/demo4/apps_scrumboard.html) | Scrum columns + task cards |
| **Tasks todo list** | [CORK `apps_todoList`](https://designreset.com/cork/ltr/demo4/apps_todoList.html) | Checkbox list, priorities |
| **Notifications / mail** | [Vuexy `app-email`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/app-email.html) | Split pane: list + reading pane |
| **Notifications / mail** | [CORK `apps_mailbox`](https://designreset.com/cork/ltr/demo4/apps_mailbox.html) | Mailbox folders + message detail |
| **Notifications / mail** | [Metronic `inbox/listing`](https://preview.keenthemes.com/metronic8/demo1/?page=apps/inbox/listing) | Inbox list density |
| **File attachments** | [Backpack elFinder](https://demo.backpackforlaravel.com/admin/elfinder#elf_l1_Lw) | File tree + picker (legacy parity) |
| **File uploads** | [Vuexy `forms-file-upload`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/forms-file-upload.html) | Dropzone row in forms |
| **Invoices / billing** | [Vuexy `app-invoice-list`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/app-invoice-list.html) | Document list + status |
| **Auth / login** | [Vuexy `auth-login-cover`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/auth-login-cover.html) | Split auth layout (future `Auth`) |
| **Permissions** | [Vuexy `app-access-roles`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/app-access-roles.html) | Role matrix (future `PermissionSystem`) |
| **Rich text** | [Vuexy `forms-editors`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/forms-editors.html) | WYSIWYG toolbar (`EditableTextarea`) |
| **Timeline / activity** | [Vuexy `extended-ui-timeline-basic`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/extended-ui-timeline-basic.html) | Task/project activity feed |
| **Search header** | [CORK `element_search`](https://designreset.com/cork/ltr/demo4/element_search.html) | Topbar search expand (future `HeaderSearch`) |

### Metronic React (secondary — component API ideas)

| Pattern | URL |
|---|---|
| React dashboard shell | https://preview.keenthemes.com/metronic8/react/demo1/dashboard |
| Datatable toolbar | https://preview.keenthemes.com/metronic8/demo1/?page=apps/subscriptions/list |
| Drawer filters | https://preview.keenthemes.com/metronic8/demo1/?page=apps/ecommerce/catalog/products |
| User menu / account | https://preview.keenthemes.com/metronic8/demo1/?page=account/overview |

### Quick index by demo family

| Family | Start here | Best for |
|---|---|---|
| Vuexy HTML dark | [`index.html`](https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template-dark/index.html) | **Default** — cards, forms, CRM list, email |
| Vuexy Vue email | [`demo-4/apps/email`](https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-4/apps/email) | React implementation of mailbox |
| Metronic 8 | [`demo1/index`](https://preview.keenthemes.com/metronic8/demo1/index.html) | Dense tables, multi-app shell |
| CORK demo4 | [`index.html`](https://designreset.com/cork/ltr/demo4/index.html) | Mailbox, kanban, todo, form widgets |
| OneUI | [`be_forms_layouts`](https://demo.pixelcave.com/oneui/be_forms_layouts.html) | Form grid catalog |
| Backpack | [elFinder](https://demo.backpackforlaravel.com/admin/elfinder#elf_l1_Lw) | File manager only |

## Map: shipped component → where to look (summary)
| Shipped component | Reference focus |
|---|---|
| `DefaultCard`, `CollapseCard` | Vuexy cards, Cork dashboards |
| `AlertCard` | Vuexy alerts / admonitions |
| `ActionButton` | Vuexy button groups, Metronic action columns |
| `Filter`, `Sort` | Vuexy list toolbars, Metronic datatable headers |
| `Breadcrumbs` | Vuexy / Metronic app breadcrumbs |
| `CustomSelect`, `CustomSimpleSelect` | Vuexy select pickers, OneUI form groups |
| `PhoneInput` | OneUI input groups, Vuexy form pages |
| `CustomPagination` | Vuexy / Metronic table footers |
| `CustomAvatar`, `IncludedEmployees` | Vuexy avatar stacks, team lists |
| `Skeleton` | Vuexy skeleton placeholders on cards |
| `CustomSpin` | Vuexy loading overlays |

## What is NOT in Claude Design (human workflow)

| Source | How to use |
|---|---|
| Business ontology (`docs/ai/business/`) | Not synced. Paste relevant excerpts into your prompt or a `templates/` doc in Claude Design. |
| Legacy CRM (`crm.smart-laboratory.ru`) | Screenshots + short spec in prompt; do not expect live access. |
| Full React source | Only storied components sync. For `EntityIndex` / `CustomForm`, use `npm run dev` + local agents. |

## `templates/` in Claude Design

The only folder editable **inside** the synced Claude Design project without re-sync.
Use it for:

- Landing / marketing one-pagers with your own copy and links
- Screen mockups that **compose** shipped components + custom prose
- Paste this file or ontology excerpts as a static `templates/references.md` after first sync

After editing `conventions.md` or this file, run `/design-sync` from the React repo.
