// Library-mode build used ONLY to compile the design-sync entry (index.ts)
// into a real JS+CSS artifact the converter can bundle with esbuild — this
// app has no publishable component-library dist/, so esbuild alone can't
// resolve the .scss imports inside component source. Reuses the app's own
// aliases and sass pipeline. Never used by the app itself.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@api': resolve(__dirname, '../../src/api'),
      '@assets': resolve(__dirname, '../../src/assets'),
      '@components': resolve(__dirname, '../../src/components'),
      '@layouts': resolve(__dirname, '../../src/layouts'),
      '@redux': resolve(__dirname, '../../src/redux'),
      '@pages': resolve(__dirname, '../../src/pages'),
      '@translations': resolve(__dirname, '../../src/translations'),
      '@utils': resolve(__dirname, '../../src/utils'),
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    cssCodeSplit: false,
    minify: false,
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'SmartLabCrmEntry',
      formats: ['es'],
      fileName: () => 'entry.mjs',
    },
    rollupOptions: {
      // react/react-dom subpaths (react-dom/client, react/jsx-runtime, …)
      // AND use-sync-external-store (a react-redux dependency): Rollup's CJS
      // interop rewrites its internal `require('react')` into a runtime
      // require() shim that is no longer real import/require syntax by the
      // time esbuild sees it, so esbuild's react-shim plugin (package-build.mjs,
      // not forkable) never gets a chance to redirect it to window.React — it
      // throws at runtime instead. Marking the whole family external here
      // means esbuild resolves and bundles it itself, fresh from
      // node_modules, where the shim plugin works. Do NOT broaden this to
      // "every bare specifier" — that also externalizes this repo's OWN
      // @component/@utils/etc. aliases (Rollup checks `external` against the
      // raw specifier before Vite's alias plugin resolves it), which then
      // reach esbuild as unprocessed raw .scss imports again.
      external: (id) => /^(react(-dom)?|use-sync-external-store)(\/|$)/.test(id),
    },
  },
})
