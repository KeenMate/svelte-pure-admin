<script lang="ts">
	/**
	 * Pure Admin Tabs Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/tabs.html
	 * Main container for standalone tabs navigation
	 */

	type TabsStyle = 'underline' | 'pills' | 'boxed' | 'vertical';
	type TabsSize = 'sm' | 'lg';
	type TabsAlign = 'centered' | 'full';
	type TabsOverflow = 'nowrap' | 'scrollable' | 'collapse';

	interface Props {
		/** Tab style (default: underline) */
		style?: TabsStyle;
		/** Tab size */
		size?: TabsSize;
		/** Tab alignment */
		align?: TabsAlign;
		/** Overflow handling */
		overflow?: TabsOverflow;
		/** Border on top instead of bottom (useful for profile panel tabs) */
		isBorderTop?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Tab items content */
		children?: import('svelte').Snippet;
	}

	let {
		style = 'underline',
		size,
		align,
		overflow,
		isBorderTop = false,
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-tabs'];

		// Style
		if (style === 'pills') base.push('pa-tabs--pills');
		if (style === 'boxed') base.push('pa-tabs--boxed');
		if (style === 'vertical') base.push('pa-tabs--vertical');

		// Size
		if (size) base.push(`pa-tabs--${size}`);

		// Alignment
		if (align) base.push(`pa-tabs--${align}`);

		// Overflow
		if (overflow) base.push(`pa-tabs--${overflow}`);

		// Border position
		if (isBorderTop) base.push('pa-tabs--border-top');

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
