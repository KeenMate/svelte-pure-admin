<script lang="ts">
	import {
		PureAdminProvider,
		Layout,
		Header,
		Sidebar,
		SidebarItem,
		Content,
		Footer
	} from '$lib';
	import type { PureAdminConfig } from '$lib';
	import '@pure-admin/core/css';

	let sidebarHidden = $state(false);

	function toggleSidebar() {
		sidebarHidden = !sidebarHidden;
		if (typeof document !== 'undefined') {
			document.body.classList.toggle('sidebar-hidden', sidebarHidden);
		}
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

	let { children } = $props();
</script>

<PureAdminProvider config={myConfig}>
	<Layout>
		<Header onBurgerClick={toggleSidebar} showBurger={true}>
			{#snippet brand()}
				<h1>Pure Admin</h1>
			{/snippet}
		</Header>

		<Sidebar>
			<SidebarItem href="/" label="Dashboard">
				{#snippet icon()}
					📊
				{/snippet}
			</SidebarItem>

			<SidebarItem href="/components" label="Components">
				{#snippet icon()}
					🧩
				{/snippet}
			</SidebarItem>

			<SidebarItem href="/forms" label="Forms">
				{#snippet icon()}
					📝
				{/snippet}
			</SidebarItem>

			<SidebarItem href="/buttons" label="Buttons">
				{#snippet icon()}
					🔘
				{/snippet}
			</SidebarItem>

			<SidebarItem href="/cards" label="Cards">
				{#snippet icon()}
					🃏
				{/snippet}
			</SidebarItem>

			<SidebarItem href="/badges" label="Badges & Labels">
				{#snippet icon()}
					🏷️
				{/snippet}
			</SidebarItem>

			<SidebarItem href="/modals" label="Modal Windows">
				{#snippet icon()}
					🪟
				{/snippet}
			</SidebarItem>

			<SidebarItem href="/loaders" label="Loaders & Spinners">
				{#snippet icon()}
					⏳
				{/snippet}
			</SidebarItem>

			<SidebarItem href="/tooltips" label="Tooltips">
				{#snippet icon()}
					💬
				{/snippet}
			</SidebarItem>

			<SidebarItem href="/alerts" label="Alerts">
				{#snippet icon()}
					⚠️
				{/snippet}
			</SidebarItem>

			<SidebarItem href="/tabs" label="Tabs">
				{#snippet icon()}
					📑
				{/snippet}
			</SidebarItem>

			<SidebarItem label="Tables" hasSubmenu={true}>
				{#snippet icon()}
					📋
				{/snippet}
				{#snippet submenu()}
					<SidebarItem href="/tables" label="Standard Tables">
						{#snippet icon()}
							📊
						{/snippet}
					</SidebarItem>
					<SidebarItem href="/tables-lazy" label="Lazy Loading">
						{#snippet icon()}
							⚡
						{/snippet}
					</SidebarItem>
				{/snippet}
			</SidebarItem>

			<SidebarItem label="Demo Item 1" hasSubmenu={true}>
				{#snippet icon()}
					⚙️
				{/snippet}
				{#snippet submenu()}
					<SidebarItem label="Demo Item 2" hasSubmenu={true}>
						{#snippet icon()}
							🔧
						{/snippet}
						{#snippet submenu()}
							<SidebarItem href="#demo3" label="Demo Item 3">
								{#snippet icon()}
									🎯
								{/snippet}
							</SidebarItem>
						{/snippet}
					</SidebarItem>
				{/snippet}
			</SidebarItem>
		</Sidebar>

		<Content>
			{@render children()}
		</Content>

		<Footer>
			<p>Pure Admin Svelte Demo - Powered by Pure.css</p>
		</Footer>
	</Layout>
</PureAdminProvider>
