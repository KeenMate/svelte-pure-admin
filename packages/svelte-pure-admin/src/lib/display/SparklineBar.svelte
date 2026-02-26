<script lang="ts">
	/**
	 * Pure Admin SparklineBar Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-viz.scss
	 */

	interface Props {
		/** Bar height as percentage (0-100) */
		value?: number;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		value = 0,
		class: className = ''
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-sparkline__bar'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()} style="--value: {value}%"></div>
