// Synthetic entry for design-sync: this repo is an application (no published
// component-library dist/), so this file re-exports every storied component
// from source as the bundle's public API surface. See .design-sync/NOTES.md.
//
// Font Awesome icon classes (fa-solid/fa-regular/fa-light — used via <i
// className="fa-solid fa-…"> in ActionButton/AlertCard/CollapseCard/
// Breadcrumbs/etc.) are imported only by .storybook/preview.tsx normally, so
// esbuild's own bundle graph never sees them. This side-effect import ships
// the class→glyph rules (font files ship separately via design-sync-fonts.css +
// cfg.extraFonts — regenerate via regenerate-fontawesome-classes.mjs).
import './fontawesome-classes.css'

// Same problem for the app's global button/reset styles (.smart-btn and its
// .warning/.success/.danger/.transparent color variants — ActionButton/
// CollapseCard use them via plain className strings, not a co-located
// .module.scss): normally shipped only through .storybook/preview.tsx via
// globalStyles.ts, invisible to this entry's own bundle graph. Neither file
// has any url()-referenced asset, so — unlike the Font Awesome CSS — they're
// safe to import directly through Vite without base64-inlining risk.
import '../../src/layouts/MainLayout/reset.css'
import '../../src/layouts/MainLayout/common.scss'

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

// Same dual-instance problem for react-router-dom: storyDecorators.tsx's
// MemoryRouter/useInRouterContext (per-story compile) is a different module
// instance than what Breadcrumbs/Filter (this entry's bundle) call
// useLocation() against, so a router mounted by the story-side copy is
// invisible to the component's own copy → "useLocation() may be used only
// in the context of a <Router>". Shim story-side react-router-dom imports to
// this instance too (cfg.storyImports.shim in config.json).
export { MemoryRouter, useInRouterContext } from 'react-router-dom'

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
// EditableTextarea excluded (cfg.titleMap): jodit-pro-react pushes
// _ds_bundle.js past the upload's 5MB per-file cap. See NOTES.md.
export { EntityFileField } from '../../src/components/EntityFileField'
export { Filter } from '../../src/components/Filter'
export { IncludedEmployees } from '../../src/components/IncludedEmployees'
export { InfiniteScroll } from '../../src/components/InfiniteScroll'
export { MediaGallery } from '../../src/components/MediaGallery'
export { PageSuspenseFallback } from '../../src/components/PageSuspenseFallback'
export { PhoneInput } from '../../src/components/PhoneInput'
export { Skeleton } from '../../src/components/Skeleton'
export { Sort } from '../../src/components/Sort'
export { VideoPlayer } from '../../src/components/VideoPlayer'
export { PreviewProviders } from '../../src/storybook/PreviewProviders'
