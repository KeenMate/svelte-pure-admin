<script lang="ts">
	import {
		Card,
		Table,
		TableContainer,
		Badge,
		Button,
		ButtonGroup,
		Checkbox,
		Alert,
		SplitButton,
		SplitButtonItem,
		Heading,
		Paragraph
	} from '@keenmate/svelte-pure-admin';

	// --- Mock data ---
	interface User {
		id: number;
		name: string;
		email: string;
		status: 'active' | 'pending' | 'archived';
		statusVariant: 'success' | 'warning' | 'secondary';
		lastLogin: string;
	}

	const users: User[] = [
		{ id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'active', statusVariant: 'success', lastLogin: '2026-03-22' },
		{ id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'active', statusVariant: 'success', lastLogin: '2026-03-21' },
		{ id: 3, name: 'Carol White', email: 'carol@example.com', status: 'active', statusVariant: 'success', lastLogin: '2026-03-20' },
		{ id: 4, name: 'Dave Brown', email: 'dave@example.com', status: 'pending', statusVariant: 'warning', lastLogin: '2026-03-18' },
		{ id: 5, name: 'Eve Davis', email: 'eve@example.com', status: 'pending', statusVariant: 'warning', lastLogin: '2026-03-15' },
		{ id: 6, name: 'Frank Miller', email: 'frank@example.com', status: 'archived', statusVariant: 'secondary', lastLogin: '2026-02-10' },
		{ id: 7, name: 'Grace Lee', email: 'grace@example.com', status: 'archived', statusVariant: 'secondary', lastLogin: '2026-01-05' },
		{ id: 8, name: 'Henry Wilson', email: 'henry@example.com', status: 'archived', statusVariant: 'secondary', lastLogin: '2025-12-20' },
	];

	type FilterType = 'active' | 'pending' | 'archived';
	const filterLabels: Record<FilterType, string> = {
		active: 'Active Users',
		pending: 'Pending Users',
		archived: 'Archived Users'
	};

	// --- State ---
	let activeFilter = $state<FilterType>('active');
	let selection = $state(new Map<number, { user: User; sourceFilter: FilterType }>());
	let showDetails = $state(false);

	// --- Derived ---
	const filteredUsers = $derived(users.filter(u => u.status === activeFilter));

	const selectedCount = $derived(selection.size);

	const selectedInFilter = $derived((filter: FilterType) => {
		let count = 0;
		for (const entry of selection.values()) {
			if (entry.sourceFilter === filter) count++;
		}
		return count;
	});

	const allVisibleSelected = $derived(
		filteredUsers.length > 0 && filteredUsers.every(u => selection.has(u.id))
	);

	const someVisibleSelected = $derived(
		filteredUsers.some(u => selection.has(u.id)) && !allVisibleSelected
	);

	const selectedEntries = $derived(Array.from(selection.entries()).map(([id, entry]) => ({ id, ...entry })));

	// --- Actions ---
	function toggleSelection(user: User) {
		if (selection.has(user.id)) {
			selection.delete(user.id);
		} else {
			selection.set(user.id, { user, sourceFilter: activeFilter });
		}
		selection = new Map(selection);
	}

	function selectAllVisible() {
		for (const user of filteredUsers) {
			if (!selection.has(user.id)) {
				selection.set(user.id, { user, sourceFilter: activeFilter });
			}
		}
		selection = new Map(selection);
	}

	function deselectAllVisible() {
		for (const user of filteredUsers) {
			selection.delete(user.id);
		}
		selection = new Map(selection);
	}

	function toggleSelectAll(checked: boolean) {
		if (checked) {
			selectAllVisible();
		} else {
			deselectAllVisible();
		}
	}

	function removeFromSelection(id: number) {
		selection.delete(id);
		selection = new Map(selection);
	}

	function clearSelection() {
		selection = new Map();
		showDetails = false;
	}

	function deleteSelected() {
		// In a real app, this would call an API
		alert(`Would delete ${selectedCount} items`);
		clearSelection();
	}

	function exportSelected() {
		// In a real app, this would trigger a download
		alert(`Would export ${selectedCount} items`);
	}
</script>

<Paragraph>Demonstration of maintaining selection state when switching between filters — a common pattern in admin dashboards.</Paragraph>

<!-- Intro -->
<Card titleText="Multi-Select Across Different Filters" subtitleText="Select items in one filter, switch to another, and your selections are preserved">
	<Alert variant="info">
		This pattern uses a global selection Map that persists across filter changes. Each selected item remembers which filter it was selected from. The select-all checkbox supports indeterminate state for partial selections.
	</Alert>
</Card>

