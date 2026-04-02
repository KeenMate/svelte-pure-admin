<script lang="ts">
	/**
	 * Pure Admin ToastContainer Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/toasts.html
	 *
	 * Width ratchet: min-width increases to match the widest toast shown,
	 * preventing width shimmer when toasts of different widths appear.
	 * Resets when the container becomes empty.
	 */

	type ToastPosition =
		| 'top-end'
		| 'top-center'
		| 'top-start'
		| 'bottom-end'
		| 'bottom-center'
		| 'bottom-start';

	interface Props {
		/** Container position (logical, RTL-aware). Default: 'top-end' */
		position?: ToastPosition;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { position = 'top-end', class: className = '', children }: Props = $props();

	let containerRef = $state<HTMLDivElement>();
	let peakWidth = 0;
	let observer: MutationObserver | undefined;

	function updateWidth() {
		if (!containerRef) return;

		const toasts = containerRef.querySelectorAll('.pa-toast');
		if (toasts.length === 0) {
			// Reset when empty
			peakWidth = 0;
			containerRef.style.removeProperty('min-width');
			return;
		}

		const currentWidth = containerRef.offsetWidth;
		if (currentWidth > peakWidth) {
			peakWidth = currentWidth;
			containerRef.style.minWidth = peakWidth + 'px';
		}
	}

	$effect(() => {
		if (!containerRef) return;

		// Observe child additions/removals to track width
		observer = new MutationObserver(updateWidth);
		observer.observe(containerRef, { childList: true, subtree: true });

		return () => {
			observer?.disconnect();
		};
	});

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-toast-container', `pa-toast-container--${position}`];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div bind:this={containerRef} class={classes()}>
	{@render children?.()}
</div>
