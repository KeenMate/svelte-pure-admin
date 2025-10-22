<script lang="ts">
	/**
	 * Pure Admin TabItem Component (Svelte 5)
	 * Based on @pure-admin/core snippets/tabs.html
	 * Individual tab button within Tabs container
	 */

	import type { HTMLButtonAttributes } from 'svelte/elements';

	type TabWidth = '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';
	type TabHeight = '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';

	interface Props extends HTMLButtonAttributes {
		/** Active state */
		active?: boolean;
		/** Fixed width */
		width?: TabWidth;
		/** Fixed height */
		height?: TabHeight;
		/** Additional CSS classes */
		class?: string;
		/** Icon snippet (rendered before children) */
		icon?: import('svelte').Snippet;
		/** Tab content */
		children?: import('svelte').Snippet;
		/** Click handler */
		onclick?: (event: MouseEvent) => void;
	}

	let {
		active = false,
		width,
		height,
		class: className = '',
		icon,
		children,
		onclick,
		...restProps
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-tabs__item'];

		// Active state
		if (active) base.push('pa-tabs__item--active');

		// Fixed width
		if (width) base.push(`pa-tabs__item--w-${width}`);

		// Fixed height
		if (height) base.push(`pa-tabs__item--h-${height}`);

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});
</script>

<button class={classes()} {onclick} {...restProps}>
	{#if icon}
		{@render icon()}
	{/if}
	{@render children?.()}
</button>
