import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			// Allow serving files from the library package
			allow: ['..']
		}
	},
	ssr: {
		noExternal: ['@keenmate/web-grid']
	}
});
