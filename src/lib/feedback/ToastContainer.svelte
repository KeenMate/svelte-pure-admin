<script lang="ts">
	/**
	 * Pure Admin ToastContainer Component (Svelte 5)
	 * Based on @pure-admin/core snippets/toasts.html
	 */

	type ToastPosition =
		| 'top-right'
		| 'top-center'
		| 'top-left'
		| 'bottom-right'
		| 'bottom-center'
		| 'bottom-left';

	interface Props {
		/** Container position */
		position?: ToastPosition;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { position = 'top-right', class: className = '', children }: Props = $props();

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
