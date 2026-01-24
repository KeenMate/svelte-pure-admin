<script lang="ts">
	import { Heading, Paragraph, Card, CardTab, CardTabContent, Button, Badge, Grid, Column, Section, Table, Stat, List, ListItem } from '@keenmate/svelte-pure-admin';

	// Local type matching Card component's variant prop
	type CardVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info'
		| 'color-1' | 'color-2' | 'color-3' | 'color-4' | 'color-5'
		| 'color-6' | 'color-7' | 'color-8' | 'color-9';

	let activeTab = $state('tab1');

	// Color variants for theme color cards
	const colorVariants: CardVariant[] = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5', 'color-6', 'color-7', 'color-8', 'color-9'];

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

<Paragraph>Flexible content containers for organizing and displaying information.</Paragraph>

<!-- Same Height Cards -->
<Section title="Same Height Cards">
	<Paragraph class="mb-2">Use <code>sameHeight</code> on Grid to make all cards in a row match the height of the tallest card.</Paragraph>
	<Grid sameHeight>
		<Column size="100" md="1-3">
			<Card title="Short Card">
				<Paragraph>This card has minimal content.</Paragraph>
			</Card>
		</Column>
		<Column size="100" md="1-3">
			<Card title="Tall Card">
				<Paragraph>This card has much more content than the others, making it naturally taller.</Paragraph>
				<Paragraph>All sibling cards will stretch to match this height thanks to the <code>sameHeight</code> prop on Grid.</Paragraph>
				<Paragraph>This is useful for dashboard layouts where visual consistency matters.</Paragraph>
			</Card>
		</Column>
		<Column size="100" md="1-3">
			<Card title="Medium Card">
				<Paragraph>This card also stretches to match the tallest card in the row.</Paragraph>
			</Card>
		</Column>
	</Grid>
</Section>

