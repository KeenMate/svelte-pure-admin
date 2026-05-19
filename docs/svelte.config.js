import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Node adapter — produces a self-contained Node server in build/.
		// Required so that on-demand theme installation (themes/[slug]/[...path]/+server.ts)
		// can run at runtime. Most pages are still SSR'd cheaply per-request from disk.
		adapter: adapter({
			out: 'build',
			precompress: false,
			envPrefix: 'PA_'
		}),
		alias: {
			// Point to library source for HMR during development
			'@keenmate/svelte-pure-admin': path.resolve(__dirname, '../packages/svelte-pure-admin/src/lib')
		}
	}
};

export default config;
