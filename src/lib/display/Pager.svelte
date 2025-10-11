<script lang="ts">
	/**
	 * Pure Admin Pager Component (Svelte 5)
	 * Based on @pure-admin/core snippets/tables.html
	 * Pagination component for tables
	 */

	type PagerAlign = 'left' | 'center' | 'right';

	interface Props {
		/** Current page number */
		currentPage?: number;
		/** Total number of pages */
		totalPages?: number;
		/** Alignment (default: center) */
		align?: PagerAlign;
		/** Show page input */
		showPageInput?: boolean;
		/** Show info text */
		showInfo?: boolean;
		/** Previous button click handler */
		onPrevious?: (event: MouseEvent) => void;
		/** Next button click handler */
		onNext?: (event: MouseEvent) => void;
		/** Page change handler (from input) */
		onPageChange?: (page: number) => void;
		/** First button click handler */
		onFirst?: (event: MouseEvent) => void;
		/** Last button click handler */
		onLast?: (event: MouseEvent) => void;
		/** Disable previous button */
		disablePrevious?: boolean;
		/** Disable next button */
		disableNext?: boolean;
		/** Custom info text */
		infoText?: string;
		/** Additional CSS classes */
		class?: string;
		/** Custom controls (buttons) snippet */
		controls?: import('svelte').Snippet;
		/** Custom info snippet */
		info?: import('svelte').Snippet;
	}

	let {
		currentPage = $bindable(1),
		totalPages = 1,
		align = 'center',
		showPageInput = true,
		showInfo = true,
		onPrevious,
		onNext,
		onPageChange,
		onFirst,
		onLast,
		disablePrevious = false,
		disableNext = false,
		infoText,
		class: className = '',
		controls,
		info
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-pager'];
		if (align === 'left') base.push('pa-pager--left');
		if (align === 'right') base.push('pa-pager--right');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Handle page input change
	function handlePageInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const page = parseInt(target.value, 10);
		if (!isNaN(page) && page >= 1 && page <= totalPages) {
			currentPage = page;
			if (onPageChange) onPageChange(page);
		} else {
			// Reset to current page if invalid
			target.value = currentPage.toString();
		}
	}
</script>

<div class={classes()}>
	<div class="pa-pager__container">
		{#if controls}
			{@render controls()}
		{:else}
			<div class="pa-pager__controls">
				{#if onFirst}
					<button class="pa-btn pa-btn--sm pa-btn--secondary" onclick={onFirst} disabled={disablePrevious}>
						« First
					</button>
				{/if}
				<button class="pa-btn pa-btn--sm pa-btn--secondary" onclick={onPrevious} disabled={disablePrevious}>
					‹ Previous
				</button>
				<button class="pa-btn pa-btn--sm pa-btn--secondary" onclick={onNext} disabled={disableNext}>
					Next ›
				</button>
				{#if onLast}
					<button class="pa-btn pa-btn--sm pa-btn--secondary" onclick={onLast} disabled={disableNext}>
						Last »
					</button>
				{/if}
			</div>
		{/if}

		{#if info}
			{@render info()}
		{:else if showInfo && showPageInput}
			<div class="pa-pager__info">
				<span class="pa-pager__text">Page</span>
				<input
					type="number"
					class="pa-input pa-input--sm pa-pager__input"
					value={currentPage}
					min="1"
					max={totalPages}
					onchange={handlePageInput}
				/>
				<span class="pa-pager__text">of {totalPages}</span>
			</div>
		{:else if infoText}
			<span class="pa-pager__text">{infoText}</span>
		{/if}
	</div>
</div>
