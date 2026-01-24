<script lang="ts">
	/**
	 * Pure Admin Em Component (Svelte 5)
	 * For italic/emphasized text
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();
</script>

<em class={className || undefined}>
	{@render children?.()}
</em>
