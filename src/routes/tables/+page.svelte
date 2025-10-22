<script lang="ts">
	import Heading from '$lib/typography/Heading.svelte';
	import Paragraph from '$lib/typography/Paragraph.svelte';
	import {
		Card,
		Table,
		Badge,
		Button,
		ButtonGroup,
		Pager,
		LoadMore
	} from '$lib';
</script>

<svelte:head>
	<title>Tables - Pure Admin Svelte</title>
</svelte:head>

<Heading level={1}>Tables</Heading>
<Paragraph>Data tables with sorting, pagination, and various styling options.</Paragraph>

<!-- Basic Table with Pager -->
<Card>
	{#snippet header()}
		<Heading level={3}>Basic Table with Pagination</Heading>
	{/snippet}

	<!-- Pager Above Table (Center) -->
	<Pager
		align="center"
		currentPage={1}
		totalPages={10}
		showPageInput={true}
	/>

	<!-- Table -->
	<div class="pa-table-container">
		<Table>
			{#snippet children()}
				<thead>
					<tr>
						<th class="col-auto">Actions</th>
						<th>ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Role</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="primary" size="xs" iconOnly title="View">👁️</Button>
								<Button variant="secondary" size="xs" iconOnly title="Edit">✏️</Button>
								<Button variant="danger" size="xs" iconOnly title="Delete">🗑️</Button>
							</ButtonGroup>
						</td>
						<td>1</td>
						<td>John Doe</td>
						<td>john.doe@example.com</td>
						<td>Admin</td>
						<td><Badge variant="success">Active</Badge></td>
					</tr>
					<tr>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="primary" size="xs" iconOnly title="View">👁️</Button>
								<Button variant="secondary" size="xs" iconOnly title="Edit">✏️</Button>
							</ButtonGroup>
						</td>
						<td>2</td>
						<td>Jane Smith</td>
						<td>jane.smith@example.com</td>
						<td>User</td>
						<td><Badge variant="warning">Pending</Badge></td>
					</tr>
					<tr>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="primary" size="xs" iconOnly title="View">👁️</Button>
								<Button variant="secondary" size="xs" iconOnly title="Edit">✏️</Button>
								<Button variant="danger" size="xs" iconOnly title="Delete">🗑️</Button>
							</ButtonGroup>
						</td>
						<td>3</td>
						<td>Bob Johnson</td>
						<td>bob.johnson@example.com</td>
						<td>User</td>
						<td><Badge variant="success">Active</Badge></td>
					</tr>
					<tr>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="primary" size="xs" iconOnly title="View">👁️</Button>
								<Button variant="danger" size="xs" iconOnly title="Delete">🗑️</Button>
							</ButtonGroup>
						</td>
						<td>4</td>
						<td>Alice Brown</td>
						<td>alice.brown@example.com</td>
						<td>Moderator</td>
						<td><Badge variant="danger">Inactive</Badge></td>
					</tr>
					<tr>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="secondary" size="xs" iconOnly title="Edit">✏️</Button>
								<Button variant="danger" size="xs" iconOnly title="Delete">🗑️</Button>
							</ButtonGroup>
						</td>
						<td>5</td>
						<td>Charlie Wilson</td>
						<td>charlie.wilson@example.com</td>
						<td>User</td>
						<td><Badge variant="success">Active</Badge></td>
					</tr>
				</tbody>
			{/snippet}
		</Table>
	</div>

	<!-- Pager Below Table (Right) -->
	<Pager
		align="right"
		currentPage={1}
		totalPages={10}
		showPageInput={true}
	/>
</Card>

<!-- Striped Table -->
<Card>
	{#snippet header()}
		<Heading level={3}>Striped Table</Heading>
	{/snippet}

	<div class="pa-table-container">
		<Table striped>
			{#snippet children()}
				<thead>
					<tr>
						<th>Product</th>
						<th>Category</th>
						<th>Price</th>
						<th>Stock</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Laptop Pro</td>
						<td>Electronics</td>
						<td>$1,299.99</td>
						<td>15</td>
						<td><Badge variant="success">In Stock</Badge></td>
					</tr>
					<tr>
						<td>Wireless Mouse</td>
						<td>Accessories</td>
						<td>$29.99</td>
						<td>0</td>
						<td><Badge variant="danger">Out of Stock</Badge></td>
					</tr>
					<tr>
						<td>Office Chair</td>
						<td>Furniture</td>
						<td>$249.99</td>
						<td>8</td>
						<td><Badge variant="success">In Stock</Badge></td>
					</tr>
					<tr>
						<td>USB Cable</td>
						<td>Accessories</td>
						<td>$12.99</td>
						<td>3</td>
						<td><Badge variant="warning">Low Stock</Badge></td>
					</tr>
				</tbody>
			{/snippet}
		</Table>
	</div>
</Card>

<!-- 2x Spacing Table -->
<Card>
	{#snippet header()}
		<Heading level={3}>2x Spacing Table</Heading>
	{/snippet}

	<!-- Left-aligned pager -->
	<Pager
		align="left"
		currentPage={2}
		totalPages={5}
		showPageInput={true}
	/>

	<div class="pa-table-container">
		<Table spacing="2x">
			{#snippet children()}
				<thead>
					<tr>
						<th class="col-auto">Actions</th>
						<th>Date</th>
						<th>Transaction</th>
						<th>Amount</th>
						<th>Balance</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="primary" size="xs" iconOnly title="View">👁️</Button>
								<Button variant="secondary" size="xs" iconOnly title="Edit">✏️</Button>
								<Button variant="danger" size="xs" iconOnly title="Delete">🗑️</Button>
							</ButtonGroup>
						</td>
						<td>2024-01-15</td>
						<td>Purchase at Store ABC</td>
						<td class="text-danger">-$45.67</td>
						<td>$1,234.56</td>
					</tr>
					<tr>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="primary" size="xs" iconOnly title="View">👁️</Button>
								<Button variant="secondary" size="xs" iconOnly title="Edit">✏️</Button>
							</ButtonGroup>
						</td>
						<td>2024-01-14</td>
						<td>Salary Deposit</td>
						<td class="text-success">+$2,500.00</td>
						<td>$1,280.23</td>
					</tr>
					<tr>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="primary" size="xs" iconOnly title="View">👁️</Button>
								<Button variant="secondary" size="xs" iconOnly title="Edit">✏️</Button>
								<Button variant="danger" size="xs" iconOnly title="Delete">🗑️</Button>
							</ButtonGroup>
						</td>
						<td>2024-01-13</td>
						<td>ATM Withdrawal</td>
						<td class="text-danger">-$100.00</td>
						<td>-$1,219.77</td>
					</tr>
					<tr>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="primary" size="xs" iconOnly title="View">👁️</Button>
								<Button variant="danger" size="xs" iconOnly title="Delete">🗑️</Button>
							</ButtonGroup>
						</td>
						<td>2024-01-12</td>
						<td>Online Transfer</td>
						<td class="text-danger">-$200.00</td>
						<td>-$1,119.77</td>
					</tr>
				</tbody>
			{/snippet}
		</Table>
	</div>
</Card>

<!-- Load More Examples -->
<Card>
	{#snippet header()}
		<Heading level={3}>Load More Positioning</Heading>
	{/snippet}

	<Heading level={4}>Table with Left-aligned Load More</Heading>
	<div class="pa-table-container">
		<Table>
			{#snippet children()}
				<thead>
					<tr>
						<th>Product</th>
						<th>Price</th>
						<th>Stock</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>MacBook Pro</td>
						<td>$2,399</td>
						<td>12</td>
						<td><Badge variant="success">Available</Badge></td>
					</tr>
					<tr>
						<td>iPhone 15</td>
						<td>$999</td>
						<td>0</td>
						<td><Badge variant="danger">Out of Stock</Badge></td>
					</tr>
					<tr>
						<td>iPad Air</td>
						<td>$599</td>
						<td>8</td>
						<td><Badge variant="success">Available</Badge></td>
					</tr>
				</tbody>
			{/snippet}
		</Table>
	</div>

	<LoadMore
		align="left"
		text="Load more products"
		count="showing 3 of 150"
		showCount={true}
	/>

	<Heading level={4} style="margin-top: 2rem;">Table with Center Load More</Heading>
	<div class="pa-table-container">
		<Table>
			{#snippet children()}
				<thead>
					<tr>
						<th>Customer</th>
						<th>Email</th>
						<th>Orders</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>John Smith</td>
						<td>john@example.com</td>
						<td>23</td>
						<td>$4,567.89</td>
					</tr>
					<tr>
						<td>Jane Doe</td>
						<td>jane@example.com</td>
						<td>45</td>
						<td>$8,234.12</td>
					</tr>
					<tr>
						<td>Bob Johnson</td>
						<td>bob@example.com</td>
						<td>12</td>
						<td>$2,123.45</td>
					</tr>
				</tbody>
			{/snippet}
		</Table>
	</div>

	<LoadMore
		align="center"
		text="Load more customers"
		count="showing 3 of 500"
		showCount={true}
	/>

	<Heading level={4} style="margin-top: 2rem;">Table with Right Load More</Heading>
	<div class="pa-table-container">
		<Table>
			{#snippet children()}
				<thead>
					<tr>
						<th>Invoice</th>
						<th>Date</th>
						<th>Amount</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>#INV-001</td>
						<td>2024-01-15</td>
						<td>$1,299.99</td>
						<td><Badge variant="success">Paid</Badge></td>
					</tr>
					<tr>
						<td>#INV-002</td>
						<td>2024-01-14</td>
						<td>$599.99</td>
						<td><Badge variant="warning">Pending</Badge></td>
					</tr>
					<tr>
						<td>#INV-003</td>
						<td>2024-01-13</td>
						<td>$2,499.99</td>
						<td><Badge variant="success">Paid</Badge></td>
					</tr>
				</tbody>
			{/snippet}
		</Table>
	</div>

	<LoadMore
		align="right"
		text="Load more invoices"
		count="showing 3 of 250"
		showCount={true}
	/>
</Card>
