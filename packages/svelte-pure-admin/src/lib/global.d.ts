/**
 * Global type declarations for Pure Admin
 */

// Floating UI DOM (loaded via CDN)
interface FloatingUIDOM {
	computePosition: typeof import('@floating-ui/dom').computePosition;
	flip: typeof import('@floating-ui/dom').flip;
	shift: typeof import('@floating-ui/dom').shift;
	offset: typeof import('@floating-ui/dom').offset;
	autoUpdate: typeof import('@floating-ui/dom').autoUpdate;
}

declare global {
	interface Window {
		FloatingUIDOM?: FloatingUIDOM;
		/** Splitter behaviour — @keenmate/pure-admin-core/js/splitter.js */
		PaSplitter?: {
			init: (el: HTMLElement) => void;
			initAll: (root?: ParentNode) => void;
		};
		/** Range-group behaviour — @keenmate/pure-admin-core/js/range-group.js */
		PaRangeGroup?: {
			/** Scans `[data-range-group]` under `scope` (default document). */
			init: (scope?: ParentNode) => void;
		};
		/** Stat fit-mode — @keenmate/pure-admin-core/js/pa-stat-fit.js */
		PaStatFit?: {
			/** Wraps + observes `.pa-stat--square[data-pa-stat-fit]` under `root`. */
			init: (root?: ParentNode) => void;
			/** Re-fit after the number text changes (one tile, or all). */
			refresh: (el?: HTMLElement) => void;
		};
		/** Card actions-overflow / generic overflow — @keenmate/pure-admin-core/js/overflow.js */
		PaOverflow?: {
			init: (root: HTMLElement) => void;
			initAll: (scope?: ParentNode) => void;
		};
		/** Alias of PaOverflow kept for the card-actions-overflow name. */
		PaCardActionsOverflow?: Window['PaOverflow'];
		/**
		 * Shared menu-dismissal registry — @keenmate/pure-admin-core/js/split-button.js
		 * + overflow.js (core v2.9.0-rc06). Every open menu (split buttons, `.pa-overflow`
		 * "more" menus, and our Svelte-native SplitButton) registers a close fn here so
		 * opening any one dismisses the others. Defined defensively by whichever module
		 * loads first, so it may be absent until a menu component mounts.
		 */
		PaMenus?: {
			closers: Array<() => void>;
			register: (fn: () => void) => () => void;
			closeOthers: (self: () => void) => void;
		};
	}
}

export {};
