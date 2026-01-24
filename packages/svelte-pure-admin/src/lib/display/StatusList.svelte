<script lang="ts">
	/**
	 * Pure Admin StatusList Component (Svelte 5)
	 * Container for status indicator items
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Children content (StatusListItem components) */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-status-list'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
