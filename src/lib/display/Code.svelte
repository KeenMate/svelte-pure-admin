<script lang="ts">
	/**
	 * Pure Admin Code Component (Svelte 5)
	 * Based on @pure-admin/core snippets/code.html
	 * For inline code elements
	 */

	interface Props {
		/** Code text */
		children?: import('svelte').Snippet;
		/** Additional CSS classes */
		class?: string;
		language?: string
	}

	let { children, class: className = '', language = undefined }: Props = $props();
</script>

<code class={className}>
	{@render children?.()}
</code>
