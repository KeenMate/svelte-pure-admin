<script lang="ts">
	/**
	 * Pure Admin Heading Component (Svelte 5)
	 * Semantic heading with support for h1-h6 levels
	 */

	type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

	interface Props {
		/** Heading level (1-6) */
		level?: HeadingLevel;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { level = 2, class: className = '', children }: Props = $props();
</script>

{#if level === 1}
	<h1 class={className}>{@render children?.()}</h1>
{:else if level === 2}
	<h2 class={className}>{@render children?.()}</h2>
{:else if level === 3}
	<h3 class={className}>{@render children?.()}</h3>
{:else if level === 4}
	<h4 class={className}>{@render children?.()}</h4>
{:else if level === 5}
	<h5 class={className}>{@render children?.()}</h5>
{:else if level === 6}
	<h6 class={className}>{@render children?.()}</h6>
{/if}
