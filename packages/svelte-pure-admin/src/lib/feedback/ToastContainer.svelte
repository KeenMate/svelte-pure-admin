<script lang="ts">
	/**
	 * Pure Admin ToastContainer Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/toasts.html
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

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-toast-container', `pa-toast-container--${position}`];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
