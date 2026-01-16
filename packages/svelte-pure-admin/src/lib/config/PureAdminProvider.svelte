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
	setContext('pure-admin-config', mergedConfig);

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
			description: 'Show keyboard shortcuts',
			category: 'General',
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
