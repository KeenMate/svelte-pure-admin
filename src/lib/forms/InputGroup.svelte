<script lang="ts">
	/**
	 * Pure Admin InputGroup Component (Svelte 5)
	 * Based on @pure-admin/core snippets/forms.html
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-input-group'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
