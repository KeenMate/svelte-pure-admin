<script lang="ts">
	/**
	 * Pure Admin Header/Navbar Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/layout.html
	 *
	 * THREE-SECTION LAYOUT (v1.0.0-rc06, renamed in v1.4.2):
	 * - .pa-header__start - Burger, Brand, Start Nav (stays anchored to inline-start)
	 * - .pa-header__center - Page Title (flexible, fills space)
	 * - .pa-header__end - End Nav, Notifications, Profile (stays anchored to inline-end)
	 *
	 * HYBRID NAMING CONVENTION:
	 * - Outer wrapper: pa-navbar + pa-navbar__inner
	 * - Inner elements: pa-header__ classes (burger, brand, nav, title, profile-btn)
	 *
	 * Auto-config: When no brand snippet is provided, uses config.app.name and config.app.logo
	 */
	import { usePureAdminConfig } from '../config/hooks';
	import Heading from '../typography/Heading.svelte';
	import { _ } from '../i18n';

	const config = usePureAdminConfig();

	interface Props {
		/** Additional CSS classes for outer nav */
		class?: string;
		/** Additional CSS classes for inner div */
		innerClass?: string;
		/** Brand section snippet */
		brand?: import('svelte').Snippet;
		/** Start navigation snippet (left in LTR, right in RTL) */
		navStart?: import('svelte').Snippet;
		/** Search bar snippet (placed in center section) */
		search?: import('svelte').Snippet;
		/** End navigation snippet (right in LTR, left in RTL) */
		navEnd?: import('svelte').Snippet;
		/** Page title snippet (center section) */
		title?: import('svelte').Snippet;
		/** Notifications snippet (right section) */
		notifications?: import('svelte').Snippet;
		/** Profile button snippet (right section) */
		profile?: import('svelte').Snippet;
		/** Burger menu toggle event */
		onburgerclick?: () => void;
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
		navStart,
		search,
		navEnd,
		title,
		notifications,
		profile,
		onburgerclick,
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
		return (showBurger && onburgerclick) || brand || config().app.logo || config().app.name || navStart;
	});

	// Check if center section has content
	const hasCenterContent = $derived(() => {
		return title || search;
	});

	// Check if right section has content
	const hasRightContent = $derived(() => {
		return navEnd || notifications || profile;
	});
</script>

<nav class={classes()}>
	<div class={innerClasses()}>
		<!-- Start Section: Burger, Brand, Start Nav (stays anchored to inline-start) -->
		{#if hasLeftContent()}
			<div class="pa-header__start">
				{#if showBurger && onburgerclick}
					<button
						class="pa-header__burger burger-menu"
						class:active={burgerActive}
						onclick={onburgerclick}
						aria-label={$_('pureAdmin.a11y.toggleSidebar')}
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

				{#if navStart}
					<nav class="pa-header__nav pa-header__nav--start">
						<ul>
							{@render navStart()}
						</ul>
					</nav>
				{/if}
			</div>
		{/if}

		<!-- Center Section: Page Title (flexible, fills space between start/end) -->
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

		<!-- End Section: End Nav, Notifications, Profile (stays anchored to inline-end) -->
		{#if hasRightContent()}
			<div class="pa-header__end">
				{#if navEnd}
					<nav class="pa-header__nav pa-header__nav--end">
						<ul>
							{@render navEnd()}
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
