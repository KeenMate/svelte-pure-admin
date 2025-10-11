<script lang="ts">
	/**
	 * Pure Admin Timeline Component (Svelte 5)
	 * Based on @pure-admin/core snippets/timeline.html
	 * Container for timeline items - supports simple, alternating, and feed variants
	 */

	type TimelineVariant = 'simple' | 'alternating' | 'feed';

	interface Props {
		/** Timeline variant */
		variant?: TimelineVariant;
		/** Additional CSS classes */
		class?: string;
		/** Timeline items */
		children?: import('svelte').Snippet;
	}

	let { variant = 'simple', class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-timeline'];

		// Variant
		if (variant !== 'simple') {
			base.push(`pa-timeline--${variant}`);
		}

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});
</script>

<ul class={classes()}>
	{@render children?.()}
</ul>
