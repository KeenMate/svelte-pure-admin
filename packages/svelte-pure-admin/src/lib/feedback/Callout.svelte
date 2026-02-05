<script lang="ts">
	/**
	 * Pure Admin Callout Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/callouts.html
	 * Documentation-style callouts with left border accent for tips, notes, warnings
	 */

	type CalloutVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
	type CalloutSize = 'sm' | 'lg';

	interface Props {
		/** Callout variant */
		variant?: CalloutVariant;
		/** Callout size */
		size?: CalloutSize;
		/** Callout heading text */
		headingText?: string;
		/** Additional CSS classes */
		class?: string;
		/** Icon snippet (when provided, content is wrapped in pa-callout__content) */
		icon?: import('svelte').Snippet;
		/** Children (callout content) */
		children?: import('svelte').Snippet;
	}

	let {
		variant = 'info',
		size,
		headingText,
		class: className = '',
		icon,
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-callout'];

		// Variant
		base.push(`pa-callout--${variant}`);

		// Size
		if (size) base.push(`pa-callout--${size}`);

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});
</script>

<div class={classes()}>
	{#if icon}
		<!-- Callout with icon -->
		<span class="pa-callout__icon">
			{@render icon()}
		</span>
		<div class="pa-callout__content">
			{#if headingText}
				<div class="pa-callout__heading">{headingText}</div>
			{/if}
			{@render children?.()}
		</div>
	{:else}
		<!-- Simple callout -->
		{#if headingText}
			<div class="pa-callout__heading">{headingText}</div>
		{/if}
		{@render children?.()}
	{/if}
</div>
