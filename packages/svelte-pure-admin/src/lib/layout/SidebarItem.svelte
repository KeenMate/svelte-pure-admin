<script lang="ts">
	/**
	 * Pure Admin Sidebar Item Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/layout.html
	 *
	 * SVELTEKIT USAGE:
	 * Use with SvelteKit's page store for automatic active state:
	 *
	 * @example
	 * // In your +layout.svelte or +page.svelte, import page from SvelteKit's app/stores
	 * // then use it to determine active state:
	 *
	 * <SidebarItem href="/dashboard" label="Dashboard" active={$page.url.pathname === '/dashboard'} />
	 * <SidebarItem href="/users" label="Users" active={$page.url.pathname.startsWith('/users')} />
	 */

	import { onMount } from 'svelte';

	interface Props {
		/** Item href (for links) */
		href?: string;
		/** Is active/selected */
		active?: boolean;
		/** Icon snippet */
		icon?: import('svelte').Snippet;
		/** Label text */
		label: string;
		/** Has submenu */
		hasSubmenu?: boolean;
		/** Submenu items */
		submenu?: import('svelte').Snippet;
		/** Click handler */
		onClick?: (event: MouseEvent) => void;
		/** Additional CSS classes */
		class?: string;
		/** Keep icon space even without icon (for alignment) */
		shouldKeepIconSpace?: boolean;
	}

	let {
		href,
		active = false,
		icon,
		label,
		hasSubmenu = false,
		submenu,
		onClick,
		class: className = '',
		shouldKeepIconSpace = true
	}: Props = $props();

	let isOpen = $state(false);

	// Build class string for item
	const itemClasses = $derived(() => {
		const base = ['pa-sidebar__item'];
		if (isOpen && hasSubmenu) base.push('pa-sidebar__item--open');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build class string for link
	const linkClasses = $derived(() => {
		const base = ['pa-sidebar__link'];
		if (active) base.push('pa-sidebar__link--active');
		return base.join(' ');
	});

	function toggleSubmenu(event: MouseEvent) {
		event.preventDefault();
		isOpen = !isOpen;

		// Save state to localStorage
		const submenuId = label.toLowerCase().replace(/\s+/g, '-');
		localStorage.setItem(`submenu-${submenuId}`, isOpen ? 'open' : 'closed');

		if (onClick) onClick(event);
	}

	// Restore submenu state from localStorage
	onMount(() => {
		if (hasSubmenu) {
			const submenuId = label.toLowerCase().replace(/\s+/g, '-');
			const savedState = localStorage.getItem(`submenu-${submenuId}`);
			if (savedState === 'open') {
				isOpen = true;
			}
		}
	});

	// Build submenu class
	const submenuClasses = $derived(() => {
		const base = ['pa-sidebar__submenu'];
		if (isOpen) base.push('pa-sidebar__submenu--open');
		return base.join(' ');
	});
</script>

<li class={itemClasses()}>
	{#if hasSubmenu}
		<button class="pa-sidebar__toggle" onclick={toggleSubmenu}>
			{#if icon}
				<span class="pa-sidebar__icon">
					{@render icon()}
				</span>
			{:else if shouldKeepIconSpace}
				<span class="pa-sidebar__icon"></span>
			{/if}
			<span class="pa-sidebar__label">{label}</span>
			<span class="pa-sidebar__chevron">›</span>
		</button>

		{#if submenu}
			<ul class={submenuClasses()}>
				{@render submenu()}
			</ul>
		{/if}
	{:else if href}
		<a {href} class={linkClasses()} onclick={onClick}>
			{#if icon}
				<span class="pa-sidebar__icon">
					{@render icon()}
				</span>
			{:else if shouldKeepIconSpace}
				<span class="pa-sidebar__icon"></span>
			{/if}
			<span class="pa-sidebar__label">{label}</span>
		</a>
	{:else}
		<button class={linkClasses()} onclick={onClick}>
			{#if icon}
				<span class="pa-sidebar__icon">
					{@render icon()}
				</span>
			{:else if shouldKeepIconSpace}
				<span class="pa-sidebar__icon"></span>
			{/if}
			<span class="pa-sidebar__label">{label}</span>
		</button>
	{/if}
</li>
