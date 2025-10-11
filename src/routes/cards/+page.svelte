<script lang="ts">
	import {
		Card,
		CardTab,
		CardTabContent,
		Button,
		Badge,
		Grid,
		Column,
		Section,
		Table,
		Stat,
		List,
		ListItem
	} from '$lib';
	import { onMount } from 'svelte';

	let activeTab = $state('tab1');

	function toggleCard(event: MouseEvent) {
		const button = event.currentTarget as HTMLButtonElement;
		const card = button.closest('.pa-card');
		const body = card?.querySelector('.pa-card__body') as HTMLElement;

		if (body.style.display === 'none') {
			body.style.display = 'block';
			button.textContent = '−';
		} else {
			body.style.display = 'none';
			button.textContent = '+';
		}
	}

	function showTab(tabId: string) {
		activeTab = tabId;
	}
</script>

<svelte:head>
	<title>Cards - Pure Admin Svelte</title>
</svelte:head>

<h1>Cards</h1>
<p>Flexible content containers for organizing and displaying information.</p>

<!-- Basic Cards -->
<Section title="Basic Cards">
	<Grid>
		<!-- Simple Card -->
		<Column size="1" md="1-2">
			<Card>
				<h4>Simple Card</h4>
				<p>This is a basic card with just a body. Perfect for simple content display.</p>
			</Card>
		</Column>

		<!-- Card with Header -->
		<Column size="1" md="1-2">
			<Card>
				{#snippet header()}
					<h4>Card with Header</h4>
				{/snippet}
				<p>This card includes a header section for titles and actions.</p>
			</Card>
		</Column>

		<!-- Card with Footer -->
		<Column size="1" md="1-2">
			<Card>
				<h4>Card with Footer</h4>
				<p>This card includes a footer section for actions or meta information.</p>
				{#snippet footer()}
					<Button variant="primary" size="sm">Action</Button>
				{/snippet}
			</Card>
		</Column>

		<!-- Full Card -->
		<Column size="1" md="1-2">
			<Card title="Complete Card">
				{#snippet tools()}
					<Button variant="secondary" size="xs">⚙</Button>
				{/snippet}
				<p>A complete card with header, body, and footer sections.</p>
				{#snippet meta()}Updated 2 hours ago{/snippet}
				{#snippet actions()}
					<Button variant="secondary" size="sm">Cancel</Button>
					<Button variant="primary" size="sm">Save</Button>
				{/snippet}
			</Card>
		</Column>
	</Grid>
</Section>

<!-- Colored Cards -->
<Section title="Colored Cards">
	<Grid>
		<!-- Primary Card -->
		<Column size="1" md="1-2">
			<Card variant="primary">
				{#snippet header()}
					<h4>Primary Card</h4>
				{/snippet}
				<p>Card with primary color theme.</p>
			</Card>
		</Column>

		<!-- Success Card -->
		<Column size="1" md="1-2">
			<Card variant="success">
				{#snippet header()}
					<h4>Success Card</h4>
				{/snippet}
				<p>Card with success color theme.</p>
			</Card>
		</Column>

		<!-- Warning Card -->
		<Column size="1" md="1-2">
			<Card variant="warning">
				{#snippet header()}
					<h4>Warning Card</h4>
				{/snippet}
				<p>Card with warning color theme.</p>
			</Card>
		</Column>

		<!-- Danger Card -->
		<Column size="1" md="1-2">
			<Card variant="danger">
				{#snippet header()}
					<h4>Danger Card</h4>
				{/snippet}
				<p>Card with danger color theme.</p>
			</Card>
		</Column>
	</Grid>
</Section>

<!-- Stats Cards -->
<Section title="Statistics Cards">
	<Grid>
		<!-- Stat Card 1 -->
		<Column size="1" sm="1-2" lg="1-4">
			<Card stat>
				<Stat number="1,234" label="Total Users" iconVariant="primary">
					{#snippet icon()}👥{/snippet}
				</Stat>
			</Card>
		</Column>

		<!-- Stat Card 2 -->
		<Column size="1" sm="1-2" lg="1-4">
			<Card stat>
				<Stat number="$45,678" label="Revenue" iconVariant="success">
					{#snippet icon()}📊{/snippet}
				</Stat>
			</Card>
		</Column>

		<!-- Stat Card 3 -->
		<Column size="1" sm="1-2" lg="1-4">
			<Card stat>
				<Stat number="567" label="Orders" iconVariant="warning">
					{#snippet icon()}📦{/snippet}
				</Stat>
			</Card>
		</Column>

		<!-- Stat Card 4 -->
		<Column size="1" sm="1-2" lg="1-4">
			<Card stat>
				<Stat number="+12%" label="Growth" iconVariant="info">
					{#snippet icon()}📈{/snippet}
				</Stat>
			</Card>
		</Column>
	</Grid>
</Section>

<!-- Interactive Cards -->
<Section title="Interactive Cards">
	<Grid>
		<!-- Collapsible Card -->
		<Column size="1" md="1-2">
			<Card title="Collapsible Card">
				{#snippet tools()}
					<Button variant="secondary" size="xs" onClick={toggleCard}>−</Button>
				{/snippet}
				<p>
					This card can be collapsed and expanded. Click the minus/plus button in the header.
				</p>
				<p>Content that can be hidden to save space when not needed.</p>
			</Card>
		</Column>

		<!-- Card with Tabs -->
		<Column size="1" md="1-2">
			<Card>
				{#snippet header()}
					<h4>Card with Tabs</h4>
				{/snippet}
				{#snippet tabs()}
					<CardTab active={activeTab === 'tab1'} onclick={() => showTab('tab1')}>Overview</CardTab>
					<CardTab active={activeTab === 'tab2'} onclick={() => showTab('tab2')}>Details</CardTab>
					<CardTab active={activeTab === 'tab3'} onclick={() => showTab('tab3')}>Settings</CardTab>
				{/snippet}
				<CardTabContent id="tab1" active={activeTab === 'tab1'}>
					<p>Overview content goes here. This is the default active tab.</p>
				</CardTabContent>
				<CardTabContent id="tab2" active={activeTab === 'tab2'}>
					<p>Detailed information is displayed in this tab.</p>
				</CardTabContent>
				<CardTabContent id="tab3" active={activeTab === 'tab3'}>
					<p>Settings and configuration options would be shown here.</p>
				</CardTabContent>
			</Card>
		</Column>
	</Grid>
</Section>

<!-- Advanced Cards -->
<Section title="Advanced Card Features">
	<Grid>
		<!-- Card with Icon and Tools -->
		<Column size="1" md="1-2">
			<Card title="Analytics Dashboard Overview">
				{#snippet titleIcon()}📊{/snippet}
				{#snippet tools()}
					<Button variant="secondary" size="xs" title="Refresh">↻</Button>
					<Button variant="secondary" size="xs" title="Settings">⚙</Button>
					<Button variant="secondary" size="xs" title="More options">⋯</Button>
				{/snippet}
				<p>
					This card demonstrates icon in title with tool buttons. The title will truncate with
					ellipsis when it's too long.
				</p>
			</Card>
		</Column>

		<!-- Card with Very Long Title -->
		<Column size="1" md="1-2">
			<Card
				title="This is a Very Long Card Title That Should Be Truncated With Ellipsis When It Exceeds Available Space"
			>
				{#snippet titleIcon()}🔒{/snippet}
				{#snippet tools()}
					<Button variant="secondary" size="xs" title="Edit">✏️</Button>
					<Button variant="secondary" size="xs" title="Delete">🗑️</Button>
					<Button variant="secondary" size="xs" title="Export">⬇️</Button>
					<Button variant="secondary" size="xs" title="Share">📤</Button>
				{/snippet}
				<p>
					Notice how the title truncates with ellipsis (...) when there's not enough space due to
					the tool buttons.
				</p>
			</Card>
		</Column>

		<!-- Card with Different Icon Styles -->
		<Column size="1" md="1-2">
			<Card title="Project Management">
				{#snippet titleIcon()}💼{/snippet}
				{#snippet tools()}
					<Button variant="primary" size="xs">+ Add</Button>
					<Button variant="secondary" size="xs" title="Filter">🔍</Button>
				{/snippet}
				<p>Different combinations of icons and tool button styles work well together.</p>
			</Card>
		</Column>

		<!-- Card with Minimal Tools -->
		<Column size="1" md="1-2">
			<Card title="Revenue Metrics and KPI Tracking System">
				{#snippet titleIcon()}📈{/snippet}
				{#snippet tools()}
					<Button variant="secondary" size="xs" title="Maximize">⛶</Button>
				{/snippet}
				<p>Even with fewer tools, the title still truncates appropriately to maintain layout.</p>
			</Card>
		</Column>
	</Grid>
</Section>

<!-- Data Cards -->
<Section title="Data Display Cards">
	<Grid>
		<!-- Table Card -->
		<Column size="1" lg="1-2">
			<Card title="Recent Orders" noPadding>
				{#snippet tools()}
					<Button variant="secondary" size="sm">View All</Button>
				{/snippet}
				<Table>
					<thead>
						<tr>
							<th>Order ID</th>
							<th>Customer</th>
							<th>Amount</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>#1234</td>
							<td>John Doe</td>
							<td>$299.99</td>
							<td><Badge variant="success">Completed</Badge></td>
						</tr>
						<tr>
							<td>#1235</td>
							<td>Jane Smith</td>
							<td>$149.50</td>
							<td><Badge variant="warning">Pending</Badge></td>
						</tr>
						<tr>
							<td>#1236</td>
							<td>Bob Johnson</td>
							<td>$89.99</td>
							<td><Badge variant="info">Processing</Badge></td>
						</tr>
					</tbody>
				</Table>
			</Card>
		</Column>

		<!-- List Card -->
		<Column size="1" lg="1-2">
			<Card title="Activity Feed" noPadding>
				<List>
					<ListItem
						title="User Registration"
						subtitle="New user John Doe registered"
						meta="2 minutes ago"
					>
						{#snippet avatar()}👤{/snippet}
					</ListItem>
					<ListItem
						title="Payment Received"
						subtitle="$299.99 from Order #1234"
						meta="5 minutes ago"
					>
						{#snippet avatar()}💰{/snippet}
					</ListItem>
					<ListItem title="Order Shipped" subtitle="Order #1233 has been shipped" meta="10 minutes ago">
						{#snippet avatar()}📦{/snippet}
					</ListItem>
				</List>
			</Card>
		</Column>
	</Grid>
</Section>
