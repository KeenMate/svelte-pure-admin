<script lang="ts">
	/**
	 * Pure Admin CommandPalette v2 (Svelte 5)
	 *
	 * macOS Spotlight-style command palette with:
	 * - /commands - Multi-step action wizards
	 * - :contexts - Scoped entity search
	 * - Global search (no prefix)
	 */

	import { onMount } from 'svelte';
	import { shortcutRegistry } from '../services/shortcut-registry.svelte';
	import type {
		Command,
		SearchContext,
		SearchResult,
		StepOption,
		StepSelection,
		PaletteMode,
		Token,
		TokenType
	} from './command-palette-types';

	// =========================================================================
	// PROPS
	// =========================================================================

	interface Props {
		/** Show/hide the palette (bindable) */
		show?: boolean;
		/** Available commands (triggered by /) */
		commands?: Command[];
		/** Available search contexts (triggered by :) */
		contexts?: SearchContext[];
		/** Global search function (when no prefix is used) */
		globalSearch?: (query: string) => Promise<SearchResult[]> | SearchResult[];
		/** Called when a global search result is selected */
		onGlobalSelect?: (result: SearchResult) => void;
		/** Placeholder text */
		placeholder?: string;
		/** Additional CSS classes */
		class?: string;
		/** Custom error display snippet */
		errorSnippet?: import('svelte').Snippet<[string]>;
	}

	let {
		show = $bindable(false),
		commands = [],
		contexts = [],
		globalSearch,
		onGlobalSelect,
		placeholder = 'Type / for commands, : for search, or just type...',
		class: className = '',
		errorSnippet
	}: Props = $props();

	// =========================================================================
	// STATE
	// =========================================================================

	let inputRef = $state<HTMLInputElement>();
	let inputValue = $state('');
	let mode = $state<PaletteMode>('idle');
	let activeCommand = $state<Command | undefined>(undefined);
	let currentStepIndex = $state(0);
	let selections = $state<StepSelection[]>([]);
	let activeContext = $state<SearchContext | undefined>(undefined);
	let displayItems = $state<Array<Command | SearchContext | StepOption | SearchResult>>([]);
	let activeIndex = $state(0);
	let loading = $state(false);
	let preview = $state<string | undefined>(undefined);
	let error = $state<string | undefined>(undefined);

	// Debounce timer for search
	let searchDebounceTimer: ReturnType<typeof setTimeout> | undefined;

	// =========================================================================
	// COMPUTED
	// =========================================================================

	const classes = $derived(() => {
		const base = ['pa-command-palette'];
		if (show) base.push('pa-command-palette--active');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Get current step (if in command mode)
	const currentStep = $derived(() => {
		if (!activeCommand || currentStepIndex >= activeCommand.steps.length) return undefined;
		return activeCommand.steps[currentStepIndex];
	});

	// Build display text for completed selections
	const selectionsDisplay = $derived(() => {
		if (!activeCommand) return '';
		let display = activeCommand.shortcut;
		for (let i = 0; i < selections.length; i++) {
			const step = activeCommand.steps[i];
			const sel = selections[i];
			// Always add prompt or space before selection value
			display += step?.prompt || ' ';
			display += sel.option?.label || sel.freeText || '';
		}
		// Add current step's prompt if we're on a new step
		const step = currentStep();
		if (selections.length === currentStepIndex) {
			display += step?.prompt || ' ';
		}
		return display;
	});

	// =========================================================================
	// TOKENIZER (for syntax highlighting)
	// =========================================================================

	function tokenize(input: string): Token[] {
		const tokens: Token[] = [];
		let pos = 0;

		// Check for command prefix
		if (input.startsWith('/')) {
			const match = input.match(/^\/\S*/);
			if (match) {
				tokens.push({
					type: 'command',
					value: match[0],
					start: 0,
					end: match[0].length
				});
				pos = match[0].length;
			}
		}
		// Check for context prefix
		else if (input.startsWith(':')) {
			const match = input.match(/^:\S*/);
			if (match) {
				tokens.push({
					type: 'context',
					value: match[0],
					start: 0,
					end: match[0].length
				});
				pos = match[0].length;
			}
		}

		// Rest is query text
		if (pos < input.length) {
			tokens.push({
				type: 'query',
				value: input.substring(pos),
				start: pos,
				end: input.length
			});
		}

		return tokens;
	}

	// Generate highlighted HTML
	function getHighlightedHtml(input: string): string {
		const tokens = tokenize(input);
		let html = '';

		for (const token of tokens) {
			const escaped = escapeHtml(token.value);
			switch (token.type) {
				case 'command':
					html += `<span class="pa-command-palette__token pa-command-palette__token--command">${escaped}</span>`;
					break;
				case 'context':
					html += `<span class="pa-command-palette__token pa-command-palette__token--context">${escaped}</span>`;
					break;
				case 'prompt':
					html += `<span class="pa-command-palette__token pa-command-palette__token--prompt">${escaped}</span>`;
					break;
				case 'value':
					html += `<span class="pa-command-palette__token pa-command-palette__token--value">${escaped}</span>`;
					break;
				default:
					html += escaped;
			}
		}

		return html + ' '; // Trailing space prevents collapse
	}

	function escapeHtml(text: string): string {
		return text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	}

	// =========================================================================
	// INPUT HANDLING
	// =========================================================================

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		inputValue = target.value;
		processInput();
	}

	function processInput() {
		// Clear any pending search and previous error
		if (searchDebounceTimer) {
			clearTimeout(searchDebounceTimer);
		}
		error = undefined;

		const value = inputValue.trim();

		// Empty input - show idle state
		if (!value) {
			mode = 'idle';
			displayItems = [];
			activeIndex = 0;
			return;
		}

		// Command mode (/)
		if (value.startsWith('/')) {
			handleCommandInput(value);
			return;
		}

		// Context/search mode (:)
		if (value.startsWith(':')) {
			handleContextInput(value);
			return;
		}

		// Global search mode
		handleGlobalSearchInput(value);
	}

	function handleCommandInput(value: string) {
		const parts = value.split(' ');
		const cmdPart = parts[0]; // e.g., "/r" or "/report"
		const queryPart = parts.slice(1).join(' ');

		// Find matching command
		const matchingCommands = commands.filter((cmd) => {
			const allShortcuts = [cmd.shortcut, ...(cmd.aliases || [])];
			return allShortcuts.some(
				(s) => s.toLowerCase().startsWith(cmdPart.toLowerCase()) || cmdPart.toLowerCase().startsWith(s.toLowerCase())
			);
		});

		// Exact match - enter command mode
		const exactMatch = commands.find((cmd) => {
			const allShortcuts = [cmd.shortcut, ...(cmd.aliases || [])];
			return allShortcuts.some((s) => s.toLowerCase() === cmdPart.toLowerCase());
		});

		if (exactMatch && (queryPart || value.endsWith(' '))) {
			// We have an exact command match and user typed space - enter step mode
			enterCommandMode(exactMatch, queryPart);
		} else if (cmdPart === '/') {
			// Just "/" - show all commands
			mode = 'command-list';
			displayItems = commands;
			activeIndex = 0;
		} else {
			// Partial match - show filtered commands
			mode = 'command-list';
			displayItems = matchingCommands;
			activeIndex = 0;
		}
	}

	function enterCommandMode(command: Command, initialQuery: string = '') {
		activeCommand = command;
		currentStepIndex = 0;
		selections = [];
		mode = 'command-step';

		// If command has no steps, it's an instant command
		if (command.steps.length === 0) {
			executeCommand();
			return;
		}

		// Load options for first step
		loadStepOptions(initialQuery);
	}

	async function loadStepOptions(query: string = '') {
		const step = currentStep();
		if (!step) return;

		loading = true;
		try {
			const options = await step.getOptions(query, selections);
			displayItems = options;
			activeIndex = options.length > 0 ? 0 : -1;

			// Update preview if available
			if (activeCommand?.getPreview) {
				preview = activeCommand.getPreview(selections);
			}
		} catch (err) {
			console.error('Failed to load step options:', err);
			error = 'Failed to load options. Please try again.';
			displayItems = [];
		} finally {
			loading = false;
		}
	}

	function handleContextInput(value: string) {
		const parts = value.split(' ');
		const ctxPart = parts[0]; // e.g., ":p" or ":products"
		const queryPart = parts.slice(1).join(' ');

		// Find matching context
		const matchingContexts = contexts.filter((ctx) => {
			const allShortcuts = [ctx.shortcut, ...(ctx.aliases || [])];
			return allShortcuts.some(
				(s) => s.toLowerCase().startsWith(ctxPart.toLowerCase()) || ctxPart.toLowerCase().startsWith(s.toLowerCase())
			);
		});

		// Exact match - enter search mode
		const exactMatch = contexts.find((ctx) => {
			const allShortcuts = [ctx.shortcut, ...(ctx.aliases || [])];
			return allShortcuts.some((s) => s.toLowerCase() === ctxPart.toLowerCase());
		});

		if (exactMatch && (queryPart || value.endsWith(' '))) {
			// We have an exact context match and user typed space - search
			enterContextSearchMode(exactMatch, queryPart);
		} else if (ctxPart === ':') {
			// Just ":" - show all contexts
			mode = 'context-list';
			displayItems = contexts;
			activeIndex = 0;
		} else {
			// Partial match - show filtered contexts
			mode = 'context-list';
			displayItems = matchingContexts;
			activeIndex = 0;
		}
	}

	function enterContextSearchMode(context: SearchContext, query: string = '') {
		activeContext = context;
		mode = 'context-search';

		if (query) {
			performContextSearch(query);
		} else {
			displayItems = [];
			activeIndex = -1;
		}
	}

	async function performContextSearch(query: string) {
		if (!activeContext) return;

		loading = true;
		try {
			const results = await activeContext.onSearch(query);
			displayItems = results;
			activeIndex = results.length > 0 ? 0 : -1;
		} catch (err) {
			console.error('Context search failed:', err);
			error = 'Search failed. Please try again.';
			displayItems = [];
		} finally {
			loading = false;
		}
	}

	function handleGlobalSearchInput(query: string) {
		mode = 'global-search';

		if (!globalSearch) {
			displayItems = [];
			return;
		}

		// Debounce search
		searchDebounceTimer = setTimeout(async () => {
			loading = true;
			try {
				const results = await globalSearch(query);
				displayItems = results;
				activeIndex = results.length > 0 ? 0 : -1;
			} catch (err) {
				console.error('Global search failed:', err);
				error = 'Search failed. Please try again.';
				displayItems = [];
			} finally {
				loading = false;
			}
		}, 150);
	}

	// =========================================================================
	// SELECTION HANDLING
	// =========================================================================

	function selectItem(item: Command | SearchContext | StepOption | SearchResult) {
		switch (mode) {
			case 'command-list':
				selectCommand(item as Command);
				break;
			case 'command-step':
				selectStepOption(item as StepOption);
				break;
			case 'context-list':
				selectContext(item as SearchContext);
				break;
			case 'context-search':
				selectSearchResult(item as SearchResult);
				break;
			case 'global-search':
				selectGlobalResult(item as SearchResult);
				break;
		}
	}

	function selectCommand(command: Command) {
		inputValue = command.shortcut + ' ';
		enterCommandMode(command);
		inputRef?.focus();
	}

	function selectStepOption(option: StepOption) {
		const step = currentStep();
		if (!step) return;

		// Add selection
		selections = [
			...selections,
			{
				stepId: step.id,
				option: option
			}
		];

		// Move to next step
		moveToNextStep();
	}

	function moveToNextStep() {
		if (!activeCommand) return;

		// Find next applicable step
		let nextIndex = currentStepIndex + 1;
		while (nextIndex < activeCommand.steps.length) {
			const step = activeCommand.steps[nextIndex];
			if (!step.shouldShow || step.shouldShow(selections)) {
				break;
			}
			nextIndex++;
		}

		if (nextIndex >= activeCommand.steps.length) {
			// No more steps - execute command
			executeCommand();
		} else {
			currentStepIndex = nextIndex;

			// Update input - selectionsDisplay() already includes the current step's prompt
			inputValue = selectionsDisplay();

			// Load options for new step
			loadStepOptions('');
		}

		inputRef?.focus();
	}

	function executeCommand() {
		if (!activeCommand) return;

		// Update preview one last time
		if (activeCommand.getPreview) {
			preview = activeCommand.getPreview(selections);
		}

		// Execute
		activeCommand.onComplete(selections);
		close();
	}

	function selectContext(context: SearchContext) {
		inputValue = context.shortcut + ' ';
		enterContextSearchMode(context);
		inputRef?.focus();
	}

	function selectSearchResult(result: SearchResult) {
		if (activeContext) {
			activeContext.onSelect(result);
		}
		close();
	}

	function selectGlobalResult(result: SearchResult) {
		if (onGlobalSelect) {
			onGlobalSelect(result);
		}
		close();
	}

	// =========================================================================
	// KEYBOARD HANDLING
	// =========================================================================

	function handleKeyDown(event: KeyboardEvent) {
		if (!show) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				navigateDown();
				break;
			case 'ArrowUp':
				event.preventDefault();
				navigateUp();
				break;
			case 'Enter':
				event.preventDefault();
				handleEnter();
				break;
			case 'Tab':
				event.preventDefault();
				handleTab();
				break;
			case 'Escape':
				event.preventDefault();
				close();
				break;
		}
	}

	function navigateDown() {
		if (displayItems.length === 0) return;
		activeIndex = activeIndex >= displayItems.length - 1 ? 0 : activeIndex + 1;
	}

	function navigateUp() {
		if (displayItems.length === 0) return;
		activeIndex = activeIndex <= 0 ? displayItems.length - 1 : activeIndex - 1;
	}

	function handleEnter() {
		if (activeIndex >= 0 && activeIndex < displayItems.length) {
			selectItem(displayItems[activeIndex]);
		} else if (mode === 'command-step') {
			// Free text entry for current step
			const step = currentStep();
			if (step?.freeText) {
				const query = getQueryFromInput();
				selections = [
					...selections,
					{
						stepId: step.id,
						freeText: query
					}
				];
				moveToNextStep();
			}
		}
	}

	function handleTab() {
		// Tab works same as Enter for selection
		handleEnter();
	}

	function getQueryFromInput(): string {
		// Extract query portion from input based on current mode
		const value = inputValue;

		if (mode === 'command-step') {
			const prefix = selectionsDisplay();
			return value.substring(prefix.length).trim();
		}

		if (mode === 'context-search' && activeContext) {
			const prefix = activeContext.shortcut + ' ';
			return value.substring(prefix.length).trim();
		}

		return value;
	}

	// =========================================================================
	// LIFECYCLE
	// =========================================================================

	function close() {
		show = false;
		reset();
	}

	function reset() {
		inputValue = '';
		mode = 'idle';
		activeCommand = undefined;
		currentStepIndex = 0;
		selections = [];
		activeContext = undefined;
		displayItems = [];
		activeIndex = 0;
		loading = false;
		preview = undefined;
		error = undefined;
	}

	// Focus input when shown
	$effect(() => {
		if (show && inputRef) {
			setTimeout(() => inputRef?.focus(), 0);
		}
	});

	// Watch input changes for context/command step modes
	$effect(() => {
		if (mode === 'command-step') {
			const query = getQueryFromInput();
			loadStepOptions(query);
		} else if (mode === 'context-search' && activeContext) {
			const query = getQueryFromInput();
			if (query) {
				if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
				searchDebounceTimer = setTimeout(() => performContextSearch(query), 150);
			}
		}
	});

	// Register global keyboard shortcut via registry
	onMount(() => {
		return shortcutRegistry.register({
			id: 'command-palette-toggle',
			key: 'k',
			modifiers: { ctrl: true },
			description: 'Open command palette',
			category: 'Navigation',
			action: () => {
				show = !show;
				if (!show) reset();
			}
		});
	});

	// =========================================================================
	// HELPERS
	// =========================================================================

	function getItemIcon(item: Command | SearchContext | StepOption | SearchResult): string {
		return (item as any).icon || '';
	}

	function getItemTitle(item: Command | SearchContext | StepOption | SearchResult): string {
		if ('label' in item) return item.label; // StepOption
		if ('title' in item) return item.title; // SearchResult
		return item.name; // Command or SearchContext
	}

	function getItemSubtitle(item: Command | SearchContext | StepOption | SearchResult): string {
		if ('subtitle' in item) return item.subtitle || '';
		if ('description' in item) return item.description || '';
		return '';
	}

	function getItemBadge(item: Command | SearchContext | StepOption | SearchResult): string {
		if ('badge' in item) return item.badge || '';
		if ('shortcut' in item) return item.shortcut;
		return '';
	}

	function getModeLabel(): string {
		switch (mode) {
			case 'command-list':
				return 'Commands';
			case 'command-step':
				return activeCommand?.name || 'Command';
			case 'context-list':
				return 'Search In';
			case 'context-search':
				return `Search ${activeContext?.name || ''}`;
			case 'global-search':
				return 'Search';
			default:
				return '';
		}
	}

	function getEmptyMessage(): string {
		switch (mode) {
			case 'idle':
				return 'Type / for commands, : for search contexts, or start typing to search...';
			case 'command-list':
				return 'No matching commands';
			case 'command-step':
				return currentStep()?.placeholder || 'Type to search...';
			case 'context-list':
				return 'No matching search contexts';
			case 'context-search':
			case 'global-search':
				return 'No results found';
			default:
				return '';
		}
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

<div class={classes()}>
	<!-- Backdrop -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="pa-command-palette__backdrop" onclick={close}></div>

	<!-- Container -->
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
				bind:value={inputValue}
				oninput={handleInput}
			/>
			<!-- Mode label -->
			{#if mode !== 'idle'}
				<div class="pa-command-palette__context pa-command-palette__context--visible">
					{getModeLabel()}
				</div>
			{/if}
		</div>

		<!-- Results container -->
		<div class="pa-command-palette__results" class:pa-command-palette__results--loading={loading}>
			{#if loading}
				<div class="pa-command-palette__loader">
					<div class="pa-spinner pa-spinner--sm pa-spinner--primary"></div>
					<span>Loading...</span>
				</div>
			{:else if error}
				{#if errorSnippet}
					{@render errorSnippet(error)}
				{:else}
					<div class="pa-command-palette__error">
						<span class="pa-command-palette__error-icon">⚠️</span>
						<span>{error}</span>
					</div>
				{/if}
			{:else if displayItems.length === 0}
				<div class="pa-command-palette__empty">
					{getEmptyMessage()}
				</div>
			{:else}
				{#each displayItems as item, index (getItemTitle(item) + index)}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="pa-command-palette__item"
						class:pa-command-palette__item--active={activeIndex === index}
						onclick={() => selectItem(item)}
					>
						{#if getItemIcon(item)}
							<div class="pa-command-palette__item-icon">{getItemIcon(item)}</div>
						{/if}
						<div class="pa-command-palette__item-content">
							<div class="pa-command-palette__item-title">{getItemTitle(item)}</div>
							{#if getItemSubtitle(item)}
								<div class="pa-command-palette__item-meta">{getItemSubtitle(item)}</div>
							{/if}
						</div>
						{#if getItemBadge(item)}
							<div class="pa-command-palette__item-badge">{getItemBadge(item)}</div>
						{/if}
					</div>
				{/each}
			{/if}

			<!-- Preview (for commands) -->
			{#if preview && mode === 'command-step'}
				<div class="pa-command-palette__preview">
					<span class="pa-command-palette__preview-label">Preview:</span>
					{preview}
				</div>
			{/if}
		</div>

		<!-- Footer with hints -->
		<div class="pa-command-palette__footer">
			<div class="pa-command-palette__hint">
				<span class="pa-command-palette__key">↑↓</span>
				<span>Navigate</span>
			</div>
			<div class="pa-command-palette__hint">
				<span class="pa-command-palette__key">↵</span>
				<span>Select</span>
			</div>
			<div class="pa-command-palette__hint">
				<span class="pa-command-palette__key">Tab</span>
				<span>Complete</span>
			</div>
			<div class="pa-command-palette__hint">
				<span class="pa-command-palette__key">Esc</span>
				<span>Close</span>
			</div>
		</div>
	</div>
</div>

<style>
	/* Preview styling */
	.pa-command-palette__preview {
		padding: 0.75rem 1rem;
		background: rgba(var(--pa-primary-rgb, 59, 130, 246), 0.1);
		border-top: 1px solid var(--pa-border-color, #e5e7eb);
		font-size: 0.875rem;
		color: var(--pa-text-secondary, #6b7280);
	}

	.pa-command-palette__preview-label {
		font-weight: 600;
		margin-right: 0.5rem;
	}

	/* Token highlighting */
	:global(.pa-command-palette__token) {
		border-radius: 0.25rem;
		padding: 0.125rem 0.25rem;
	}

	:global(.pa-command-palette__token--command) {
		background: rgba(59, 130, 246, 0.2);
		color: rgb(37, 99, 235);
	}

	:global(.pa-command-palette__token--context) {
		background: rgba(139, 92, 246, 0.2);
		color: rgb(109, 40, 217);
	}

	:global(.pa-command-palette__token--prompt) {
		color: var(--pa-text-muted, #9ca3af);
	}

	:global(.pa-command-palette__token--value) {
		background: rgba(34, 197, 94, 0.2);
		color: rgb(21, 128, 61);
	}

	/* Error styling */
	.pa-command-palette__error {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 1rem;
		text-align: center;
		color: var(--pa-danger, #ef4444);
		font-size: 0.875rem;
	}

	.pa-command-palette__error-icon {
		font-size: 1rem;
	}
</style>
