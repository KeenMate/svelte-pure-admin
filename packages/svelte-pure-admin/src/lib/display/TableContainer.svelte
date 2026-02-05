<script lang="ts">
	/**
	 * Pure Admin TableContainer Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core v1.3.0
	 *
	 * A container for tables with optional panel styling:
	 * - Base: overflow-x scroll, border, border-radius
	 * - Panel: card-like shadow, larger border-radius, hover effect
	 */

	interface Props {
		/** Panel modifier - card-like visual containment */
		isPanel?: boolean;
		/** Title text (only shown when panel=true) */
		titleText?: string;
		/** Additional CSS classes */
		class?: string;
		/** Header snippet (replaces title, only shown when panel=true) */
		header?: import('svelte').Snippet;
		/** Actions in header (only shown when panel=true) */
		actions?: import('svelte').Snippet;
		/** Table content */
		children?: import('svelte').Snippet;
	}

	let {
		isPanel = false,
		titleText,
		class: className = '',
		header,
		actions,
		children
	}: Props = $props();

	// Build main container class string
	const classes = $derived(() => {
		const base = ['pa-table-container'];
		if (isPanel) base.push('pa-table-container--panel');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Determine if we should show header (only in panel mode)
	const hasHeader = $derived(isPanel && (header || titleText || actions));
</script>

<div class={classes()}>
	{#if hasHeader}
		<div class="pa-table-container__header">
			{#if header}
				{@render header()}
			{:else}
				{#if titleText}
					<div class="pa-table-container__title">{titleText}</div>
				{/if}
				{#if actions}
					<div class="pa-table-container__actions">
						{@render actions()}
					</div>
				{/if}
			{/if}
		</div>
	{/if}

	{@render children?.()}
</div>
