/**
 * Pure Admin i18n Hooks
 * Convenience hooks for accessing i18n in components
 */

import { i18nStore } from './store.svelte';
import type { TranslationParams } from './types';

/**
 * Access the full i18n store
 * Use this when you need access to locale, languages, or loading state
 *
 * @example
 * ```svelte
 * <script>
 *   import { useI18n } from '@keenmate/svelte-pure-admin';
 *   const i18n = useI18n();
 *
 *   // Access current locale
 *   const locale = i18n.locale;
 *
 *   // Change locale
 *   i18n.setLocale('cs');
 *
 *   // Get translation
 *   const text = i18n.t('dialog.confirm');
 * </script>
 * ```
 */
export function useI18n() {
	return i18nStore;
}

/**
 * Get just the translation function
 * Use this when you only need to translate strings
 *
 * @example
 * ```svelte
 * <script>
 *   import { useTranslate } from '@keenmate/svelte-pure-admin';
 *   const t = useTranslate();
 *
 *   const confirmText = t('dialog.confirm');
 *   const greeting = t('common.hello', { name: 'John' });
 * </script>
 * ```
 */
export function useTranslate(): (keyPath: string, params?: TranslationParams) => string {
	return (keyPath: string, params?: TranslationParams) => i18nStore.t(keyPath, params);
}

/**
 * Create a scoped translator for a specific namespace
 * Useful when a component only uses translations from one section
 *
 * @example
 * ```svelte
 * <script>
 *   import { useScopedTranslate } from '@keenmate/svelte-pure-admin';
 *   const t = useScopedTranslate('dialog');
 *
 *   // Instead of t('dialog.confirm'), just use:
 *   const confirmText = t('confirm');
 * </script>
 * ```
 */
export function useScopedTranslate(
	scope: string
): (key: string, params?: TranslationParams) => string {
	return (key: string, params?: TranslationParams) => i18nStore.t(`${scope}.${key}`, params);
}
