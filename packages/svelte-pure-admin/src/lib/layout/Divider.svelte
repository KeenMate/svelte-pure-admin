<script lang="ts">
	/**
	 * Pure Admin Divider Component (Svelte 5)
	 * Horizontal rule / separator
	 */

	interface Props {
		/** Margin classes (e.g., "my-4") */
		spacing?: string;
		/** Additional CSS classes */
		class?: string;
	}

	let { spacing, class: className = '' }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base: string[] = [];
		if (spacing) base.push(spacing);
		if (className) base.push(className);
		return base.length > 0 ? base.join(' ') : undefined;
	});
</script>

<hr class={classes()} />
