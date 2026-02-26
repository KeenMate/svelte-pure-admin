<script lang="ts">
	/**
	 * Pure Admin Form Component (Svelte 5)
	 * Standard HTML form wrapper with all native attributes and events
	 */

	import type { HTMLFormAttributes } from 'svelte/elements';

	interface Props extends HTMLFormAttributes {
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		children,
		class: className,
		...restProps
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-form'];
		if (className) base.push(className as string);
		return base.join(' ');
	});
</script>

<form class={classes()} {...restProps}>
	{@render children?.()}
</form>
