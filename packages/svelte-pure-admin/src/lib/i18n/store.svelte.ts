/**
 * Pure Admin i18n Store (Svelte 5)
 * Reactive internationalization store using runes
 */

import type { TranslationKeys, LanguageItem, I18nConfig, TranslationParams } from './types';
import { en } from './locales/en';
import { cs } from './locales/cs';

/**
 * Built-in locales bundled with the library
 */
const builtInLocales: Record<string, TranslationKeys> = {
	en,
	cs
};

/**
 * Deep merge utility for translation objects
 * Merges source into target, recursively merging nested objects
 */
function deepMergeTranslations(
	target: TranslationKeys,
	source: Partial<TranslationKeys>
): TranslationKeys {
	return {
		dialog: { ...target.dialog, ...source.dialog },
		popconfirm: { ...target.popconfirm, ...source.popconfirm },
		shortcuts: { ...target.shortcuts, ...source.shortcuts },
		commandPalette: { ...target.commandPalette, ...source.commandPalette },
		loadMore: { ...target.loadMore, ...source.loadMore }
	};
}

/**
 * Get nested value from object by path
 */
function getNestedValue(obj: TranslationKeys, path: string): string | undefined {
	const keys = path.split('.');
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let current: any = obj;

	for (const key of keys) {
		if (current === null || current === undefined || typeof current !== 'object') {
			return undefined;
		}
		current = current[key];
	}

	return typeof current === 'string' ? current : undefined;
}

/**
 * Interpolate parameters in translation string
 * Supports {param} syntax
 */
function interpolate(text: string, params?: TranslationParams): string {
	if (!params) return text;

	return text.replace(/\{(\w+)\}/g, (match, key) => {
		const value = params[key];
		return value !== undefined ? String(value) : match;
	});
}

/**
 * Create the i18n store
 */
function createI18nStore() {
	// Reactive state
	let currentLocale = $state<string>('en');
	let fallbackLocale = $state<string>('en');
	let languages = $state<LanguageItem[]>([
		{ code: 'en', name: 'English', flag: 'gb' },
		{ code: 'cs', name: 'Čeština', flag: 'cz' }
	]);
	let loadedTranslations = $state<Record<string, Partial<TranslationKeys>>>({});
	let translationLoader = $state<((locale: string) => Promise<Partial<TranslationKeys>>) | null>(
		null
	);
	let isLoading = $state<boolean>(false);

	/**
	 * Get merged translations for current locale
	 * Priority: loaded translations > built-in translations > fallback
	 */
	const translations = $derived.by(() => {
		// Start with fallback built-in locale (default to en if not found)
		const fallbackBuiltIn = builtInLocales[fallbackLocale];
		let result: TranslationKeys = fallbackBuiltIn ? { ...fallbackBuiltIn } : { ...en };

		// Merge built-in locale for current language (if different from fallback)
		if (currentLocale !== fallbackLocale && builtInLocales[currentLocale]) {
			result = deepMergeTranslations(result, builtInLocales[currentLocale]);
		}

		// Merge loaded translations for fallback locale
		if (loadedTranslations[fallbackLocale]) {
			result = deepMergeTranslations(result, loadedTranslations[fallbackLocale]);
		}

		// Merge loaded translations for current locale
		if (currentLocale !== fallbackLocale && loadedTranslations[currentLocale]) {
			result = deepMergeTranslations(result, loadedTranslations[currentLocale]);
		}

		return result;
	});

	/**
	 * Translate a key path with optional parameters
	 * @param keyPath - Dot-separated key path (e.g., 'dialog.confirm')
	 * @param params - Optional interpolation parameters
	 * @returns Translated string or key path if not found
	 */
	function t(keyPath: string, params?: TranslationParams): string {
		const value = getNestedValue(translations, keyPath);

		if (value === undefined) {
			console.warn(`[i18n] Missing translation for key: ${keyPath}`);
			return keyPath;
		}

		return interpolate(value, params);
	}

	/**
	 * Set the current locale
	 * Loads translations async if loader is configured and translations aren't cached
	 */
	async function setLocale(locale: string): Promise<void> {
		// If translations not loaded and we have a loader, fetch them
		if (!loadedTranslations[locale] && !builtInLocales[locale] && translationLoader) {
			isLoading = true;
			try {
				const loaded = await translationLoader(locale);
				loadedTranslations = { ...loadedTranslations, [locale]: loaded };
			} catch (error) {
				console.error(`[i18n] Failed to load translations for locale: ${locale}`, error);
			} finally {
				isLoading = false;
			}
		}

		currentLocale = locale;
	}

	/**
	 * Initialize the i18n store from config
	 * Called by PureAdminProvider on mount
	 */
	function initialize(config: I18nConfig): void {
		if (config.fallbackLocale) {
			fallbackLocale = config.fallbackLocale;
		}

		if (config.languages && config.languages.length > 0) {
			languages = config.languages;
		}

		if (config.translations) {
			loadedTranslations = { ...loadedTranslations, ...config.translations };
		}

		if (config.loadTranslations) {
			translationLoader = config.loadTranslations;
		}

		// Set locale last (after translations are loaded)
		currentLocale = config.locale;
	}

	/**
	 * Register additional translations for a locale
	 * Useful for adding custom translations from consuming apps
	 */
	function registerTranslations(locale: string, newTranslations: Partial<TranslationKeys>): void {
		const existing = loadedTranslations[locale] || {};
		// Merge new translations into existing
		const merged: Partial<TranslationKeys> = { ...existing };
		for (const key of Object.keys(newTranslations) as Array<keyof TranslationKeys>) {
			const existingSection = merged[key];
			const newSection = newTranslations[key];
			if (existingSection && newSection) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				merged[key] = { ...existingSection, ...newSection } as any;
			} else if (newSection) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				merged[key] = newSection as any;
			}
		}
		loadedTranslations = {
			...loadedTranslations,
			[locale]: merged
		};
	}

	/**
	 * Check if a locale has translations available
	 */
	function hasLocale(locale: string): boolean {
		return Boolean(builtInLocales[locale] || loadedTranslations[locale]);
	}

	return {
		// Translation function
		t,

		// State setters
		setLocale,
		initialize,
		registerTranslations,

		// Utility
		hasLocale,

		// Reactive getters
		get locale() {
			return currentLocale;
		},
		get fallbackLocale() {
			return fallbackLocale;
		},
		get languages() {
			return languages;
		},
		get translations() {
			return translations;
		},
		get isLoading() {
			return isLoading;
		}
	};
}

/**
 * Singleton i18n store instance
 */
export const i18nStore = createI18nStore();
