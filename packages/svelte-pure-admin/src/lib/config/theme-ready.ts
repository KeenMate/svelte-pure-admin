/**
 * Theme-ready signal.
 *
 * A reactive boolean that flips `false` while the active theme stylesheet
 * (the `<link id="pa-theme-css">` managed by SettingsPanel / app.html) is
 * loading or being swapped, and `true` once it has finished — or once a
 * load attempt has definitively failed (`error` event), so the app
 * doesn't stay stuck behind a 404 theme link.
 *
 * Consumers gate theme-dependent rendering (canvas charts, dynamically
 * generated SVGs that read CSS variables, anything else that needs the
 * `--pc-*` cascade resolved before it samples computed styles) on this
 * signal — typically via the `<ThemeReady>` wrapper component.
 *
 * Default value is `true` so apps without the SettingsPanel / app.html
 * theme-link convention still render normally with no opt-in needed.
 * `initThemeReadyTracker()` is the opt-in: PureAdminProvider calls it on
 * mount, so any app using PureAdminProvider automatically participates.
 */

import { writable, type Readable } from 'svelte/store';

const _ready = writable(true);

/** Read-only reactive boolean. `true` when the theme cascade is safe to sample. */
export const themeReady: Readable<boolean> = { subscribe: _ready.subscribe };

let initialised = false;

/**
 * Wires the `themeReady` store to the lifecycle of the
 * `<link id="pa-theme-css">` element. Idempotent — safe to call multiple
 * times (e.g. from both PureAdminProvider and SettingsPanel) and from
 * SSR (no-op when `document` is undefined).
 *
 * Sets `themeReady` to `false` while a stylesheet swap is in flight (href
 * mutation) and back to `true` on `load` or `error`. If no managed theme
 * link is present at call time the store stays at its `true` default —
 * the gate is effectively a no-op for apps that don't use our theme
 * loader.
 */
export function initThemeReadyTracker(): void {
	if (typeof document === 'undefined') return;
	if (initialised) return;
	initialised = true;

	const link = document.getElementById('pa-theme-css') as HTMLLinkElement | null;
	if (!link) return;

	// `link.sheet` is the constructed CSSStyleSheet — non-null only after
	// the stylesheet has finished loading and parsing.
	_ready.set(!!link.sheet);

	let lastHref = link.href;

	const onSettled = () => _ready.set(true);
	link.addEventListener('load', onSettled);
	link.addEventListener('error', onSettled); // fail open — never trap the app

	new MutationObserver(() => {
		// MutationObserver fires for every attribute *write*, even when the
		// new value equals the old (e.g. SettingsPanel re-assigning the
		// same resolved URL on mount). Compare the resolved href before
		// flipping ready — `link.href` always reads back as an absolute
		// URL, so this catches the no-op rewrite case.
		if (link.href === lastHref) return;
		lastHref = link.href;
		_ready.set(false);
	}).observe(link, { attributes: true, attributeFilter: ['href'] });
}
