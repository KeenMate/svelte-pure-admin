<script lang="ts">
	/**
	 * Pure Admin Settings Panel Component (Svelte 5)
	 * Based on pure-admin demo settings-panel.mustache
	 *
	 * Provides runtime-configurable settings:
	 * - Theme and theme mode (light/dark/auto)
	 * - Layout width and sidebar options
	 * - Display options (compact mode, RTL mode)
	 * - Profile panel options
	 * - Font size and family
	 */

	import { onMount } from 'svelte';
	import type { ThemeOption } from './types';
	import { _ } from '../i18n';

	interface SettingsPanelState {
		theme: string;
		themeMode: string;
		sidebarBehavior: string;
		sidebarCollapsed: boolean;
		sidebarResizable: boolean;
		compactMode: boolean;
		rtlMode: boolean;
		profileHasAvatar: boolean;
		profileIconOnlyTabs: boolean;
		fontSize: string;
		fontFamily: string;
		containerWidth: string;
		sidebarMode: string;
	}

	interface Props {
		/** Callback when settings change */
		onsettingschange?: (settings: SettingsPanelState) => void;
		/** Available themes for the theme selector. If not provided, theme selector is hidden. */
		availableThemes?: ThemeOption[];
		/** Default theme ID (defaults to first theme in availableThemes) */
		defaultTheme?: string;
	}

	let { onsettingschange, availableThemes = [], defaultTheme }: Props = $props();

	let isOpen = $state(false);
	// svelte-ignore state_referenced_locally - intentionally capturing initial values for default state
	let settings = $state<SettingsPanelState>({
		theme: defaultTheme || (availableThemes.length > 0 ? availableThemes[0].id : ''),
		themeMode: 'light',
		sidebarBehavior: 'hide',
		sidebarCollapsed: false,
		sidebarResizable: false,
		compactMode: false,
		rtlMode: false,
		profileHasAvatar: true,
		profileIconOnlyTabs: false,
		fontSize: 'default',
		fontFamily: 'default',
		containerWidth: 'fluid',
		sidebarMode: ''
	});

	// Load settings from localStorage and URL params
	function loadSettings() {
		if (typeof window === 'undefined') return;

		// Load localStorage-based settings
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme && availableThemes.some(t => t.id === savedTheme)) {
			settings.theme = savedTheme;
		} else if (availableThemes.length > 0) {
			settings.theme = defaultTheme || availableThemes[0].id;
		}
		settings.themeMode = localStorage.getItem('theme-mode') || 'light';
		settings.fontSize = localStorage.getItem('font-size') || 'default';
		settings.fontFamily = localStorage.getItem('font-family') || 'default';
		settings.sidebarCollapsed = localStorage.getItem('sidebar-hidden') === 'true';
		settings.sidebarBehavior = localStorage.getItem('sidebar-behavior') || 'hide';
		settings.sidebarResizable = localStorage.getItem('sidebar-resizable') === 'true';
		settings.compactMode = localStorage.getItem('compact-mode') === 'true';
		settings.rtlMode = localStorage.getItem('rtl-mode') === 'true';
		// Note: profileHasAvatar uses inverted logic (true = show avatar)
		settings.profileHasAvatar = localStorage.getItem('profile-no-avatar') !== 'true';
		settings.profileIconOnlyTabs = localStorage.getItem('profile-icon-only-tabs') === 'true';
		settings.containerWidth = localStorage.getItem('container-width') || 'fluid';
		settings.sidebarMode = localStorage.getItem('sidebar-mode') || '';

		applySettings();
	}

	// Apply settings to DOM
	function applySettings() {
		if (typeof document === 'undefined') return;

		// Theme CSS (load via link tag)
		if (settings.theme && availableThemes.length > 0) {
			const selectedTheme = availableThemes.find(t => t.id === settings.theme);
			if (selectedTheme) {
				let themeLink = document.getElementById('pa-theme-css') as HTMLLinkElement;
				if (!themeLink) {
					themeLink = document.createElement('link');
					themeLink.id = 'pa-theme-css';
					themeLink.rel = 'stylesheet';
					document.head.appendChild(themeLink);
				}
				// Compare resolved-URL form on both sides — `themeLink.href`
				// always reads back as an absolute URL, while `cssPath` is
				// usually a root-relative string. A naive string compare
				// would always disagree and re-assign on every mount, which
				// invalidates downstream theme-load listeners (e.g. the
				// MutationObserver in `theme-ready.ts`).
				const desiredHref = new URL(selectedTheme.cssPath, document.baseURI).href;
				if (themeLink.href !== desiredHref) {
					themeLink.href = selectedTheme.cssPath;
				}
			}
		}

		// Theme mode (light/dark/auto)
		const resolvedMode = getResolvedThemeMode(settings.themeMode);
		applyThemeToDOM(resolvedMode);

		// Set up listener for auto mode
		setupAutoThemeListener();

		// RTL mode
		if (settings.rtlMode) {
			document.documentElement.setAttribute('dir', 'rtl');
		} else {
			document.documentElement.setAttribute('dir', 'ltr');
		}

		// Font size
		document.documentElement.classList.remove(
			'font-size-small',
			'font-size-default',
			'font-size-large',
			'font-size-xlarge'
		);
		if (settings.fontSize !== 'default') {
			document.documentElement.classList.add(`font-size-${settings.fontSize}`);
		}

		// Font family
		document.body.classList.remove(
			'font-family-serif',
			'font-family-mono',
			'font-family-cuprum',
			'font-family-fira-sans-condensed',
			'font-family-manrope',
			'font-family-martel',
			'font-family-maven-pro',
			'font-family-monda',
			'font-family-play',
			'font-family-signika',
			'font-family-yanone-kaffeesatz'
		);
		if (settings.fontFamily !== 'default') {
			document.body.classList.add(`font-family-${settings.fontFamily}`);
		}

		// Sidebar collapsed
		if (settings.sidebarCollapsed) {
			document.body.classList.add('sidebar-hidden');
		} else {
			document.body.classList.remove('sidebar-hidden');
		}

		// Sidebar behavior
		const sidebar = document.querySelector('.pa-layout__sidebar');
		if (sidebar) {
			sidebar.classList.remove('pa-layout__sidebar--icon-collapse');
			if (settings.sidebarBehavior === 'icon-collapse') {
				sidebar.classList.add('pa-layout__sidebar--icon-collapse');
			}

			// Sidebar resizable
			if (settings.sidebarResizable) {
				sidebar.classList.add('pa-layout__sidebar--resizable');
			} else {
				sidebar.classList.remove('pa-layout__sidebar--resizable');
			}
		}

		// Compact mode
		if (settings.compactMode) {
			document.body.classList.add('compact-mode');
		} else {
			document.body.classList.remove('compact-mode');
		}

		// Container width
		document.body.classList.remove(
			'pa-container-sm',
			'pa-container-md',
			'pa-container-lg',
			'pa-container-xl',
			'pa-container-2xl'
		);
		if (settings.containerWidth && settings.containerWidth !== 'fluid') {
			document.body.classList.add(`pa-container-${settings.containerWidth}`);
		}

		// Sidebar mode (sticky)
		if (settings.sidebarMode === 'sticky') {
			document.body.classList.add('pa-layout--sticky');
		} else {
			document.body.classList.remove('pa-layout--sticky');
		}

		// Profile panel - avatar visibility (hasAvatar: true = show, false = hide)
		const profileHeader = document.querySelector('.pa-profile-panel__header');
		if (profileHeader) {
			if (!settings.profileHasAvatar) {
				profileHeader.classList.add('pa-profile-panel__header--no-avatar');
			} else {
				profileHeader.classList.remove('pa-profile-panel__header--no-avatar');
			}
		}

		// Profile panel - icon-only tabs
		const profileTabs = document.querySelector('.pa-profile-panel__tabs');
		if (profileTabs) {
			if (settings.profileIconOnlyTabs) {
				profileTabs.classList.add('pa-profile-panel__tabs--icon-only');
			} else {
				profileTabs.classList.remove('pa-profile-panel__tabs--icon-only');
			}
		}

		// Notify parent
		if (onsettingschange) {
			onsettingschange(settings);
		}
	}

	// Save settings to localStorage
	function saveSettings() {
		if (typeof window === 'undefined') return;

		if (settings.theme) {
			localStorage.setItem('theme', settings.theme);
		}
		localStorage.setItem('theme-mode', settings.themeMode);
		localStorage.setItem('font-size', settings.fontSize);
		localStorage.setItem('font-family', settings.fontFamily);
		localStorage.setItem('sidebar-hidden', settings.sidebarCollapsed.toString());
		localStorage.setItem('sidebar-behavior', settings.sidebarBehavior);
		localStorage.setItem('sidebar-resizable', settings.sidebarResizable.toString());
		localStorage.setItem('compact-mode', settings.compactMode.toString());
		localStorage.setItem('rtl-mode', settings.rtlMode.toString());
		// Note: profileHasAvatar uses inverted logic for localStorage (true = no avatar hidden)
		localStorage.setItem('profile-no-avatar', (!settings.profileHasAvatar).toString());
		localStorage.setItem('profile-icon-only-tabs', settings.profileIconOnlyTabs.toString());
		localStorage.setItem('container-width', settings.containerWidth);
		localStorage.setItem('sidebar-mode', settings.sidebarMode);
	}

	// Toggle panel
	function togglePanel() {
		isOpen = !isOpen;
	}

	// Close panel when clicking outside
	function handleClickOutside(event: MouseEvent) {
		const panel = document.getElementById('settingsPanel');
		if (panel && !panel.contains(event.target as Node) && isOpen) {
			isOpen = false;
		}
	}

	// Reset to defaults
	function resetSettings() {
		if (availableThemes.length > 0) {
			settings.theme = defaultTheme || availableThemes[0].id;
		}
		settings.themeMode = 'light';
		settings.fontSize = 'default';
		settings.fontFamily = 'default';
		settings.sidebarCollapsed = false;
		settings.sidebarBehavior = 'hide';
		settings.sidebarResizable = false;
		settings.compactMode = false;
		settings.rtlMode = false;
		settings.profileHasAvatar = true;
		settings.profileIconOnlyTabs = false;
		settings.containerWidth = 'fluid';
		settings.sidebarMode = '';

		if (typeof localStorage !== 'undefined') {
			localStorage.removeItem('theme');
			localStorage.removeItem('theme-mode');
			localStorage.removeItem('font-size');
			localStorage.removeItem('font-family');
			localStorage.removeItem('sidebar-hidden');
			localStorage.removeItem('sidebar-behavior');
			localStorage.removeItem('sidebar-resizable');
			localStorage.removeItem('compact-mode');
			localStorage.removeItem('rtl-mode');
			localStorage.removeItem('profile-no-avatar');
			localStorage.removeItem('profile-icon-only-tabs');
			localStorage.removeItem('container-width');
			localStorage.removeItem('sidebar-mode');
		}

		applySettings();
	}

	let mounted = $state(false);

	// Media query for OS theme preference (used in auto mode)
	let mediaQuery: MediaQueryList | null = null;

	// Resolve 'auto' to actual light/dark based on OS preference
	function getResolvedThemeMode(mode: string): 'light' | 'dark' {
		if (mode === 'auto') {
			if (typeof window !== 'undefined') {
				return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			}
			return 'light'; // Default to light on server
		}
		return mode as 'light' | 'dark';
	}

	// Apply resolved theme to DOM
	function applyThemeToDOM(resolvedMode: 'light' | 'dark') {
		if (typeof document === 'undefined') return;
		document.body.classList.remove('pa-mode-light', 'pa-mode-dark');
		document.body.classList.add(`pa-mode-${resolvedMode}`);
	}

	// Handle OS theme change when in auto mode
	function handleOSThemeChange(e: MediaQueryListEvent) {
		if (settings.themeMode === 'auto') {
			applyThemeToDOM(e.matches ? 'dark' : 'light');
		}
	}

	// Set up listener for OS theme changes when in auto mode
	function setupAutoThemeListener() {
		if (typeof window === 'undefined') return;

		// Clean up previous listener
		if (mediaQuery) {
			mediaQuery.removeEventListener('change', handleOSThemeChange);
			mediaQuery = null;
		}

		// Set up new listener if in auto mode
		if (settings.themeMode === 'auto') {
			mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			mediaQuery.addEventListener('change', handleOSThemeChange);
		}
	}

	// Watch for settings changes (only after mount to avoid overwriting loaded values)
	$effect(() => {
		if (mounted) {
			// Access all settings to track them
			settings.theme;
			settings.themeMode;
			settings.fontSize;
			settings.fontFamily;
			settings.sidebarCollapsed;
			settings.sidebarBehavior;
			settings.sidebarResizable;
			settings.compactMode;
			settings.rtlMode;
			settings.profileHasAvatar;
			settings.profileIconOnlyTabs;
			settings.containerWidth;
			settings.sidebarMode;

			saveSettings();
			applySettings();
		}
	});

	onMount(() => {
		loadSettings();
		mounted = true;

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			// Clean up media query listener
			if (mediaQuery) {
				mediaQuery.removeEventListener('change', handleOSThemeChange);
				mediaQuery = null;
			}
		};
	});
