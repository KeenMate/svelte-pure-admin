/**
 * Pure Admin i18n Types
 * TypeScript interfaces for library translations
 */

/**
 * Language definition
 * Represents an available language in the application
 */
export interface Language {
	/** Language code (e.g., 'en', 'cs', 'de') */
	code: string;
	/** Display name (e.g., 'English', 'Čeština') */
	name?: string;
	/** Native name (e.g., 'English', 'Čeština', 'Deutsch') */
	nativeName?: string;
}

/**
 * i18n initialization options
 * Configure locale detection, translations, and async loading
 */
export interface I18nInitOptions {
	/** Initial locale (default: 'en') */
	locale?: string;

	/** Fallback locale when translation is missing (default: 'en') */
	fallbackLocale?: string;

	/**
	 * Available languages.
	 * Can be simple codes (e.g., ['en', 'de']) or full Language objects.
	 * If not provided, uses built-in locales ['en', 'cs'].
	 */
	languages?: (string | Language)[];

	/**
	 * Pre-loaded translations by locale.
	 * These are added immediately via addMessages().
	 * Built-in library translations (pureAdmin.*) are always included.
	 *
	 * @example
	 * ```typescript
	 * translations: {
	 *   en: {
	 *     // App translations
	 *     'app.dashboard.title': 'Dashboard',
	 *     // Override library translation
	 *     'pureAdmin.dialog.confirm': 'Yes, do it!'
	 *   },
	 *   de: {
	 *     'app.dashboard.title': 'Übersicht',
	 *     'pureAdmin.dialog.confirm': 'Ja, mach es!',
	 *     'pureAdmin.dialog.cancel': 'Abbrechen'
	 *   }
	 * }
	 * ```
	 */
	translations?: Record<string, Record<string, string>>;

	/**
	 * Async loader for translations not yet loaded.
	 * Called when switching to a locale via setLocale() that hasn't been loaded.
	 *
	 * @example
	 * ```typescript
	 * loadTranslations: async (locale) => {
	 *   const res = await fetch(`/api/translations/${locale}`);
	 *   return res.json();
	 * }
	 * ```
	 */
	loadTranslations?: (locale: string) => Promise<Record<string, string>>;
}

/**
 * Pure Admin translation keys
 * All library translations use the 'pureAdmin.' prefix in flat format.
 *
 * Available keys:
 * - pureAdmin.dialog.* - Dialog service strings
 * - pureAdmin.popconfirm.* - Popconfirm strings
 * - pureAdmin.shortcuts.* - Keyboard shortcuts
 * - pureAdmin.commandPalette.* - Command palette
 * - pureAdmin.loadMore.* - Load more component
 * - pureAdmin.field.* - Field component (copy)
 * - pureAdmin.common.buttons.* - Common button labels
 *
 * @example Override in your app:
 * ```typescript
 * {
 *   'pureAdmin.dialog.confirm': 'Yes!',
 *   'pureAdmin.field.copied': 'Done!'
 * }
 * ```
 */
export type PureAdminTranslations = Record<string, string>;
