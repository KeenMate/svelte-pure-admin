<script lang="ts">
	import {
		Section,
		Grid,
		Column,
		Tabs,
		TabItem,
		TabsContent,
		TabPanel,
		TabsContainer,
		TabsVerticalLayout,
		Badge
	} from '$lib';

	// State for active tabs in each example
	let basicActive = $state('tab1');
	let pillsActive = $state('pills1');
	let boxedActive = $state('boxed1');
	let verticalActive = $state('vert1');
	let sizesSmall = $state('sm1');
	let sizesDefault = $state('def1');
	let sizesLarge = $state('lg1');
	let centeredActive = $state('center1');
	let fullActive = $state('full1');
	let nowrapActive = $state('nowrap1');
	let collapseActive = $state('collapse1');
	let iconOnlyActive = $state('icon1');
	let fixedWidthActive = $state('fixed1');
	let borderedActive = $state('bc1');
	let vertBorderedActive = $state('bv1');
	let badgesActive = $state('badge1');
</script>

<svelte:head>
	<title>Tabs - Pure Admin Svelte</title>
</svelte:head>

<h1>Tabs</h1>
<p>Standalone tab navigation components based on Pure Admin Core.</p>

<Section title="Basic Tabs (Underline Style)">
	<Grid>
		<Column size="1">
			<Tabs>
				<TabItem active={basicActive === 'tab1'} onclick={() => (basicActive = 'tab1')}>
					Home
				</TabItem>
				<TabItem active={basicActive === 'tab2'} onclick={() => (basicActive = 'tab2')}>
					Profile
				</TabItem>
				<TabItem active={basicActive === 'tab3'} onclick={() => (basicActive = 'tab3')}>
					Messages
				</TabItem>
				<TabItem active={basicActive === 'tab4'} onclick={() => (basicActive = 'tab4')}>
					Settings
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel active={basicActive === 'tab1'} id="tab1">
					<p>Home content - underline style is the default tab appearance.</p>
				</TabPanel>
				<TabPanel active={basicActive === 'tab2'} id="tab2">
					<p>Profile content</p>
				</TabPanel>
				<TabPanel active={basicActive === 'tab3'} id="tab3">
					<p>Messages content</p>
				</TabPanel>
				<TabPanel active={basicActive === 'tab4'} id="tab4">
					<p>Settings content</p>
				</TabPanel>
			</TabsContent>
		</Column>
	</Grid>
</Section>

<Section title="Pills Style Tabs">
	<Grid>
		<Column size="1">
			<Tabs style="pills">
				<TabItem active={pillsActive === 'pills1'} onclick={() => (pillsActive = 'pills1')}>
					Dashboard
				</TabItem>
				<TabItem active={pillsActive === 'pills2'} onclick={() => (pillsActive = 'pills2')}>
					Analytics
				</TabItem>
				<TabItem active={pillsActive === 'pills3'} onclick={() => (pillsActive = 'pills3')}>
					Reports
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel active={pillsActive === 'pills1'} id="pills1">
					<p>Dashboard content - pills style with rounded backgrounds.</p>
				</TabPanel>
				<TabPanel active={pillsActive === 'pills2'} id="pills2">
					<p>Analytics content</p>
				</TabPanel>
				<TabPanel active={pillsActive === 'pills3'} id="pills3">
					<p>Reports content</p>
				</TabPanel>
			</TabsContent>
		</Column>
	</Grid>
</Section>

<Section title="Boxed Style Tabs">
	<Grid>
		<Column size="1">
			<Tabs style="boxed">
				<TabItem active={boxedActive === 'boxed1'} onclick={() => (boxedActive = 'boxed1')}>
					Code
				</TabItem>
				<TabItem active={boxedActive === 'boxed2'} onclick={() => (boxedActive = 'boxed2')}>
					Issues
				</TabItem>
				<TabItem active={boxedActive === 'boxed3'} onclick={() => (boxedActive = 'boxed3')}>
					Pull Requests
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel active={boxedActive === 'boxed1'} id="boxed1">
					<p>Code repository - boxed style with container border.</p>
				</TabPanel>
				<TabPanel active={boxedActive === 'boxed2'} id="boxed2">
					<p>Issue tracker</p>
				</TabPanel>
				<TabPanel active={boxedActive === 'boxed3'} id="boxed3">
					<p>Pull requests</p>
				</TabPanel>
			</TabsContent>
		</Column>
	</Grid>
