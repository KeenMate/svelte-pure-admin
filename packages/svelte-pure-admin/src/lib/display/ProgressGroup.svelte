<script lang="ts">
	/**
	 * Pure Admin ProgressGroup Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-viz.scss
	 *
	 * Wraps any bar child (Progress, StackedBar, etc.) with a label row.
	 */

	interface Props {
		/** Label text */
		labelText?: string;
		/** Value text (displayed on the right side) */
		valueText?: string;
		/** Additional CSS classes */
		class?: string;
		/** Children content (bar component) */
		children?: import('svelte').Snippet;
	}

	let {
		labelText,
		valueText,
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-progress-group'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{#if labelText || valueText}
		<div class="pa-progress__label">
			{#if labelText}
				<span>{labelText}</span>
			{/if}
			{#if valueText}
				<span class="pa-progress__label-value">{valueText}</span>
			{/if}
		</div>
	{/if}
	{@render children?.()}
</div>
