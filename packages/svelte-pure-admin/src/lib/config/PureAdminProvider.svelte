<script lang="ts">
	/**
	 * Pure Admin Provider Component (Svelte 5)
	 * Provides configuration context to all child components
	 * Also manages global keyboard shortcuts
	 */

	import { setContext, onMount } from 'svelte';
	import type { PureAdminConfig } from './config';
	import { defaultConfig, mergeConfig } from './config';
	import { shortcutRegistry } from '../services/shortcut-registry.svelte';
	import { i18nStore } from '../i18n/store.svelte';
	import ShortcutHelpDialog from '../feedback/ShortcutHelpDialog.svelte';

	interface Props {
		/** Configuration overrides (merged with defaults) */
		config?: Partial<PureAdminConfig>;
		/** Disable keyboard shortcuts (default: false) */
		disableShortcuts?: boolean;
		/** Children components */
		children?: import('svelte').Snippet;
	}

	let { config = {}, disableShortcuts = false, children }: Props = $props();

	// Merge user config with defaults
	const mergedConfig = $derived(() => mergeConfig(defaultConfig, config));

	// Set context for child components
	// Note: We pass the derived function itself, so consumers call getContext()() to get current value
	// svelte-ignore state_referenced_locally
	setContext('pure-admin-config', mergedConfig);

	// Initialize i18n from config
	$effect(() => {
		const i18nConfig = mergedConfig().i18n;
		if (i18nConfig) {
			i18nStore.initialize(i18nConfig);
		}
	});

	// Shortcut help dialog state
	let showShortcutHelp = $state(false);

	// Setup global keyboard shortcut listener
	onMount(() => {
		if (disableShortcuts) return;

		// Global keydown handler
		function handleKeyDown(event: KeyboardEvent) {
			shortcutRegistry.handleKeyDown(event);
		}

		document.addEventListener('keydown', handleKeyDown);

		// Register the "?" shortcut for help dialog
		const unregisterHelp = shortcutRegistry.register({
			id: 'shortcut-help',
			key: '?',
			modifiers: { shift: true },
			description: i18nStore.t('shortcuts.showShortcuts'),
			category: i18nStore.t('shortcuts.generalCategory'),
			action: () => {
				showShortcutHelp = true;
			}
		});

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			unregisterHelp();
		};
	});
</script>

{@render children?.()}

<!-- Shortcut Help Dialog -->
<ShortcutHelpDialog bind:show={showShortcutHelp} />
