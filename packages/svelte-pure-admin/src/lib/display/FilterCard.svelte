<script lang="ts">
	/**
	 * Pure Admin FilterCard Component (Svelte 5)
	 * Expandable filter card with inline filters and collapsible advanced section
	 * Based on @keenmate/pure-admin-core table-filters pattern
	 */
	import { _ } from '../i18n';
	import Button from '../buttons/Button.svelte';

	interface Props {
		/** Whether advanced filters are expanded */
		isExpanded?: boolean;
		/** Show the expand/collapse toggle button */
		shouldShowToggle?: boolean;
		/** Show the clear all button */
		shouldShowClear?: boolean;
		/** Show the refresh button */
		shouldShowRefresh?: boolean;
		/** Show Apply/Clear buttons in advanced section footer */
		shouldShowAdvancedActions?: boolean;
		/** Disable all filter inputs */
		disabled?: boolean;
		/** Loading state (disables inputs and shows loading indicator) */
		isLoading?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Clear all filters callback */
		onclear?: () => void;
		/** Refresh callback */
		onrefresh?: () => void;
		/** Apply filters callback (for advanced filters) */
		onapply?: () => void;
		/** Toggle expanded callback */
		ontoggle?: (expanded: boolean) => void;
		/** Main inline filters (search inputs, selects, etc.) */
		filters?: import('svelte').Snippet;
		/** Advanced filters section (shown when expanded) */
		advancedFilters?: import('svelte').Snippet;
		/** Custom action buttons (rendered before toggle button) */
		actions?: import('svelte').Snippet;
	}

	let {
		isExpanded = $bindable(false),
		shouldShowToggle = true,
		shouldShowClear = true,
		shouldShowRefresh = true,
		shouldShowAdvancedActions = true,
		disabled = false,
		isLoading = false,
		class: className = '',
		onclear,
		onrefresh,
		onapply,
		ontoggle,
		filters,
		advancedFilters,
		actions
	}: Props = $props();

	function handleToggle() {
		isExpanded = !isExpanded;
		ontoggle?.(isExpanded);
	}

	function handleClear() {
		onclear?.();
	}

	function handleRefresh() {
		onrefresh?.();
	}

	function handleApply() {
		onapply?.();
	}

	function handleClearAdvanced() {
		onclear?.();
	}

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-card', 'pa-filter-card'];
		if (isLoading) base.push('pa-filter-card--loading');
		if (disabled) base.push('pa-filter-card--disabled');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Has advanced filters
	const hasAdvanced = $derived(!!advancedFilters);
</script>

<div class={classes()}>
	<div class="pa-card__body">
		<!-- Main filter row -->
		<div class="pa-filter-card__row">
			{#if filters}
				<div class="pa-filter-card__filters">
					{@render filters()}
				</div>
			{/if}

			<!-- Action buttons: toggle (left), clear, refresh (right) -->
			<div class="pa-filter-card__actions">
				{#if shouldShowToggle && hasAdvanced}
					<Button
						variant="primary"
						isIconOnly
						titleText={isExpanded ? $_('pureAdmin.common.buttons.hideFilters') : $_('pureAdmin.common.buttons.moreFilters')}
						onclick={handleToggle}
						{disabled}
					>
						{#snippet icon()}<i class="fa" class:fa-chevron-up={isExpanded} class:fa-chevron-down={!isExpanded}></i>{/snippet}
					</Button>
				{/if}

				{#if actions}
					{@render actions()}
				{/if}

				{#if shouldShowClear}
					<Button
						variant="secondary"
						isIconOnly
						titleText={$_('pureAdmin.common.buttons.clearAll')}
						onclick={handleClear}
						{disabled}
					>
						{#snippet icon()}<i class="fa fa-times"></i>{/snippet}
					</Button>
				{/if}

				{#if shouldShowRefresh}
					<Button
						variant="primary"
						isIconOnly
						titleText={$_('pureAdmin.common.buttons.refresh')}
						onclick={handleRefresh}
						disabled={disabled || isLoading}
					>
						{#snippet icon()}<i class="fa fa-sync-alt" class:fa-spin={isLoading}></i>{/snippet}
					</Button>
				{/if}
			</div>
		</div>

		<!-- Advanced filters (collapsible) -->
		{#if hasAdvanced && isExpanded}
			<div class="pa-filter-card__advanced">
				{@render advancedFilters?.()}

				{#if shouldShowAdvancedActions}
					<div class="pa-filter-card__advanced-actions">
						<Button variant="secondary" onclick={handleClearAdvanced} {disabled}>
							{$_('pureAdmin.common.buttons.clearFilters')}
						</Button>
						<Button variant="primary" onclick={handleApply} disabled={disabled || isLoading}>
							{$_('pureAdmin.common.buttons.applyFilters')}
						</Button>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.pa-filter-card__row {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		flex-wrap: wrap;
	}

	.pa-filter-card__filters {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		flex-wrap: wrap;
		flex: 1;
		min-width: 0;
	}

	.pa-filter-card__actions {
		display: flex;
		gap: 0.25rem;
		align-items: center;
		flex-shrink: 0;
	}

	.pa-filter-card__advanced {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid var(--pa-border-color, #e2e8f0);
	}

	.pa-filter-card__advanced-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.pa-filter-card--loading {
		opacity: 0.7;
		pointer-events: none;
	}

	.pa-filter-card--disabled {
		opacity: 0.5;
		pointer-events: none;
	}
</style>
