<script lang="ts">
	/**
	 * Pure Admin Grid Component (Svelte 5)
	 * Wrapper for native pa-row grid system
	 *
	 * Supports modifiers for:
	 * - Gutters: noGutter removes spacing between columns
	 * - Horizontal alignment: center, end, between, around
	 * - Vertical alignment: top, middle, bottom
	 * - Same height: forces all columns to equal height (for card grids)
	 */

	type HorizontalAlign = 'center' | 'end' | 'between' | 'around';
	type VerticalAlign = 'top' | 'middle' | 'bottom';

	type GapSize = '0' | 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl' | '2xl';

	interface Props {
		/** Remove spacing between columns */
		noGutter?: boolean;
		/** Horizontal alignment of columns */
		justify?: HorizontalAlign;
		/** Vertical alignment of columns */
		align?: VerticalAlign;
		/** Force all columns to equal height (for card grids) */
		sameHeight?: boolean;
		/** Gap between items — semantic name ('xs'..'2xl') or numeric (1-20) for gap-{n} utility class */
		gap?: GapSize | number;
		/** Additional CSS classes */
		class?: string;
		/** Inline styles */
		style?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		noGutter = false,
		justify,
		align,
		sameHeight = false,
		gap,
		class: className = '',
		style,
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-row'];
		if (noGutter) base.push('pa-row--no-gutter');
		if (justify) base.push(`pa-row--${justify}`);
		if (align) base.push(`pa-row--${align}`);
		if (sameHeight) base.push('pa-row--same-height');
		// Gap: both string and number produce gap-{value} utility class
		if (gap !== undefined && gap !== null) base.push(`gap-${gap}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()} {style}>
	{@render children?.()}
</div>
