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
	}
}

export {};
