// Synthetic entry for design-sync: this repo is an application (no published
// component-library dist/), so this file re-exports every storied component
// from source as the bundle's public API surface. See .design-sync/NOTES.md.
//
// Font Awesome icon classes (fa-solid/fa-regular/fa-light — used via <i
// className="fa-solid fa-…"> in ActionButton/AlertCard/CollapseCard/
// Breadcrumbs/etc.) are imported only by .storybook/preview.tsx normally, so
// esbuild's own bundle graph never sees them. This side-effect import ships
// the class→glyph rules (font files ship separately via cfg.extraFonts —
// see fontawesome-classes.css's header for why the split).
import './fontawesome-classes.css'

// storyDecorators.tsx (compiled per-story, a SEPARATE esbuild pass from this
// entry) calls useQueryClient() to seed API mocks. Without a shared module
// instance, that separate compile's copy of @tanstack/react-query has its
// own QueryClientContext object — a different one than the QueryClient this
// entry's PreviewProviders provides — so useQueryClient() throws "No
// QueryClient set" even though a provider IS mounted above it. Re-exporting
// it here + cfg.storyImports.shim (config.json) redirects every story-side
// import to this single instance, matching how react/react-redux are kept
// singular. See .design-sync/NOTES.md.
export { useQueryClient } from '@tanstack/react-query'

export { ActionButton } from '../../src/components/ActionButton'
export { AlertCard } from '../../src/components/AlertCard'
export { Breadcrumbs } from '../../src/components/Breadcrumbs'
export { CollapseCard } from '../../src/components/CollapseCard'
export { CustomAvatar } from '../../src/components/CustomAvatar'
export { CustomPagination } from '../../src/components/CustomPagination'
export { CustomSelect } from '../../src/components/CustomSelect'
export { CustomSimpleSelect } from '../../src/components/CustomSimpleSelect'
export { CustomSpin } from '../../src/components/CustomSpin'
export { DefaultCard } from '../../src/components/DefaultCard'
export { EditableTextarea } from '../../src/components/EditableTextarea'
export { Filter } from '../../src/components/Filter'
export { IncludedEmployees } from '../../src/components/IncludedEmployees'
export { PhoneInput } from '../../src/components/PhoneInput'
export { Skeleton } from '../../src/components/Skeleton'
export { Sort } from '../../src/components/Sort'
export { PreviewProviders } from '../../src/storybook/PreviewProviders'
