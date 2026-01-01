<script lang="ts">
	import {
		PureAdminProvider,
		Layout,
		LayoutInner,
		LayoutContent,
		Navbar,
		Sidebar,
		SidebarItem,
		Main,
		Footer,
		PopoverContainer,
		SettingsPanel,
		ProfilePanel,
		NotificationsPanel,
		DialogContainer,
		Heading,
		Paragraph,
		NavItem,
		NavDropdown,
		NavbarSearch,
		CommandPalette
	} from '$lib';
	import type { PureAdminConfig, Command, SearchContext, SearchResult } from '$lib';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import '@keenmate/pure-admin-theme-audi';
	import '../app.css';

	let { data, children } = $props();

	let sidebarHidden = $state(false);
	let showProfilePanel = $state(false);
	let showNotifications = $state(false);
	let showCommandPalette = $state(false);

	function toggleSidebar() {
		sidebarHidden = !sidebarHidden;
		if (typeof document !== 'undefined') {
			document.body.classList.toggle('sidebar-hidden', sidebarHidden);
		}
	}

	function toggleProfilePanel() {
		showProfilePanel = !showProfilePanel;
		if (showProfilePanel) {
			showNotifications = false; // Close notifications if open
		}
	}

	function toggleNotifications() {
		showNotifications = !showNotifications;
		if (showNotifications) {
			showProfilePanel = false; // Close profile panel if open
		}
	}

	// Handle click outside to close panels
	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;

		// Check if click is outside notification panel
		if (showNotifications) {
			const notificationBtn = target.closest('.pa-notifications__btn');
			const notificationPanel = target.closest('.pa-notifications__panel');
			if (!notificationBtn && !notificationPanel) {
				showNotifications = false;
			}
		}

		// Check if click is outside profile panel
		if (showProfilePanel) {
			const profileBtn = target.closest('.pa-header__profile-btn');
			const profilePanel = target.closest('.pa-profile-panel');
			if (!profileBtn && !profilePanel) {
				showProfilePanel = false;
			}
		}
	}

	// Note: Critical classes (container width, sidebar mode, theme, font size/family, compact mode)
	// are applied in app.html blocking script to prevent FOUC.
	// This onMount only handles click outside and cleanup.
	onMount(() => {
		// Add click outside handler
		document.addEventListener('click', handleClickOutside);

		// Apply sidebar icon-collapse class to sidebar element (can't be done in blocking script)
		const sidebarBehavior = localStorage.getItem('sidebar-behavior') || 'hide';
		const sidebar = document.querySelector('.pa-layout__sidebar');
		if (sidebar && sidebarBehavior === 'icon-collapse') {
			sidebar.classList.add('pa-layout__sidebar--icon-collapse');
		}

		// Cleanup function to remove classes when unmounting
		return () => {
			// Remove click outside handler
			document.removeEventListener('click', handleClickOutside);

			// Remove container width classes
			document.body.classList.remove('pa-container-sm', 'pa-container-md', 'pa-container-lg', 'pa-container-xl', 'pa-container-2xl');
			// Remove sidebar mode class
			document.body.classList.remove('pa-layout--sticky');
			// Remove localStorage-based classes
			document.documentElement.classList.remove('font-size-small', 'font-size-large', 'font-size-xlarge');
			document.body.classList.remove('font-family-serif', 'font-family-mono', 'font-family-delivery', 'font-family-cuprum', 'font-family-fira-sans-condensed', 'font-family-manrope', 'font-family-martel', 'font-family-maven-pro', 'font-family-monda', 'font-family-play', 'font-family-signika', 'font-family-yanone-kaffeesatz');
			document.body.classList.remove('sidebar-hidden', 'compact-mode', 'sidebar-icon-collapse');
			const sidebar = document.querySelector('.pa-layout__sidebar');
			if (sidebar) {
				sidebar.classList.remove('pa-layout__sidebar--icon-collapse');
			}
		};
	});

	// Navigation pages for search
	const pages = [
		{ id: 'home', title: 'Dashboard', path: '/', icon: '📊' },
		{ id: 'components', title: 'Components', path: '/components', icon: '🧩' },
		{ id: 'buttons', title: 'Buttons', path: '/buttons', icon: '🔘' },
		{ id: 'cards', title: 'Cards', path: '/cards', icon: '🃏' },
		{ id: 'tabs', title: 'Tabs', path: '/tabs', icon: '📑' },
		{ id: 'badges', title: 'Badges', path: '/badges', icon: '🏷️' },
		{ id: 'lists', title: 'Lists', path: '/lists', icon: '📝' },
		{ id: 'checkbox-lists', title: 'Checkbox Lists', path: '/checkbox-lists', icon: '☑️' },
		{ id: 'code', title: 'Code', path: '/code', icon: '💻' },
		{ id: 'alerts', title: 'Alerts', path: '/alerts', icon: '⚠️' },
		{ id: 'loaders', title: 'Loaders', path: '/loaders', icon: '⏳' },
		{ id: 'tooltips', title: 'Tooltips', path: '/tooltips', icon: '💬' },
		{ id: 'modals', title: 'Modals', path: '/modals', icon: '🪟' },
		{ id: 'modal-dialogs', title: 'Modal Dialogs', path: '/modal-dialogs', icon: '💭' },
		{ id: 'popconfirm', title: 'Popconfirm', path: '/popconfirm', icon: '❓' },
		{ id: 'command-palette', title: 'Command Palette', path: '/command-palette', icon: '🎨' },
		{ id: 'forms', title: 'Forms', path: '/forms', icon: '📋' },
		{ id: 'tables', title: 'Tables', path: '/tables', icon: '📊' },
		{ id: 'tables-sizing', title: 'Table Sizing', path: '/tables-sizing', icon: '📏' },
		{ id: 'timeline-simple', title: 'Timeline Simple', path: '/timeline-simple', icon: '⏱️' },
		{ id: 'timeline-block', title: 'Timeline Block', path: '/timeline-block', icon: '📦' },
		{ id: 'timeline-feed', title: 'Timeline Feed', path: '/timeline-feed', icon: '📰' }
	];

	// Commands for the command palette
	const commands: Command[] = [
		{
			shortcut: '/go',
			aliases: ['/goto', '/nav', '/navigate'],
			name: 'Go to Page',
			description: 'Navigate to a page',
			icon: '🚀',
			steps: [
				{
					id: 'page',
					placeholder: 'Select a page...',
					getOptions: (query) => {
						const filtered = pages.filter(
							(p) =>
								p.title.toLowerCase().includes(query.toLowerCase()) ||
								p.path.toLowerCase().includes(query.toLowerCase())
						);
						return filtered.map((p) => ({
							id: p.id,
							label: p.title,
							description: p.path,
							icon: p.icon,
							value: p
						}));
					}
				}
			],
			getPreview: (selections) => {
				const page = selections[0]?.option?.value;
				return page ? `Navigate to ${page.title}` : '';
			},
			onComplete: (selections) => {
				const page = selections[0]?.option?.value;
				if (page) goto(page.path);
			}
		},
		{
			shortcut: '/theme',
			aliases: ['/dark', '/light'],
			name: 'Toggle Theme',
			description: 'Switch between light and dark mode',
			icon: '🌓',
			steps: [],
			onComplete: () => {
				document.body.classList.toggle('pa-mode-light');
			}
		},
		{
			shortcut: '/sidebar',
			name: 'Toggle Sidebar',
			description: 'Show or hide the sidebar',
			icon: '📐',
			steps: [],
			onComplete: () => {
				toggleSidebar();
			}
		},
		{
			shortcut: '/settings',
			name: 'Open Settings',
			description: 'Open the settings panel',
			icon: '⚙️',
			steps: [],
			onComplete: () => {
				const settingsBtn = document.querySelector('.pa-settings-panel__toggle') as HTMLButtonElement;
				settingsBtn?.click();
			}
		}
	];

	// Search contexts for the command palette
	const contexts: SearchContext[] = [
		{
			shortcut: ':p',
			aliases: [':pages', ':page'],
			name: 'Pages',
			description: 'Search pages',
			icon: '📄',
			onSearch: (query) => {
				return pages
					.filter(
						(p) =>
							p.title.toLowerCase().includes(query.toLowerCase()) ||
							p.path.toLowerCase().includes(query.toLowerCase())
					)
					.map((p) => ({
						id: p.id,
						title: p.title,
						subtitle: p.path,
						icon: p.icon,
						data: p
					}));
			},
			onSelect: (result) => {
				goto(result.data.path);
			}
		},
		{
			shortcut: ':c',
			aliases: [':components', ':comp'],
			name: 'Components',
			description: 'Search component pages',
			icon: '🧩',
			onSearch: (query) => {
				const componentPages = pages.filter((p) =>
					p.path !== '/' &&
					!p.path.includes('settings') &&
					!p.path.includes('timeline')
				);
				return componentPages
					.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
					.map((p) => ({
						id: p.id,
						title: p.title,
						subtitle: p.path,
						icon: p.icon,
						data: p
					}));
			},
			onSelect: (result) => {
				goto(result.data.path);
			}
		}
	];

	// Global search function
	function globalSearch(query: string): SearchResult[] {
		return pages
			.filter(
				(p) =>
					p.title.toLowerCase().includes(query.toLowerCase()) ||
					p.path.toLowerCase().includes(query.toLowerCase())
			)
			.map((p) => ({
				id: p.id,
				title: p.title,
				subtitle: p.path,
				icon: p.icon,
				data: p
			}));
	}

	function handleGlobalSelect(result: SearchResult) {
		goto(result.data.path);
	}

	// Custom configuration
	const myConfig: Partial<PureAdminConfig> = {
		app: {
			name: 'Pure Admin Demo',
			copyright: '© 2024 My Company'
		},
		defaults: {
			pageSize: 25,
			connectionTimeout: 30000,
			requestTimeout: 5000,
			dateFormat: 'YYYY-MM-DD',
			timeFormat: 'HH:mm:ss',
			locale: 'en-US'
		}
	};
