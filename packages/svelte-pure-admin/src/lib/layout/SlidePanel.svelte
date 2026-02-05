<script lang="ts">
	/**
	 * SlidePanel - Fixed overlay panel that slides in from the right
	 * Shared behavioral base for overlay panels (escape key, backdrop click, open/close)
	 * Uses pa-detail-panel--overlay CSS classes from @keenmate/pure-admin-core
	 */

	interface Props {
		/** Controls panel visibility */
		show?: boolean;
		/** Called when panel is closed (escape key, backdrop click) */
		onclose?: () => void;
		/** Additional CSS classes */
		class?: string;
		/** Panel content */
		children?: import('svelte').Snippet;
	}

	let {
		show = $bindable(false),
		onclose,
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-detail-panel--overlay'];
		if (show) base.push('pa-detail-panel--open');
		if (className) base.push(className);
		return base.join(' ');
	});

	function handleClose() {
		show = false;
		onclose?.();
	}

	// Escape key: only listen when panel is open
	$effect(() => {
		if (!show) return;

		function handleKeydown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				handleClose();
			}
		}

		document.addEventListener('keydown', handleKeydown);
		return () => document.removeEventListener('keydown', handleKeydown);
	});

	// Scroll lock: prevent body scroll when overlay is open (v1.4.1)
	$effect(() => {
		if (show) {
			document.body.classList.add('pa-scroll-lock');
		} else {
			document.body.classList.remove('pa-scroll-lock');
		}
		return () => document.body.classList.remove('pa-scroll-lock');
	});
</script>

<div class={classes()}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="pa-detail-panel__overlay" onclick={handleClose}></div>
	{@render children?.()}
</div>
