<script lang="ts">
	/**
	 * Pure Admin Sidebar Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/layout.html
	 *
	 * RESIZABLE SIDEBAR (`isResizable`):
	 * Adds `.pa-layout__sidebar--resizable` and drives core's shipped
	 * `js/sidebar-resize.js` (`window.pureAdmin.components.sidebarResize`, core
	 * v2.9.0-rc11). Core creates + binds the `.pa-sidebar-resize` handle on the
	 * fly, so we render no handle of our own (its `init` reuses an existing handle
	 * WITHOUT re-binding). Drag to resize, double-click the handle to reset.
	 * Bounds come from CSS (`--pc-local-sidebar-{min,max}-width`), width persists
	 * to `localStorage` ('sidebar-width'), and the drag flags
	 * `body.pa-sidebar-resized` so the width actually applies in the tablet band
	 * (previously hand-rolled here, which missed that flag — the handle looked dead).
	 */

	import { onMount } from 'svelte';
	import { loadCoreJs } from '../internal/core-js';

	type SidebarMode = 'sticky' | 'icon-collapse';

	interface Props {
		/** Sidebar mode modifier */
		mode?: SidebarMode;
		/** Enable drag-to-resize (core `sidebar-resize.js`) */
		isResizable?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { mode, isResizable = false, class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-layout__sidebar'];
		if (mode) base.push(`pa-layout__sidebar--${mode}`);
		if (isResizable) base.push('pa-layout__sidebar--resizable');
		if (className) base.push(className);
		return base.join(' ');
	});

	onMount(() => {
		if (!isResizable) return;
		// Load + init core's sidebar-resize (SSR-safe via the loader). init() is
		// idempotent and creates/binds the handle on `.pa-layout__sidebar--resizable`.
		loadCoreJs('sidebar-resize').then(() => {
			window.pureAdmin?.components?.sidebarResize?.init();
		});
	});
</script>

<aside class={classes()}>
	<nav class="pa-sidebar__nav">
		<ul>
			{@render children?.()}
		</ul>
	</nav>
</aside>
