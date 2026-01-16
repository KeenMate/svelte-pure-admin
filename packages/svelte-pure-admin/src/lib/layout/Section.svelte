<script lang="ts">
	/**
	 * Pure Admin Section Component (Svelte 5)
	 * Container for page sections with spacing and optional title
	 */

	interface Props {
		/** Section title */
		title?: string;
		/** Additional CSS classes */
		class?: string;
		/** Section content */
		children?: import('svelte').Snippet;
	}

	let { title, class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-section'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{#if title}
		<h3>{title}</h3>
	{/if}
	{@render children?.()}
</div>
