/**
 * Pure Admin i18n Module
 * Uses svelte-i18n for internationalization
 *
 * IMPORTANT: Import from this module (not svelte-i18n directly)
 * to ensure auto-initialization runs before any stores are accessed.
 */

// i18n Service (primary API for managing languages and locales)
export { i18n } from './i18n-service.svelte';

// Setup functions (backwards compatibility)
export { initI18n, registerLibraryTranslations, loadLocale, isLocaleLoaded } from './setup';

// Types
export type { PureAdminTranslations, Language, I18nInitOptions } from './types';

// Built-in locales (for reference/extension)
export { en } from './locales/en';
export { cs } from './locales/cs';

// Re-export svelte-i18n for convenience
// Components should import these from here (not directly from svelte-i18n)
// to ensure i18n is initialized first
export {
	_,
	locale,
	locales,
	isLoading,
	addMessages,
	register,
	init,
	getLocaleFromNavigator,
	getLocaleFromQueryString,
	getLocaleFromHash,
	getLocaleFromPathname
} from 'svelte-i18n';
