<script lang="ts">
	/**
	 * Pure Admin Layout Inner Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/layout.html
	 *
	 * Wrapper for Sidebar + Content area
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
		const base = ['pc-layout__inner'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
