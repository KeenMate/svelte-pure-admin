<script lang="ts">
	/**
	 * Pure Admin Accent Grid Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-display.scss
	 *
	 * Responsive grid of items with color-coded left borders.
	 * Good for status-heavy panels and dashboards.
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** AccentGridItem children */
		children?: import('svelte').Snippet;
	}

	let {
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-accent-grid'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
