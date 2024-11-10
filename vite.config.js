import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	build: {
		outDir: 'dist',
		assetsDir: 'assets',
		rollupOptions: {
			output: {
				manualChunks: undefined,
				entryFileNames: 'assets/[name]-[hash].js',
				chunkFileNames: 'assets/[name]-[hash].js',
				assetFileNames: 'assets/[name]-[hash].[ext]',
			},
		},
		assetsInlineLimit: 0,
		manifest: true,
		ssrManifest: true,
	},
	server: {
		headers: {
			'Content-Type': 'application/javascript',
			'Access-Control-Allow-Origin': '*',
		},
	},
	preview: {
		headers: {
			'Content-Type': 'application/javascript',
			'Access-Control-Allow-Origin': '*',
		},
	},
	base: '/',
})
