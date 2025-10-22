/**
 * Common Timeline Types
 * Shared types for Timeline and TimelineItem components
 */

export type TimelineVariant = 'simple' | 'alternating' | 'feed';

export type TimelineItemVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

/**
 * Timeline Item for data-driven Timeline
 */
export interface TimelineItemData {
	/** Color variant */
	variant?: TimelineItemVariant;
	/** Filled marker instead of outline */
	filled?: boolean;
	/** Is this a date header? */
	dateHeader?: boolean;
	/** Time/date text */
	time?: string;
	/** Date text (alternating timeline) */
	date?: string;
	/** Icon text (alternating timeline) */
	iconText?: string;
	/** Avatar image URL (feed timeline) */
	avatarUrl?: string;
	/** Avatar alt text */
	avatarAlt?: string;
	/** Content text */
	content?: string;
	/** Comment text */
	comment?: string;
}
