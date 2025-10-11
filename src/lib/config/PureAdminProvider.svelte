<script lang="ts">
	/**
	 * Pure Admin Provider Component (Svelte 5)
	 * Provides configuration context to all child components
	 */

	import { setContext } from 'svelte';
	import type { PureAdminConfig } from './config';
	import { defaultConfig, mergeConfig } from './config';

	interface Props {
		/** Configuration overrides (merged with defaults) */
		config?: Partial<PureAdminConfig>;
		/** Children components */
		children?: import('svelte').Snippet;
	}

	let { config = {}, children }: Props = $props();

	// Merge user config with defaults
	const mergedConfig = $derived(() => mergeConfig(defaultConfig, config));

	// Set context for child components
	setContext('pure-admin-config', mergedConfig);
</script>

{@render children?.()}
