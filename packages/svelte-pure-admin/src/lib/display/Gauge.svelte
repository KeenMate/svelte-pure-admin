<script lang="ts">
	/**
	 * Pure Admin Gauge Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-viz.scss
	 */
	import type { DataVizVariant } from '../types';

	interface Props {
		/** Gauge value (0-100, no % suffix — SCSS calculates degrees) */
		value?: number;
		/** Value text displayed inside the gauge */
		valueText?: string;
		/** Label text displayed below the value */
		labelText?: string;
		/** Min label at left endpoint */
		minText?: string;
		/** Max label at right endpoint */
		maxText?: string;
		/** Color variant */
		variant?: DataVizVariant;
		/** Multi-zone gauge (green/yellow/red bands) — overrides variant */
		isZones?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content (rendered inside the inner area) */
		children?: import('svelte').Snippet;
	}

	let {
		value = 0,
		valueText,
		labelText,
		minText,
		maxText,
		variant,
		isZones = false,
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-gauge'];
		if (isZones) {
			base.push('pa-gauge--zones');
		} else if (variant) {
			base.push(`pa-gauge--${variant}`);
		}
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()} style="--value: {value}">
	<div class="pa-gauge__inner">
		{#if children}
			{@render children()}
		{:else}
			{#if valueText}
				<span class="pa-gauge__value">{valueText}</span>
			{/if}
			{#if labelText}
				<span class="pa-gauge__label">{labelText}</span>
			{/if}
		{/if}
	</div>
	{#if minText}
		<span class="pa-gauge__min">{minText}</span>
	{/if}
	{#if maxText}
		<span class="pa-gauge__max">{maxText}</span>
	{/if}
</div>
