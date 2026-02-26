<script lang="ts">
	/**
	 * Pure Admin BarListItem Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-viz.scss
	 */

	interface Props {
		/** Label text */
		labelText?: string;
		/** Value text */
		valueText?: string;
		/** Bar fill percentage (0-100) */
		value?: number;
		/** Additional CSS classes */
		class?: string;
		/** Children content (rendered inside the header area) */
		children?: import('svelte').Snippet;
	}

	let {
		labelText,
		valueText,
		value = 0,
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-bar-list__item'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	<div class="pa-bar-list__header">
		{#if children}
			{@render children()}
		{:else}
			{#if labelText}
				<span class="pa-bar-list__label">{labelText}</span>
			{/if}
			{#if valueText}
				<span class="pa-bar-list__value">{valueText}</span>
			{/if}
		{/if}
	</div>
	<div class="pa-bar-list__bar" style="--value: {value}%"></div>
</div>
