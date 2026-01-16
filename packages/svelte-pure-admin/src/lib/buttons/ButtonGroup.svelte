<script lang="ts">
	/**
	 * Pure Admin ButtonGroup Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/buttons.html
	 *
	 * Note: Gap modifiers (compact/loose) were removed in pure-admin-core rc04.
	 * Use utility classes instead: `class="gap-2"` for compact, `class="gap-8"` for loose.
	 */

	type AlignVariant = 'center' | 'end' | 'stretch';

	interface Props {
		/** Vertical orientation */
		vertical?: boolean;
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
