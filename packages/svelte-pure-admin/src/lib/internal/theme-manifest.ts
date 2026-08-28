/**
 * Theme-manifest readers shared by the SettingsPanel.
 *
 * Ports the schema handling from pure-admin's `demo/js/settings-panel.js`
 * (getManifestVariants / getModesForVariant / getDefaultModeForVariant) so the
 * Svelte panel derives modes and colour variants from the theme instead of
 * assuming a fixed light/dark pair.
 *
 * Two manifest schemas exist in the wild and both are supported:
 *   - current: `colorVariants: [{ id, name, file, modes: [{ id, default }] }]`
 *   - legacy:  `colorVariants: { supported: [...] }` + `modes: { supported, default }`
 */

import type {
	ThemeColorVariantOption,
	ThemeColorVariantsLegacy,
	ThemeModeOption,
	ThemeOption
} from '../layout/types';

export const DEFAULT_MODE_CSS_CLASS = 'pc-mode-{mode}';
export const DEFAULT_VARIANT_CSS_CLASS = 'pa-color-{variant}';

/** True when the manifest uses the current array-shaped `colorVariants`. */
function variantsArray(theme: ThemeOption | null | undefined): ThemeColorVariantOption[] | null {
	const cv = theme?.colorVariants;
	return Array.isArray(cv) ? cv : null;
}

/** The legacy `{ supported, default, cssClass }` object, or null when absent/array-shaped. */
function variantsLegacy(theme: ThemeOption | null | undefined): ThemeColorVariantsLegacy | null {
	const cv = theme?.colorVariants;
	return cv && !Array.isArray(cv) ? cv : null;
}

/**
 * Colour variants declared by the theme, in manifest order.
 * The default variant (`id: ''`) is kept — callers decide whether a single
 * entry is worth showing a selector for.
 */
export function getVariants(theme: ThemeOption | null | undefined): ThemeColorVariantOption[] {
	if (!theme) return [];
	const arr = variantsArray(theme);
	// Entries without an `id` key are malformed; `id: ''` (the default variant) is valid.
	if (arr) return arr.filter((v) => v.id !== undefined);
	return variantsLegacy(theme)?.supported ?? [];
}

/** Modes supported by one variant (`''` = default variant), as mode option objects. */
export function getModes(
	theme: ThemeOption | null | undefined,
	variantId: string
): ThemeModeOption[] {
	if (!theme) return [];
	const arr = variantsArray(theme);
	if (arr) {
		const variant = arr.find((v) => (v.id || '') === (variantId || ''));
		if (Array.isArray(variant?.modes)) return variant.modes;
	}
	// Legacy: a flat list of mode ids shared by every variant.
	const supported = theme.modes?.supported;
	if (supported) return supported.map((id) => ({ id }));
	return [];
}

/**
 * Mode applied when a theme (or variant) is selected with nothing stored.
 * Falls back to 'dark' to match pure-admin's panel — its themes are dark-first.
 */
export function getDefaultMode(
	theme: ThemeOption | null | undefined,
	variantId: string
): string {
	// Current schema: the variant's own modes decide, via the `default` flag.
	const arr = variantsArray(theme);
	if (arr) {
		const variant = arr.find((v) => (v.id || '') === (variantId || ''));
		if (Array.isArray(variant?.modes) && variant.modes.length > 0) {
			return (variant.modes.find((m) => m.default) ?? variant.modes[0]).id;
		}
	}
	// Legacy: an explicit `modes.default` outranks first-in-`supported`.
	if (theme?.modes?.default) return theme.modes.default;
	const modes = getModes(theme, variantId);
	if (modes.length > 0) return modes[0].id;
	return 'dark';
}

/** Default variant id for a theme — the flagged/first one, else `''`. */
export function getDefaultVariant(theme: ThemeOption | null | undefined): string {
	if (!theme) return '';
	const legacyDefault = variantsLegacy(theme)?.default;
	if (legacyDefault !== undefined) return legacyDefault;
	return getVariants(theme)[0]?.id ?? '';
}

/** `pc-mode-{mode}`-style pattern from the manifest, honouring the legacy location. */
export function getModeCssClass(theme: ThemeOption | null | undefined): string {
	return theme?.modeCssClass ?? theme?.modes?.cssClass ?? DEFAULT_MODE_CSS_CLASS;
}

/** `pa-color-{variant}`-style pattern from the manifest, honouring the legacy location. */
export function getVariantCssClass(theme: ThemeOption | null | undefined): string {
	return theme?.variantCssClass ?? variantsLegacy(theme)?.cssClass ?? DEFAULT_VARIANT_CSS_CLASS;
}

/** Human label for a mode/variant option — manifest `name`, else a capitalised id. */
export function optionLabel(option: { id?: string; name?: string }): string {
	if (option.name) return option.name;
	const id = option.id ?? '';
	return id ? id.charAt(0).toUpperCase() + id.slice(1) : 'Default';
}
