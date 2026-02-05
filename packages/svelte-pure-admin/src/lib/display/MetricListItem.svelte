<script lang="ts">
	/**
	 * Pure Admin MetricListItem Component (Svelte 5)
	 * Individual metric item with label and value
	 */

	interface Props {
		/** Label text */
		labelText: string;
		/** Value text */
		valueText: string | number;
		/** Additional CSS classes */
		class?: string;
	}

	let { labelText, valueText, class: className = '' }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-metric-list__item'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	<div class="pa-metric-list__label">{labelText}</div>
	<div class="pa-metric-list__value">{valueText}</div>
</div>
