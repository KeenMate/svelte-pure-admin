/**
 * Pure Admin i18n Types
 * TypeScript interfaces for internationalization
 */

/**
 * Translation keys structure
 * All translatable strings organized by component/feature
 */
export interface TranslationKeys {
	/** Dialog service strings */
	dialog: {
		confirm: string;
		cancel: string;
		ok: string;
		alert: string;
		input: string;
		areYouSure: string;
		enterValue: string;
		defaultTitle: string;
		invalidInput: string;
	};

	/** Popconfirm strings */
	popconfirm: {
		confirm: string;
		cancel: string;
	};

	/** Keyboard shortcuts strings */
	shortcuts: {
		title: string;
		noShortcuts: string;
		generalCategory: string;
		showShortcuts: string;
	};

	/** Command palette strings */
	commandPalette: {
		placeholder: string;
		loading: string;
		commands: string;
		searchIn: string;
		search: string;
		noMatchingCommands: string;
		typeToSearch: string;
		noMatchingContexts: string;
		noResults: string;
		idleMessage: string;
		preview: string;
		navigate: string;
		select: string;
		complete: string;
		close: string;
		searchFailed: string;
		loadOptionsFailed: string;
		openCommandPalette: string;
	};

	/** Load more component strings */
	loadMore: {
		loadMore: string;
		loading: string;
	};
}

/**
 * Language item for language selector
 */
export interface LanguageItem {
	/** Language code (e.g., 'en', 'cs') */
	code: string;
	/** Display name (e.g., 'English', 'Čeština') */
	name: string;
	/** Optional country code for flag images (e.g., 'gb', 'cz') */
	flag?: string;
}

/**
 * i18n configuration for PureAdminProvider
 */
export interface I18nConfig {
	/** Current locale code */
	locale: string;
	/** Fallback locale when translation is missing (default: 'en') */
	fallbackLocale?: string;
	/** Available languages (for language selector) */
	languages?: LanguageItem[];
	/** Pre-loaded translations (can be loaded from server with index.html) */
	translations?: Record<string, Partial<TranslationKeys>>;
	/** Async loader for fetching translations on language switch */
	loadTranslations?: (locale: string) => Promise<Partial<TranslationKeys>>;
}

/**
 * Parameters for string interpolation
 */
export type TranslationParams = Record<string, string | number>;

/**
 * Nested key path helper type
 * Allows typing like 'dialog.confirm' or 'commandPalette.loading'
 */
export type TranslationKeyPath =
	| `dialog.${keyof TranslationKeys['dialog']}`
	| `popconfirm.${keyof TranslationKeys['popconfirm']}`
	| `shortcuts.${keyof TranslationKeys['shortcuts']}`
	| `commandPalette.${keyof TranslationKeys['commandPalette']}`
	| `loadMore.${keyof TranslationKeys['loadMore']}`;
