<script lang="ts">
	import {
		Card,
		Grid,
		Column,
		Badge,
		Button,
		Table,
		TableResponsive,
		Stat,
		MetricList,
		MetricListItem,
		StatusList,
		StatusListItem,
		ActivityFeed,
		ActivityFeedItem,
		QuickActions,
		Paragraph
	} from '@keenmate/svelte-pure-admin';
	import ConfigDisplay from './ConfigDisplay.svelte';
</script>

<ConfigDisplay />

<!-- Dashboard Header -->
<Grid>
	<Column size="100">
		<Paragraph mode="muted">Real-time overview of key performance metrics</Paragraph>
	</Column>
</Grid>

<!-- KPI Metric Cards -->
<Grid>
	<Column size="100" md="25">
		<Card>
			<Stat variant="hero" labelText="Total Revenue" number="$847,392" changeText="▲ 12.5% vs last month" changeDirection="positive" />
		</Card>
	</Column>
	<Column size="100" md="25">
		<Card>
			<Stat variant="hero" labelText="Active Users" number="24,583" changeText="▲ 8.3% vs last month" changeDirection="positive" />
		</Card>
	</Column>
	<Column size="100" md="25">
		<Card>
			<Stat variant="hero" labelText="Conversion Rate" number="3.47%" changeText="▼ 2.1% vs last month" changeDirection="negative" />
		</Card>
	</Column>
	<Column size="100" md="25">
		<Card>
			<Stat variant="hero" labelText="Avg Order Value" number="$134.52" changeText="▲ 5.7% vs last month" changeDirection="positive" />
		</Card>
	</Column>
</Grid>

<!-- Top Sales Products & KPIs -->
<Grid>
	<Column size="100" md="2-3">
		<Card titleText="Top Sales Products">
			<div class="pa-chart-placeholder">
				<Paragraph horizontalAlignment="center" mode="muted">Chart placeholder - integrate with Chart.js, D3.js, or similar</Paragraph>
				<div class="pa-chart-mockup">
					<svg width="100%" height="200" viewBox="0 0 600 200" preserveAspectRatio="none">
						<rect x="20" y="20" width="280" height="25" fill="currentColor" opacity="0.6" rx="4" />
						<rect x="20" y="55" width="220" height="25" fill="currentColor" opacity="0.5" rx="4" />
						<rect x="20" y="90" width="180" height="25" fill="currentColor" opacity="0.4" rx="4" />
						<rect x="20" y="125" width="140" height="25" fill="currentColor" opacity="0.3" rx="4" />
						<rect x="20" y="160" width="100" height="25" fill="currentColor" opacity="0.2" rx="4" />
					</svg>
				</div>
			</div>
		</Card>
	</Column>
	<Column size="100" md="1-3">
		<Card titleText="Key Performance Indicators">
			<Grid class="pa-kpi-grid">
				<Column size="100" xl="50">
					<Stat variant="square" color="primary" number={87} symbolText="%" labelText="Completion Rate" />
				</Column>
				<Column size="100" xl="50">
					<Stat variant="square" color="success" number={94} symbolText="%" labelText="Customer Satisfaction" />
				</Column>
				<Column size="100" xl="50">
					<Stat variant="square" color="info" number={62} symbolText="%" labelText="Market Share" />
				</Column>
				<Column size="100" xl="50">
					<Stat variant="square" color="warning" number={78} symbolText="%" labelText="Server Capacity" />
				</Column>
				<Column size="100" xl="50">
					<Stat variant="square" color="danger" number={23} symbolText="%" labelText="Error Rate" />
				</Column>
				<Column size="100" xl="50">
					<Stat variant="square" color="secondary" number={91} symbolText="%" labelText="Uptime" />
				</Column>
			</Grid>
		</Card>
	</Column>
</Grid>

<!-- Charts Section -->
<Grid>
	<Column size="100" md="2-3">
		<Card titleText="Revenue Trend">
			<div class="pa-chart-placeholder">
				<Paragraph horizontalAlignment="center" mode="muted">Chart placeholder - integrate with Chart.js, D3.js, or similar</Paragraph>
				<div class="pa-chart-mockup">
					<svg width="100%" height="200" viewBox="0 0 600 200" preserveAspectRatio="none">
						<polyline
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							points="0,150 60,140 120,120 180,110 240,100 300,90 360,85 420,75 480,70 540,60 600,50"
							opacity="0.6"
						/>
						<polyline
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							points="0,180 60,170 120,165 180,160 240,155 300,150 360,145 420,140 480,135 540,130 600,125"
							opacity="0.3"
						/>
					</svg>
				</div>
			</div>
		</Card>
	</Column>
	<Column size="100" md="1-3">
		<Card titleText="Traffic Sources">
			<MetricList>
				<MetricListItem labelText="Organic Search" valueText="42.3%" />
				<MetricListItem labelText="Direct" valueText="28.7%" />
				<MetricListItem labelText="Social Media" valueText="15.8%" />
				<MetricListItem labelText="Referral" valueText="9.4%" />
				<MetricListItem labelText="Email" valueText="3.8%" />
			</MetricList>
		</Card>
	</Column>
