<script lang="ts">
	/**
	 * Pure Admin Settings Panel Component (Svelte 5)
	 * Based on pure-admin-visual layout.mustache settings panel
	 *
	 * Provides runtime-configurable settings:
	 * - Sidebar mode and behavior
	 * - Compact mode
	 * - Font size and family
	 *
	 * Note: Theme and Layout Width require component props (not runtime switching)
	 */

	import { onMount } from 'svelte';

	interface SettingsPanelState {
		sidebarBehavior: string;
		sidebarCollapsed: boolean;
		compactMode: boolean;
		fontSize: string;
		fontFamily: string;
		containerWidth: string;
		sidebarMode: string;
	}

	interface Props {
		/** Callback when settings change */
		onSettingsChange?: (settings: SettingsPanelState) => void;
	}

	let { onSettingsChange }: Props = $props();

	let isOpen = $state(false);
	let settings = $state<SettingsPanelState>({
		sidebarBehavior: 'hide',
		sidebarCollapsed: false,
		compactMode: false,
		fontSize: 'default',
		fontFamily: 'default',
		containerWidth: 'fluid',
		sidebarMode: ''
	});

	// Load settings from localStorage and URL params
	function loadSettings() {
		if (typeof window === 'undefined') return;

		// Load localStorage-based settings
		settings.fontSize = localStorage.getItem('font-size') || 'default';
		settings.fontFamily = localStorage.getItem('font-family') || 'default';
		settings.sidebarCollapsed = localStorage.getItem('sidebar-hidden') === 'true';
		settings.sidebarBehavior = localStorage.getItem('sidebar-behavior') || 'hide';
		settings.compactMode = localStorage.getItem('compact-mode') === 'true';

		// Load URL-based settings from query params
		const url = new URL(window.location.href);
		settings.containerWidth = url.searchParams.get('containerWidth') || 'fluid';
		settings.sidebarMode = url.searchParams.get('sidebarMode') || '';

		applySettings();
	}

	// Apply settings to DOM
	function applySettings() {
		if (typeof document === 'undefined') return;

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
			'font-family-delivery',
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
		}

		// Compact mode
		if (settings.compactMode) {
			document.body.classList.add('compact-mode');
		} else {
			document.body.classList.remove('compact-mode');
		}

		// Notify parent
		if (onSettingsChange) {
			onSettingsChange(settings);
		}
	}

	// Save settings to localStorage
	function saveSettings() {
		if (typeof window === 'undefined') return;

		localStorage.setItem('font-size', settings.fontSize);
		localStorage.setItem('font-family', settings.fontFamily);
		localStorage.setItem('sidebar-hidden', settings.sidebarCollapsed.toString());
		localStorage.setItem('sidebar-behavior', settings.sidebarBehavior);
		localStorage.setItem('compact-mode', settings.compactMode.toString());
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

	// Handle settings that require URL reload (containerWidth, sidebarMode)
	function handleUrlSetting(key: string, value: string) {
		if (typeof window === 'undefined') return;

		const url = new URL(window.location.href);
		url.searchParams.set(key, value);
		window.location.href = url.toString();
	}


	// Reset to defaults
	function resetSettings() {
		settings.fontSize = 'default';
		settings.fontFamily = 'default';
		settings.sidebarCollapsed = false;
		settings.sidebarBehavior = 'hide';
		settings.compactMode = false;

		if (typeof localStorage !== 'undefined') {
			localStorage.removeItem('font-size');
			localStorage.removeItem('font-family');
			localStorage.removeItem('sidebar-hidden');
			localStorage.removeItem('sidebar-behavior');
			localStorage.removeItem('compact-mode');
		}

		applySettings();

		// Reset URL-based settings (containerWidth, sidebarMode) by reloading with defaults
		if (typeof window !== 'undefined') {
			const url = new URL(window.location.href);
			url.searchParams.set('containerWidth', 'fluid');
			url.searchParams.set('sidebarMode', '');
			window.location.href = url.toString();
		}
	}

	let mounted = $state(false);

	// Watch for settings changes (only after mount to avoid overwriting loaded values)
	$effect(() => {
		if (mounted) {
			// Access all settings to track them
			settings.fontSize;
			settings.fontFamily;
			settings.sidebarCollapsed;
			settings.sidebarBehavior;
			settings.compactMode;

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
		};
	});
</script>

<!-- Floating Settings Panel -->
<div class="pa-settings-panel" class:pa-settings-panel--open={isOpen} id="settingsPanel">
	<button class="pa-settings-panel__toggle" onclick={togglePanel} title="Settings">⚙</button>

	<div class="pa-settings-panel__content">
		<h3 class="pa-settings-panel__title">Settings</h3>

		<!-- Container Width -->
		<div class="pa-settings-panel__section">
			<label class="pa-settings-panel__label">Layout Width</label>
			<select class="pa-settings-panel__select" bind:value={settings.containerWidth} onchange={(e) => handleUrlSetting('containerWidth', e.currentTarget.value)}>
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
			<label class="pa-settings-panel__label">Sidebar Mode</label>
			<select class="pa-settings-panel__select" bind:value={settings.sidebarMode} onchange={(e) => handleUrlSetting('sidebarMode', e.currentTarget.value)}>
				<option value="">Scrolls with Content</option>
				<option value="sticky">Fixed Position</option>
			</select>
		</div>

		<!-- Sidebar Behavior -->
		<div class="pa-settings-panel__section">
			<label class="pa-settings-panel__label">Sidebar Behavior</label>
			<select class="pa-settings-panel__select" bind:value={settings.sidebarBehavior}>
				<option value="hide">Hide Completely</option>
				<option value="icon-collapse">Show Icons Only</option>
			</select>
		</div>

		<!-- Sidebar Collapsed -->
		<div class="pa-settings-panel__section">
			<label class="pa-settings-panel__label">Sidebar</label>
			<div class="pa-settings-panel__checkbox-group">
				<label class="pa-settings-panel__checkbox">
					<input type="checkbox" bind:checked={settings.sidebarCollapsed} />
					<span>Collapsed</span>
				</label>
			</div>
		</div>

		<!-- Compact Mode -->
		<div class="pa-settings-panel__section">
			<label class="pa-settings-panel__label">Display</label>
			<div class="pa-settings-panel__checkbox-group">
				<label class="pa-settings-panel__checkbox">
					<input type="checkbox" bind:checked={settings.compactMode} />
					<span>Compact Mode</span>
				</label>
			</div>
		</div>

		<!-- Font Size -->
		<div class="pa-settings-panel__section">
			<label class="pa-settings-panel__label">Font Size</label>
			<select class="pa-settings-panel__select" bind:value={settings.fontSize}>
				<option value="small">Small (14px)</option>
				<option value="default">Default (16px)</option>
				<option value="large">Large (18px)</option>
				<option value="xlarge">Extra Large (20px)</option>
			</select>
		</div>

		<!-- Font Family -->
		<div class="pa-settings-panel__section">
			<label class="pa-settings-panel__label">Font Family</label>
			<select class="pa-settings-panel__select" bind:value={settings.fontFamily}>
				<option value="default">Theme Default</option>
				<option value="serif">Serif</option>
				<option value="mono">Monospace</option>
				<option value="delivery">Delivery</option>
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
