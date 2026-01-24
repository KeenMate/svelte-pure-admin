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
 * Type for arbitrary application translations
 * Allows any nested structure with string values
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppTranslations = Record<string, any>;

/**
 * Deep merge utility for arbitrary objects
 */
function deepMergeObjects<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
	const result = { ...target } as T;
	for (const key in source) {
		const sourceValue = source[key];
		const targetValue = result[key];
		if (
			sourceValue !== null &&
			sourceValue !== undefined &&
			typeof sourceValue === 'object' &&
			!Array.isArray(sourceValue) &&
			targetValue !== null &&
			targetValue !== undefined &&
			typeof targetValue === 'object' &&
			!Array.isArray(targetValue)
		) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			result[key] = deepMergeObjects(targetValue as any, sourceValue as any);
		} else if (sourceValue !== undefined) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			result[key] = sourceValue as any;
		}
	}
	return result;
}

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
 * Get nested value from object by path (works with any object structure)
 */
function getNestedValue(
	obj: TranslationKeys | AppTranslations,
	path: string
): string | undefined {
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
 * Get value from flat key object (keys like "domain.type.code")
 */
function getFlatValue(obj: AppTranslations, key: string): string | undefined {
	const value = obj[key];
	return typeof value === 'string' ? value : undefined;
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

	// Application-level translations (arbitrary structure)
	let appTranslations = $state<Record<string, AppTranslations>>({});

	/**
	 * Get merged translations for current locale (component library translations)
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
	 * Get merged app translations for current locale
	 * Supports both flat keys ("domain.type.code": "value") and nested structures
	 * Priority: current locale translations > fallback locale translations
	 */
	const currentAppTranslations = $derived.by(() => {
		let result: AppTranslations = {};

		// Merge fallback locale app translations
		if (appTranslations[fallbackLocale]) {
			result = { ...result, ...appTranslations[fallbackLocale] };
		}

		// Merge current locale app translations (if different from fallback)
		if (currentLocale !== fallbackLocale && appTranslations[currentLocale]) {
			result = { ...result, ...appTranslations[currentLocale] };
		}

		return result;
	});

	/**
	 * Translate a key path with optional parameters
	 * Checks app translations first (flat keys, then nested), then component library translations
	 * @param keyPath - Dot-separated key path (e.g., 'dialog.confirm' or 'organizations.labels.title')
	 * @param params - Optional interpolation parameters
	 * @returns Translated string or key path if not found
	 */
	function t(keyPath: string, params?: TranslationParams): string {
		// First check app translations with flat key (e.g., "organizations.labels.title": "...")
		let value = getFlatValue(currentAppTranslations, keyPath);

		// If not found as flat key, try nested path in app translations
		if (value === undefined) {
			value = getNestedValue(currentAppTranslations, keyPath);
		}

		// If not found in app translations, check component library translations (nested)
		if (value === undefined) {
			value = getNestedValue(translations, keyPath);
		}

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
	 * Register additional component library translations for a locale
	 * Useful for overriding or extending built-in component strings
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
	 * Register application-level translations for a locale
	 * Supports flat key format: "domain.type.code": "value"
	 * @param locale - The locale code (e.g., 'en', 'cs')
	 * @param newTranslations - Translation object (flat keys or nested)
	 *
	 * @example
	 * ```typescript
	 * // Flat keys (recommended)
	 * i18nStore.registerAppTranslations('en', {
	 *   'organizations.labels.title': 'Organizations',
	 *   'organizations.messages.noData': 'No organizations found'
	 * });
	 * // Then use: t('organizations.labels.title')
	 * ```
	 */
	function registerAppTranslations(locale: string, newTranslations: AppTranslations): void {
		const existing = appTranslations[locale] || {};
		appTranslations = {
			...appTranslations,
			[locale]: { ...existing, ...newTranslations }
		};
	}

	/**
	 * Check if a locale has translations available (component or app level)
	 */
	function hasLocale(locale: string): boolean {
		return Boolean(
			builtInLocales[locale] || loadedTranslations[locale] || appTranslations[locale]
		);
	}

	return {
		// Translation function
		t,

		// State setters
		setLocale,
		initialize,
		registerTranslations,
		registerAppTranslations,

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
		get appTranslations() {
			return currentAppTranslations;
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