</Grid>

<!-- Activity Feed & Recent Orders -->
<Grid>
	<Column size="100" md="50">
		<Card titleText="Recent Activity">
			<ActivityFeed>
				<ActivityFeedItem timeText="2 minutes ago">
					{#snippet icon()}👤{/snippet}
					New user registration: <strong>john.smith@example.com</strong>
				</ActivityFeedItem>
				<ActivityFeedItem timeText="8 minutes ago">
					{#snippet icon()}🛒{/snippet}
					Order #4892 completed - <strong>$234.50</strong>
				</ActivityFeedItem>
				<ActivityFeedItem timeText="15 minutes ago">
					{#snippet icon()}⚠{/snippet}
					Low stock alert: <strong>Product A-123</strong>
				</ActivityFeedItem>
				<ActivityFeedItem timeText="23 minutes ago">
					{#snippet icon()}💳{/snippet}
					Payment received: <strong>Invoice #2847</strong>
				</ActivityFeedItem>
				<ActivityFeedItem timeText="1 hour ago">
					{#snippet icon()}📊{/snippet}
					Monthly report generated
				</ActivityFeedItem>
			</ActivityFeed>
			{#snippet footer()}
				<Button variant="secondary" size="sm">View All Activity</Button>
			{/snippet}
		</Card>
	</Column>
	<Column size="100" md="50">
		<Card titleText="Recent Orders">
			<TableResponsive>
				<Table size="xs">
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
							<td>#4892</td>
							<td>Alice Johnson</td>
							<td>$234.50</td>
							<td><Badge variant="success">Completed</Badge></td>
						</tr>
						<tr>
							<td>#4891</td>
							<td>Bob Williams</td>
							<td>$456.00</td>
							<td><Badge variant="warning">Processing</Badge></td>
						</tr>
						<tr>
							<td>#4890</td>
							<td>Carol Davis</td>
							<td>$123.75</td>
							<td><Badge variant="success">Completed</Badge></td>
						</tr>
						<tr>
							<td>#4889</td>
							<td>David Miller</td>
							<td>$789.25</td>
							<td><Badge variant="info">Shipped</Badge></td>
						</tr>
						<tr>
							<td>#4888</td>
							<td>Emma Wilson</td>
							<td>$345.60</td>
							<td><Badge variant="success">Completed</Badge></td>
						</tr>
					</tbody>
				</Table>
			</TableResponsive>
			{#snippet footer()}
				<Button variant="secondary" size="sm">View All Orders</Button>
			{/snippet}
		</Card>
	</Column>
</Grid>

<!-- Bottom Row - Performance Metrics -->
<Grid>
	<Column size="100" md="1-3">
		<Card titleText="Top Products">
			<MetricList>
				<MetricListItem labelText="Product Alpha" valueText="$24,532" />
				<MetricListItem labelText="Product Beta" valueText="$18,940" />
				<MetricListItem labelText="Product Gamma" valueText="$15,677" />
				<MetricListItem labelText="Product Delta" valueText="$12,234" />
			</MetricList>
		</Card>
	</Column>
	<Column size="100" md="1-3">
		<Card titleText="System Status">
			<StatusList>
				<StatusListItem labelText="API Services" valueText="Operational" status="success" />
				<StatusListItem labelText="Database" valueText="Operational" status="success" />
				<StatusListItem labelText="Payment Gateway" valueText="Degraded" status="warning" />
				<StatusListItem labelText="Email Service" valueText="Operational" status="success" />
			</StatusList>
		</Card>
	</Column>
	<Column size="100" md="1-3">
		<Card titleText="Quick Actions">
			<QuickActions>
				<Button variant="primary" isBlock>New Order</Button>
				<Button variant="secondary" isBlock>Add Customer</Button>
				<Button variant="secondary" isBlock>Generate Report</Button>
				<Button variant="secondary" isBlock>Export Data</Button>
			</QuickActions>
		</Card>
	</Column>
</Grid>