</script>

<PureAdminProvider config={myConfig}>
	<PopoverContainer />
	<SettingsPanel />
	<ProfilePanel bind:show={showProfilePanel} />
	<DialogContainer />
	<CommandPalette
		bind:show={showCommandPalette}
		{commands}
		{contexts}
		{globalSearch}
		onGlobalSelect={handleGlobalSelect}
	/>

	<Navbar onBurgerClick={toggleSidebar} showBurger={true} burgerActive={sidebarHidden}>
		{#snippet brand()}
			<Heading level={1}>Pure Admin</Heading>
		{/snippet}

		{#snippet navLeft()}
			<NavItem href="/">📊 Dashboard</NavItem>
			<NavItem href="/components" hasDropdown>
				🧩 Components
				{#snippet dropdown()}
					<NavDropdown>
						<NavItem href="/buttons">Buttons</NavItem>
						<NavItem href="/cards">Cards</NavItem>
						<NavItem href="/tabs">Tabs</NavItem>
						<NavItem hasDropdown>
							More ›
							{#snippet dropdown()}
								<NavDropdown level2>
									<NavItem href="/badges">Badges</NavItem>
									<NavItem href="/modals">Modals</NavItem>
									<NavItem href="/loaders">Loaders</NavItem>
									<NavItem href="/tooltips">Tooltips</NavItem>
									<NavItem href="/popconfirm">Popconfirm</NavItem>
									<NavItem href="/alerts">Alerts</NavItem>
									<NavItem href="/lists">Lists</NavItem>
									<NavItem href="/checkbox-lists">Checkbox Lists</NavItem>
									<NavItem href="/code">Code</NavItem>
								</NavDropdown>
							{/snippet}
						</NavItem>
					</NavDropdown>
				{/snippet}
			</NavItem>
			<NavItem href="/forms">📝 Forms</NavItem>
		{/snippet}

		{#snippet search()}
			<NavbarSearch
				placeholder="Search..."
				onClick={() => (showCommandPalette = true)}
			/>
		{/snippet}

		{#snippet navRight()}
			<NavItem href="/alerts">⚠️ Alerts</NavItem>
			<NavItem href="/tables">📋 Tables</NavItem>
		{/snippet}

		{#snippet profile()}
			<!-- Notification Bell -->
			<div class="pa-notifications">
				<button class="pa-notifications__btn" onclick={toggleNotifications} aria-label="Notifications">
					<span class="pa-notifications__icon">🔔</span>
					<span class="pa-notifications__badge">3</span>
				</button>
				<NotificationsPanel bind:show={showNotifications} />
			</div>

			<!-- Profile Button -->
			<button class="pa-header__profile-btn" onclick={toggleProfilePanel} aria-label="User Profile">
				<span class="pa-btn__icon">👤</span>
				<span class="pa-header__profile-name">John Doe</span>
			</button>
		{/snippet}
	</Navbar>

	<Layout>
		<LayoutInner>
			<Sidebar>
				<!-- Dashboard -->
				<SidebarItem href="/" label="Dashboard">
					{#snippet icon()}📊{/snippet}
				</SidebarItem>

				<!-- Components with submenu -->
				<SidebarItem label="Components" hasSubmenu={true}>
					{#snippet icon()}🧩{/snippet}
					{#snippet submenu()}
						<SidebarItem href="/components" label="Overview" />
						<SidebarItem href="/buttons" label="Buttons" />
						<SidebarItem href="/cards" label="Cards" />
						<SidebarItem href="/tabs" label="Tabs" />
						<SidebarItem href="/badges" label="Badges" />
						<SidebarItem href="/lists" label="Lists" />
						<SidebarItem href="/checkbox-lists" label="Checkbox Lists" />
						<SidebarItem href="/code" label="Code" />
						<SidebarItem href="/alerts" label="Alerts" />
						<SidebarItem href="/loaders" label="Loaders" />
						<SidebarItem href="/tooltips" label="Tooltips" />
						<SidebarItem href="/modals" label="Modals" />
						<SidebarItem href="/modal-dialogs" label="Modal Dialogs" />
						<SidebarItem href="/popconfirm" label="Popconfirm" />
						<SidebarItem href="/command-palette" label="Command Palette" />
					{/snippet}
				</SidebarItem>

				<!-- Forms -->
				<SidebarItem href="/forms" label="Forms">
					{#snippet icon()}📝{/snippet}
				</SidebarItem>

				<!-- Tables with submenu -->
				<SidebarItem label="Tables" hasSubmenu={true}>
					{#snippet icon()}📋{/snippet}
					{#snippet submenu()}
						<SidebarItem href="/tables" label="Standard Tables" />
						<SidebarItem href="/tables-sizing" label="Table Sizing" />
						<SidebarItem href="/tables-filters" label="Filters" />
						<SidebarItem href="/comparison" label="Comparison" />
					{/snippet}
				</SidebarItem>

				<!-- Timeline with submenu -->
				<SidebarItem label="Timeline" hasSubmenu={true}>
					{#snippet icon()}⏱️{/snippet}
					{#snippet submenu()}
						<SidebarItem href="/timeline-simple" label="Simple" />
						<SidebarItem href="/timeline-block" label="Block" />
						<SidebarItem href="/timeline-feed" label="Feed" />
					{/snippet}
				</SidebarItem>

				<!-- Virtual Scroll with submenu -->
				<SidebarItem label="Virtual Scroll" hasSubmenu={true}>
					{#snippet icon()}⚡{/snippet}
					{#snippet submenu()}
						<SidebarItem href="/virtual-scroll" label="Demo" />
						<SidebarItem href="/virtual-scroll-code" label="Code Examples" />
					{/snippet}
				</SidebarItem>

				<!-- Settings with 3-level nesting -->
				<SidebarItem label="Settings" hasSubmenu={true}>
					{#snippet icon()}⚙️{/snippet}
					{#snippet submenu()}
						<!-- System Settings (nested) -->
						<SidebarItem label="System Settings" hasSubmenu={true}>
							{#snippet submenu()}
								<SidebarItem href="/settings/system/general" label="General" />
								<SidebarItem href="/settings/system/security" label="Security" />
								<SidebarItem href="/settings/system/notifications" label="Notifications" />
								<SidebarItem href="/settings/system/backup" label="Backup & Restore" />
							{/snippet}
						</SidebarItem>

						<!-- User Settings (nested) -->
						<SidebarItem label="User Settings" hasSubmenu={true}>
							{#snippet submenu()}
								<SidebarItem href="/settings/user/profile" label="Profile" />
								<SidebarItem href="/settings/user/preferences" label="Preferences" />
								<SidebarItem href="/settings/user/privacy" label="Privacy" />
							{/snippet}
						</SidebarItem>

						<!-- Appearance -->
						<SidebarItem href="/settings/appearance" label="Appearance" />

						<!-- Integrations -->
						<SidebarItem href="/settings/integrations" label="Integrations" />

						<!-- Advanced (nested) -->
						<SidebarItem label="Advanced" hasSubmenu={true}>
							{#snippet submenu()}
								<SidebarItem href="/settings/advanced/api-keys" label="API Keys" />
								<SidebarItem href="/settings/advanced/webhooks" label="Webhooks" />
								<SidebarItem href="/settings/advanced/activity-logs" label="Activity Logs" />
							{/snippet}
						</SidebarItem>
					{/snippet}
				</SidebarItem>
			</Sidebar>

		<LayoutContent>
			<Main>
				{@render children()}
			</Main>
		</LayoutContent>
	</LayoutInner>

	<Footer>
		<Paragraph>Pure Admin Svelte Demo - Powered by Pure.css</Paragraph>
	</Footer>
	</Layout>
</PureAdminProvider>
