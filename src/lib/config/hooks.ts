/**
 * Pure Admin Hooks
 * Helper functions for accessing context and state
 */

import { getContext } from 'svelte';
import type { PureAdminConfig } from './config';
import { defaultConfig } from './config';

/**
 * Get Pure Admin configuration from context
 * If no provider is found, returns default configuration
 *
 * @returns Current configuration object
 *
 * @example
 * ```svelte
 * <script lang="ts">
 *   import { usePureAdminConfig } from '@pure-admin/svelte';
 *
 *   const config = usePureAdminConfig();
 *   console.log(config().app.name); // "My App"
 * </script>
 * ```
 */
export function usePureAdminConfig(): () => PureAdminConfig {
	const config = getContext<(() => PureAdminConfig) | undefined>('pure-admin-config');

	// Return default config if no provider found
	if (!config) {
		return () => defaultConfig;
	}

	return config;
}
