<script lang="ts">
	/**
	 * Pure Admin Badge Component (Svelte 5)
	 * Based on @pure-admin/core snippets/badges.html
	 */

	import type { BaseBadgeProps } from './badge-types';

	interface Props extends BaseBadgeProps {
		/** Icon snippet */
		icon?: import('svelte').Snippet;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		variant,
		size,
		pill = false,
		width,
		ellipsisLeft = false,
		class: className = '',
		onclick,
		icon,
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-badge'];
		if (variant) base.push(`pa-badge--${variant}`);
		if (size) base.push(`pa-badge--${size}`);
		if (pill) base.push('pa-badge--pill');
		if (width) base.push(`pa-badge--w-${width}`);
		if (ellipsisLeft) base.push('pa-badge--ellipsis-left');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<span class={classes()} {onclick}>
	{#if icon}
		<span class="pa-badge__icon">
			{@render icon()}
		</span>
	{/if}
	{@render children?.()}
</span>
