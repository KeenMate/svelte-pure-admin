<script lang="ts">
	/**
	 * Pure Admin Header Component (Svelte 5)
	 * Based on @pure-admin/core snippets/layout.html
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Brand section snippet */
		brand?: import('svelte').Snippet;
		/** Left navigation snippet */
		navLeft?: import('svelte').Snippet;
		/** Right navigation snippet */
		navRight?: import('svelte').Snippet;
		/** Page title snippet */
		title?: import('svelte').Snippet;
		/** Burger menu toggle handler */
		onBurgerClick?: () => void;
		/** Show burger menu */
		showBurger?: boolean;
		/** Children content (fallback) */
		children?: import('svelte').Snippet;
	}

	let {
		class: className = '',
		brand,
		navLeft,
		navRight,
		title,
		onBurgerClick,
		showBurger = false,
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-header'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<header class={classes()}>
	{#if showBurger && onBurgerClick}
		<button
			class="pa-header__burger burger-menu"
			onclick={onBurgerClick}
			aria-label="Toggle sidebar"
		>
			<span></span>
			<span></span>
			<span></span>
		</button>
	{/if}

	{#if brand}
		<div class="pa-header__brand">
			{@render brand()}
		</div>
	{/if}

	{#if navLeft}
		<nav class="pa-header__nav pa-header__nav--left">
			{@render navLeft()}
		</nav>
	{/if}

	{#if title}
		<div class="pa-header__title">
			{@render title()}
		</div>
	{/if}

	{#if navRight}
		<nav class="pa-header__nav pa-header__nav--right">
			{@render navRight()}
		</nav>
	{/if}

	{#if children}
		{@render children()}
	{/if}
</header>
