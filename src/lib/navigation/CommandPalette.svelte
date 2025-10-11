<script lang="ts">
	/**
	 * Pure Admin CommandPalette Component (Svelte 5)
	 * Based on @pure-admin/core snippets/command-palette.html
	 * macOS Spotlight-style global search component
	 */

	import { onMount } from 'svelte';

	interface CommandPaletteResult {
		id: string;
		icon?: string;
		title: string;
		meta?: string;
		badge?: string;
	}

	interface Props {
		/** Show palette */
		show?: boolean;
		/** Search query */
		query?: string;
		/** Search results */
		results?: CommandPaletteResult[];
		/** Loading state */
		loading?: boolean;
		/** Current page (for pagination) */
		currentPage?: number;
		/** Total pages (for pagination) */
		totalPages?: number;
		/** Total results count */
		totalResults?: number;
		/** Context label (e.g., "Products", "Orders") */
		context?: string;
		/** Empty state message */
		emptyMessage?: string;
		/** Placeholder text */
		placeholder?: string;
		/** Search handler */
		onSearch?: (query: string, context?: string) => void;
		/** Select handler */
		onSelect?: (result: CommandPaletteResult) => void;
		/** Close handler */
		onClose?: () => void;
		/** Page change handler */
		onPageChange?: (page: number) => void;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		show = $bindable(false),
		query = $bindable(''),
		results = [],
		loading = false,
		currentPage = 1,
		totalPages = 1,
		totalResults = 0,
		context = "",
		emptyMessage = 'Type to search or use /p for products, /o for orders, /u for users, /i for invoices',
		placeholder = 'Search products, orders, users... (try /p, /o, /u)',
		onSearch,
		onSelect,
		onClose,
		onPageChange,
		class: className = ''
	}: Props = $props();

	let inputRef = $state<HTMLInputElement>();
	let activeIndex = $state(0);

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-command-palette'];
		if (show) base.push('pa-command-palette--active');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Context class
	const contextClasses = $derived(() => {
		const base = ['pa-command-palette__context'];
		if (context) base.push('pa-command-palette__context--visible');
		return base.join(' ');
	});

	// Results class
	const resultsClasses = $derived(() => {
		const base = ['pa-command-palette__results'];
		if (loading) base.push('pa-command-palette__results--loading');
		return base.join(' ');
	});

	// Detect context prefix
	function detectContext(value: string) {
		const contextMap: Record<string, string> = {
			'/p': 'Products',
			'/o': 'Orders',
			'/u': 'Users',
			'/i': 'Invoices'
		};

		for (const [prefix, contextName] of Object.entries(contextMap)) {
			if (value.startsWith(prefix + ' ')) {
				return contextName;
			}
		}
		return '';
	}

	// Handle input
	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		query = target.value;

		// Detect context
		context = detectContext(query);

		// Trigger search
		if (onSearch) {
			const searchQuery = context ? query.substring(3) : query; // Remove prefix
			onSearch(searchQuery, context);
		}

		// Reset active index
		activeIndex = 0;
	}

	// Handle keyboard navigation
	function handleKeyDown(event: KeyboardEvent) {
		if (!show) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				activeIndex = Math.min(activeIndex + 1, results.length - 1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				activeIndex = Math.max(activeIndex - 1, 0);
				break;
			case 'ArrowRight':
				event.preventDefault();
				if (currentPage < totalPages && onPageChange) {
					onPageChange(currentPage + 1);
				}
				break;
			case 'ArrowLeft':
				event.preventDefault();
				if (currentPage > 1 && onPageChange) {
					onPageChange(currentPage - 1);
				}
				break;
			case 'Enter':
				event.preventDefault();
				if (results[activeIndex] && onSelect) {
					onSelect(results[activeIndex]);
					handleClose();
				}
				break;
			case 'Escape':
				event.preventDefault();
				handleClose();
				break;
		}
	}

	// Handle close
	function handleClose() {
		show = false;
		query = '';
		context = '';
		activeIndex = 0;
		if (onClose) onClose();
	}

	// Handle backdrop click
	function handleBackdropClick() {
		handleClose();
	}

	// Handle result click
	function handleResultClick(result: CommandPaletteResult) {
		if (onSelect) {
			onSelect(result);
		}
		handleClose();
	}

	// Focus input when shown
	$effect(() => {
		if (show && inputRef) {
			inputRef.focus();
		}
	});

	// Register keyboard shortcut (Ctrl+K / Cmd+K)
	onMount(() => {
		function handleGlobalKeyDown(event: KeyboardEvent) {
			if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
				event.preventDefault();
				show = !show;
			}
		}

		document.addEventListener('keydown', handleGlobalKeyDown);

		return () => {
			document.removeEventListener('keydown', handleGlobalKeyDown);
		};
	});
</script>

<svelte:window onkeydown={handleKeyDown} />

<div class={classes()}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="pa-command-palette__backdrop" onclick={handleBackdropClick}></div>

	<div class="pa-command-palette__container">
		<!-- Search input -->
		<div class="pa-command-palette__search">
			<input
				bind:this={inputRef}
				type="text"
				class="pa-command-palette__input"
				{placeholder}
				autocomplete="off"
				spellcheck="false"
				value={query}
				oninput={handleInput}
			/>
			<!-- Context label -->
			<div class={contextClasses()}>
				{#if context}
					Searching in {context}
				{/if}
			</div>
		</div>

		<!-- Results container -->
		<div class={resultsClasses()}>
			{#if loading}
				<!-- Loading state -->
				<div class="pa-command-palette__loader">
					<div class="pa-spinner pa-spinner--sm pa-spinner--primary"></div>
					<span>Searching...</span>
				</div>
			{:else if results.length === 0}
				<!-- Empty state -->
				<div class="pa-command-palette__empty">
					{emptyMessage}
				</div>
			{:else}
				<!-- Results -->
				{#each results as result, index (result.id)}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="pa-command-palette__item {activeIndex === index
							? 'pa-command-palette__item--active'
							: ''}"
						onclick={() => handleResultClick(result)}
					>
						{#if result.icon}
							<div class="pa-command-palette__item-icon">{result.icon}</div>
						{/if}
						<div class="pa-command-palette__item-content">
							<div class="pa-command-palette__item-title">{@html result.title}</div>
							{#if result.meta}
								<div class="pa-command-palette__item-meta">{result.meta}</div>
							{/if}
						</div>
						{#if result.badge}
							<div class="pa-command-palette__item-badge">{result.badge}</div>
						{/if}
					</div>
				{/each}

				<!-- Pagination -->
				{#if totalPages > 1}
					<div class="pa-command-palette__pagination">
						Page {currentPage} of {totalPages} • {totalResults} results
					</div>
				{/if}
			{/if}
		</div>

		<!-- Footer with keyboard hints -->
		<div class="pa-command-palette__footer">
			<div class="pa-command-palette__hint">
				<span class="pa-command-palette__key">↑↓</span>
				<span>Navigate</span>
			</div>
			{#if totalPages > 1}
				<div class="pa-command-palette__hint">
					<span class="pa-command-palette__key">←→</span>
					<span>Pages</span>
				</div>
			{/if}
			<div class="pa-command-palette__hint">
				<span class="pa-command-palette__key">↵</span>
				<span>Select</span>
			</div>
			<div class="pa-command-palette__hint">
				<span class="pa-command-palette__key">Esc</span>
				<span>Close</span>
			</div>
		</div>
	</div>
</div>
