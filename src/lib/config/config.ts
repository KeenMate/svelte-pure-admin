/**
 * Pure Admin Configuration
 * Defines configuration interface and default values
 */

export interface PureAdminConfig {
	/** Application metadata */
	app: {
		/** Application name */
		name: string;
		/** Copyright text */
		copyright: string;
		/** Application version */
		version?: string;
		/** Logo URL or path */
		logo?: string;
	};

	/** Default values for common operations */
	defaults: {
		/** Default page size for pagination */
		pageSize: number;
		/** Connection timeout in milliseconds */
		connectionTimeout: number;
		/** Request timeout in milliseconds */
		requestTimeout: number;
		/** Default date format */
		dateFormat: string;
		/** Default time format */
		timeFormat: string;
		/** Default locale */
		locale: string;
	};

	/** UI preferences */
	ui: {
		/** Default theme (light/dark) */
		theme: 'light' | 'dark';
		/** Enable animations */
		animations: boolean;
		/** Sidebar collapsed by default */
		sidebarCollapsed: boolean;
		/** Compact mode */
		compact: boolean;
	};

	/** Feature flags */
	features?: {
		/** Enable specific features */
		[key: string]: boolean;
	};
}

/**
 * Default configuration values
 */
export const defaultConfig: PureAdminConfig = {
	app: {
		name: 'Pure Admin',
		copyright: `© ${new Date().getFullYear()} Pure Admin`,
		version: '1.0.0'
	},

	defaults: {
		pageSize: 20,
		connectionTimeout: 30000, // 30 seconds
		requestTimeout: 10000, // 10 seconds
		dateFormat: 'YYYY-MM-DD',
		timeFormat: 'HH:mm:ss',
		locale: 'en-US'
	},

	ui: {
		theme: 'light',
		animations: true,
		sidebarCollapsed: false,
		compact: false
	},

	features: {}
};

/**
 * Deep merge utility for configuration objects
 */
export function mergeConfig(
	defaults: PureAdminConfig,
	override: Partial<PureAdminConfig>
): PureAdminConfig {
	return {
		app: { ...defaults.app, ...override.app },
		defaults: { ...defaults.defaults, ...override.defaults },
		ui: { ...defaults.ui, ...override.ui },
		features: { ...defaults.features, ...override.features }
	};
}
