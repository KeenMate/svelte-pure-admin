<script lang="ts">
	/**
	 * Pure Admin ButtonGroup Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/buttons.html
	 */

	type GapVariant = 'compact' | 'loose';
	type AlignVariant = 'center' | 'end' | 'stretch';

	interface Props {
		/** Vertical orientation */
		vertical?: boolean;
		/** Gap between buttons: compact (tight), default, loose (spacious) */
		gap?: GapVariant;
		/** Vertical alignment (only for vertical groups): center, end, stretch */
		align?: AlignVariant;
		/** Responsive: horizontal on mobile, vertical on md+ */
		mdVertical?: boolean;
		/** Responsive: vertical on mobile/tablet, horizontal on lg+ */
		lgHorizontal?: boolean;
		/** Prevent wrapping (single line, may overflow) */
		nowrap?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		vertical = false,
		gap,
		align,
		mdVertical = false,
		lgHorizontal = false,
		nowrap = false,
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-btn-group'];
		if (vertical) base.push('pa-btn-group--vertical');
		if (gap) base.push(`pa-btn-group--${gap}`);
		if (align) base.push(`pa-btn-group--${align}`);
		if (mdVertical) base.push('pa-btn-group--md-vertical');
		if (lgHorizontal) base.push('pa-btn-group--lg-horizontal');
		if (nowrap) base.push('pa-btn-group--nowrap');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
