import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		eslintPlugin({
			include: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'],
		}),
	],
	server: {
		hmr: {
			protocol: 'ws',
			host: 'localhost',
			port: 5713,
			overlay: true, // Shows a full-screen overlay with errors
		},
	},
})
