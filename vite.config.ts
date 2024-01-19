import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import react from '@vitejs/plugin-react'
// import envCompatible from 'vite-plugin-env-compatible'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react() /*, envCompatible()*/],
	// define: {
	// 	'process.platform': () => 'win32',
	// },
	resolve: {
		alias: {
			'@assets': '/src/assets',
			'@components': '/src/components',
			'@layouts': '/src/layouts',
			'@redux': '/src/redux',
			'@pages': '/src/pages',
			'@translations': '/src/translations',
			'@utils': '/src/utils',
		},
	},
})