<!-- Basic Cards -->
<Section title="Basic Cards">
	<Grid>
		<!-- Simple Card -->
		<Column size="100" md="1-2">
			<Card>
				<Heading level={4}>Simple Card</Heading>
				<Paragraph>This is a basic card with just a body. Perfect for simple content display.</Paragraph>
			</Card>
		</Column>

		<!-- Card with Header -->
		<Column size="100" md="1-2">
			<Card>
				{#snippet header()}
					<Heading level={4}>Card with Header</Heading>
				{/snippet}
				<Paragraph>This card includes a header section for titles and actions.</Paragraph>
			</Card>
		</Column>

		<!-- Card with Footer -->
		<Column size="100" md="1-2">
			<Card>
				<Heading level={4}>Card with Footer</Heading>
				<Paragraph>This card includes a footer section for actions or meta information.</Paragraph>
				{#snippet footer()}
					<Button variant="primary" size="sm">Action</Button>
				{/snippet}
			</Card>
		</Column>

		<!-- Full Card -->
		<Column size="100" md="1-2">
			<Card title="Complete Card">
				{#snippet tools()}
					<Button variant="secondary" size="xs">⚙</Button>
				{/snippet}
				<Paragraph>A complete card with header, body, and footer sections.</Paragraph>
				<Paragraph class="text-muted text-sm">Updated 2 hours ago</Paragraph>
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
		<Column size="100" md="1-2">
			<Card variant="primary">
				{#snippet header()}
					<Heading level={4}>Primary Card</Heading>
				{/snippet}
				<Paragraph>Card with primary color theme.</Paragraph>
			</Card>
		</Column>

		<!-- Success Card -->
		<Column size="100" md="1-2">
			<Card variant="success">
				{#snippet header()}
					<Heading level={4}>Success Card</Heading>
				{/snippet}
				<Paragraph>Card with success color theme.</Paragraph>
			</Card>
		</Column>

		<!-- Warning Card -->
		<Column size="100" md="1-2">
			<Card variant="warning">
				{#snippet header()}
					<Heading level={4}>Warning Card</Heading>
				{/snippet}
				<Paragraph>Card with warning color theme.</Paragraph>
			</Card>
		</Column>

		<!-- Danger Card -->
		<Column size="100" md="1-2">
			<Card variant="danger">
				{#snippet header()}
					<Heading level={4}>Danger Card</Heading>
				{/snippet}
				<Paragraph>Card with danger color theme.</Paragraph>
			</Card>
		</Column>

		<!-- Info Card -->
		<Column size="100" md="1-2">
			<Card variant="info">
				{#snippet header()}
					<Heading level={4}>Info Card</Heading>
				{/snippet}
				<Paragraph>Card with info color theme.</Paragraph>
			</Card>
		</Column>
	</Grid>
</Section>

<!-- Theme Color Cards -->
<Section title="Theme Color Cards">
	<Paragraph class="mb-2">Cards can use theme color slots (color-1 through color-9) for custom color schemes defined by your theme.</Paragraph>
	<Grid>
		{#each colorVariants as variant, i}
			<Column size="100" md="1-3">
				<Card {variant}>
					{#snippet header()}
						<Heading level={4}>Color {i + 1}</Heading>
					{/snippet}
					<Paragraph>Theme color slot {i + 1}</Paragraph>
				</Card>
			</Column>
		{/each}
	</Grid>
</Section>

<!-- Bordered Cards -->
<Section title="Bordered Cards">
	<Paragraph class="mb-2">Cards can have visible borders using the <code>pa-card--bordered</code> class.</Paragraph>
	<Grid>
		<Column size="100" md="1-2">
			<Card class="pa-card--bordered" title="Bordered Card">
				<Paragraph>Card with visible border styling.</Paragraph>
			</Card>
		</Column>
		<Column size="100" md="1-2">
			<Card class="pa-card--bordered" variant="primary" title="Bordered Primary">
				<Paragraph>Bordered card with color variant.</Paragraph>
			</Card>
		</Column>
		<Column size="100" md="1-2">
			<Card class="pa-card--bordered" variant="success" title="Bordered Success">
				<Paragraph>Bordered card with success variant.</Paragraph>
			</Card>
		</Column>
		<Column size="100" md="1-2">
			<Card class="pa-card--bordered" variant="danger" title="Bordered Danger">
				<Paragraph>Bordered card with danger variant.</Paragraph>
			</Card>
		</Column>
	</Grid>
</Section>

<!-- Stats Cards -->
<Section title="Statistics Cards">
	<Grid>
		<!-- Stat Card 1 -->
		<Column size="100" sm="1-2" lg="1-4">
			<Card stat>
				<Stat number="1,234" label="Total Users" iconVariant="primary">
					{#snippet icon()}👥{/snippet}
				</Stat>
			</Card>
		</Column>

		<!-- Stat Card 2 -->
		<Column size="100" sm="1-2" lg="1-4">
			<Card stat>
				<Stat number="$45,678" label="Revenue" iconVariant="success">
					{#snippet icon()}📊{/snippet}
				</Stat>
			</Card>
		</Column>

		<!-- Stat Card 3 -->
		<Column size="100" sm="1-2" lg="1-4">
			<Card stat>
				<Stat number="567" label="Orders" iconVariant="warning">
					{#snippet icon()}📦{/snippet}
				</Stat>
			</Card>
		</Column>

		<!-- Stat Card 4 -->
		<Column size="100" sm="1-2" lg="1-4">
			<Card stat>
				<Stat number="+12%" label="Growth" iconVariant="info">
					{#snippet icon()}📈{/snippet}
				</Stat>
			</Card>
		</Column>
	</Grid>
</Section>

<!-- Statistics with Trends -->
<Section title="Statistics with Trends">
	<Paragraph class="mb-2">Stats can display change indicators showing positive, negative, or neutral trends. Note: Change indicators only display when NOT using the icon layout.</Paragraph>
	<Grid>
		<Column size="100" sm="1-2" lg="1-3">
			<Card stat>
				<Stat number="1,234" label="Total Users" change="+12.5%" changeDirection="positive" />
			</Card>
		</Column>
		<Column size="100" sm="1-2" lg="1-3">
			<Card stat>
				<Stat number="567" label="Orders" change="-5.2%" changeDirection="negative" />
			</Card>
		</Column>
		<Column size="100" sm="1-2" lg="1-3">
			<Card stat>
				<Stat number="$89.50" label="Avg Order" change="0%" changeDirection="neutral" />
			</Card>
		</Column>
	</Grid>
</Section>

<!-- Interactive Cards -->
<Section title="Interactive Cards">
	<Grid>
		<!-- Collapsible Card -->
		<Column size="100" md="1-2">
			<Card title="Collapsible Card">
				{#snippet tools()}
					<Button variant="secondary" size="xs" onclick={toggleCard}>−</Button>
				{/snippet}
				<Paragraph>
					This card can be collapsed and expanded. Click the minus/plus button in the header.
				</Paragraph>
				<Paragraph>Content that can be hidden to save space when not needed.</Paragraph>
			</Card>
		</Column>

		<!-- Card with Tabs -->
		<Column size="100" md="1-2">
			<Card>
				{#snippet header()}
					<Heading level={4}>Card with Tabs</Heading>
				{/snippet}
				{#snippet tabs()}
					<CardTab active={activeTab === 'tab1'} onclick={() => showTab('tab1')}>Overview</CardTab>
					<CardTab active={activeTab === 'tab2'} onclick={() => showTab('tab2')}>Details</CardTab>
					<CardTab active={activeTab === 'tab3'} onclick={() => showTab('tab3')}>Settings</CardTab>
				{/snippet}
				<CardTabContent id="tab1" active={activeTab === 'tab1'}>
					<Paragraph>Overview content goes here. This is the default active tab.</Paragraph>
				</CardTabContent>
				<CardTabContent id="tab2" active={activeTab === 'tab2'}>
					<Paragraph>Detailed information is displayed in this tab.</Paragraph>
				</CardTabContent>
				<CardTabContent id="tab3" active={activeTab === 'tab3'}>
					<Paragraph>Settings and configuration options would be shown here.</Paragraph>
				</CardTabContent>
			</Card>
		</Column>
	</Grid>
</Section>

<!-- Advanced Cards -->
<Section title="Advanced Card Features">
	<Grid>
		<!-- Card with Icon and Tools -->
		<Column size="100" md="1-2">
			<Card title="Analytics Dashboard Overview">
				{#snippet titleIcon()}📊{/snippet}
				{#snippet tools()}
					<Button variant="secondary" size="xs" title="Refresh">↻</Button>
					<Button variant="secondary" size="xs" title="Settings">⚙</Button>
					<Button variant="secondary" size="xs" title="More options">⋯</Button>
				{/snippet}
				<Paragraph>
					This card demonstrates icon in title with tool buttons. The title will truncate with
					ellipsis when it's too long.
				</Paragraph>
			</Card>
		</Column>

		<!-- Card with Very Long Title -->
		<Column size="100" md="1-2">
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
				<Paragraph>
					Notice how the title truncates with ellipsis (...) when there's not enough space due to
					the tool buttons.
				</Paragraph>
			</Card>
		</Column>

		<!-- Card with Different Icon Styles -->
		<Column size="100" md="1-2">
			<Card title="Project Management">
				{#snippet titleIcon()}💼{/snippet}
				{#snippet tools()}
					<Button variant="primary" size="xs">+ Add</Button>
					<Button variant="secondary" size="xs" title="Filter">🔍</Button>
				{/snippet}
				<Paragraph>Different combinations of icons and tool button styles work well together.</Paragraph>
			</Card>
		</Column>

		<!-- Card with Minimal Tools -->
		<Column size="100" md="1-2">
			<Card title="Revenue Metrics and KPI Tracking System">
				{#snippet titleIcon()}📈{/snippet}
				{#snippet tools()}
					<Button variant="secondary" size="xs" title="Maximize">⛶</Button>
				{/snippet}
				<Paragraph>Even with fewer tools, the title still truncates appropriately to maintain layout.</Paragraph>
			</Card>
		</Column>
	</Grid>
</Section>

<!-- Data Cards -->
<Section title="Data Display Cards">
	<Grid>
		<!-- Table Card -->
		<Column size="100" lg="1-2">
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
		<Column size="100" lg="1-2">
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
