<script lang="ts">
	/**
	 * Pure Admin Content/Main Component (Svelte 5)
	 * Based on @pure-admin/core snippets/layout.html
	 */

	interface Props {
		/** Use inner wrapper */
		useInner?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Additional CSS classes for inner wrapper */
		innerClass?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		useInner = true,
		class: className = '',
		innerClass = '',
		children
	}: Props = $props();

	// Build class string for main content
	const classes = $derived(() => {
		const base = ['pa-layout__main'];
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build class string for inner wrapper
	const innerClasses = $derived(() => {
		const base = ['pa-layout__main__inner'];
		if (innerClass) base.push(innerClass);
		return base.join(' ');
	});
</script>

<main class={classes()}>
	{#if useInner}
		<div class={innerClasses()}>
			{@render children?.()}
		</div>
	{:else}
		{@render children?.()}
	{/if}
</main>
