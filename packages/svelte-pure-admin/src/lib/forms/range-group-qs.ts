/**
 * Querystring sync for RangeGroup — the codec (values ⇄ string) and adapters
 * (how the string is read/written to a URL). Both are overridable via the
 * `codec` / `qsAdapter` props so consumers can change the format or plug in a
 * router of their choice, but the defaults cover the common cases.
 */

import type { RangeGroupValues } from './range-group-types';
import { isRangeValue } from './range-group-types';

/** Serialize/deserialize a whole group to/from one compact string. */
export interface RangeGroupCodec {
	/** Values → string. "Any" bounds (null) are dropped so the URL stays clean. */
	encode(values: RangeGroupValues): string;
	/** String → (partial) values — only the dimensions present in the string. */
	decode(encoded: string): RangeGroupValues;
}

/**
 * How the querystring is read/written. Router-agnostic on purpose: the core
 * component depends on none of these implementations, it just calls the methods.
 */
export interface QsAdapter {
	/** Current value of `key` (or null if absent). */
	read(key: string): string | null;
	/** Set `key` to `value`, or remove it when `value` is null/empty. */
	write(key: string, value: string | null): void;
	/**
	 * Notify on *external* changes only — back/forward, another link — and returns
	 * an unsubscribe. It MUST NOT fire for writes made through this adapter's own
	 * `write`, or a live (`qsMode: 'change'`) write would re-enter and rebuild the
	 * open panel mid-drag. `popstate` / `hashchange` are safe (a `replaceState`
	 * write doesn't fire them); a framework's reactive URL store is NOT (it updates
	 * on every write) — use the raw event instead.
	 */
	subscribe(onExternalChange: () => void): () => void;
}

/**
 * Default codec. One packed param per group, e.g.
 *   filters=age:25..60,salary:40000..,children:gte:2
 * - range   → `key:lo..hi`   (a side is empty when that bound is "Any")
 * - single  → `key:bound:value`
 */
export const rangeGroupCodec: RangeGroupCodec = {
	encode(values) {
		const parts: string[] = [];
		for (const [key, v] of Object.entries(values)) {
			if (isRangeValue(v)) {
				if (v.min !== null || v.max !== null) {
					parts.push(`${key}:${v.min ?? ''}..${v.max ?? ''}`);
				}
			} else if (v.value !== null) {
				parts.push(`${key}:${v.bound}:${v.value}`);
			}
		}
		return parts.join(',');
	},
	decode(encoded) {
		const out: RangeGroupValues = {};
		if (!encoded) return out;
		for (const part of encoded.split(',')) {
			const colon = part.indexOf(':');
			if (colon < 0) continue;
			const key = part.slice(0, colon);
			const payload = part.slice(colon + 1);
			if (!key || !payload) continue;
			if (payload.includes('..')) {
				const [lo, hi] = payload.split('..');
				out[key] = { min: lo === '' ? null : Number(lo), max: hi === '' ? null : Number(hi) };
			} else {
				const boundColon = payload.indexOf(':');
				if (boundColon < 0) continue;
				const bound = payload.slice(0, boundColon) === 'lte' ? 'lte' : 'gte';
				out[key] = { value: Number(payload.slice(boundColon + 1)), bound };
			}
		}
		return out;
	}
};

// `:` `,` `..` are all valid in a query value; URLSearchParams over-encodes `:`
// and `,`, so decode those two back for a readable URL (they round-trip fine).
function prettify(search: string): string {
	return search.replace(/%3A/gi, ':').replace(/%2C/gi, ',');
}

/**
 * Default adapter — the History API on `location.search`. Zero-config for
 * SvelteKit and any path-based (non-hash) app. `write` uses `replaceState`, so
 * dragging a slider never spams the history stack (or fires `popstate`).
 */
export const historyQsAdapter: QsAdapter = {
	read(key) {
		if (typeof window === 'undefined') return null;
		return new URLSearchParams(window.location.search).get(key);
	},
	write(key, value) {
		if (typeof window === 'undefined') return;
		const url = new URL(window.location.href);
		if (value == null || value === '') url.searchParams.delete(key);
		else url.searchParams.set(key, value);
		const qs = prettify(url.searchParams.toString());
		window.history.replaceState(window.history.state, '', url.pathname + (qs ? `?${qs}` : '') + url.hash);
	},
	subscribe(onExternalChange) {
		if (typeof window === 'undefined') return () => {};
		window.addEventListener('popstate', onExternalChange);
		return () => window.removeEventListener('popstate', onExternalChange);
	}
};

function splitHash(): { path: string; qs: string } {
	const raw = typeof window === 'undefined' ? '' : window.location.hash.replace(/^#/, '');
	const q = raw.indexOf('?');
	return q >= 0 ? { path: raw.slice(0, q), qs: raw.slice(q + 1) } : { path: raw, qs: '' };
}

/**
 * Generic adapter for hash-based routers that keep the query inside the hash
 * (`#/people?filters=…`). Works without importing any router. If your router
 * exposes its own navigation store (e.g. svelte-spa-router), prefer
 * `createSpaRouterAdapter` from `@keenmate/svelte-pure-admin/adapters/svelte-spa-router`
 * so the router's own querystring store stays in sync.
 */
export const hashQsAdapter: QsAdapter = {
	read(key) {
		return new URLSearchParams(splitHash().qs).get(key);
	},
	write(key, value) {
		if (typeof window === 'undefined') return;
		const { path, qs } = splitHash();
		const params = new URLSearchParams(qs);
		if (value == null || value === '') params.delete(key);
		else params.set(key, value);
		const pretty = prettify(params.toString());
		window.history.replaceState(window.history.state, '', `#${path}${pretty ? `?${pretty}` : ''}`);
	},
	subscribe(onExternalChange) {
		if (typeof window === 'undefined') return () => {};
		window.addEventListener('hashchange', onExternalChange);
		return () => window.removeEventListener('hashchange', onExternalChange);
	}
};
