/**
 * Shared Type Definitions for Pure Admin Svelte Components
 * Following KeenMate naming conventions
 */

// Color variants used across most components
export type ColorVariant =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'danger'
	| 'warning'
	| 'info'
	| 'light'
	| 'dark';

// Size variants (standard)
export type Size = 'xs' | 'sm' | 'lg' | 'xl';

// Extended size (includes 2xl)
export type ExtendedSize = 'xs' | 'sm' | 'lg' | 'xl' | '2xl';

// Horizontal alignment
export type HorizontalAlignment = 'left' | 'center' | 'right';

// Vertical alignment
export type VerticalAlignment = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

// Text mode
export type TextMode = 'default' | 'muted';

// Form validation state
export type ValidationState = 'default' | 'success' | 'warning' | 'error';

// Theme colors (1-9)
export type ThemeColor = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
