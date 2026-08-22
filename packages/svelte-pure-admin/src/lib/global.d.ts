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
		/** Responsive navbar collapse — @keenmate/pure-admin-core/js/navbar-collapse.js */
		PaNavCollapse?: {
			/** Idempotent single-nav init on a `.pa-navmenu[data-pa-nav-collapse]` element. */
			init: (nav: HTMLElement) => void;
			/** Init every uninitialised collapse nav under `scope` (default document). */
			initAll: (scope?: ParentNode) => void;
		};
		/**
		 * Touch support for navbar hover dropdowns — @keenmate/pure-admin-core/js/navbar-dropdown.js.
		 * Attaches global click/keydown listeners at module eval; `init` only (re)applies
		 * ARIA attributes on `.pa-navmenu__item--has-dropdown` parents under `scope`.
		 */
		PaNavDropdown?: {
			/** Close every open navbar dropdown. */
			closeAll: () => void;
			/** (Re)apply aria-haspopup / aria-expanded on dropdown parents under `scope`. */
			init: (scope?: ParentNode) => void;
		};
		/**
		 * Core runtime namespace — @keenmate/pure-admin-core/js/*. The interactive modules
		 * attach shared config / an event bus / component APIs here. Only the members the
		 * library drives are typed; all optional (defined by whichever module loads first).
		 */
		pureAdmin?: {
			config?: { mobileBreakpoint?: number };
			events?: {
				emit: (name: string, detail?: unknown) => void;
				on?: (name: string, handler: (detail: unknown) => void) => void;
			};
			components?: {
				/**
				 * Priority-driven header degradation — @keenmate/pure-admin-core/js/navbar-fit.js
				 * (core v2.9.0-rc12). Generalises the nav-collapse priority idea to EVERY header
				 * slot (brand wordmark, version tag, page title, search box): when the row can't
				 * fit, slots degrade one at a time — lowest `data-pa-fit-priority` first — via a
				 * `data-pa-fit` strategy (`hide` | `steps` | `sidebar`), restoring as space returns.
				 */
				navFit?: {
					/** Idempotent — wire one fit container (default `.pa-navbar__inner`). */
					init: (container: HTMLElement) => void;
					/** Wire every fit container under `scope` (default document). */
					initAll: (scope?: ParentNode) => void;
					/** Force a re-measure (e.g. after markup changes). */
					relayoutAll: () => void;
				};
				/** Sidebar drag-to-resize — @keenmate/pure-admin-core/js/sidebar-resize.js */
				sidebarResize?: {
					/** Idempotent — finds `.pa-layout__sidebar--resizable`, creates + binds the handle. */
					init: () => void;
					/** Reset to the stylesheet default width. */
					reset: () => void;
					/** Set the sidebar width in px (flags `body.pa-sidebar-resized`). */
					setWidth: (width: number) => void;
					/** Current sidebar width in px. */
					getWidth: () => number;
				};
			};
		};
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
