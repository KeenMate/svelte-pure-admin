<script lang="ts">
	/**
	 * Pure Admin Paragraph Component (Svelte 5)
	 * Simple paragraph wrapper
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();
</script>

<p class={className}>
	{@render children?.()}
</p>