</Section>

<Section title="Vertical Tabs">
	<Grid>
		<Column size="1">
			<TabsVerticalLayout>
				<Tabs style="vertical">
					<TabItem
						active={verticalActive === 'vert1'}
						onclick={() => (verticalActive = 'vert1')}
					>
						{#snippet icon()}
							<i class="fa-solid fa-user"></i>
						{/snippet}
						<span>Account</span>
					</TabItem>
					<TabItem
						active={verticalActive === 'vert2'}
						onclick={() => (verticalActive = 'vert2')}
					>
						{#snippet icon()}
							<i class="fa-solid fa-lock"></i>
						{/snippet}
						<span>Security</span>
					</TabItem>
					<TabItem
						active={verticalActive === 'vert3'}
						onclick={() => (verticalActive = 'vert3')}
					>
						{#snippet icon()}
							<i class="fa-solid fa-bell"></i>
						{/snippet}
						<span>Notifications</span>
					</TabItem>
				</Tabs>
				<TabsContent class="flex-1">
					<TabPanel active={verticalActive === 'vert1'} id="vert1">
						<p>Account settings - vertical tabs use TabsVerticalLayout wrapper.</p>
					</TabPanel>
					<TabPanel active={verticalActive === 'vert2'} id="vert2">
						<p>Security settings</p>
					</TabPanel>
					<TabPanel active={verticalActive === 'vert3'} id="vert3">
						<p>Notification preferences</p>
					</TabPanel>
				</TabsContent>
			</TabsVerticalLayout>
		</Column>
	</Grid>
</Section>

<Section title="Tab Sizes">
	<Grid>
		<Column size="1">
			<h4>Small</h4>
			<Tabs size="sm">
				<TabItem active={sizesSmall === 'sm1'} onclick={() => (sizesSmall = 'sm1')}>
					Tab 1
				</TabItem>
				<TabItem active={sizesSmall === 'sm2'} onclick={() => (sizesSmall = 'sm2')}>
					Tab 2
				</TabItem>
				<TabItem active={sizesSmall === 'sm3'} onclick={() => (sizesSmall = 'sm3')}>
					Tab 3
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel active={sizesSmall === 'sm1'} id="sm1">
					<p>Small tabs with compact padding.</p>
				</TabPanel>
				<TabPanel active={sizesSmall === 'sm2'} id="sm2">
					<p>Small tab 2</p>
				</TabPanel>
				<TabPanel active={sizesSmall === 'sm3'} id="sm3">
					<p>Small tab 3</p>
				</TabPanel>
			</TabsContent>

			<h4 style="margin-top: 2rem;">Default</h4>
			<Tabs>
				<TabItem active={sizesDefault === 'def1'} onclick={() => (sizesDefault = 'def1')}>
					Tab 1
				</TabItem>
				<TabItem active={sizesDefault === 'def2'} onclick={() => (sizesDefault = 'def2')}>
					Tab 2
				</TabItem>
				<TabItem active={sizesDefault === 'def3'} onclick={() => (sizesDefault = 'def3')}>
					Tab 3
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel active={sizesDefault === 'def1'} id="def1">
					<p>Default size tabs.</p>
				</TabPanel>
				<TabPanel active={sizesDefault === 'def2'} id="def2">
					<p>Default tab 2</p>
				</TabPanel>
				<TabPanel active={sizesDefault === 'def3'} id="def3">
					<p>Default tab 3</p>
				</TabPanel>
			</TabsContent>

			<h4 style="margin-top: 2rem;">Large</h4>
			<Tabs size="lg">
				<TabItem active={sizesLarge === 'lg1'} onclick={() => (sizesLarge = 'lg1')}>
					Tab 1
				</TabItem>
				<TabItem active={sizesLarge === 'lg2'} onclick={() => (sizesLarge = 'lg2')}>
					Tab 2
				</TabItem>
				<TabItem active={sizesLarge === 'lg3'} onclick={() => (sizesLarge = 'lg3')}>
					Tab 3
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel active={sizesLarge === 'lg1'} id="lg1">
					<p>Large tabs with generous padding.</p>
				</TabPanel>
				<TabPanel active={sizesLarge === 'lg2'} id="lg2">
					<p>Large tab 2</p>
				</TabPanel>
				<TabPanel active={sizesLarge === 'lg3'} id="lg3">
					<p>Large tab 3</p>
				</TabPanel>
			</TabsContent>
		</Column>
	</Grid>
</Section>

<Section title="Tab Alignment">
	<Grid>
		<Column size="1">
			<h4>Centered</h4>
			<Tabs align="centered">
				<TabItem active={centeredActive === 'center1'} onclick={() => (centeredActive = 'center1')}>
					Features
				</TabItem>
				<TabItem active={centeredActive === 'center2'} onclick={() => (centeredActive = 'center2')}>
					Pricing
				</TabItem>
				<TabItem
					active={centeredActive === 'center3'}
					onclick={() => (centeredActive = 'center3')}
				>
					Testimonials
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel active={centeredActive === 'center1'} id="center1">
					<p>Features content - tabs are centered.</p>
				</TabPanel>
				<TabPanel active={centeredActive === 'center2'} id="center2">
					<p>Pricing content</p>
				</TabPanel>
				<TabPanel active={centeredActive === 'center3'} id="center3">
					<p>Testimonials content</p>
				</TabPanel>
			</TabsContent>

			<h4 style="margin-top: 2rem;">Full Width</h4>
			<Tabs align="full">
				<TabItem active={fullActive === 'full1'} onclick={() => (fullActive = 'full1')}>
					{#snippet icon()}
						<i class="fa-solid fa-mobile-screen"></i>
					{/snippet}
					<span>Mobile</span>
				</TabItem>
				<TabItem active={fullActive === 'full2'} onclick={() => (fullActive = 'full2')}>
					{#snippet icon()}
						<i class="fa-solid fa-tablet-screen-button"></i>
					{/snippet}
					<span>Tablet</span>
				</TabItem>
				<TabItem active={fullActive === 'full3'} onclick={() => (fullActive = 'full3')}>
					{#snippet icon()}
						<i class="fa-solid fa-desktop"></i>
					{/snippet}
					<span>Desktop</span>
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel active={fullActive === 'full1'} id="full1">
					<p>Mobile view - tabs distributed equally across full width.</p>
				</TabPanel>
				<TabPanel active={fullActive === 'full2'} id="full2">
					<p>Tablet view</p>
				</TabPanel>
				<TabPanel active={fullActive === 'full3'} id="full3">
					<p>Desktop view</p>
				</TabPanel>
			</TabsContent>
		</Column>
	</Grid>
</Section>

<Section title="Overflow Handling">
	<Grid>
		<Column size="1">
			<h4>No-wrap</h4>
			<Tabs overflow="nowrap">
				<TabItem active={nowrapActive === 'nowrap1'} onclick={() => (nowrapActive = 'nowrap1')}>
					Organizations Tree
				</TabItem>
				<TabItem active={nowrapActive === 'nowrap2'} onclick={() => (nowrapActive = 'nowrap2')}>
					User Management System
				</TabItem>
				<TabItem active={nowrapActive === 'nowrap3'} onclick={() => (nowrapActive = 'nowrap3')}>
					Reports & Analytics
				</TabItem>
				<TabItem active={nowrapActive === 'nowrap4'} onclick={() => (nowrapActive = 'nowrap4')}>
					Settings & Configuration
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel active={nowrapActive === 'nowrap1'} id="nowrap1">
					<p>No-wrap prevents wrapping - tabs overflow in single line.</p>
				</TabPanel>
				<TabPanel active={nowrapActive === 'nowrap2'} id="nowrap2">
					<p>User Management content</p>
				</TabPanel>
				<TabPanel active={nowrapActive === 'nowrap3'} id="nowrap3">
					<p>Reports content</p>
				</TabPanel>
				<TabPanel active={nowrapActive === 'nowrap4'} id="nowrap4">
					<p>Settings content</p>
				</TabPanel>
			</TabsContent>

			<h4 style="margin-top: 2rem;">Collapse (Icon-only when inactive)</h4>
			<Tabs overflow="collapse">
				<TabItem
					active={collapseActive === 'collapse1'}
					onclick={() => (collapseActive = 'collapse1')}
					class="pa-tooltip"
					data-tooltip="Organizations Tree"
				>
					{#snippet icon()}
						<i class="fa-solid fa-sitemap"></i>
					{/snippet}
					<span>Organizations Tree</span>
				</TabItem>
				<TabItem
					active={collapseActive === 'collapse2'}
					onclick={() => (collapseActive = 'collapse2')}
					class="pa-tooltip"
					data-tooltip="User Management"
				>
					{#snippet icon()}
						<i class="fa-solid fa-users"></i>
					{/snippet}
					<span>User Management System</span>
				</TabItem>
				<TabItem
					active={collapseActive === 'collapse3'}
					onclick={() => (collapseActive = 'collapse3')}
					class="pa-tooltip"
					data-tooltip="Reports"
				>
					{#snippet icon()}
						<i class="fa-solid fa-chart-bar"></i>
					{/snippet}
					<span>Reports & Analytics</span>
				</TabItem>
				<TabItem
					active={collapseActive === 'collapse4'}
					onclick={() => (collapseActive = 'collapse4')}
					class="pa-tooltip"
					data-tooltip="Settings"
				>
					{#snippet icon()}
						<i class="fa-solid fa-gear"></i>
					{/snippet}
					<span>Settings</span>
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel active={collapseActive === 'collapse1'} id="collapse1">
					<p>Organizations - inactive tabs show only icons, active tab shows full title.</p>
				</TabPanel>
				<TabPanel active={collapseActive === 'collapse2'} id="collapse2">
					<p>User Management</p>
				</TabPanel>
				<TabPanel active={collapseActive === 'collapse3'} id="collapse3">
					<p>Reports</p>
				</TabPanel>
				<TabPanel active={collapseActive === 'collapse4'} id="collapse4">
					<p>Settings</p>
				</TabPanel>
			</TabsContent>
		</Column>
	</Grid>
</Section>

<Section title="Icon-Only Tabs">
	<Grid>
		<Column size="1">
			<Tabs>
				<TabItem
					active={iconOnlyActive === 'icon1'}
					onclick={() => (iconOnlyActive = 'icon1')}
					class="pa-tooltip"
					data-tooltip="Dashboard"
				>
					<i class="fa-solid fa-chart-line"></i>
				</TabItem>
				<TabItem
					active={iconOnlyActive === 'icon2'}
					onclick={() => (iconOnlyActive = 'icon2')}
					class="pa-tooltip"
					data-tooltip="Analytics"
				>
					<i class="fa-solid fa-chart-bar"></i>
				</TabItem>
				<TabItem
					active={iconOnlyActive === 'icon3'}
					onclick={() => (iconOnlyActive = 'icon3')}
					class="pa-tooltip"
					data-tooltip="Users"
				>
					<i class="fa-solid fa-users"></i>
				</TabItem>
				<TabItem
					active={iconOnlyActive === 'icon4'}
					onclick={() => (iconOnlyActive = 'icon4')}
					class="pa-tooltip"
					data-tooltip="Settings"
				>
					<i class="fa-solid fa-gear"></i>
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel active={iconOnlyActive === 'icon1'} id="icon1">
					<p>Dashboard content - icon-only tabs with tooltips.</p>
				</TabPanel>
				<TabPanel active={iconOnlyActive === 'icon2'} id="icon2">
					<p>Analytics content</p>
				</TabPanel>
				<TabPanel active={iconOnlyActive === 'icon3'} id="icon3">
					<p>Users content</p>
				</TabPanel>
				<TabPanel active={iconOnlyActive === 'icon4'} id="icon4">
					<p>Settings content</p>
				</TabPanel>
			</TabsContent>
		</Column>
	</Grid>
</Section>

<Section title="Fixed Width Tabs">
	<Grid>
		<Column size="1">
			<Tabs>
				<TabItem
					active={fixedWidthActive === 'fixed1'}
					onclick={() => (fixedWidthActive = 'fixed1')}
					width="6x"
				>
					View
				</TabItem>
				<TabItem
					active={fixedWidthActive === 'fixed2'}
					onclick={() => (fixedWidthActive = 'fixed2')}
					width="6x"
				>
					Edit
				</TabItem>
				<TabItem
					active={fixedWidthActive === 'fixed3'}
					onclick={() => (fixedWidthActive = 'fixed3')}
					width="6x"
				>
					Delete
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel active={fixedWidthActive === 'fixed1'} id="fixed1">
					<p>View content - each tab has fixed width of 6rem.</p>
				</TabPanel>
				<TabPanel active={fixedWidthActive === 'fixed2'} id="fixed2">
					<p>Edit content</p>
				</TabPanel>
				<TabPanel active={fixedWidthActive === 'fixed3'} id="fixed3">
					<p>Delete content</p>
				</TabPanel>
			</TabsContent>
		</Column>
	</Grid>
</Section>

<Section title="Tabs with Badges">
	<Grid>
		<Column size="1">
			<Tabs>
				<TabItem active={badgesActive === 'badge1'} onclick={() => (badgesActive = 'badge1')}>
					<span>All</span>
					<Badge size="sm">48</Badge>
				</TabItem>
				<TabItem active={badgesActive === 'badge2'} onclick={() => (badgesActive = 'badge2')}>
					<span>Active</span>
					<Badge variant="success" size="sm">12</Badge>
				</TabItem>
				<TabItem active={badgesActive === 'badge3'} onclick={() => (badgesActive = 'badge3')}>
					<span>Pending</span>
					<Badge variant="warning" size="sm">5</Badge>
				</TabItem>
				<TabItem active={badgesActive === 'badge4'} onclick={() => (badgesActive = 'badge4')}>
					<span>Closed</span>
					<Badge variant="secondary" size="sm">31</Badge>
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel active={badgesActive === 'badge1'} id="badge1">
					<p>All items (48) - tabs with count badges.</p>
				</TabPanel>
				<TabPanel active={badgesActive === 'badge2'} id="badge2">
					<p>Active items (12)</p>
				</TabPanel>
				<TabPanel active={badgesActive === 'badge3'} id="badge3">
					<p>Pending items (5)</p>
				</TabPanel>
				<TabPanel active={badgesActive === 'badge4'} id="badge4">
					<p>Closed items (31)</p>
				</TabPanel>
			</TabsContent>
		</Column>
	</Grid>
</Section>

<Section title="Bordered Tabs">
	<Grid>
		<Column size="1">
			<h4>Horizontal Bordered</h4>
			<TabsContainer bordered>
				<Tabs>
					<TabItem active={borderedActive === 'bc1'} onclick={() => (borderedActive = 'bc1')}>
						Dashboard
					</TabItem>
					<TabItem active={borderedActive === 'bc2'} onclick={() => (borderedActive = 'bc2')}>
						Settings
					</TabItem>
					<TabItem active={borderedActive === 'bc3'} onclick={() => (borderedActive = 'bc3')}>
						Profile
					</TabItem>
				</Tabs>
				<TabsContent>
					<TabPanel active={borderedActive === 'bc1'} id="bc1">
						<p>Dashboard content - entire tab system wrapped in card-like border.</p>
					</TabPanel>
					<TabPanel active={borderedActive === 'bc2'} id="bc2">
						<p>Settings content</p>
					</TabPanel>
					<TabPanel active={borderedActive === 'bc3'} id="bc3">
						<p>Profile content</p>
					</TabPanel>
				</TabsContent>
			</TabsContainer>

			<h4 style="margin-top: 2rem;">Vertical Bordered</h4>
			<TabsVerticalLayout bordered>
				<Tabs style="vertical">
					<TabItem
						active={vertBorderedActive === 'bv1'}
						onclick={() => (vertBorderedActive = 'bv1')}
						height="3x"
					>
						{#snippet icon()}
							<i class="fa-solid fa-gauge"></i>
						{/snippet}
						<span>Overview</span>
					</TabItem>
					<TabItem
						active={vertBorderedActive === 'bv2'}
						onclick={() => (vertBorderedActive = 'bv2')}
						height="3x"
					>
						{#snippet icon()}
							<i class="fa-solid fa-chart-pie"></i>
						{/snippet}
						<span>Reports</span>
					</TabItem>
					<TabItem
						active={vertBorderedActive === 'bv3'}
						onclick={() => (vertBorderedActive = 'bv3')}
						height="3x"
					>
						{#snippet icon()}
							<i class="fa-solid fa-gear"></i>
						{/snippet}
						<span>Settings</span>
					</TabItem>
				</Tabs>
				<TabsContent class="flex-1">
					<TabPanel active={vertBorderedActive === 'bv1'} id="bv1">
						<p>Overview - bordered vertical tabs with divider.</p>
					</TabPanel>
					<TabPanel active={vertBorderedActive === 'bv2'} id="bv2">
						<p>Reports content</p>
					</TabPanel>
					<TabPanel active={vertBorderedActive === 'bv3'} id="bv3">
						<p>Settings content</p>
					</TabPanel>
				</TabsContent>
			</TabsVerticalLayout>
		</Column>
	</Grid>
</Section>

<style>
	.flex-1 {
		flex: 1;
	}
</style>
