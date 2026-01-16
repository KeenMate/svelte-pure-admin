<script lang="ts">
	/**
	 * Pure Admin InputGroupPrepend Component (Svelte 5)
	 * Based on actual pure-admin-visual implementation
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
		const base = ['pa-input-group__prepend'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<span class={classes()}>
	{@render children?.()}
</span>
