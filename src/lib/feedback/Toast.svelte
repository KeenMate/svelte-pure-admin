<script lang="ts">
	/**
	 * Pure Admin Toast Component (Svelte 5)
	 * Based on @pure-admin/core snippets/toasts.html
	 */

	import { onMount } from 'svelte';

	type ToastVariant = 'primary' | 'success' | 'danger' | 'warning' | 'info';

	interface Props {
		/** Toast variant */
		variant?: ToastVariant;
		/** Toast title */
		title: string;
		/** Toast message */
		message: string;
		/** Show toast */
		show?: boolean;
		/** Auto-dismiss duration (ms), 0 for persistent */
		duration?: number;
		/** Show progress bar */
		showProgress?: boolean;
		/** Icon snippet */
		icon?: import('svelte').Snippet;
		/** Close handler */
		onClose?: () => void;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		variant = 'primary',
		title,
		message,
		show = $bindable(true),
		duration = 5000,
		showProgress = false,
		icon,
		onClose,
		class: className = ''
	}: Props = $props();

	let visible = $state(show);
	let progressWidth = $state(100);

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-toast', `pa-toast--${variant}`];
		if (visible) base.push('pa-toast--show');
		if (className) base.push(className);
		return base.join(' ');
	});

	function handleClose() {
		visible = false;
		show = false;
		if (onClose) onClose();
	}

	onMount(() => {
		if (duration > 0 && !showProgress) {
			// Auto-dismiss without progress bar
			const timer = setTimeout(() => {
				handleClose();
			}, duration);

			return () => clearTimeout(timer);
		} else if (duration > 0 && showProgress) {
			// Auto-dismiss with progress bar animation
			progressWidth = 0;

			const timer = setTimeout(() => {
				handleClose();
			}, duration);

			return () => clearTimeout(timer);
		}
	});

	$effect(() => {
		visible = show;
	});
</script>

<div class={classes()}>
	{#if icon}
		<div class="pa-toast__icon">
			{@render icon()}
		</div>
	{/if}

	<div class="pa-toast__content">
		<div class="pa-toast__title">{title}</div>
		<div class="pa-toast__message">{message}</div>
	</div>

	<button class="pa-toast__close" onclick={handleClose} aria-label="Close">✕</button>

	{#if showProgress && duration > 0}
		<div
			class="pa-toast__progress"
			style="width: {progressWidth}%; transition: width {duration}ms linear;"
		></div>
	{/if}
</div>
