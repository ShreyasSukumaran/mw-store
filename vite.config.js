import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'
import sass from 'sass'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		eslintPlugin({
			include: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'],
		}),
	],
	css: {
		preprocessorOptions: {
			scss: {
				implementation: sass,
			},
		},
	},
	server: {
		hmr: {
			protocol: 'ws',
			host: 'localhost',
			port: 5713,
			overlay: true, // Shows a full-screen overlay with errors
		},
	},
})
