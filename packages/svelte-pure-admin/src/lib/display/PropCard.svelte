<script lang="ts">
	/**
	 * Pure Admin Property Card Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-display.scss
	 *
	 * Bordered card with optional header and thin-divider rows.
	 * Stripe-style grouped properties.
	 */

	interface Props {
		/** Header title text */
		headerText?: string;
		/** Additional CSS classes */
		class?: string;
		/** PropCardRow children */
		children?: import('svelte').Snippet;
	}

	let {
		headerText,
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-prop-card'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{#if headerText}
		<div class="pa-prop-card__header">{headerText}</div>
	{/if}
	{@render children?.()}
</div>