<!-- Filter Tabs -->
<Card titleText="Filter by Status">
	<div class="d-flex gap-5 flex-wrap">
		{#each (['active', 'pending', 'archived'] as FilterType[]) as filter}
			<Button
				variant={activeFilter === filter ? 'primary' : 'secondary'}
				onclick={() => activeFilter = filter}
			>
				{filterLabels[filter]}
				{#if selectedInFilter(filter) > 0}
					<Badge variant="light" class="ms-2">{selectedInFilter(filter)}</Badge>
				{/if}
			</Button>
		{/each}
	</div>
</Card>

<!-- Selection Summary Bar -->
{#if selectedCount > 0}
	<Alert variant="primary" class="d-flex align-items-center justify-content-between">
		<div class="d-flex align-items-center gap-10" style="flex: 1;">
			<strong>{selectedCount} item{selectedCount !== 1 ? 's' : ''} selected</strong>
			<Button
				size="sm"
				variant="secondary"
				onclick={() => showDetails = !showDetails}
			>
				<span class="pa-btn__icon"><i class="fas fa-chevron-down"></i></span>
				{showDetails ? 'Hide Details' : 'Show Details'}
			</Button>
		</div>
		<SplitButton
			size="sm"
			variant="primary"
			onclick={exportSelected}
		>
			<span class="pa-btn__icon"><i class="fas fa-download"></i></span>
			Export

			{#snippet menu()}
				<SplitButtonItem isDanger onclick={deleteSelected}>
					<i class="fas fa-trash"></i> Delete Selected
				</SplitButtonItem>
				<SplitButtonItem onclick={clearSelection}>
					<i class="fas fa-times"></i> Clear All
				</SplitButtonItem>
			{/snippet}
		</SplitButton>
	</Alert>
{/if}

<!-- Selection Details (expandable) -->
{#if showDetails && selectedCount > 0}
	<Card titleText="Selected Items" hasPadding={false}>
		<TableContainer>
			<Table isStriped>
				<thead>
					<tr>
						<th class="col-auto">Actions</th>
						<th>Name</th>
						<th>Email</th>
						<th>Status</th>
						<th>Source Filter</th>
					</tr>
				</thead>
				<tbody>
					{#each selectedEntries as entry (entry.id)}
						<tr>
							<td class="col-auto">
								<Button size="xs" variant="danger" isOutline onclick={() => removeFromSelection(entry.id)}>
									<i class="fas fa-times"></i>
								</Button>
							</td>
							<td>{entry.user.name}</td>
							<td>{entry.user.email}</td>
							<td><Badge variant={entry.user.statusVariant}>{entry.user.status}</Badge></td>
							<td><Badge variant="secondary">{entry.sourceFilter}</Badge></td>
						</tr>
					{/each}
				</tbody>
			</Table>
		</TableContainer>
	</Card>
{/if}

<!-- Main Data Table -->
<Card titleText="{filterLabels[activeFilter]}" hasPadding={false}>
	{#snippet description()}<Badge variant="secondary">{filteredUsers.length} items</Badge>{/snippet}
	{#snippet headerActions()}
		<ButtonGroup>
			<Button size="sm" variant="secondary" onclick={selectAllVisible}>
				<span class="pa-btn__icon"><i class="fas fa-check-square"></i></span>
				Select All Visible
			</Button>
			<Button size="sm" variant="secondary" onclick={deselectAllVisible}>
				<span class="pa-btn__icon"><i class="fas fa-square"></i></span>
				Deselect All Visible
			</Button>
		</ButtonGroup>
	{/snippet}

	<TableContainer>
		<Table isStriped>
			<thead>
				<tr>
					<th class="col-auto">
						<Checkbox
							id="select-all"
							checked={allVisibleSelected}
							isIndeterminate={someVisibleSelected}
							onchange={(e) => toggleSelectAll(e.currentTarget.checked)}
						/>
					</th>
					<th>Name</th>
					<th>Email</th>
					<th>Status</th>
					<th>Last Login</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredUsers as user (user.id)}
					<tr style={selection.has(user.id) ? 'background-color: rgba(59, 130, 246, 0.1);' : ''}>
						<td class="col-auto">
							<Checkbox
								id="user-{user.id}"
								checked={selection.has(user.id)}
								onchange={() => toggleSelection(user)}
							/>
						</td>
						<td>{user.name}</td>
						<td>{user.email}</td>
						<td><Badge variant={user.statusVariant}>{user.status}</Badge></td>
						<td>{user.lastLogin}</td>
					</tr>
				{/each}
			</tbody>
		</Table>
	</TableContainer>
</Card>
