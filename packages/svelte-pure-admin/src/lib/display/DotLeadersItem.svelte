<script lang="ts">
	/**
	 * Pure Admin Dot Leaders Item Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-display.scss
	 *
	 * Single row in DotLeaders: label ... value
	 */

	interface Props {
		/** Label text */
		labelText: string;
		/** Value text (simple mode) */
		valueText?: string;
		/** Total row (bold, top border) — for grand totals / summaries */
		isTotal?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Complex value content (snippet) — renders inside the value span */
		children?: import('svelte').Snippet;
	}

	let {
		labelText,
		valueText,
		isTotal = false,
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-dot-leaders__item'];
		if (isTotal) base.push('pa-dot-leaders__item--total');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	<span class="pa-dot-leaders__label">{labelText}</span>
	<span class="pa-dot-leaders__leader"></span>
	<span class="pa-dot-leaders__value">
		{#if children}
			{@render children()}
		{:else if valueText !== undefined}
			{valueText}
		{/if}
	</span>
</div>
