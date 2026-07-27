/**
 * Global type declarations for Pure Admin Docs
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
		/** Split-button toggle — @keenmate/pure-admin-core/js/split-button.js */
		toggleSplitMenu?: (event: Event) => void;
		/** Close the open split-button menu — split-button.js */
		closeSplitMenu?: () => void;
		/**
		 * Shared menu-dismissal registry — split-button.js + overflow.js (core
		 * v2.9.0-rc06). Split buttons, `.pa-overflow` "more" menus, and our
		 * Svelte-native SplitButton register a close fn so opening any one closes
		 * the others. Created defensively by whichever module loads first.
		 */
		PaMenus?: {
			closers: Array<() => void>;
			register: (fn: () => void) => () => void;
			closeOthers: (self: () => void) => void;
		};
	}
}

export {};
