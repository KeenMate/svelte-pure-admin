/**
 * Pure Admin i18n Service
 * Reactive i18n service with Svelte 5 runes
 *
 * Supports three loading strategies:
 * 1. Bundled - Built-in en/cs translations (default)
 * 2. Injected - App provides translations at initialization
 * 3. Async/API - Load translations on-demand via custom loader
 */

import { init, addMessages, locale, isLoading as svelteI18nIsLoading } from 'svelte-i18n';
import { get } from 'svelte/store';
import { en } from './locales/en';
import { cs } from './locales/cs';
import type { Language, I18nInitOptions } from './types';

/**
 * Built-in locales bundled with the library
 */
const builtInLocales: Record<string, Record<string, string>> = {
	en,
	cs
};

/**
 * Default language definitions for built-in locales
 */
const defaultLanguages: Language[] = [
	{ code: 'en', name: 'English', nativeName: 'English' },
	{ code: 'cs', name: 'Czech', nativeName: 'Čeština' }
];

/**
 * Normalize a string or Language object to a Language object
 */
function normalizeLanguage(lang: string | Language): Language {
	if (typeof lang === 'string') {
		// Check if it's a built-in locale with name
		const builtIn = defaultLanguages.find((l) => l.code === lang);
		if (builtIn) {
			return builtIn;
		}
		return { code: lang };
	}
	return lang;
}

/**
 * Create the i18n service singleton
 */
