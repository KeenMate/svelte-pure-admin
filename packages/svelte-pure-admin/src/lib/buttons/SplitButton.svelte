<script lang="ts" module>
	// Track the currently open split button globally (only one open at a time)
	let currentOpenInstance: { close: () => void } | undefined;
</script>

<script lang="ts">
	/**
	 * Pure Admin Split Button Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/buttons.html
	 *
	 * Primary action button + dropdown toggle with menu items.
	 * Uses Floating UI for positioning (teleports menu to <body>).
	 */

	import { onMount, tick } from 'svelte';
	import type { ThemeColor } from '../types';

	type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
	type ButtonSize = 'xs' | 'sm' | 'lg' | 'xl';

	interface Props {
		/** Button variant */
		variant?: ButtonVariant;
		/** Theme color slot variant (1-9) — overrides variant */
		themeColor?: ThemeColor;
		/** Button size */
		size?: ButtonSize;
		/** Outline style */
		isOutline?: boolean;
		/** Open/closed state of the dropdown menu */
		isOpen?: boolean;
		/** Menu placement */
		placement?: 'bottom-end' | 'top-end';
		/** Disabled state */
		disabled?: boolean;
		/** Click handler for the main button */
		onclick?: (event: MouseEvent) => void;
		/** Additional CSS classes */
		class?: string;
		/** Main button icon snippet (renders in pa-btn__icon) */
		icon?: import('svelte').Snippet;
		/** Main button content */
		children?: import('svelte').Snippet;
		/** Toggle button icon (defaults to chevron-down) */
		toggleIcon?: import('svelte').Snippet;
		/** Dropdown menu items (use SplitButtonItem components) */
		menu?: import('svelte').Snippet;
	}

	let {
		variant = 'primary',
		themeColor,
		size,
		isOutline = false,
		isOpen = $bindable(false),
		placement = 'bottom-end',
		disabled = false,
		onclick,
		class: className = '',
		icon,
		children,
		toggleIcon,
		menu
	}: Props = $props();

	let splitRef: HTMLDivElement;
	let menuEl = $state<HTMLDivElement | undefined>(undefined);
	let cleanupAutoUpdate: (() => void) | undefined;

	// Build container class string
	const classes = $derived(() => {
		const base = ['pa-btn-split'];
		if (isOpen) base.push('pa-btn-split--open');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build variant class fragment
	function variantClass(): string {
		if (themeColor) {
			return isOutline ? `pa-btn--outline-color-${themeColor}` : `pa-btn--color-${themeColor}`;
		}
		return isOutline ? `pa-btn--outline-${variant}` : `pa-btn--${variant}`;
	}

	// Build button class string
	const btnClasses = $derived(() => {
		const base = ['pa-btn', variantClass()];
		if (size) base.push(`pa-btn--${size}`);
		return base.join(' ');
	});

	// Build toggle button class string
	const toggleClasses = $derived(() => {
		const base = ['pa-btn', 'pa-btn-split__toggle', variantClass()];
		if (size) base.push(`pa-btn--${size}`);
		return base.join(' ');
	});

	function closeMenu() {
		isOpen = false;
		if (currentOpenInstance?.close === closeMenu) {
			currentOpenInstance = undefined;
		}
		cleanupAutoUpdate?.();
		cleanupAutoUpdate = undefined;

		if (menuEl) {
			// Remove open class and clear Floating UI inline styles
			menuEl.classList.remove('pa-btn-split__menu--open');
			menuEl.style.removeProperty('position');
			menuEl.style.removeProperty('left');
			menuEl.style.removeProperty('top');
			menuEl.style.removeProperty('min-width');

			// Return menu to original parent if teleported
			if (menuEl.parentElement === document.body && splitRef) {
				splitRef.appendChild(menuEl);
			}
		}
	}

	async function openMenu() {
		// Close any other open split button
		if (currentOpenInstance) {
			currentOpenInstance.close();
		}

		isOpen = true;
		currentOpenInstance = { close: closeMenu };

		await tick();

		if (!menuEl || !splitRef) return;

		// Teleport menu to <body> to avoid overflow clipping
		document.body.appendChild(menuEl);
		menuEl.classList.add('pa-btn-split__menu--open');

		positionMenu();
	}

	function positionMenu() {
		if (!window.FloatingUIDOM || !menuEl || !splitRef) {
			// Fallback: just show it without Floating UI
			if (menuEl) menuEl.classList.add('pa-btn-split__menu--open');
			return;
		}

		const { computePosition, flip, shift, offset, autoUpdate } = window.FloatingUIDOM;

		// Set min-width to match the split button container
		menuEl.style.minWidth = `${splitRef.offsetWidth}px`;

		// Start autoUpdate for continuous repositioning on scroll/resize
		cleanupAutoUpdate?.();
		cleanupAutoUpdate = autoUpdate(splitRef, menuEl, async () => {
			if (!menuEl || !splitRef) return;

			const { x, y } = await computePosition(splitRef, menuEl, {
				placement: placement,
				strategy: 'fixed',
				middleware: [
					offset(6),
					flip(),
					shift({ padding: 8 })
				]
			});

			Object.assign(menuEl.style, {
				position: 'fixed',
				left: `${x}px`,
				top: `${y}px`
			});
		});
	}

	function handleToggle(event: MouseEvent) {
		event.stopPropagation();
		if (isOpen) {
			closeMenu();
		} else {
			openMenu();
		}
	}

	function handleMenuClick() {
		closeMenu();
	}

	function handleClickOutside(event: MouseEvent) {
		if (!isOpen) return;
		const target = event.target as Node;
		if (
			splitRef && !splitRef.contains(target) &&
			menuEl && !menuEl.contains(target)
		) {
			closeMenu();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isOpen) {
			closeMenu();
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', handleKeydown);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', handleKeydown);
			cleanupAutoUpdate?.();
			// Ensure menu is returned from body on unmount
			if (menuEl && menuEl.parentElement === document.body) {
				menuEl.remove();
			}
		};
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	bind:this={splitRef}
	class={classes()}
	data-placement={placement !== 'bottom-end' ? placement : undefined}
>
	<button class={btnClasses()} {onclick} {disabled}>
		{#if icon}
			<span class="pa-btn__icon">{@render icon()}</span>
		{/if}
		{@render children?.()}
	</button>
	<button class={toggleClasses()} onclick={handleToggle} {disabled}>
		{#if toggleIcon}
			{@render toggleIcon()}
		{:else}
			<i class="fas {placement === 'top-end' ? 'fa-chevron-up' : 'fa-chevron-down'} text-2xs pa-btn-split__chevron"></i>
		{/if}
	</button>
	{#if menu}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div bind:this={menuEl} class="pa-btn-split__menu" onclick={handleMenuClick}>
			<div class="pa-btn-split__menu-inner">
				{@render menu()}
			</div>
		</div>
	{/if}
</div>
