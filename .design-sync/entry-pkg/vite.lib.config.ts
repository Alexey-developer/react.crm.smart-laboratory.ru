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
      // This Vite pass exists ONLY so our own component tree's .scss imports
      // compile (esbuild alone can't). Every THIRD-PARTY package must stay
      // external and get bundled fresh by esbuild instead: several antd
      // transitive deps (rc-util, use-sync-external-store, …) ship raw CJS
      // with an internal `require('react')` that Rollup's CJS interop
      // rewrites into a runtime require() shim — no longer real
      // import/require syntax by the time esbuild sees it, so esbuild's
      // react-shim plugin (package-build.mjs, not forkable) never gets a
      // chance to redirect it to window.React and it throws at runtime
      // instead. Whack-a-moling individual offending packages isn't
      // reliable, so every bare npm specifier is external EXCEPT this repo's
      // own tsconfig path aliases (those must stay so Vite/Sass still
      // resolves and compiles this repo's own .scss — Rollup's `external`
      // check runs on the raw specifier before Vite's alias plugin resolves
      // it, so aliases need an explicit exception here).
      external: (id) => {
        if (/^[./]|^[A-Za-z]:[\\/]/.test(id)) return false; // relative/absolute
        const OWN_ALIASES = ['@api', '@assets', '@components', '@layouts', '@redux', '@pages', '@translations', '@utils']
        if (OWN_ALIASES.some((a) => id === a || id.startsWith(a + '/'))) return false;
        return true;
      },
    },
  },
})
