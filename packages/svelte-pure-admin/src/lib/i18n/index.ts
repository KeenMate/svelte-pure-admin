/**
 * Pure Admin i18n Module
 * Lightweight internationalization for component library
 */

// Store
export { i18nStore } from './store.svelte';
export type { AppTranslations } from './store.svelte';

// Hooks
export { useI18n, useTranslate, useScopedTranslate } from './hooks';

// Types
export type {
	TranslationKeys,
	LanguageItem,
	I18nConfig,
	TranslationParams,
	TranslationKeyPath
} from './types';

// Built-in locales (for reference/extension)
export { en } from './locales/en';
export { cs } from './locales/cs';