</script>

<!-- Floating Settings Panel -->
<div class="pa-settings-panel" class:pa-settings-panel--open={isOpen} id="settingsPanel">
	<button class="pa-settings-panel__toggle" onclick={togglePanel} title={$_('pureAdmin.a11y.settings')}>⚙</button>

	<div class="pa-settings-panel__content">
		<h3 class="pa-settings-panel__title">Settings</h3>

		<!-- Theme -->
		{#if availableThemes.length > 0}
			<div class="pa-settings-panel__section">
				<label class="pa-settings-panel__label" for="settings-theme">Theme</label>
				<select id="settings-theme" class="pa-settings-panel__select" bind:value={settings.theme}>
					{#each availableThemes as theme (theme.id)}
						<option value={theme.id}>{theme.name}</option>
					{/each}
				</select>
			</div>
		{/if}

		<!-- Theme Mode -->
		<div class="pa-settings-panel__section">
			<label class="pa-settings-panel__label" for="settings-themeMode">Theme Mode</label>
			<select id="settings-themeMode" class="pa-settings-panel__select" bind:value={settings.themeMode}>
				<option value="light">Light</option>
				<option value="dark">Dark</option>
				<option value="auto">Auto (System)</option>
			</select>
		</div>

		<!-- Container Width -->
		<div class="pa-settings-panel__section">
			<label class="pa-settings-panel__label" for="settings-containerWidth">Layout Width</label>
			<select id="settings-containerWidth" class="pa-settings-panel__select" bind:value={settings.containerWidth}>
				<option value="fluid">Fluid (Full Width)</option>
				<option value="sm">Small (768px)</option>
				<option value="md">Medium (1024px)</option>
				<option value="lg">Large (1280px)</option>
				<option value="xl">Extra Large (1600px)</option>
				<option value="2xl">2X Large (1920px)</option>
			</select>
		</div>

		<!-- Sidebar Mode -->
		<div class="pa-settings-panel__section">
			<label class="pa-settings-panel__label" for="settings-sidebarMode">Sidebar Mode</label>
			<select id="settings-sidebarMode" class="pa-settings-panel__select" bind:value={settings.sidebarMode}>
				<option value="">Scrolls with Content</option>
				<option value="sticky">Fixed Position</option>
			</select>
		</div>

		<!-- Sidebar Behavior -->
		<div class="pa-settings-panel__section">
			<label class="pa-settings-panel__label" for="settings-sidebarBehavior">Sidebar Behavior</label>
			<select id="settings-sidebarBehavior" class="pa-settings-panel__select" bind:value={settings.sidebarBehavior}>
				<option value="hide">Hide Completely</option>
				<option value="icon-collapse">Show Icons Only</option>
			</select>
		</div>

		<!-- Sidebar Options -->
		<div class="pa-settings-panel__section">
			<span class="pa-settings-panel__label">Sidebar</span>
			<div class="pa-settings-panel__checkbox-group">
				<label class="pa-settings-panel__checkbox">
					<input type="checkbox" bind:checked={settings.sidebarCollapsed} />
					<span>Collapsed</span>
				</label>
				<label class="pa-settings-panel__checkbox">
					<input type="checkbox" bind:checked={settings.sidebarResizable} />
					<span>Resizable</span>
				</label>
			</div>
		</div>

		<!-- Display Options -->
		<div class="pa-settings-panel__section">
			<span class="pa-settings-panel__label">Display</span>
			<div class="pa-settings-panel__checkbox-group">
				<label class="pa-settings-panel__checkbox">
					<input type="checkbox" bind:checked={settings.compactMode} />
					<span>Compact Mode</span>
				</label>
				<label class="pa-settings-panel__checkbox">
					<input type="checkbox" bind:checked={settings.rtlMode} />
					<span>RTL Mode</span>
				</label>
			</div>
		</div>

		<!-- Profile Panel -->
		<div class="pa-settings-panel__section">
			<span class="pa-settings-panel__label">Profile Panel</span>
			<div class="pa-settings-panel__checkbox-group">
				<label class="pa-settings-panel__checkbox">
					<input type="checkbox" checked={!settings.profileHasAvatar} onchange={(e) => settings.profileHasAvatar = !e.currentTarget.checked} />
					<span>Hide Avatar</span>
				</label>
				<label class="pa-settings-panel__checkbox">
					<input type="checkbox" bind:checked={settings.profileIconOnlyTabs} />
					<span>Icon-Only Tabs</span>
				</label>
			</div>
		</div>

		<!-- Font Size -->
		<div class="pa-settings-panel__section">
			<label class="pa-settings-panel__label" for="settings-fontSize">Font Size</label>
			<select id="settings-fontSize" class="pa-settings-panel__select" bind:value={settings.fontSize}>
				<option value="small">Small (14px)</option>
				<option value="default">Default (16px)</option>
				<option value="large">Large (18px)</option>
				<option value="xlarge">Extra Large (20px)</option>
			</select>
		</div>

		<!-- Font Family -->
		<div class="pa-settings-panel__section">
			<label class="pa-settings-panel__label" for="settings-fontFamily">Font Family</label>
			<select id="settings-fontFamily" class="pa-settings-panel__select" bind:value={settings.fontFamily}>
				<option value="default">Theme Default</option>
				<option value="serif">Serif</option>
				<option value="mono">Monospace</option>
				<option value="cuprum">Cuprum</option>
				<option value="fira-sans-condensed">Fira Sans Condensed</option>
				<option value="manrope">Manrope</option>
				<option value="martel">Martel</option>
				<option value="maven-pro">Maven Pro</option>
				<option value="monda">Monda</option>
				<option value="play">Play</option>
				<option value="signika">Signika</option>
				<option value="yanone-kaffeesatz">Yanone Kaffeesatz</option>
			</select>
		</div>

		<!-- Reset Button -->
		<div class="pa-settings-panel__section">
			<button class="pa-btn pa-btn--secondary pa-btn--block" onclick={resetSettings}>
				Reset to Defaults
			</button>
		</div>
	</div>
</div>
