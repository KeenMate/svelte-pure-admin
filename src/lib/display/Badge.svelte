<script lang="ts">
	/**
	 * Pure Admin Badge Component (Svelte 5)
	 * Based on @pure-admin/core snippets/badges.html
	 */

	type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
	type BadgeSize = 'sm' | 'lg';
	type BadgeWidth = '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';

	interface Props {
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

<span class={classes()}>
	{#if icon}
		<span class="pa-badge__icon">
			{@render icon()}
		</span>
	{/if}
	{@render children?.()}
</span>
