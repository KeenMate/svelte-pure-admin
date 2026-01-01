<script lang="ts">
	import {
		Card,
		Table,
		Badge,
		Button,
		ButtonGroup,
		Input,
		Pager,
		LoadMore
	} from '$lib';

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

<svelte:head>
	<title>Tables - Pure Admin Svelte</title>
</svelte:head>

<p>Data tables with sorting, pagination, and various styling options.</p>

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
	<h4>Table with Left-aligned Load More</h4>
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

	<h4 class="mt-8">Table with Center Load More</h4>
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

	<h4 class="mt-8">Table with Right Load More (Loading State)</h4>
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
	<h4>Left-aligned Pager</h4>
	<div class="pa-pager pa-pager--left">
		<div class="pa-pager__container">
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">«</Button>
				<Button variant="secondary" size="sm">‹</Button>
			</div>
			<div class="pa-pager__info">
				<Input type="number" size="sm" class="pa-pager__input" value={1} min={1} max={10} />
				<span class="pa-pager__text">/ 10 pages</span>
			</div>
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">›</Button>
				<Button variant="secondary" size="sm">»</Button>
			</div>
		</div>
	</div>

	<h4>Center-aligned Pager (Default)</h4>
	<div class="pa-pager pa-pager--center">
		<div class="pa-pager__container">
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">«</Button>
				<Button variant="secondary" size="sm">‹</Button>
			</div>
			<div class="pa-pager__info">
				<Input type="number" size="sm" class="pa-pager__input" value={5} min={1} max={10} />
				<span class="pa-pager__text">/ 10 pages</span>
			</div>
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">›</Button>
				<Button variant="secondary" size="sm">»</Button>
			</div>
		</div>
	</div>

	<h4>Right-aligned Pager</h4>
	<div class="pa-pager pa-pager--right">
		<div class="pa-pager__container">
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">«</Button>
				<Button variant="secondary" size="sm">‹</Button>
			</div>
			<div class="pa-pager__info">
				<Input type="number" size="sm" class="pa-pager__input" value={10} min={1} max={10} />
				<span class="pa-pager__text">/ 10 pages</span>
			</div>
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">›</Button>
				<Button variant="secondary" size="sm">»</Button>
			</div>
		</div>
	</div>
</Card>

<!-- Alternative Icon Sets -->
<Card title="Alternative Pager Icon Sets">
	<h4>Double/Single Angles (Current)</h4>
	<div class="pa-pager pa-pager--center">
		<div class="pa-pager__container">
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">«</Button>
				<Button variant="secondary" size="sm">‹</Button>
			</div>
			<div class="pa-pager__info">
				<Input type="number" size="sm" class="pa-pager__input" value={1} min={1} max={10} />
				<span class="pa-pager__text">/ 10 pages</span>
			</div>
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">›</Button>
				<Button variant="secondary" size="sm">»</Button>
			</div>
		</div>
	</div>

	<h4>Triangular Arrows</h4>
	<div class="pa-pager pa-pager--center">
		<div class="pa-pager__container">
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">⏮</Button>
				<Button variant="secondary" size="sm">◀</Button>
			</div>
			<div class="pa-pager__info">
				<Input type="number" size="sm" class="pa-pager__input" value={1} min={1} max={10} />
				<span class="pa-pager__text">/ 10 pages</span>
			</div>
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">▶</Button>
				<Button variant="secondary" size="sm">⏭</Button>
			</div>
		</div>
	</div>

	<h4>Simple Arrows</h4>
	<div class="pa-pager pa-pager--center">
		<div class="pa-pager__container">
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">⇤</Button>
				<Button variant="secondary" size="sm">←</Button>
			</div>
			<div class="pa-pager__info">
				<Input type="number" size="sm" class="pa-pager__input" value={1} min={1} max={10} />
				<span class="pa-pager__text">/ 10 pages</span>
			</div>
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">→</Button>
				<Button variant="secondary" size="sm">⇥</Button>
			</div>
		</div>
	</div>

	<h4>Mathematical Double Arrows</h4>
	<div class="pa-pager pa-pager--center">
		<div class="pa-pager__container">
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">⇇</Button>
				<Button variant="secondary" size="sm">⇦</Button>
			</div>
			<div class="pa-pager__info">
				<Input type="number" size="sm" class="pa-pager__input" value={1} min={1} max={10} />
				<span class="pa-pager__text">/ 10 pages</span>
			</div>
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">⇨</Button>
				<Button variant="secondary" size="sm">⇉</Button>
			</div>
		</div>
	</div>
</Card>
