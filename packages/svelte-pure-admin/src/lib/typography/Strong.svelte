<script lang="ts">
	/**
	 * Pure Admin Strong Component (Svelte 5)
	 * For bold/strong text emphasis
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();
</script>

<strong class={className || undefined}>
	{@render children?.()}
</strong>
