<script lang="ts">
	/**
	 * Pure Admin DefinitionList Component (Svelte 5)
	 * Based on @pure-admin/core snippets/lists.html
	 * For definition lists (dt/dd pairs)
	 */

	interface Props {
		/** Inline layout (horizontal key-value pairs) */
		inline?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Definition items (dt/dd elements) */
		children?: import('svelte').Snippet;
	}

	let { inline = false, class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-list-definition'];

		// Inline modifier
		if (inline) base.push('pa-list-definition--inline');

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});
</script>

<dl class={classes()}>
	{@render children?.()}
</dl>
