<script lang="ts">
	/**
	 * Pure Admin Layout Component (Svelte 5)
	 * Based on @pure-admin/core snippets/layout.html
	 *
	 * NOTE: Width constraints are applied via body classes (pa-container-sm/md/lg/xl/2xl),
	 * not on this component. This component only provides the .pa-layout wrapper.
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
		const base = ['pa-layout'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
