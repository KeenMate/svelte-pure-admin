<script lang="ts">
	import Heading from '$lib/typography/Heading.svelte';
	import Paragraph from '$lib/typography/Paragraph.svelte';
	import {
		Section,
		Grid,
		Column,
		Card,
		CardTab,
		CardTabContent,
		Tabs,
		TabItem,
		TabsContent,
		TabPanel,
		TabsContainer,
		TabsVerticalLayout,
		TabsScrollable,
		Badge,
		Alert
	} from '$lib';

	// State for active tabs in each example
	let cardActive = $state('card-tab-1');
	let standaloneActive = $state('tab-1');
	let iconsActive = $state('icon-tab-1');
	let fixed6xActive = $state('fixed-tab-1');
	let fixed8xActive = $state('fixed-8x-1');
	let pillsActive = $state('pills-tab-1');
	let iconPillsActive = $state('icon-pills-1');
	let verticalActive = $state('vert-tab-1');
	let boxedActive = $state('boxed-tab-1');
	let sizeSmallActive = $state('size-sm-1');
	let sizeDefaultActive = $state('size-def-1');
	let sizeLargeActive = $state('size-lg-1');
	let badgesActive = $state('badge-tab-1');
	let centeredActive = $state('center-tab-1');
	let fullActive = $state('full-tab-1');
	let iconOnlyActive = $state('icon-only-1');
	let iconVertActive = $state('icon-vert-1');
	let standalonePageActive = $state('standalone-1');
	let standaloneVertActive = $state('standalone-vert-1');
	let borderedActive = $state('bordered-1');
	let borderedVertActive = $state('bordered-vert-1');
	let longWrapActive = $state('long-1');
	let longCollapseActive = $state('collapse-1');
	let longScrollActive = $state('long-boxed-1');
	let scrollPillsActive = $state('scroll-pills-1');
</script>

<svelte:head>
	<title>Tabs - Pure Admin Svelte</title>
</svelte:head>

<Heading level={1}>Tabs</Heading>
<Paragraph>Tab navigation components for organizing content into separate sections.</Paragraph>

