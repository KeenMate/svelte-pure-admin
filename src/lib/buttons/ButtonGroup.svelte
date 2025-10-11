<script lang="ts">
	/**
	 * Pure Admin ButtonGroup Component (Svelte 5)
	 * Based on @pure-admin/core snippets/buttons.html
	 */

	interface Props {
		/** Vertical orientation */
		vertical?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { vertical = false, class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-btn-group'];
		if (vertical) base.push('pa-btn-group--vertical');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
