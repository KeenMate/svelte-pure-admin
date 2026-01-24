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
</script>

<form class={className} {...restProps}>
	{@render children?.()}
</form>
