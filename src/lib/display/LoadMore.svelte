<script lang="ts">
	/**
	 * Pure Admin LoadMore Component (Svelte 5)
	 * Based on @pure-admin/core snippets/tables.html
	 * Load more button for infinite scroll/lazy loading
	 */

	type LoadMoreAlign = 'left' | 'center' | 'right';

	interface Props {
		/** Alignment (default: center) */
		align?: LoadMoreAlign;
		/** Loading state */
		loading?: boolean;
		/** Button text */
		text?: string;
		/** Count text (e.g., "25 of 250") */
		count?: string;
		/** Show count */
		showCount?: boolean;
		/** Click handler */
		onClick?: (event: MouseEvent) => void;
		/** Additional CSS classes */
		class?: string;
		/** Custom button content snippet */
		children?: import('svelte').Snippet;
	}

	let {
		align = 'center',
		loading = false,
		text = 'Load More',
		count,
		showCount = false,
		onClick,
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-load-more'];
		if (align === 'left') base.push('pa-load-more--left');
		if (align === 'right') base.push('pa-load-more--right');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build button class string
	const buttonClasses = $derived(() => {
		const base = ['pa-load-more__button'];
		if (loading) base.push('pa-load-more__button--loading');
		return base.join(' ');
	});
</script>

<div class={classes()}>
	<button class={buttonClasses()} onclick={onClick} disabled={loading}>
		{#if children}
			{@render children()}
		{:else}
			{#if loading}
				<span class="pa-load-more__spinner"></span>
				<span class="pa-load-more__text">Loading...</span>
			{:else}
				<span class="pa-load-more__text">{text}</span>
				{#if showCount && count}
					<span class="pa-load-more__count">({count})</span>
				{/if}
			{/if}
		{/if}
	</button>
</div>
