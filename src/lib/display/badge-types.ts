/**
 * Common Badge Types
 * Shared types for Badge and BadgeGroup components
 */

export type BadgeVariant =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'danger'
	| 'warning'
	| 'info'
	| 'light'
	| 'dark';

export type BadgeSize = 'sm' | 'lg';

export type BadgeWidth = '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';

/**
 * Base Badge Props
 * Common props shared across badge components
 */
export interface BaseBadgeProps {
	/** Badge variant */
	variant?: BadgeVariant;
	/** Badge size */
	size?: BadgeSize;
	/** Pill style */
	pill?: boolean;
	/** Fixed width */
	width?: BadgeWidth;
	/** Ellipsis on left side instead of right */
	ellipsisLeft?: boolean;
	/** Additional CSS classes */
	class?: string;
	/** Click handler */
	onclick?: (event: MouseEvent) => void;
}

/**
 * Badge Item for BadgeGroup (legacy - for direct badge configuration)
 */
export interface BadgeItem {
	/** Badge variant (primary, secondary, success, etc.) */
	variant?: BadgeVariant;
	/** Badge text/label */
	label: string;
	/** Is badge pill shaped? */
	pill?: boolean;
	/** Badge size */
	size?: BadgeSize;
	/** Optional icon snippet */
	icon?: import('svelte').Snippet;
}

/**
 * Generic data item for BadgeGroup
 * Use with member mappings to work with any data structure
 */
export type BadgeDataItem<T = any> = T;

/**
 * Composite Badge Item for CompositeBadgeGroup
 */
export interface CompositeBadgeItem {
	/** Badge variant (main background) */
	variant?: BadgeVariant;
	/** Label section variant (for mixed colors) */
	labelVariant?: BadgeVariant;
	/** Button section variant (for mixed colors) */
	buttonVariant?: BadgeVariant;
	/** Icon snippet */
	icon?: import('svelte').Snippet;
	/** Label text */
	label: string;
	/** Button/count text */
	buttonText: string | number;
	/** Make button interactive (renders as button element) */
	interactive?: boolean;
}
