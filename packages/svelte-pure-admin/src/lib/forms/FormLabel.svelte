<script lang="ts">
	/**
	 * Pure Admin FormLabel Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/forms.html
	 */

	interface Props {
		/** Input ID for label */
		for?: string;
		/** Mark as required (adds asterisk indicator) */
		required?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { for: htmlFor, required = false, class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-form-label'];
		if (required) base.push('pa-form-label--required');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<label for={htmlFor} class={classes()}>
	{@render children?.()}
</label>
