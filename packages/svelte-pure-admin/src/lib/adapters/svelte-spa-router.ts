/**
 * QsAdapter for hash-based routers that expose a querystring/location/replace API
 * — notably `@keenmate/svelte-spa-router`. Written as a factory that *takes* the
 * router's functions, so this library never imports (or depends on) the router.
 *
 * @example
 * ```svelte
 * <script>
 *   import { querystring, location, replace } from '@keenmate/svelte-spa-router';
 *   import { createSpaRouterAdapter } from '@keenmate/svelte-pure-admin/adapters/svelte-spa-router';
 *   const router = createSpaRouterAdapter({ querystring, location, replace });
 * </script>
 *
 * <RangeGroup {rows} qsKey="filters" qsAdapter={router} />
 * ```
 */

import type { QsAdapter } from '../forms/range-group-qs';

/** The subset of a hash router's API the adapter needs. Matches svelte-spa-router. */
export interface SpaRouterApi {
	/** Reactive accessor for the current raw querystring (after `?`, no leading `?`). */
	querystring: () => string;
	/** Reactive accessor for the current path. */
	location: () => string;
	/** Navigate to a path, replacing the current history entry. */
	replace: (path: string) => void | Promise<void>;
}

function prettify(search: string): string {
	return search.replace(/%3A/gi, ':').replace(/%2C/gi, ',');
}

/**
 * Build a {@link QsAdapter} backed by a hash router. Using the router's own
 * `replace` keeps its querystring store in sync (unlike a raw `history` write).
 */
export function createSpaRouterAdapter(router: SpaRouterApi): QsAdapter {
	return {
		read(key) {
			return new URLSearchParams(router.querystring() || '').get(key);
		},
		write(key, value) {
			const params = new URLSearchParams(router.querystring() || '');
			if (value == null || value === '') params.delete(key);
			else params.set(key, value);
			const qs = prettify(params.toString());
			router.replace(qs ? `${router.location()}?${qs}` : router.location());
		},
		subscribe(onExternalChange) {
			if (typeof window === 'undefined') return () => {};
			// Hash routers navigate via the URL hash; that covers back/forward and links.
			window.addEventListener('hashchange', onExternalChange);
			return () => window.removeEventListener('hashchange', onExternalChange);
		}
	};
}
