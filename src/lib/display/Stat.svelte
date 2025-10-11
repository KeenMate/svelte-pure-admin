<script lang="ts">
	/**
	 * Pure Admin Stat Component (Svelte 5)
	 * Based on @pure-admin/core scss/core-components/_statistics.scss
	 */

	type StatVariant = 'hero' | 'square';
	type StatColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';
	type ChangeDirection = 'positive' | 'negative' | 'neutral';

	interface Props {
		/** Stat variant */
		variant?: StatVariant;
		/** Color for square variant */
		color?: StatColor;
		/** Icon variant for icon */
		iconVariant?: StatColor;
		/** Number/value to display */
		number?: string | number;
		/** Label text */
		label?: string;
		/** Change percentage (for hero variant) */
		change?: string;
		/** Change direction (for hero variant) */
		changeDirection?: ChangeDirection;
		/** Symbol (for square variant) */
		symbol?: string;
		/** Additional CSS classes */
		class?: string;
		/** Icon snippet (for default variant) */
		icon?: import('svelte').Snippet;
		/** Children content (for custom layouts) */
		children?: import('svelte').Snippet;
	}

	let {
		variant,
		color,
		iconVariant = 'primary',
		number,
		label,
		change,
		changeDirection = 'neutral',
		symbol,
		class: className = '',
		icon,
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-stat'];
		if (variant) base.push(`pa-stat--${variant}`);
		if (variant === 'square' && color) base.push(`pa-stat--${color}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

{#if children}
	<div class={classes()}>
		{@render children()}
	</div>
{:else if variant === 'hero'}
	<div class={classes()}>
		<div class="pa-stat__label">{label}</div>
		<div class="pa-stat__value">{number}</div>
		{#if change}
			<div class="pa-stat__change pa-stat__change--{changeDirection}">{change}</div>
		{/if}
	</div>
{:else if variant === 'square'}
	<div class={classes()}>
		<div class="pa-stat__number">{number}</div>
		{#if symbol}
			<div class="pa-stat__symbol">{symbol}</div>
		{/if}
		<div class="pa-stat__label">{label}</div>
	</div>
{:else}
	<div class={classes()}>
		{#if icon}
			<div class="pa-stat__icon pa-stat__icon--{iconVariant}">
				{@render icon()}
			</div>
		{/if}
		<div class="pa-stat__content">
			<div class="pa-stat__number">{number}</div>
			<div class="pa-stat__label">{label}</div>
		</div>
	</div>
{/if}
