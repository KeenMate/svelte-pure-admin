<script lang="ts">
	/**
	 * Pure Admin Split Button Menu Item (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/buttons.html
	 */

	interface Props {
		/** Danger variant for destructive actions */
		isDanger?: boolean;
		/** Disabled state */
		disabled?: boolean;
		/** Click handler */
		onclick?: (event: MouseEvent) => void;
		/** Additional CSS classes */
		class?: string;
		/** Icon snippet — renders inside pa-btn-split__item-icon */
		icon?: import('svelte').Snippet;
		/** Action snippet — when provided, wraps item in pa-btn-split__item-row */
		action?: import('svelte').Snippet;
		/** Item content */
		children?: import('svelte').Snippet;
	}

	let {
		isDanger = false,
		disabled = false,
		onclick,
		class: className = '',
		icon,
		action,
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-btn-split__item'];
		if (isDanger) base.push('pa-btn-split__item--danger');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

{#if action}
	<div class="pa-btn-split__item-row">
		<button class={classes()} {onclick} {disabled}>
			{#if icon}
				<span class="pa-btn-split__item-icon">{@render icon()}</span>
			{/if}
			{@render children?.()}
		</button>
		{@render action()}
	</div>
{:else}
	<button class={classes()} {onclick} {disabled}>
		{#if icon}
			<span class="pa-btn-split__item-icon">{@render icon()}</span>
		{/if}
		{@render children?.()}
	</button>
{/if}
