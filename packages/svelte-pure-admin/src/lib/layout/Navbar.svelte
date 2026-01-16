<script lang="ts">
	/**
	 * Pure Admin Header/Navbar Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/layout.html
	 *
	 * THREE-SECTION LAYOUT (v1.0.0-rc06):
	 * - .pa-header__left - Burger, Brand, Left Nav (stays anchored left)
	 * - .pa-header__center - Page Title (flexible, fills space)
	 * - .pa-header__right - Right Nav, Notifications, Profile (stays anchored right)
	 *
	 * HYBRID NAMING CONVENTION:
	 * - Outer wrapper: pa-navbar + pa-navbar__inner
	 * - Inner elements: pa-header__ classes (burger, brand, nav, title, profile-btn)
	 *
	 * Auto-config: When no brand snippet is provided, uses config.app.name and config.app.logo
	 */
	import { usePureAdminConfig } from '../config/hooks';
	import Heading from '../typography/Heading.svelte';

	const config = usePureAdminConfig();

	interface Props {
		/** Additional CSS classes for outer nav */
		class?: string;
		/** Additional CSS classes for inner div */
		innerClass?: string;
		/** Brand section snippet */
		brand?: import('svelte').Snippet;
		/** Left navigation snippet */
		navLeft?: import('svelte').Snippet;
		/** Search bar snippet (placed in center section) */
		search?: import('svelte').Snippet;
		/** Right navigation snippet */
		navRight?: import('svelte').Snippet;
		/** Page title snippet (center section) */
		title?: import('svelte').Snippet;
		/** Notifications snippet (right section) */
		notifications?: import('svelte').Snippet;
		/** Profile button snippet (right section) */
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
		notifications,
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

	// Check if left section has content
	const hasLeftContent = $derived(() => {
		return (showBurger && onBurgerClick) || brand || config().app.logo || config().app.name || navLeft;
	});

	// Check if center section has content
	const hasCenterContent = $derived(() => {
		return title || search;
	});

	// Check if right section has content
	const hasRightContent = $derived(() => {
		return navRight || notifications || profile;
	});
</script>

<nav class={classes()}>
	<div class={innerClasses()}>
		<!-- Left Section: Burger, Brand, Left Nav (stays anchored left) -->
		{#if hasLeftContent()}
			<div class="pa-header__left">
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
				{:else if config().app.logo || config().app.name}
					<!-- Default brand from config -->
					<div class="pa-header__brand">
						{#if config().app.logo}
							<img src={config().app.logo} alt={config().app.name} class="pa-header__logo" />
						{/if}
						{#if config().app.name}
							<Heading level={1}>{config().app.name}</Heading>
						{/if}
					</div>
				{/if}

				{#if navLeft}
					<nav class="pa-header__nav pa-header__nav--left">
						<ul>
							{@render navLeft()}
						</ul>
					</nav>
				{/if}
			</div>
		{/if}

		<!-- Center Section: Page Title (flexible, fills space between left/right) -->
		{#if hasCenterContent()}
			<div class="pa-header__center">
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
			</div>
		{/if}

		<!-- Right Section: Right Nav, Notifications, Profile (stays anchored right) -->
		{#if hasRightContent()}
			<div class="pa-header__right">
				{#if navRight}
					<nav class="pa-header__nav pa-header__nav--right">
						<ul>
							{@render navRight()}
						</ul>
					</nav>
				{/if}

				{#if notifications}
					{@render notifications()}
				{/if}

				{#if profile}
					{@render profile()}
				{/if}
			</div>
		{/if}

		{#if children}
			{@render children()}
		{/if}
	</div>
</nav>
