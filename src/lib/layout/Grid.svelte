<script lang="ts">
	/**
	 * Pure Admin Grid Component (Svelte 5)
	 * Wrapper for Pure.css grid system (pure-g)
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pure-g'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
