<script lang="ts">
	/**
	 * Pure Admin Toast Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/toasts.html
	 */

	import { onMount } from 'svelte';
	import { _ } from '../i18n';

	type ToastVariant = 'primary' | 'success' | 'danger' | 'warning' | 'info';

	interface Props {
		/** Toast variant */
		variant?: ToastVariant;
		/** Toast title text */
		titleText: string;
		/** Toast message text */
		messageText: string;
		/** Show toast */
		show?: boolean;
		/** Auto-dismiss duration (ms), 0 for persistent */
		duration?: number;
		/** Show progress bar */
		shouldShowProgress?: boolean;
		/** Icon snippet */
		icon?: import('svelte').Snippet;
		/** Close callback */
		onclose?: () => void;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		variant = 'primary',
		titleText,
		messageText,
		show = $bindable(true),
		duration = 5000,
		shouldShowProgress = false,
		icon,
		onclose,
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
		if (onclose) onclose();
	}

	onMount(() => {
		if (duration > 0 && !shouldShowProgress) {
			// Auto-dismiss without progress bar
			const timer = setTimeout(() => {
				handleClose();
			}, duration);

			return () => clearTimeout(timer);
		} else if (duration > 0 && shouldShowProgress) {
			// Auto-dismiss with progress bar animation
			// Delay setting to 0 so browser paints the initial 100% first
			const frame = requestAnimationFrame(() => {
				progressWidth = 0;
			});

			const timer = setTimeout(() => {
				handleClose();
			}, duration);

			return () => {
				cancelAnimationFrame(frame);
				clearTimeout(timer);
			};
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
		<div class="pa-toast__title">{titleText}</div>
		<div class="pa-toast__message">{messageText}</div>
	</div>

	<button class="pa-toast__close" onclick={handleClose} aria-label={$_('pureAdmin.buttons.close')}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>

	{#if shouldShowProgress && duration > 0}
		<div
			class="pa-toast__progress"
			style="width: {progressWidth}%; transition: width {duration}ms linear;"
		></div>
	{/if}
</div>
