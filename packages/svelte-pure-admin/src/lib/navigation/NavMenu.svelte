<script lang="ts">
	/**
	 * NavMenu — a navbar menu (`.pa-navmenu`) placed inside a `Navbar` zone. Renders
	 * `<nav class="pa-navmenu"><ul>…</ul></nav>` and owns its responsive collapse:
	 * when `collapse` is set it drives the one core Fit engine (`fit.js`,
	 * `data-pa-fit-nav`) on itself, folding its lowest-priority items out as the
	 * header narrows and restoring them as it widens. Per-item config lives on the
	 * `NavItem` children (`navPriority` / `navCollapse="hide"` / `navIcon`).
	 *
	 * A menu's side is decided purely by which zone it sits in — core rc14 dropped the
	 * old `--start` / `--end` modifiers. Children are `NavItem`s.
	 */
	import { onMount } from 'svelte';
	import { loadCoreJs } from '../internal/core-js';

	interface Props {
		/**
		 * Responsive collapse target (core Fit engine, `data-pa-fit-nav`):
		 * - `'menu'` — items fold into a generated "More ▾" dropdown (self-contained).
		 * - `'sidebar'` — items are rebuilt as native `.pa-sidebar__*` markup under a
		 *   section heading in the sidebar (needs a sidebar on the page).
		 * Only a menu in the START zone is actually shrinkable (the core CSS contract
		 * makes just `.pa-navbar__start` shrink). Unset = the menu hides on mobile (legacy).
		 */
		collapse?: 'menu' | 'sidebar';
		/** Label for the generated "More" trigger (menu collapse mode). */
		moreLabel?: string;
		/** Sidebar `<ul>` selector to inject into (sidebar mode; default: first `.pa-sidebar__nav > ul`). */
		collapseTarget?: string;
		/** Heading for the injected sidebar group (sidebar mode). */
		collapseLabel?: string;
		/** Default icon for injected sidebar items (sidebar mode; `""` to omit icons). */
		collapseIcon?: string;
		/** Additional CSS classes */
		class?: string;
		/** `NavItem` children */
		children?: import('svelte').Snippet;
	}

	let {
		collapse,
		moreLabel,
		collapseTarget,
		collapseLabel,
		collapseIcon,
		class: className = '',
		children
	}: Props = $props();

	let navElement = $state<HTMLElement | null>(null);

	onMount(() => {
		// Progressive collapse is opt-in per menu; init the one Fit engine's nav
		// path on this nav (fit.js reads data-pa-fit-nav).
		if (!collapse || !navElement) return;
		loadCoreJs('navbar-fit').then(() => {
			if (navElement) window.pureAdmin?.components?.fit?.initNav(navElement);
		});
	});

	const classes = $derived(() => {
		const base = ['pa-navmenu'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<nav
	class={classes()}
	bind:this={navElement}
	data-pa-fit-nav={collapse}
	data-pa-fit-nav-more-label={moreLabel}
	data-pa-fit-nav-target={collapseTarget}
	data-pa-fit-nav-label={collapseLabel}
	data-pa-fit-nav-icon={collapseIcon}
>
	<ul>
		{@render children?.()}
	</ul>
</nav>
