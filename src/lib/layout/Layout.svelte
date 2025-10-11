<script lang="ts">
	/**
	 * Pure Admin Layout Component (Svelte 5)
	 * Based on @pure-admin/core snippets/layout.html
	 */

	type LayoutSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

	interface Props {
		/** Container width constraint */
		size?: LayoutSize;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { size, class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-layout-container'];
		if (size) base.push(`pa-layout-container--${size}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
