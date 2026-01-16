<script lang="ts">
	import {
		Card,
		Table,
		Badge,
		Button,
		ButtonGroup,
		Input,
		Pager,
		LoadMore,
		Heading,
		Paragraph
	} from '@keenmate/svelte-pure-admin';

	// Product data for Load More demo
	const allProducts = [
		{ name: 'MacBook Pro', price: '$2,399', stock: 12, status: 'success' as const, statusText: 'Available' },
		{ name: 'iPhone 15', price: '$999', stock: 0, status: 'danger' as const, statusText: 'Out of Stock' },
		{ name: 'iPad Air', price: '$599', stock: 8, status: 'success' as const, statusText: 'Available' },
		{ name: 'Apple Watch', price: '$399', stock: 25, status: 'success' as const, statusText: 'Available' },
		{ name: 'AirPods Pro', price: '$249', stock: 3, status: 'warning' as const, statusText: 'Low Stock' },
		{ name: 'Mac Mini', price: '$599', stock: 0, status: 'danger' as const, statusText: 'Out of Stock' },
		{ name: 'Studio Display', price: '$1,599', stock: 5, status: 'warning' as const, statusText: 'Low Stock' },
		{ name: 'Magic Keyboard', price: '$99', stock: 42, status: 'success' as const, statusText: 'Available' },
		{ name: 'HomePod Mini', price: '$99', stock: 18, status: 'success' as const, statusText: 'Available' },
	];

	let visibleCount = $state(3);
	let isLoadingProducts = $state(false);

	const visibleProducts = $derived(allProducts.slice(0, visibleCount));
	const hasMoreProducts = $derived(visibleCount < allProducts.length);

	function loadMoreProducts() {
		isLoadingProducts = true;
		// Simulate network delay
		setTimeout(() => {
			visibleCount = Math.min(visibleCount + 3, allProducts.length);
			isLoadingProducts = false;
		}, 800);
	}
</script>

<!-- Basic Table with Pager -->
<Card title="Basic Table with Pagination">
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
<Card title="Striped Table">
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
<Card title="2x Spacing Table">
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
<Card title="Load More Positioning">
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
					{#each visibleProducts as product}
						<tr>
							<td>{product.name}</td>
							<td>{product.price}</td>
							<td>{product.stock}</td>
							<td><Badge variant={product.status}>{product.statusText}</Badge></td>
						</tr>
					{/each}
				</tbody>
			{/snippet}
		</Table>
	</div>

	{#if hasMoreProducts}
		<LoadMore
			align="left"
			text="Load more products"
			count="{visibleCount} of {allProducts.length}"
			showCount={true}
			loading={isLoadingProducts}
			onClick={loadMoreProducts}
		/>
	{/if}

	<Heading level={4} class="mt-8">Table with Center Load More</Heading>
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
						<td>Sarah Johnson</td>
						<td>sarah@example.com</td>
						<td>18</td>
						<td>$3,245.12</td>
					</tr>
					<tr>
						<td>Mike Davis</td>
						<td>mike@example.com</td>
						<td>31</td>
						<td>$6,789.45</td>
					</tr>
				</tbody>
			{/snippet}
		</Table>
	</div>

	<LoadMore
		align="center"
		text="Load more customers"
		count="3 of 1,247"
		showCount={true}
	/>

	<Heading level={4} class="mt-8">Table with Right Load More (Loading State)</Heading>
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
						<td>$234.56</td>
						<td><Badge variant="success">Paid</Badge></td>
					</tr>
					<tr>
						<td>#INV-002</td>
						<td>2024-01-14</td>
						<td>$567.89</td>
						<td><Badge variant="warning">Pending</Badge></td>
					</tr>
					<tr>
						<td>#INV-003</td>
						<td>2024-01-13</td>
						<td>$123.45</td>
						<td><Badge variant="success">Paid</Badge></td>
					</tr>
				</tbody>
			{/snippet}
		</Table>
	</div>

	<LoadMore
		align="right"
		loading={true}
	/>
</Card>

<!-- Pager Positioning Examples -->
<Card title="Pager Positioning Examples">
	<Heading level={4}>Left-aligned Pager</Heading>
	<Pager align="left" currentPage={1} totalPages={10} showPageInput={true} />

	<Heading level={4} class="mt-6">Center-aligned Pager (Default)</Heading>
	<Pager align="center" currentPage={5} totalPages={10} showPageInput={true} />

	<Heading level={4} class="mt-6">Right-aligned Pager</Heading>
	<Pager align="right" currentPage={10} totalPages={10} showPageInput={true} />
</Card>

<!-- Alternative Icon Sets -->
<Card title="Alternative Pager Icon Sets">
	<Heading level={4}>Double/Single Angles (Default)</Heading>
	<Pager align="center" currentPage={1} totalPages={10} showPageInput={true} />

	<Heading level={4} class="mt-6">Triangular Arrows</Heading>
	<Pager align="center" currentPage={1} totalPages={10} showPageInput={true}>
		{#snippet controls()}
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">⏮</Button>
				<Button variant="secondary" size="sm">◀</Button>
			</div>
			<div class="pa-pager__info">
				<span class="pa-pager__text">Page</span>
				<Input type="number" size="sm" class="pa-pager__input" value={1} min={1} max={10} />
				<span class="pa-pager__text">of 10</span>
			</div>
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">▶</Button>
				<Button variant="secondary" size="sm">⏭</Button>
			</div>
		{/snippet}
	</Pager>

	<Heading level={4} class="mt-6">Simple Arrows</Heading>
	<Pager align="center" currentPage={1} totalPages={10} showPageInput={true}>
		{#snippet controls()}
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">⇤</Button>
				<Button variant="secondary" size="sm">←</Button>
			</div>
			<div class="pa-pager__info">
				<span class="pa-pager__text">Page</span>
				<Input type="number" size="sm" class="pa-pager__input" value={1} min={1} max={10} />
				<span class="pa-pager__text">of 10</span>
			</div>
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">→</Button>
				<Button variant="secondary" size="sm">⇥</Button>
			</div>
		{/snippet}
	</Pager>

	<Heading level={4} class="mt-6">Mathematical Double Arrows</Heading>
	<Pager align="center" currentPage={1} totalPages={10} showPageInput={true}>
		{#snippet controls()}
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">⇇</Button>
				<Button variant="secondary" size="sm">⇦</Button>
			</div>
			<div class="pa-pager__info">
				<span class="pa-pager__text">Page</span>
				<Input type="number" size="sm" class="pa-pager__input" value={1} min={1} max={10} />
				<span class="pa-pager__text">of 10</span>
			</div>
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">⇨</Button>
				<Button variant="secondary" size="sm">⇉</Button>
			</div>
		{/snippet}
	</Pager>
</Card>
