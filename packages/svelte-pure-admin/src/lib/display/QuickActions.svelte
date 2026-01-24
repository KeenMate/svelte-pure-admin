<script lang="ts">
	/**
	 * Pure Admin QuickActions Component (Svelte 5)
	 * Container for vertically stacked action buttons
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Children content (Button components) */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-quick-actions'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
