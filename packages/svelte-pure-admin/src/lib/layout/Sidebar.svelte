<script lang="ts">
	/**
	 * Pure Admin Sidebar Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/layout.html
	 *
	 * RESIZABLE SIDEBAR:
	 * - Set isResizable=true to enable drag-to-resize
	 * - Adds pa-layout__sidebar--isResizable class
	 * - Uses CSS variable --pa-local-sidebar-width for dynamic width
	 * - Min 180px, max 500px width constraints
	 * - Width saved to localStorage and restored on load
	 * - Double-click resize handle to reset to default width (288px)
	 */

	import { onMount } from 'svelte';
	import { _ } from '../i18n';

	type SidebarMode = 'sticky' | 'icon-collapse';

	const STORAGE_KEY = 'sidebar-width';
	const MIN_WIDTH = 180; // 18rem in pixels (10px base)
	const MAX_WIDTH = 500; // 50rem in pixels
	const DEFAULT_WIDTH = 288; // 28.8rem in pixels

	interface Props {
		/** Sidebar mode modifier */
		mode?: SidebarMode;
		/** Enable drag-to-resize functionality */
		isResizable?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { mode, isResizable = false, class: className = '', children }: Props = $props();

	let sidebarElement = $state<HTMLElement | null>(null);
	let resizeHandleElement = $state<HTMLElement | null>(null);
	let isResizing = $state(false);
	let startX = 0;
	let startWidth = 0;
	let rafId: number | null = null;

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-layout__sidebar'];
		if (mode) base.push(`pa-layout__sidebar--${mode}`);
		if (isResizable) base.push('pa-layout__sidebar--isResizable');
		if (className) base.push(className);
		return base.join(' ');
	});

	/**
	 * Set sidebar width via CSS variable
	 */
	function setSidebarWidth(width: number) {
		// Convert pixels to rem (10px base)
		const remWidth = width / 10;
		document.documentElement.style.setProperty('--pa-local-sidebar-width', `${remWidth}rem`);
	}

	/**
	 * Get current sidebar width in pixels
	 */
	function getCurrentWidth(): number {
		if (!sidebarElement) return DEFAULT_WIDTH;
		return sidebarElement.offsetWidth;
	}

	/**
	 * Load saved width from localStorage
	 */
	function loadSavedWidth() {
		if (typeof localStorage === 'undefined') return;
		const savedWidth = localStorage.getItem(STORAGE_KEY);
		if (savedWidth) {
			const width = parseInt(savedWidth, 10);
			if (width >= MIN_WIDTH && width <= MAX_WIDTH) {
				setSidebarWidth(width);
			}
		}
	}

	/**
	 * Start resize operation
	 */
	function startResize(e: MouseEvent | TouchEvent) {
		// Don't resize if sidebar is collapsed
		if (
			document.body.classList.contains('sidebar-hidden') ||
			sidebarElement?.classList.contains('pa-layout__sidebar--icon-collapse')
		) {
			return;
		}

		e.preventDefault();
		isResizing = true;

		// Get starting position
		if ('touches' in e) {
			startX = e.touches[0].clientX;
		} else {
			startX = e.clientX;
		}
		startWidth = getCurrentWidth();

		// Add active state
		resizeHandleElement?.classList.add('pa-sidebar-resize--active');
		document.body.classList.add('pa-sidebar-resizing');

		// Bind move/end events
		document.addEventListener('mousemove', doResize);
		document.addEventListener('mouseup', stopResize);
		document.addEventListener('touchmove', doResize, { passive: false });
		document.addEventListener('touchend', stopResize);
	}

	/**
	 * Handle resize drag (throttled with requestAnimationFrame)
	 */
	function doResize(e: MouseEvent | TouchEvent) {
		if (!isResizing) return;

		e.preventDefault();

		// Get current position
		const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;

		// Cancel pending frame
		if (rafId) cancelAnimationFrame(rafId);

		// Schedule update on next frame
		rafId = requestAnimationFrame(() => {
			const diff = currentX - startX;
			const newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, startWidth + diff));
			setSidebarWidth(newWidth);
		});
	}

	/**
	 * Stop resize operation
	 */
	function stopResize() {
		if (!isResizing) return;

		isResizing = false;

		// Cancel any pending animation frame
		if (rafId) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}

		// Remove active state
		resizeHandleElement?.classList.remove('pa-sidebar-resize--active');
		document.body.classList.remove('pa-sidebar-resizing');

		// Unbind events
		document.removeEventListener('mousemove', doResize);
		document.removeEventListener('mouseup', stopResize);
		document.removeEventListener('touchmove', doResize);
		document.removeEventListener('touchend', stopResize);

		// Save width
		if (typeof localStorage !== 'undefined') {
			const currentWidth = getCurrentWidth();
			localStorage.setItem(STORAGE_KEY, currentWidth.toString());
		}
	}

	/**
	 * Reset sidebar width to default
	 */
	function resetWidth() {
		setSidebarWidth(DEFAULT_WIDTH);
		if (typeof localStorage !== 'undefined') {
			localStorage.removeItem(STORAGE_KEY);
		}
	}

	onMount(() => {
		if (isResizable) {
			// Load saved width on mount
			loadSavedWidth();
		}

		return () => {
			// Cleanup on unmount
			document.removeEventListener('mousemove', doResize);
			document.removeEventListener('mouseup', stopResize);
			document.removeEventListener('touchmove', doResize);
			document.removeEventListener('touchend', stopResize);
		};
	});
</script>

<aside class={classes()} bind:this={sidebarElement}>
	<nav class="pa-sidebar__nav">
		<ul>
			{@render children?.()}
		</ul>
	</nav>
	{#if isResizable}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="pa-sidebar-resize"
			title={$_('pureAdmin.a11y.dragToResizeSidebar')}
			bind:this={resizeHandleElement}
			onmousedown={startResize}
			ontouchstart={startResize}
			ondblclick={resetWidth}
		></div>
	{/if}
</aside>
