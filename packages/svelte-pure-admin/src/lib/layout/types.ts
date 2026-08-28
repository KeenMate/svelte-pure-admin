/**
 * Theme option for the SettingsPanel theme selector.
 *
 * `id` / `name` / `cssPath` are all a host must supply. The remaining fields
 * mirror the theme's `theme.json` manifest and, when present, let the panel
 * drive the Mode and Color Variant selectors off the theme instead of a
 * hardcoded light/dark list — the same data pure-admin's demo panel gets from
 * `GET /api/themes/manifests`.
 *
 * Both manifest schemas are accepted (see `internal/theme-manifest.ts`):
 *   - current: `colorVariants` is an array, each variant carrying its own `modes`
 *   - legacy:  `colorVariants.supported` + a separate top-level `modes.supported`
 */

/** One light/dark mode a colour variant supports. */
export interface ThemeModeOption {
	/** Mode identifier — 'light' | 'dark' (schema-open, so typed as string). */
	id: string;
	/** Display name; falls back to a capitalised `id`. */
	name?: string;
	/** Marks the mode applied when the theme is first selected. */
	default?: boolean;
}

/** One colour variant of a theme (empty `id` = the theme's default variant). */
export interface ThemeColorVariantOption {
	/** Variant identifier; `''` for the default variant. */
	id?: string;
	/** Display name for the variant. */
	name?: string;
	/** Longer description — rendered as the option's `title`. */
	description?: string;
	/** CSS file for this variant, relative to the theme root. */
	file?: string;
	/** Modes this variant supports (current schema). */
	modes?: ThemeModeOption[];
}

/** Legacy `colorVariants` object form. */
export interface ThemeColorVariantsLegacy {
	supported?: ThemeColorVariantOption[];
	default?: string;
	/** CSS class pattern, `{variant}` placeholder. */
	cssClass?: string;
}

/** Legacy top-level `modes` object form. */
export interface ThemeModesLegacy {
	supported?: string[];
	default?: string;
	/** CSS class pattern, `{mode}` placeholder. */
	cssClass?: string;
}

export interface ThemeOption {
	/** Unique identifier for the theme (e.g., 'audi', 'express') */
	id: string;
	/** Display name for the theme (e.g., 'Audi', 'Express') */
	name: string;
	/** Path to the theme CSS file (e.g., '/themes/audi.css') */
	cssPath: string;
	/** Colour variants — array (current schema) or `{ supported }` (legacy). */
	colorVariants?: ThemeColorVariantOption[] | ThemeColorVariantsLegacy;
	/** Legacy top-level modes block; ignored when variants carry their own `modes`. */
	modes?: ThemeModesLegacy;
	/** Mode class pattern, `{mode}` placeholder. Default `pc-mode-{mode}`. */
	modeCssClass?: string;
	/** Variant class pattern, `{variant}` placeholder. Default `pa-color-{variant}`. */
	variantCssClass?: string;
}