<!-- Two Column Grid: Card-Based Tabs + Standalone Tabs -->
<Grid>
	<Column size="1" md="1-2">
		<!-- Card-Based Tabs -->
		<Card>
			{#snippet header()}
				<Heading level={3}>Card Tabs (Built-in)</Heading>
			{/snippet}

			{#snippet tabs()}
				<CardTab active={cardActive === 'card-tab-1'} onclick={() => (cardActive = 'card-tab-1')}>
					Overview
				</CardTab>
				<CardTab active={cardActive === 'card-tab-2'} onclick={() => (cardActive = 'card-tab-2')}>
					Details
				</CardTab>
				<CardTab active={cardActive === 'card-tab-3'} onclick={() => (cardActive = 'card-tab-3')}>
					Settings
				</CardTab>
				<CardTab active={cardActive === 'card-tab-4'} onclick={() => (cardActive = 'card-tab-4')}>
					Reports
				</CardTab>
			{/snippet}

			<CardTabContent active={cardActive === 'card-tab-1'} id="card-tab-1">
				<Heading level={4}>Overview</Heading>
				<Paragraph>Card tabs integrate seamlessly.</Paragraph>
			</CardTabContent>
			<CardTabContent active={cardActive === 'card-tab-2'} id="card-tab-2">
				<Heading level={4}>Details</Heading>
				<Paragraph>Detailed information goes here.</Paragraph>
			</CardTabContent>
			<CardTabContent active={cardActive === 'card-tab-3'} id="card-tab-3">
				<Heading level={4}>Settings</Heading>
				<Paragraph>Configuration options here.</Paragraph>
			</CardTabContent>
			<CardTabContent active={cardActive === 'card-tab-4'} id="card-tab-4">
				<Heading level={4}>Reports</Heading>
				<Paragraph>Analytics data displayed here.</Paragraph>
			</CardTabContent>
		</Card>
	</Column>

	<Column size="1" md="1-2">
		<!-- Standalone Tabs - Underline Style -->
		<Card>
			{#snippet header()}
				<Heading level={3}>Standalone Tabs</Heading>
			{/snippet}
			<Tabs>
				<TabItem active={standaloneActive === 'tab-1'} onclick={() => (standaloneActive = 'tab-1')}>
					Home
				</TabItem>
				<TabItem active={standaloneActive === 'tab-2'} onclick={() => (standaloneActive = 'tab-2')}>
					Profile
				</TabItem>
				<TabItem active={standaloneActive === 'tab-3'} onclick={() => (standaloneActive = 'tab-3')}>
					Messages
				</TabItem>
				<TabItem active={standaloneActive === 'tab-4'} onclick={() => (standaloneActive = 'tab-4')}>
					Settings
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel active={standaloneActive === 'tab-1'} id="tab-1">
					<Heading level={4}>Home</Heading>
					<Paragraph>Standalone tabs work anywhere.</Paragraph>
				</TabPanel>
				<TabPanel active={standaloneActive === 'tab-2'} id="tab-2">
					<Heading level={4}>Profile</Heading>
					<Paragraph>User profile information here.</Paragraph>
				</TabPanel>
				<TabPanel active={standaloneActive === 'tab-3'} id="tab-3">
					<Heading level={4}>Messages</Heading>
					<Paragraph>Messages and conversations.</Paragraph>
				</TabPanel>
				<TabPanel active={standaloneActive === 'tab-4'} id="tab-4">
					<Heading level={4}>Settings</Heading>
					<Paragraph>Application settings here.</Paragraph>
				</TabPanel>
			</TabsContent>
		</Card>
	</Column>
</Grid>

<!-- Two Column Grid: Tabs with Icons + Fixed Width Tabs -->
<Grid>
	<Column size="1" md="1-2">
		<!-- Tabs with Icons -->
		<Card>
			{#snippet header()}
				<Heading level={3}>Tabs with Icons</Heading>
			{/snippet}
			<Tabs>
				<TabItem active={iconsActive === 'icon-tab-1'} onclick={() => (iconsActive = 'icon-tab-1')}>
					{#snippet icon()}
						<i class="fa-solid fa-house"></i>
					{/snippet}
					<span>Home</span>
				</TabItem>
				<TabItem active={iconsActive === 'icon-tab-2'} onclick={() => (iconsActive = 'icon-tab-2')}>
					{#snippet icon()}
						<i class="fa-solid fa-user"></i>
					{/snippet}
					<span>Profile</span>
				</TabItem>
				<TabItem active={iconsActive === 'icon-tab-3'} onclick={() => (iconsActive = 'icon-tab-3')}>
					{#snippet icon()}
						<i class="fa-solid fa-envelope"></i>
					{/snippet}
					<span>Messages</span>
				</TabItem>
				<TabItem active={iconsActive === 'icon-tab-4'} onclick={() => (iconsActive = 'icon-tab-4')}>
					{#snippet icon()}
						<i class="fa-solid fa-gear"></i>
					{/snippet}
					<span>Settings</span>
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel active={iconsActive === 'icon-tab-1'} id="icon-tab-1">
					<Paragraph>Home with icons.</Paragraph>
				</TabPanel>
				<TabPanel active={iconsActive === 'icon-tab-2'} id="icon-tab-2">
					<Paragraph>Profile with icons.</Paragraph>
				</TabPanel>
				<TabPanel active={iconsActive === 'icon-tab-3'} id="icon-tab-3">
					<Paragraph>Messages with icons.</Paragraph>
				</TabPanel>
				<TabPanel active={iconsActive === 'icon-tab-4'} id="icon-tab-4">
					<Paragraph>Settings with icons.</Paragraph>
				</TabPanel>
			</TabsContent>
		</Card>
	</Column>

	<Column size="1" md="1-2">
		<!-- Fixed Width Tabs -->
		<Card>
			{#snippet header()}
				<Heading level={3}>Fixed Width Tabs</Heading>
			{/snippet}
			<Alert variant="info">
				<strong>Available widths:</strong> Use <code>pa-tabs__item--w-1x</code> through <code>pa-tabs__item--w-10x</code> for 1rem to 10rem min-width.
			</Alert>

			<Heading level={4}>6x Width (6rem each)</Heading>
			<Tabs>
				<TabItem active={fixed6xActive === 'fixed-tab-1'} onclick={() => (fixed6xActive = 'fixed-tab-1')} width="6x">
					View
				</TabItem>
				<TabItem active={fixed6xActive === 'fixed-tab-2'} onclick={() => (fixed6xActive = 'fixed-tab-2')} width="6x">
					Edit
				</TabItem>
				<TabItem active={fixed6xActive === 'fixed-tab-3'} onclick={() => (fixed6xActive = 'fixed-tab-3')} width="6x">
					Delete
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel active={fixed6xActive === 'fixed-tab-1'} id="fixed-tab-1">
					<Paragraph>Fixed width tabs maintain consistent sizing.</Paragraph>
				</TabPanel>
				<TabPanel active={fixed6xActive === 'fixed-tab-2'} id="fixed-tab-2">
					<Paragraph>Edit content here.</Paragraph>
				</TabPanel>
				<TabPanel active={fixed6xActive === 'fixed-tab-3'} id="fixed-tab-3">
					<Paragraph>Delete operations here.</Paragraph>
				</TabPanel>
			</TabsContent>

			<Heading level={4} style="margin-top: 1.5rem;">8x Width (8rem each)</Heading>
			<Tabs>
				<TabItem active={fixed8xActive === 'fixed-8x-1'} onclick={() => (fixed8xActive = 'fixed-8x-1')} width="8x">
					{#snippet icon()}
						<i class="fa-solid fa-chart-line"></i>
					{/snippet}
					<span>Dashboard</span>
				</TabItem>
				<TabItem active={fixed8xActive === 'fixed-8x-2'} onclick={() => (fixed8xActive = 'fixed-8x-2')} width="8x">
					{#snippet icon()}
						<i class="fa-solid fa-chart-bar"></i>
					{/snippet}
					<span>Analytics</span>
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel active={fixed8xActive === 'fixed-8x-1'} id="fixed-8x-1">
					<Paragraph>Dashboard data.</Paragraph>
				</TabPanel>
				<TabPanel active={fixed8xActive === 'fixed-8x-2'} id="fixed-8x-2">
					<Paragraph>Analytics data.</Paragraph>
				</TabPanel>
			</TabsContent>
		</Card>
	</Column>
</Grid>

<!-- Two Column Grid: Pills Style + Pills with Icons -->
<Grid>
	<Column size="1" md="1-2">
		<!-- Pills Style Tabs -->
		<Card>
			{#snippet header()}
				<Heading level={3}>Pills Style Tabs</Heading>
			{/snippet}
			<Tabs style="pills">
				<TabItem active={pillsActive === 'pills-tab-1'} onclick={() => (pillsActive = 'pills-tab-1')}>
					Dashboard
				</TabItem>
				<TabItem active={pillsActive === 'pills-tab-2'} onclick={() => (pillsActive = 'pills-tab-2')}>
					Analytics
				</TabItem>
				<TabItem active={pillsActive === 'pills-tab-3'} onclick={() => (pillsActive = 'pills-tab-3')}>
					Reports
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel active={pillsActive === 'pills-tab-1'} id="pills-tab-1">
					<Heading level={4}>Dashboard</Heading>
					<Paragraph>Key metrics overview.</Paragraph>
				</TabPanel>
				<TabPanel active={pillsActive === 'pills-tab-2'} id="pills-tab-2">
					<Heading level={4}>Analytics</Heading>
					<Paragraph>Detailed insights.</Paragraph>
				</TabPanel>
				<TabPanel active={pillsActive === 'pills-tab-3'} id="pills-tab-3">
					<Heading level={4}>Reports</Heading>
					<Paragraph>Generated summaries.</Paragraph>
				</TabPanel>
			</TabsContent>
		</Card>
	</Column>

	<Column size="1" md="1-2">
		<!-- Pills with Icons -->
		<Card>
			{#snippet header()}
				<Heading level={3}>Pills with Icons</Heading>
			{/snippet}
			<Tabs style="pills">
				<TabItem active={iconPillsActive === 'icon-pills-1'} onclick={() => (iconPillsActive = 'icon-pills-1')}>
					{#snippet icon()}
						<i class="fa-solid fa-chart-line"></i>
					{/snippet}
					<span>Dashboard</span>
				</TabItem>
				<TabItem active={iconPillsActive === 'icon-pills-2'} onclick={() => (iconPillsActive = 'icon-pills-2')}>
					{#snippet icon()}
						<i class="fa-solid fa-chart-bar"></i>
					{/snippet}
					<span>Analytics</span>
				</TabItem>
				<TabItem active={iconPillsActive === 'icon-pills-3'} onclick={() => (iconPillsActive = 'icon-pills-3')}>
					{#snippet icon()}
						<i class="fa-solid fa-file-lines"></i>
					{/snippet}
					<span>Reports</span>
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel active={iconPillsActive === 'icon-pills-1'} id="icon-pills-1">
					<Paragraph>Dashboard pills.</Paragraph>
				</TabPanel>
				<TabPanel active={iconPillsActive === 'icon-pills-2'} id="icon-pills-2">
					<Paragraph>Analytics pills.</Paragraph>
				</TabPanel>
				<TabPanel active={iconPillsActive === 'icon-pills-3'} id="icon-pills-3">
					<Paragraph>Reports pills.</Paragraph>
				</TabPanel>
			</TabsContent>
		</Card>
	</Column>
</Grid>

<!-- Two Column Layout: Vertical Tabs + Boxed Tabs -->
<Grid>
	<Column size="1" lg="1-2">
		<!-- Vertical Tabs -->
		<Card>
			{#snippet header()}
				<Heading level={3}>Vertical Tabs</Heading>
			{/snippet}
			<TabsVerticalLayout>
				<Tabs style="vertical">
					<TabItem active={verticalActive === 'vert-tab-1'} onclick={() => (verticalActive = 'vert-tab-1')}>
						{#snippet icon()}
							<i class="fa-solid fa-user"></i>
						{/snippet}
						<span>Account</span>
					</TabItem>
					<TabItem active={verticalActive === 'vert-tab-2'} onclick={() => (verticalActive = 'vert-tab-2')}>
						{#snippet icon()}
							<i class="fa-solid fa-lock"></i>
						{/snippet}
						<span>Security</span>
					</TabItem>
					<TabItem active={verticalActive === 'vert-tab-3'} onclick={() => (verticalActive = 'vert-tab-3')}>
						{#snippet icon()}
							<i class="fa-solid fa-bell"></i>
						{/snippet}
						<span>Notifications</span>
					</TabItem>
					<TabItem active={verticalActive === 'vert-tab-4'} onclick={() => (verticalActive = 'vert-tab-4')}>
						{#snippet icon()}
							<i class="fa-solid fa-palette"></i>
						{/snippet}
						<span>Appearance</span>
					</TabItem>
				</Tabs>
				<TabsContent style="flex: 1;">
					<TabPanel active={verticalActive === 'vert-tab-1'} id="vert-tab-1">
						<Heading level={4}>Account Settings</Heading>
						<Paragraph>Manage your account information and preferences.</Paragraph>
					</TabPanel>
					<TabPanel active={verticalActive === 'vert-tab-2'} id="vert-tab-2">
						<Heading level={4}>Security Settings</Heading>
						<Paragraph>Configure password and two-factor authentication.</Paragraph>
					</TabPanel>
					<TabPanel active={verticalActive === 'vert-tab-3'} id="vert-tab-3">
						<Heading level={4}>Notification Preferences</Heading>
						<Paragraph>Control how and when you receive notifications.</Paragraph>
					</TabPanel>
					<TabPanel active={verticalActive === 'vert-tab-4'} id="vert-tab-4">
						<Heading level={4}>Appearance Options</Heading>
						<Paragraph>Customize the look and feel of your interface.</Paragraph>
					</TabPanel>
				</TabsContent>
			</TabsVerticalLayout>
		</Card>
	</Column>

	<Column size="1" lg="1-2">
		<!-- Boxed Style Tabs -->
		<Card>
			{#snippet header()}
				<Heading level={3}>Boxed Tabs</Heading>
			{/snippet}
			<Tabs style="boxed">
				<TabItem active={boxedActive === 'boxed-tab-1'} onclick={() => (boxedActive = 'boxed-tab-1')}>
					Code
				</TabItem>
				<TabItem active={boxedActive === 'boxed-tab-2'} onclick={() => (boxedActive = 'boxed-tab-2')}>
					Issues
				</TabItem>
				<TabItem active={boxedActive === 'boxed-tab-3'} onclick={() => (boxedActive = 'boxed-tab-3')}>
					Pull Requests
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel active={boxedActive === 'boxed-tab-1'} id="boxed-tab-1">
					<Paragraph>Code repository and file browser.</Paragraph>
				</TabPanel>
				<TabPanel active={boxedActive === 'boxed-tab-2'} id="boxed-tab-2">
					<Paragraph>Issue tracker and bug reports.</Paragraph>
				</TabPanel>
				<TabPanel active={boxedActive === 'boxed-tab-3'} id="boxed-tab-3">
					<Paragraph>Pull request reviews and merges.</Paragraph>
				</TabPanel>
			</TabsContent>
		</Card>
	</Column>
</Grid>

<!-- Tab Sizes -->
<Card>
	{#snippet header()}
		<Heading level={3}>Tab Sizes</Heading>
	{/snippet}
	<Heading level={4}>Small Tabs</Heading>
	<Tabs size="sm">
		<TabItem active={sizeSmallActive === 'size-sm-1'} onclick={() => (sizeSmallActive = 'size-sm-1')}>
			Tab 1
		</TabItem>
		<TabItem active={sizeSmallActive === 'size-sm-2'} onclick={() => (sizeSmallActive = 'size-sm-2')}>
			Tab 2
		</TabItem>
		<TabItem active={sizeSmallActive === 'size-sm-3'} onclick={() => (sizeSmallActive = 'size-sm-3')}>
			Tab 3
		</TabItem>
	</Tabs>
	<TabsContent>
		<TabPanel active={sizeSmallActive === 'size-sm-1'} id="size-sm-1">
			<Paragraph>Small tabs content - compact and space-efficient.</Paragraph>
		</TabPanel>
		<TabPanel active={sizeSmallActive === 'size-sm-2'} id="size-sm-2">
			<Paragraph>Small tabs - Tab 2</Paragraph>
		</TabPanel>
		<TabPanel active={sizeSmallActive === 'size-sm-3'} id="size-sm-3">
			<Paragraph>Small tabs - Tab 3</Paragraph>
		</TabPanel>
	</TabsContent>

	<Heading level={4} style="margin-top: 1.5rem;">Default Tabs</Heading>
	<Tabs>
		<TabItem active={sizeDefaultActive === 'size-def-1'} onclick={() => (sizeDefaultActive = 'size-def-1')}>
			Tab 1
		</TabItem>
		<TabItem active={sizeDefaultActive === 'size-def-2'} onclick={() => (sizeDefaultActive = 'size-def-2')}>
			Tab 2
		</TabItem>
		<TabItem active={sizeDefaultActive === 'size-def-3'} onclick={() => (sizeDefaultActive = 'size-def-3')}>
			Tab 3
		</TabItem>
	</Tabs>
	<TabsContent>
		<TabPanel active={sizeDefaultActive === 'size-def-1'} id="size-def-1">
			<Paragraph>Default size tabs content - standard spacing.</Paragraph>
		</TabPanel>
		<TabPanel active={sizeDefaultActive === 'size-def-2'} id="size-def-2">
			<Paragraph>Default tabs - Tab 2</Paragraph>
		</TabPanel>
		<TabPanel active={sizeDefaultActive === 'size-def-3'} id="size-def-3">
			<Paragraph>Default tabs - Tab 3</Paragraph>
		</TabPanel>
	</TabsContent>

	<Heading level={4} style="margin-top: 1.5rem;">Large Tabs</Heading>
	<Tabs size="lg">
		<TabItem active={sizeLargeActive === 'size-lg-1'} onclick={() => (sizeLargeActive = 'size-lg-1')}>
			Tab 1
		</TabItem>
		<TabItem active={sizeLargeActive === 'size-lg-2'} onclick={() => (sizeLargeActive = 'size-lg-2')}>
			Tab 2
		</TabItem>
		<TabItem active={sizeLargeActive === 'size-lg-3'} onclick={() => (sizeLargeActive = 'size-lg-3')}>
			Tab 3
		</TabItem>
	</Tabs>
	<TabsContent>
		<TabPanel active={sizeLargeActive === 'size-lg-1'} id="size-lg-1">
			<Paragraph>Large tabs content - more generous spacing.</Paragraph>
		</TabPanel>
		<TabPanel active={sizeLargeActive === 'size-lg-2'} id="size-lg-2">
			<Paragraph>Large tabs - Tab 2</Paragraph>
		</TabPanel>
		<TabPanel active={sizeLargeActive === 'size-lg-3'} id="size-lg-3">
			<Paragraph>Large tabs - Tab 3</Paragraph>
		</TabPanel>
	</TabsContent>
</Card>

<!-- Tabs with Badges -->
<Card>
	{#snippet header()}
		<Heading level={3}>Tabs with Badges</Heading>
	{/snippet}
	<Tabs>
		<TabItem active={badgesActive === 'badge-tab-1'} onclick={() => (badgesActive = 'badge-tab-1')}>
			<span>All</span>
			<Badge size="sm">48</Badge>
		</TabItem>
		<TabItem active={badgesActive === 'badge-tab-2'} onclick={() => (badgesActive = 'badge-tab-2')}>
			<span>Active</span>
			<Badge variant="success" size="sm">12</Badge>
		</TabItem>
		<TabItem active={badgesActive === 'badge-tab-3'} onclick={() => (badgesActive = 'badge-tab-3')}>
			<span>Pending</span>
			<Badge variant="warning" size="sm">5</Badge>
		</TabItem>
		<TabItem active={badgesActive === 'badge-tab-4'} onclick={() => (badgesActive = 'badge-tab-4')}>
			<span>Closed</span>
			<Badge variant="secondary" size="sm">31</Badge>
		</TabItem>
	</Tabs>
	<TabsContent>
		<TabPanel active={badgesActive === 'badge-tab-1'} id="badge-tab-1">
			<Paragraph>All items (48 total).</Paragraph>
		</TabPanel>
		<TabPanel active={badgesActive === 'badge-tab-2'} id="badge-tab-2">
			<Paragraph>Active items (12 items).</Paragraph>
		</TabPanel>
		<TabPanel active={badgesActive === 'badge-tab-3'} id="badge-tab-3">
			<Paragraph>Pending items (5 items).</Paragraph>
		</TabPanel>
		<TabPanel active={badgesActive === 'badge-tab-4'} id="badge-tab-4">
			<Paragraph>Closed items (31 items).</Paragraph>
		</TabPanel>
	</TabsContent>
</Card>

<!-- Centered Tabs -->
<Card>
	{#snippet header()}
		<Heading level={3}>Centered Tabs</Heading>
	{/snippet}
	<Tabs align="centered">
		<TabItem active={centeredActive === 'center-tab-1'} onclick={() => (centeredActive = 'center-tab-1')}>
			Features
		</TabItem>
		<TabItem active={centeredActive === 'center-tab-2'} onclick={() => (centeredActive = 'center-tab-2')}>
			Pricing
		</TabItem>
		<TabItem active={centeredActive === 'center-tab-3'} onclick={() => (centeredActive = 'center-tab-3')}>
			Testimonials
		</TabItem>
	</Tabs>
	<TabsContent>
		<TabPanel active={centeredActive === 'center-tab-1'} id="center-tab-1">
			<Paragraph style="text-align: center;">Feature highlights and capabilities.</Paragraph>
		</TabPanel>
		<TabPanel active={centeredActive === 'center-tab-2'} id="center-tab-2">
			<Paragraph style="text-align: center;">Pricing plans and options.</Paragraph>
		</TabPanel>
		<TabPanel active={centeredActive === 'center-tab-3'} id="center-tab-3">
			<Paragraph style="text-align: center;">Customer testimonials and reviews.</Paragraph>
		</TabPanel>
	</TabsContent>
</Card>

<!-- Full Width Tabs -->
<Card>
	{#snippet header()}
		<Heading level={3}>Full Width Tabs</Heading>
	{/snippet}
	<Tabs align="full">
		<TabItem active={fullActive === 'full-tab-1'} onclick={() => (fullActive = 'full-tab-1')}>
			{#snippet icon()}
				<i class="fa-solid fa-mobile-screen"></i>
			{/snippet}
			<span>Mobile</span>
		</TabItem>
		<TabItem active={fullActive === 'full-tab-2'} onclick={() => (fullActive = 'full-tab-2')}>
			{#snippet icon()}
				<i class="fa-solid fa-tablet-screen-button"></i>
			{/snippet}
			<span>Tablet</span>
		</TabItem>
		<TabItem active={fullActive === 'full-tab-3'} onclick={() => (fullActive = 'full-tab-3')}>
			{#snippet icon()}
				<i class="fa-solid fa-desktop"></i>
			{/snippet}
			<span>Desktop</span>
		</TabItem>
	</Tabs>
	<TabsContent>
		<TabPanel active={fullActive === 'full-tab-1'} id="full-tab-1">
			<Paragraph>Mobile view and responsive design.</Paragraph>
		</TabPanel>
		<TabPanel active={fullActive === 'full-tab-2'} id="full-tab-2">
			<Paragraph>Tablet view and layout.</Paragraph>
		</TabPanel>
		<TabPanel active={fullActive === 'full-tab-3'} id="full-tab-3">
			<Paragraph>Desktop view and features.</Paragraph>
		</TabPanel>
	</TabsContent>
</Card>

<!-- Icon-Only Tabs -->
<Grid>
	<Column size="1" md="1-2">
		<Card>
			{#snippet header()}
				<Heading level={3}>Icon-Only Tabs - Horizontal</Heading>
			{/snippet}
			<Tabs>
				<TabItem
					active={iconOnlyActive === 'icon-only-1'}
					onclick={() => (iconOnlyActive = 'icon-only-1')}
					class="pa-tooltip"
					data-tooltip="Dashboard"
				>
					<i class="fa-solid fa-chart-line"></i>
				</TabItem>
				<TabItem
					active={iconOnlyActive === 'icon-only-2'}
					onclick={() => (iconOnlyActive = 'icon-only-2')}
					class="pa-tooltip"
					data-tooltip="Analytics"
				>
					<i class="fa-solid fa-chart-bar"></i>
				</TabItem>
				<TabItem
					active={iconOnlyActive === 'icon-only-3'}
					onclick={() => (iconOnlyActive = 'icon-only-3')}
					class="pa-tooltip"
					data-tooltip="Users"
				>
					<i class="fa-solid fa-users"></i>
				</TabItem>
				<TabItem
					active={iconOnlyActive === 'icon-only-4'}
					onclick={() => (iconOnlyActive = 'icon-only-4')}
					class="pa-tooltip"
					data-tooltip="Settings"
				>
					<i class="fa-solid fa-gear"></i>
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel active={iconOnlyActive === 'icon-only-1'} id="icon-only-1">
					<Heading level={4}>Dashboard</Heading>
					<Paragraph>Icon-only tabs save space.</Paragraph>
				</TabPanel>
				<TabPanel active={iconOnlyActive === 'icon-only-2'} id="icon-only-2">
					<Heading level={4}>Analytics</Heading>
					<Paragraph>Analytics data here.</Paragraph>
				</TabPanel>
				<TabPanel active={iconOnlyActive === 'icon-only-3'} id="icon-only-3">
					<Heading level={4}>Users</Heading>
					<Paragraph>User management here.</Paragraph>
				</TabPanel>
				<TabPanel active={iconOnlyActive === 'icon-only-4'} id="icon-only-4">
					<Heading level={4}>Settings</Heading>
					<Paragraph>Settings here.</Paragraph>
				</TabPanel>
			</TabsContent>
		</Card>
	</Column>

	<Column size="1" md="1-2">
		<Card>
			{#snippet header()}
				<Heading level={3}>Icon-Only Tabs - Vertical</Heading>
			{/snippet}
			<TabsVerticalLayout>
				<Tabs style="vertical" align="centered">
					<TabItem
						active={iconVertActive === 'icon-vert-1'}
						onclick={() => (iconVertActive = 'icon-vert-1')}
						width="3x"
						height="3x"
						class="pa-tooltip"
						data-tooltip="Home"
					>
						<i class="fa-solid fa-house"></i>
					</TabItem>
					<TabItem
						active={iconVertActive === 'icon-vert-2'}
						onclick={() => (iconVertActive = 'icon-vert-2')}
						width="3x"
						height="3x"
						class="pa-tooltip"
						data-tooltip="Profile"
					>
						<i class="fa-solid fa-user"></i>
					</TabItem>
					<TabItem
						active={iconVertActive === 'icon-vert-3'}
						onclick={() => (iconVertActive = 'icon-vert-3')}
						width="3x"
						height="3x"
						class="pa-tooltip"
						data-tooltip="Messages"
					>
						<i class="fa-solid fa-envelope"></i>
					</TabItem>
					<TabItem
						active={iconVertActive === 'icon-vert-4'}
						onclick={() => (iconVertActive = 'icon-vert-4')}
						width="3x"
						height="3x"
						class="pa-tooltip"
						data-tooltip="Settings"
					>
						<i class="fa-solid fa-gear"></i>
					</TabItem>
				</Tabs>
				<TabsContent style="flex: 1;">
					<TabPanel active={iconVertActive === 'icon-vert-1'} id="icon-vert-1">
						<Heading level={4}>Home</Heading>
						<Paragraph>Vertical icon-only tabs with centered icons.</Paragraph>
					</TabPanel>
					<TabPanel active={iconVertActive === 'icon-vert-2'} id="icon-vert-2">
						<Heading level={4}>Profile</Heading>
						<Paragraph>Profile settings.</Paragraph>
					</TabPanel>
					<TabPanel active={iconVertActive === 'icon-vert-3'} id="icon-vert-3">
						<Heading level={4}>Messages</Heading>
						<Paragraph>Message inbox.</Paragraph>
					</TabPanel>
					<TabPanel active={iconVertActive === 'icon-vert-4'} id="icon-vert-4">
						<Heading level={4}>Settings</Heading>
						<Paragraph>Application settings.</Paragraph>
					</TabPanel>
				</TabsContent>
			</TabsVerticalLayout>
		</Card>
	</Column>
</Grid>

<!-- Standalone Tabs (Outside Cards) -->
<Heading level={3} style="margin-top: 2rem; margin-bottom: 1rem;">Standalone Tabs - No Card Required</Heading>

<Tabs>
	<TabItem active={standalonePageActive === 'standalone-1'} onclick={() => (standalonePageActive = 'standalone-1')}>
		Overview
	</TabItem>
	<TabItem active={standalonePageActive === 'standalone-2'} onclick={() => (standalonePageActive = 'standalone-2')}>
		Details
	</TabItem>
	<TabItem active={standalonePageActive === 'standalone-3'} onclick={() => (standalonePageActive = 'standalone-3')}>
		Reports
	</TabItem>
</Tabs>
<TabsContent>
	<TabPanel active={standalonePageActive === 'standalone-1'} id="standalone-1">
		<Card>
			<Heading level={4}>Overview Section</Heading>
			<Paragraph>Tabs can exist outside of cards for page-level navigation. Each tab can contain cards or any other content.</Paragraph>
		</Card>
	</TabPanel>
	<TabPanel active={standalonePageActive === 'standalone-2'} id="standalone-2">
		<Card>
			<Heading level={4}>Details Section</Heading>
			<Paragraph>This pattern is useful for organizing page content into sections.</Paragraph>
		</Card>
	</TabPanel>
	<TabPanel active={standalonePageActive === 'standalone-3'} id="standalone-3">
		<Card>
			<Heading level={4}>Reports Section</Heading>
			<Paragraph>The tab content can include multiple cards or complex layouts.</Paragraph>
		</Card>
	</TabPanel>
</TabsContent>

<Heading level={3} style="margin-top: 2rem; margin-bottom: 1rem;">Standalone Vertical Tabs</Heading>

<TabsVerticalLayout>
	<Tabs style="vertical">
		<TabItem
			active={standaloneVertActive === 'standalone-vert-1'}
			onclick={() => (standaloneVertActive = 'standalone-vert-1')}
			height="3x"
		>
			{#snippet icon()}
				<i class="fa-solid fa-house"></i>
			{/snippet}
			<span>Dashboard</span>
		</TabItem>
		<TabItem
			active={standaloneVertActive === 'standalone-vert-2'}
			onclick={() => (standaloneVertActive = 'standalone-vert-2')}
			height="3x"
		>
			{#snippet icon()}
				<i class="fa-solid fa-chart-bar"></i>
			{/snippet}
			<span>Analytics</span>
		</TabItem>
		<TabItem
			active={standaloneVertActive === 'standalone-vert-3'}
			onclick={() => (standaloneVertActive = 'standalone-vert-3')}
			height="3x"
		>
			{#snippet icon()}
				<i class="fa-solid fa-users"></i>
			{/snippet}
			<span>Users</span>
		</TabItem>
	</Tabs>
	<TabsContent style="flex: 1;">
		<TabPanel active={standaloneVertActive === 'standalone-vert-1'} id="standalone-vert-1">
			<Card>
				{#snippet header()}
					<Heading level={3}>Dashboard</Heading>
				{/snippet}
				<Paragraph>Vertical tabs work great for sidebar-style navigation outside of cards.</Paragraph>
			</Card>
		</TabPanel>
		<TabPanel active={standaloneVertActive === 'standalone-vert-2'} id="standalone-vert-2">
			<Card>
				{#snippet header()}
					<Heading level={3}>Analytics</Heading>
				{/snippet}
				<Paragraph>Analytics content goes here.</Paragraph>
			</Card>
		</TabPanel>
		<TabPanel active={standaloneVertActive === 'standalone-vert-3'} id="standalone-vert-3">
			<Card>
				{#snippet header()}
					<Heading level={3}>Users</Heading>
				{/snippet}
				<Paragraph>User management content here.</Paragraph>
			</Card>
		</TabPanel>
	</TabsContent>
</TabsVerticalLayout>

<Heading level={3} style="margin-top: 2rem; margin-bottom: 1rem;">Bordered Tabs - Card-Like Wrapper</Heading>

<!-- Bordered Horizontal Tabs -->
<TabsContainer bordered>
	<Tabs>
		<TabItem active={borderedActive === 'bordered-1'} onclick={() => (borderedActive = 'bordered-1')}>
			Dashboard
		</TabItem>
		<TabItem active={borderedActive === 'bordered-2'} onclick={() => (borderedActive = 'bordered-2')}>
			Settings
		</TabItem>
		<TabItem active={borderedActive === 'bordered-3'} onclick={() => (borderedActive = 'bordered-3')}>
			Profile
		</TabItem>
	</Tabs>
	<TabsContent>
		<TabPanel active={borderedActive === 'bordered-1'} id="bordered-1">
			<Heading level={4}>Dashboard</Heading>
			<Paragraph>Bordered tabs wrap the entire tab system in a card-like border. The content has no separate border - it's all unified.</Paragraph>
		</TabPanel>
		<TabPanel active={borderedActive === 'bordered-2'} id="bordered-2">
			<Heading level={4}>Settings</Heading>
			<Paragraph>This pattern works well for standalone tabs that need visual separation from the page background.</Paragraph>
		</TabPanel>
		<TabPanel active={borderedActive === 'bordered-3'} id="bordered-3">
			<Heading level={4}>Profile</Heading>
			<Paragraph>Use <code>pa-tabs__container--bordered</code> wrapper for horizontal tabs.</Paragraph>
		</TabPanel>
	</TabsContent>
</TabsContainer>

<Heading level={3} style="margin-top: 2rem; margin-bottom: 1rem;">Bordered Vertical Tabs</Heading>

<TabsVerticalLayout bordered>
	<Tabs style="vertical">
		<TabItem
			active={borderedVertActive === 'bordered-vert-1'}
			onclick={() => (borderedVertActive = 'bordered-vert-1')}
			height="3x"
		>
			{#snippet icon()}
				<i class="fa-solid fa-gauge"></i>
			{/snippet}
			<span>Overview</span>
		</TabItem>
		<TabItem
			active={borderedVertActive === 'bordered-vert-2'}
			onclick={() => (borderedVertActive = 'bordered-vert-2')}
			height="3x"
		>
			{#snippet icon()}
				<i class="fa-solid fa-chart-pie"></i>
			{/snippet}
			<span>Reports</span>
		</TabItem>
		<TabItem
			active={borderedVertActive === 'bordered-vert-3'}
			onclick={() => (borderedVertActive = 'bordered-vert-3')}
			height="3x"
		>
			{#snippet icon()}
				<i class="fa-solid fa-gear"></i>
			{/snippet}
			<span>Settings</span>
		</TabItem>
	</Tabs>
	<TabsContent style="flex: 1;">
		<TabPanel active={borderedVertActive === 'bordered-vert-1'} id="bordered-vert-1">
			<Heading level={4}>Overview</Heading>
			<Paragraph>Bordered vertical tabs create a unified card-like appearance.</Paragraph>
			<Paragraph>The border wraps both the tab navigation and content area with a divider between them.</Paragraph>
		</TabPanel>
		<TabPanel active={borderedVertActive === 'bordered-vert-2'} id="bordered-vert-2">
			<Heading level={4}>Reports</Heading>
			<Paragraph>Perfect for sidebar-style navigation that needs to stand out.</Paragraph>
		</TabPanel>
		<TabPanel active={borderedVertActive === 'bordered-vert-3'} id="bordered-vert-3">
			<Heading level={4}>Settings</Heading>
			<Paragraph>Use <code>pa-tabs__vertical-layout--bordered</code> modifier for vertical tabs.</Paragraph>
		</TabPanel>
	</TabsContent>
</TabsVerticalLayout>

<Heading level={3} style="margin-top: 2rem; margin-bottom: 1rem;">Long Tab Titles in Constrained Space</Heading>

<Grid>
	<Column size="1" md="1-3">
		<Card>
			{#snippet header()}
				<Heading level={3}>Default (Wrap)</Heading>
			{/snippet}
			<Tabs>
				<TabItem active={longWrapActive === 'long-1'} onclick={() => (longWrapActive = 'long-1')}>
					Organizations Tree
				</TabItem>
				<TabItem active={longWrapActive === 'long-2'} onclick={() => (longWrapActive = 'long-2')}>
					User Management System
				</TabItem>
				<TabItem active={longWrapActive === 'long-3'} onclick={() => (longWrapActive = 'long-3')}>
					Reports & Analytics
				</TabItem>
				<TabItem active={longWrapActive === 'long-4'} onclick={() => (longWrapActive = 'long-4')}>
					Settings & Configuration
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel active={longWrapActive === 'long-1'} id="long-1">
					<Paragraph>Default behavior - tabs wrap to multiple lines when needed.</Paragraph>
				</TabPanel>
				<TabPanel active={longWrapActive === 'long-2'} id="long-2">
					<Paragraph>User Management System content.</Paragraph>
				</TabPanel>
				<TabPanel active={longWrapActive === 'long-3'} id="long-3">
					<Paragraph>Reports & Analytics content.</Paragraph>
				</TabPanel>
				<TabPanel active={longWrapActive === 'long-4'} id="long-4">
					<Paragraph>Settings & Configuration content.</Paragraph>
				</TabPanel>
			</TabsContent>
		</Card>
	</Column>

	<Column size="1" md="1-3">
		<Card>
			{#snippet header()}
				<Heading level={3}>Collapse Modifier</Heading>
			{/snippet}
			<Tabs overflow="collapse">
				<TabItem
					active={longCollapseActive === 'collapse-1'}
					onclick={() => (longCollapseActive = 'collapse-1')}
					class="pa-tooltip"
					data-tooltip="Organizations Tree"
				>
					{#snippet icon()}
						<i class="fa-solid fa-sitemap"></i>
					{/snippet}
					<span>Organizations Tree</span>
				</TabItem>
				<TabItem
					active={longCollapseActive === 'collapse-2'}
					onclick={() => (longCollapseActive = 'collapse-2')}
					class="pa-tooltip"
					data-tooltip="User Management System"
				>
					{#snippet icon()}
						<i class="fa-solid fa-users"></i>
					{/snippet}
					<span>User Management System</span>
				</TabItem>
				<TabItem
					active={longCollapseActive === 'collapse-3'}
					onclick={() => (longCollapseActive = 'collapse-3')}
					class="pa-tooltip"
					data-tooltip="Reports & Analytics"
				>
					{#snippet icon()}
						<i class="fa-solid fa-chart-bar"></i>
					{/snippet}
					<span>Reports & Analytics</span>
				</TabItem>
				<TabItem
					active={longCollapseActive === 'collapse-4'}
					onclick={() => (longCollapseActive = 'collapse-4')}
					class="pa-tooltip"
					data-tooltip="Settings & Configuration"
				>
					{#snippet icon()}
						<i class="fa-solid fa-gear"></i>
					{/snippet}
					<span>Settings</span>
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel active={longCollapseActive === 'collapse-1'} id="collapse-1">
					<Paragraph>Collapse mode - inactive tabs show only icons, active tab shows full title.</Paragraph>
				</TabPanel>
				<TabPanel active={longCollapseActive === 'collapse-2'} id="collapse-2">
					<Paragraph>User Management content.</Paragraph>
				</TabPanel>
				<TabPanel active={longCollapseActive === 'collapse-3'} id="collapse-3">
					<Paragraph>Reports content.</Paragraph>
				</TabPanel>
				<TabPanel active={longCollapseActive === 'collapse-4'} id="collapse-4">
					<Paragraph>Settings content.</Paragraph>
				</TabPanel>
			</TabsContent>
		</Card>
	</Column>

	<Column size="1" md="1-3">
		<Card>
			{#snippet header()}
				<Heading level={3}>Scrollable Modifier</Heading>
			{/snippet}
			<TabsScrollable>
				<TabItem active={longScrollActive === 'long-boxed-1'} onclick={() => (longScrollActive = 'long-boxed-1')}>
					Organizations Tree
				</TabItem>
				<TabItem active={longScrollActive === 'long-boxed-2'} onclick={() => (longScrollActive = 'long-boxed-2')}>
					User Management System
				</TabItem>
				<TabItem active={longScrollActive === 'long-boxed-3'} onclick={() => (longScrollActive = 'long-boxed-3')}>
					Reports & Analytics
				</TabItem>
				<TabItem active={longScrollActive === 'long-boxed-4'} onclick={() => (longScrollActive = 'long-boxed-4')}>
					Settings & Configuration
				</TabItem>
			</TabsScrollable>
			<TabsContent>
				<TabPanel active={longScrollActive === 'long-boxed-1'} id="long-boxed-1">
					<Paragraph>Scrollable tabs with <code>TabsScrollable</code> component - click arrows to scroll.</Paragraph>
				</TabPanel>
				<TabPanel active={longScrollActive === 'long-boxed-2'} id="long-boxed-2">
					<Paragraph>User Management content.</Paragraph>
				</TabPanel>
				<TabPanel active={longScrollActive === 'long-boxed-3'} id="long-boxed-3">
					<Paragraph>Reports content.</Paragraph>
				</TabPanel>
				<TabPanel active={longScrollActive === 'long-boxed-4'} id="long-boxed-4">
					<Paragraph>Settings content.</Paragraph>
				</TabPanel>
			</TabsContent>
		</Card>
	</Column>
</Grid>
