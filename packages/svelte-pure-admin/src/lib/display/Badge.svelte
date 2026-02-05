<script lang="ts">
	/**
	 * Pure Admin Badge Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/badges.html
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
		isPill = false,
		isEllipsisStart = false,
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
		if (isPill) base.push('pa-badge--pill');
		if (isEllipsisStart) base.push('pa-badge--ellipsis-left');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

{#if onclick}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<span
		class={classes()}
		{onclick}
		onkeydown={(e) => e.key === 'Enter' && onclick?.(e as any)}
		role="button"
		tabindex="0"
	>
		{#if icon}
			<span class="pa-badge__icon">
				{@render icon()}
			</span>
		{/if}
		{@render children?.()}
	</span>
{:else}
	<span class={classes()}>
		{#if icon}
			<span class="pa-badge__icon">
				{@render icon()}
			</span>
		{/if}
		{@render children?.()}
	</span>
{/if}
