<script lang="ts">
	/**
	 * Pure Admin Header/Navbar Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/layout.html
	 *
	 * HYBRID NAMING CONVENTION:
	 * - Outer wrapper: pa-navbar + pa-navbar__inner
	 * - Inner elements: pa-header__ classes (burger, brand, nav, title, profile-btn)
	 */

	interface Props {
		/** Additional CSS classes for outer nav */
		class?: string;
		/** Additional CSS classes for inner div */
		innerClass?: string;
		/** Brand section snippet */
		brand?: import('svelte').Snippet;
		/** Left navigation snippet */
		navLeft?: import('svelte').Snippet;
		/** Search bar snippet (placed before title) */
		search?: import('svelte').Snippet;
		/** Right navigation snippet */
		navRight?: import('svelte').Snippet;
		/** Page title snippet */
		title?: import('svelte').Snippet;
		/** Profile button snippet */
		profile?: import('svelte').Snippet;
		/** Burger menu toggle handler */
		onBurgerClick?: () => void;
		/** Show burger menu */
		showBurger?: boolean;
		/** Whether burger is in active (X) state - toggles animation */
		burgerActive?: boolean;
		/** Children content (fallback) */
		children?: import('svelte').Snippet;
	}

	let {
		class: className = '',
		innerClass = '',
		brand,
		navLeft,
		search,
		navRight,
		title,
		profile,
		onBurgerClick,
		showBurger = false,
		burgerActive = false,
		children
	}: Props = $props();

	// Build class string for outer nav
	const classes = $derived(() => {
		const base = ['pa-navbar'];
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build class string for inner div
	const innerClasses = $derived(() => {
		const base = ['pa-navbar__inner'];
		if (innerClass) base.push(innerClass);
		return base.join(' ');
	});
</script>

<nav class={classes()}>
	<div class={innerClasses()}>
		{#if showBurger && onBurgerClick}
			<button
				class="pa-header__burger burger-menu"
				class:active={burgerActive}
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
				<ul>
					{@render navLeft()}
				</ul>
			</nav>
		{/if}

		{#if search}
			<div class="pa-header__search">
				{@render search()}
			</div>
		{/if}

		{#if title}
			<div class="pa-header__title">
				{@render title()}
			</div>
		{/if}

		{#if navRight}
			<nav class="pa-header__nav pa-header__nav--right">
				<ul>
					{@render navRight()}
				</ul>
			</nav>
		{/if}

		{#if profile}
			{@render profile()}
		{/if}

		{#if children}
			{@render children()}
		{/if}
	</div>
</nav>
