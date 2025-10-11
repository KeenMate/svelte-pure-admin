<script lang="ts">
	/**
	 * Pure Admin FormLabel Component (Svelte 5)
	 * Based on @pure-admin/core snippets/forms.html
	 */

	interface Props {
		/** Input ID for label */
		for?: string;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { for: htmlFor, class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-form-label'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<label for={htmlFor} class={classes()}>
	{@render children?.()}
</label>
