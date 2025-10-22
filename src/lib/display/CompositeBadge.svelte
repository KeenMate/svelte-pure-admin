<script lang="ts">
	/**
	 * Pure Admin CompositeBadge Component (Svelte 5)
	 * Based on @pure-admin/core snippets/badges.html
	 */

	import type { BadgeVariant } from './badge-types';

	interface Props {
		/** Badge variant (main background) */
		variant?: BadgeVariant;
		/** Label section variant (for mixed colors) */
		labelVariant?: BadgeVariant;
		/** Button section variant (for mixed colors) */
		buttonVariant?: BadgeVariant;
		/** Icon snippet */
		icon?: import('svelte').Snippet;
		/** Label text */
		label: string;
		/** Button/count text */
		buttonText: string | number;
		/** Make button interactive (renders as button element) */
		interactive?: boolean;
		/** Button click handler */
		onButtonClick?: (event: MouseEvent) => void;
		/** Label click handler */
		onLabelClick?: (event: MouseEvent) => void;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		variant = 'primary',
		labelVariant,
		buttonVariant,
		icon,
		label,
		buttonText,
		interactive = false,
		onButtonClick,
		onLabelClick,
		class: className = ''
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-composite-badge', `pa-composite-badge--${variant}`];
		if (labelVariant) base.push(`pa-composite-badge--label-${labelVariant}`);
		if (buttonVariant) base.push(`pa-composite-badge--btn-${buttonVariant}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{#if icon}
		<span class="pa-composite-badge__icon">
			{@render icon()}
		</span>
	{/if}
	<span class="pa-composite-badge__label" onclick={onLabelClick}>{label}</span>
	{#if interactive}
		<button class="pa-composite-badge__button" onclick={onButtonClick}>
			{buttonText}
		</button>
	{:else}
		<span class="pa-composite-badge__button">{buttonText}</span>
	{/if}
</div>
