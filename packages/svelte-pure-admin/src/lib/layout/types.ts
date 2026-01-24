/**
 * Theme option for the SettingsPanel theme selector
 */
export interface ThemeOption {
	/** Unique identifier for the theme (e.g., 'audi', 'express') */
	id: string;
	/** Display name for the theme (e.g., 'Audi', 'Express') */
	name: string;
	/** Path to the theme CSS file (e.g., '/themes/audi.css') */
	cssPath: string;
}