function createI18nService() {
	// Reactive state (Svelte 5 runes)
	let languages = $state<Language[]>([...defaultLanguages]);
	let loadedLocales = $state<Set<string>>(new Set(['en', 'cs']));
	let loading = $state(false);
	let initialized = $state(false);
	let fallbackLocale = $state('en');

	// Async translation loader (optional)
	let loadTranslationsFn: ((locale: string) => Promise<object>) | null = null;

	/**
	 * Register built-in library translations
	 */
	function registerBuiltInLocales(): void {
		for (const [localeCode, translations] of Object.entries(builtInLocales)) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			addMessages(localeCode, translations as any);
		}
	}

	/**
	 * Auto-initialize with defaults
	 * Ensures translations work during SSR before user calls init()
	 */
	function autoInit(): void {
		if (initialized) return;

		// Register built-in locales
		registerBuiltInLocales();

		// Initialize svelte-i18n with defaults
		init({
			fallbackLocale: 'en',
			initialLocale: 'en'
		});

		initialized = true;
	}

	// Auto-initialize immediately
	autoInit();

	return {
		/**
		 * Current active locale code
		 */
		get currentLocale(): string {
			return get(locale) || fallbackLocale;
		},

		/**
		 * Available languages list
		 */
		get languages(): Language[] {
			return languages;
		},

		/**
		 * True while loading translations asynchronously
		 */
		get isLoading(): boolean {
			return loading || get(svelteI18nIsLoading);
		},

		/**
		 * Fallback locale code
		 */
		get fallbackLocale(): string {
			return fallbackLocale;
		},

		/**
		 * Set of loaded locale codes
		 */
		get loadedLocales(): Set<string> {
			return loadedLocales;
		},

		/**
		 * Initialize i18n with options
		 *
		 * @example Simple usage (library defaults)
		 * ```typescript
		 * // No init needed - works automatically with en/cs
		 * import { _ } from '@keenmate/svelte-pure-admin';
		 * ```
		 *
		 * @example Injected translations
		 * ```typescript
		 * import { i18n } from '@keenmate/svelte-pure-admin';
		 *
		 * i18n.init({
		 *   locale: 'en',
		 *   languages: [
		 *     { code: 'en', name: 'English' },
		 *     { code: 'de', name: 'Deutsch' }
		 *   ],
		 *   translations: {
		 *     en: window.__TRANSLATIONS__
		 *   }
		 * });
		 * ```
		 *
		 * @example Async loader
		 * ```typescript
		 * import { i18n } from '@keenmate/svelte-pure-admin';
		 *
		 * i18n.init({
		 *   locale: 'en',
		 *   translations: { en: window.__TRANSLATIONS__ },
		 *   loadTranslations: async (locale) => {
		 *     const res = await fetch(`/api/translations/${locale}`);
		 *     return res.json();
		 *   }
		 * });
		 * ```
		 */
		init(options: I18nInitOptions = {}): void {
			const {
				locale: requestedLocale,
				fallbackLocale: requestedFallback = 'en',
				languages: availableLanguages,
				translations = {},
				loadTranslations
			} = options;

			// Update fallback
			fallbackLocale = requestedFallback;

			// Set available languages
			if (availableLanguages) {
				languages = availableLanguages.map(normalizeLanguage);
			}

			// Store async loader
			loadTranslationsFn = loadTranslations || null;

			// Add provided translations (merged with built-in)
			for (const [code, data] of Object.entries(translations)) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				addMessages(code, data as any);
				loadedLocales = new Set([...loadedLocales, code]);
			}

			// Set locale if different from current
			if (requestedLocale && requestedLocale !== get(locale)) {
				locale.set(requestedLocale);
			}
		},

		/**
		 * Switch to a different locale
		 * If translations aren't loaded and a loader is configured, loads them first
		 *
		 * @example
		 * ```typescript
		 * await i18n.setLocale('de');
		 * ```
		 */
		async setLocale(code: string): Promise<void> {
			// Already loaded - just switch
			if (loadedLocales.has(code)) {
				locale.set(code);
				return;
			}

			// No loader configured - try anyway (will use fallback for missing keys)
			if (!loadTranslationsFn) {
				console.warn(
					`[i18n] Locale "${code}" not loaded and no loader configured. ` +
						`Missing translations will fall back to "${fallbackLocale}".`
				);
				locale.set(code);
				return;
			}

			// Load translations async
			loading = true;
			try {
				const data = await loadTranslationsFn(code);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				addMessages(code, data as any);
				loadedLocales = new Set([...loadedLocales, code]);
				locale.set(code);
			} catch (error) {
				console.error(`[i18n] Failed to load translations for "${code}":`, error);
				throw error;
			} finally {
				loading = false;
			}
		},

		/**
		 * Get language by code
		 *
		 * @example
		 * ```typescript
		 * const lang = i18n.getLanguage('en');
		 * console.log(lang?.name); // 'English'
		 * ```
		 */
		getLanguage(code: string): Language | undefined {
			return languages.find((l) => l.code === code);
		},

		/**
		 * Check if translations for a locale are loaded
		 *
		 * @example
		 * ```typescript
		 * if (!i18n.isLocaleLoaded('de')) {
		 *   await i18n.setLocale('de');
		 * }
		 * ```
		 */
		isLocaleLoaded(code: string): boolean {
			return loadedLocales.has(code);
		},

		/**
		 * Replace the entire languages list
		 *
		 * @example
		 * ```typescript
		 * i18n.setLanguages([
		 *   { code: 'en', name: 'English' },
		 *   { code: 'de', name: 'Deutsch' },
		 *   { code: 'fr', name: 'Français' }
		 * ]);
		 * ```
		 */
		setLanguages(langs: (string | Language)[]): void {
			languages = langs.map(normalizeLanguage);
		},

		/**
		 * Add a language to the available languages list
		 * Does nothing if the language already exists
		 *
		 * @example
		 * ```typescript
		 * i18n.addLanguage({ code: 'fr', name: 'Français' });
		 * ```
		 */
		addLanguage(lang: string | Language): void {
			const normalized = normalizeLanguage(lang);
			if (!languages.find((l) => l.code === normalized.code)) {
				languages = [...languages, normalized];
			}
		},

		/**
		 * Remove a language from the available languages list
		 *
		 * @example
		 * ```typescript
		 * i18n.removeLanguage('de');
		 * ```
		 */
		removeLanguage(code: string): void {
			languages = languages.filter((l) => l.code !== code);
		},

		/**
		 * Add translations for a locale
		 * Useful for dynamically adding translations without switching locale
		 *
		 * @example
		 * ```typescript
		 * i18n.addTranslations('de', {
		 *   common: { greeting: 'Guten Tag' }
		 * });
		 * ```
		 */
		addTranslations(code: string, translations: object): void {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			addMessages(code, translations as any);
			loadedLocales = new Set([...loadedLocales, code]);
		},

		/**
		 * Configure the async translation loader
		 * Can be set after init() if needed
		 *
		 * @example
		 * ```typescript
		 * i18n.setTranslationLoader(async (locale) => {
		 *   const res = await fetch(`/api/translations/${locale}`);
		 *   return res.json();
		 * });
		 * ```
		 */
		setTranslationLoader(loader: ((locale: string) => Promise<object>) | null): void {
			loadTranslationsFn = loader;
		}
	};
}

/**
 * i18n service singleton
 *
 * Provides reactive language management with Svelte 5 runes.
 * Use in components to access current locale, available languages,
 * and loading state.
 *
 * @example Language picker component
 * ```svelte
 * <script>
 *   import { i18n, _ } from '@keenmate/svelte-pure-admin';
 *
 *   async function handleChange(event) {
 *     await i18n.setLocale(event.target.value);
 *   }
 * </script>
 *
 * <select value={i18n.currentLocale} onchange={handleChange} disabled={i18n.isLoading}>
 *   {#each i18n.languages as lang}
 *     <option value={lang.code}>{lang.name || lang.code}</option>
 *   {/each}
 * </select>
 *
 * {#if i18n.isLoading}
 *   <span>{$_('pureAdmin.loadMore.loading')}</span>
 * {/if}
 * ```
 */
export const i18n = createI18nService();
