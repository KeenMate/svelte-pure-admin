/// <reference path="../../packages/svelte-pure-admin/src/lib/global.d.ts" />

/**
 * Global type declarations for Pure Admin Docs.
 *
 * The shared `window.Pa*` wrapper APIs (PaSplitter, PaRangeGroup, PaNavCollapse,
 * …) and `FloatingUIDOM` are the library's contract — declared once in
 * `packages/svelte-pure-admin/src/lib/global.d.ts` and pulled in via the
 * `/// <reference>` above, so this file never has to mirror them. When a new
 * `window.Pa*` API is added to the library, the docs pick it up automatically.
 *
 * Only globals that are NOT part of the library's public surface — the raw
 * `split-button.js` helpers the OverflowToolbar demo drives directly — are
 * declared here.
 */
declare global {
	interface Window {
		/** Split-button toggle (raw core `js/split-button.js`) — driven directly by the OverflowToolbar demo. */
		toggleSplitMenu?: (event: Event) => void;
		/** Close the open split-button menu (raw core `js/split-button.js`). */
		closeSplitMenu?: () => void;
	}
}

export {};
