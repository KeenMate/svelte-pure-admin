/**
 * Pure Admin i18n Setup
 * Backwards-compatible wrapper around i18n-service
 *
 * For new code, prefer using i18n service directly:
 * ```typescript
 * import { i18n } from '@keenmate/svelte-pure-admin';
 * i18n.init({ locale: 'en' });
 * ```
 */

import { addMessages } from 'svelte-i18n';
import { i18n } from './i18n-service.svelte';
import type { I18nInitOptions } from './types';

// Re-export types for backwards compatibility
export type { I18nInitOptions };

/**
 * Initialize i18n with Pure Admin library defaults
 *
 * @deprecated Use `i18n.init()` instead for full API access
 *
 * @example
 * ```typescript
 * import { initI18n } from '@keenmate/svelte-pure-admin';
 *
 * initI18n({
 *   locale: 'en',
 *   fallbackLocale: 'en'
 * });
 * ```
 */
export function initI18n(options: I18nInitOptions = {}): void {
	i18n.init(options);
}

/**
 * Load/switch to a locale
 *
 * @deprecated Use `i18n.setLocale()` instead
 */
export const loadLocale = (code: string): Promise<void> => i18n.setLocale(code);

/**
 * Check if a locale's translations are loaded
 *
 * @deprecated Use `i18n.isLocaleLoaded()` instead
 */
export const isLocaleLoaded = (code: string): boolean => i18n.isLocaleLoaded(code);

/**
 * Register library component translations for a locale
 * Use this to add or override built-in component strings
 *
 * @example
 * ```typescript
 * import { registerLibraryTranslations } from '@keenmate/svelte-pure-admin';
 *
 * registerLibraryTranslations('en', {
 *   'pureAdmin.dialog.confirm': 'Yes, do it!'
 * });
 * ```
 */
export function registerLibraryTranslations(
	locale: string,
	translations: Record<string, string>
): void {
	addMessages(locale, translations);
}
