<script lang="ts">
	/**
	 * Pure Admin Tooltip Component (Svelte 5)
	 * Based on @pure-admin/core snippets/tooltips.html
	 *
	 * Uses Floating UI for smart positioning with collision detection
	 * Requires: Floating UI (@floating-ui/dom) loaded globally
	 */

	import { onMount } from 'svelte';

	type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';
	type TooltipVariant = 'primary' | 'success' | 'warning' | 'danger';

	interface Props {
		/** Tooltip text */
		text: string;
		/** Tooltip position (default: top) */
		position?: TooltipPosition;
		/** Tooltip color variant */
		variant?: TooltipVariant;
		/** Multiline tooltip (20rem width, left-aligned) */
		multiline?: boolean;
		/** Help cursor (question mark cursor) */
		help?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		text,
		position = 'top',
		variant,
		multiline = false,
		help = false,
		class: className = '',
		children
	}: Props = $props();

	let triggerElement: HTMLSpanElement;
	let tooltipElement: HTMLDivElement | null = null;
	let cleanupAutoUpdate: (() => void) | null = null;

	// Build class string for trigger
	const classes = $derived(() => {
		const base = ['pa-tooltip'];
		if (position && position !== 'top') base.push(`pa-tooltip--${position}`);
		if (variant) base.push(`pa-tooltip--${variant}`);
		if (multiline) base.push('pa-tooltip--multiline');
		if (help) base.push('pa-tooltip--help');
		if (className) base.push(className);
		return base.join(' ');
	});

	function showTooltip() {
		if (!text || typeof window === 'undefined') return;

		// Check if Floating UI is available
		if (!window.FloatingUIDOM) {
			console.warn('Floating UI not loaded. Tooltip positioning may be incorrect.');
			return;
		}

		// Create tooltip element if it doesn't exist
		if (!tooltipElement) {
			tooltipElement = document.createElement('div');
			tooltipElement.className = 'pa-tooltip-floating';
			tooltipElement.style.position = 'absolute';
			tooltipElement.style.top = '0';
			tooltipElement.style.left = '0';
			tooltipElement.style.visibility = 'hidden';
			tooltipElement.style.zIndex = '9000'; // $z-index-tooltip
			if (variant) tooltipElement.classList.add(`pa-tooltip--${variant}`);
			if (multiline) tooltipElement.classList.add('pa-tooltip--multiline');
			document.body.appendChild(tooltipElement);
		}

		tooltipElement.textContent = text;
		tooltipElement.style.visibility = 'visible';

		const { computePosition, flip, shift, offset, autoUpdate } = window.FloatingUIDOM;

		// Position the tooltip
		const updatePosition = async () => {
			if (!tooltipElement) return;

			const { x, y } = await computePosition(triggerElement, tooltipElement, {
				placement: position,
				middleware: [
					offset(8),
					flip(),
					shift({ padding: 5 })
				]
			});

			Object.assign(tooltipElement.style, {
				left: `${x}px`,
				top: `${y}px`
			});
		};

		updatePosition();

		// Auto-update on scroll/resize
		cleanupAutoUpdate = autoUpdate(
			triggerElement,
			tooltipElement,
			updatePosition
		);
	}

	function hideTooltip() {
		if (tooltipElement) {
			tooltipElement.style.visibility = 'hidden';
		}

		// Cleanup auto-update
		if (cleanupAutoUpdate) {
			cleanupAutoUpdate();
			cleanupAutoUpdate = null;
		}
	}

	onMount(() => {
		return () => {
			// Cleanup on unmount
			hideTooltip();
			if (tooltipElement && tooltipElement.parentNode) {
				tooltipElement.parentNode.removeChild(tooltipElement);
				tooltipElement = null;
			}
		};
	});
</script>

<span
	bind:this={triggerElement}
	class={classes()}
	data-tooltip={text}
	onmouseenter={showTooltip}
	onmouseleave={hideTooltip}
	onfocus={showTooltip}
	onblur={hideTooltip}
>
	{@render children?.()}
</span>
