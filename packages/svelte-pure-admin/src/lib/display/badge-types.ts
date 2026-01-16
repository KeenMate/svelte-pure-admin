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

export type BadgeSize = 'xs' | 'sm' | 'lg' | 'xl';

/**
 * Base Badge Props
 * Common props shared across badge components
 *
 * Note: Fixed width badges should use utility classes (e.g., `class="wr-5 minwr-5"`)
 * instead of component props. The `pa-badge--w-*` classes were removed in pure-admin-core rc04.
 */
export interface BaseBadgeProps {
	/** Badge variant */
	variant?: BadgeVariant;
	/** Badge size */
	size?: BadgeSize;
	/** Pill style */
	pill?: boolean;
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
