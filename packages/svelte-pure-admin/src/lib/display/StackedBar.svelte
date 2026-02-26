<script lang="ts">
	/**
	 * Pure Admin StackedBar Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-viz.scss
	 */

	interface Props {
		/** Size variant */
		size?: 'sm' | 'lg';
		/** Pill shape */
		isRounded?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** StackedBarSegment children */
		children?: import('svelte').Snippet;
	}

	let {
		size,
		isRounded = false,
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-stacked-bar'];
		if (size) base.push(`pa-stacked-bar--${size}`);
		if (isRounded) base.push('pa-stacked-bar--rounded');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
