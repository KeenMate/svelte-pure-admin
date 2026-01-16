<script lang="ts">
	import { Card, Button, ButtonGroup, Table, Badge, Popconfirm, Toast, ToastContainer, Grid, Column, Heading } from '@keenmate/svelte-pure-admin';
											
	// Popconfirm states and triggers
	let showDeletePopconfirm = $state(false);
	let deleteTrigger = $state<HTMLElement | null>(null);

	let showArchivePopconfirm = $state(false);
	let archiveTrigger = $state<HTMLElement | null>(null);

	let showResetPopconfirm = $state(false);
	let resetTrigger = $state<HTMLElement | null>(null);

	let showCompactPopconfirm = $state(false);
	let compactTrigger = $state<HTMLElement | null>(null);

	let showCompact2Popconfirm = $state(false);
	let compact2Trigger = $state<HTMLElement | null>(null);

	// Position examples
	let showTopPopconfirm = $state(false);
	let topTrigger = $state<HTMLElement | null>(null);

	let showBottomPopconfirm = $state(false);
	let bottomTrigger = $state<HTMLElement | null>(null);

	let showLeftPopconfirm = $state(false);
	let leftTrigger = $state<HTMLElement | null>(null);

	let showRightPopconfirm = $state(false);
	let rightTrigger = $state<HTMLElement | null>(null);

	// Icon variants
	let showDangerPopconfirm = $state(false);
	let dangerTrigger = $state<HTMLElement | null>(null);

	let showWarningPopconfirm = $state(false);
	let warningTrigger = $state<HTMLElement | null>(null);

	let showInfoPopconfirm = $state(false);
	let infoTrigger = $state<HTMLElement | null>(null);

	// Table data (matches visual version)
	let tableData = $state([
		{
			id: 1,
			name: 'John Doe',
			status: 'Active',
			statusVariant: 'success' as const,
			showPopconfirm: false,
			trigger: null as HTMLElement | null
		},
		{
			id: 2,
			name: 'Jane Smith',
			status: 'Pending',
			statusVariant: 'warning' as const,
			showPopconfirm: false,
			trigger: null as HTMLElement | null
		},
		{
			id: 3,
			name: 'Bob Johnson',
			status: 'Inactive',
			statusVariant: 'secondary' as const,
			showPopconfirm: false,
			trigger: null as HTMLElement | null
		}
	]);

	// Toast state
	let showToast = $state(false);
	let toastMessage = $state('');

	// Handlers
	function handleDelete() {
		console.log('Item deleted');
		toastMessage = 'Item deleted successfully';
		showToast = true;
	}

	function handleArchive() {
		console.log('Item archived');
		toastMessage = 'Item archived successfully';
		showToast = true;
	}

	function handleReset() {
		console.log('Settings reset');
		toastMessage = 'Settings reset to defaults';
		showToast = true;
	}

	function handleRemove() {
		console.log('Item removed');
		toastMessage = 'Item removed successfully';
		showToast = true;
	}

	function handleTableDelete(id: number) {
		const row = tableData.find((r) => r.id === id);
		if (row) {
			tableData = tableData.filter((r) => r.id !== id);
			toastMessage = `${row.name} deleted successfully`;
			showToast = true;
		}
	}

	function toggleTablePopconfirm(index: number, event: MouseEvent) {
		const target = event.currentTarget as HTMLElement;
		tableData[index].trigger = target;
		tableData[index].showPopconfirm = !tableData[index].showPopconfirm;
	}
</script>

<!-- Popconfirm Component -->
<Card title="Popconfirm Component" subtitle="Small confirmation dialogs anchored to trigger buttons - perfect for delete confirmations and quick decisions">

	<Grid>
		<Column size="100" md="50">
			<Heading level={4}>Basic Popconfirms</Heading>
			<div class="min-h-12x">
				<ButtonGroup>
					<Button
						variant="danger"
						onClick={(e) => {
							deleteTrigger = e.currentTarget as HTMLElement;
							showDeletePopconfirm = !showDeletePopconfirm;
						}}
					>
						Delete Item
					</Button>

					<Button
						variant="warning"
						onClick={(e) => {
							archiveTrigger = e.currentTarget as HTMLElement;
							showArchivePopconfirm = !showArchivePopconfirm;
						}}
					>
						Archive Item
					</Button>

					<Button
						variant="secondary"
						onClick={(e) => {
							resetTrigger = e.currentTarget as HTMLElement;
							showResetPopconfirm = !showResetPopconfirm;
						}}
					>
						Reset Settings
					</Button>
				</ButtonGroup>
			</div>
		</Column>

		<Column size="100" md="50">
			<Heading level={4}>Compact Variant</Heading>
			<div class="min-h-12x">
				<ButtonGroup>
					<Button
						size="xs"
						variant="danger"
						onClick={(e) => {
							compactTrigger = e.currentTarget as HTMLElement;
							showCompactPopconfirm = !showCompactPopconfirm;
						}}
					>
						🗑️
					</Button>

					<Button
						size="xs"
						variant="danger"
						outline
						onClick={(e) => {
							compact2Trigger = e.currentTarget as HTMLElement;
							showCompact2Popconfirm = !showCompact2Popconfirm;
						}}
					>
						Remove
					</Button>
				</ButtonGroup>
			</div>
		</Column>
	</Grid>

	<Popconfirm
		bind:show={showDeletePopconfirm}
		trigger={deleteTrigger}
		message="Are you sure you want to delete this item? This action cannot be undone."
		icon="danger"
		confirmText="Delete"
		confirmVariant="danger"
		onConfirm={handleDelete}
	/>

	<Popconfirm
		bind:show={showArchivePopconfirm}
		trigger={archiveTrigger}
		message="Archive this item? It will be moved to the archive folder."
		icon="warning"
		confirmText="Archive"
		confirmVariant="warning"
		onConfirm={handleArchive}
	/>

	<Popconfirm
		bind:show={showResetPopconfirm}
		trigger={resetTrigger}
		message="Reset all settings to default values?"
		icon="info"
		confirmText="Reset"
		confirmVariant="primary"
		onConfirm={handleReset}
	/>

	<Popconfirm
		bind:show={showCompactPopconfirm}
		trigger={compactTrigger}
		message="Delete this item?"
		compact
		confirmText="Yes"
		cancelText="No"
		confirmVariant="danger"
		onConfirm={handleRemove}
	/>

	<Popconfirm
		bind:show={showCompact2Popconfirm}
		trigger={compact2Trigger}
		message="Remove this item?"
		compact
		confirmText="Yes"
		cancelText="No"
		confirmVariant="danger"
		onConfirm={handleRemove}
	/>
</Card>

<!-- Position Variants (Svelte-specific) -->
<Card title="Position Variants" subtitle="Popconfirms automatically adjust position based on available space using Floating UI">

	<ButtonGroup>
		<Button
			variant="primary"
			onClick={(e) => {
				topTrigger = e.currentTarget as HTMLElement;
				showTopPopconfirm = !showTopPopconfirm;
			}}
		>
			Top
		</Button>

		<Button
			variant="primary"
			onClick={(e) => {
				bottomTrigger = e.currentTarget as HTMLElement;
				showBottomPopconfirm = !showBottomPopconfirm;
			}}
		>
			Bottom
		</Button>

		<Button
			variant="primary"
			onClick={(e) => {
				leftTrigger = e.currentTarget as HTMLElement;
				showLeftPopconfirm = !showLeftPopconfirm;
			}}
		>
			Left
		</Button>

		<Button
			variant="primary"
			onClick={(e) => {
				rightTrigger = e.currentTarget as HTMLElement;
				showRightPopconfirm = !showRightPopconfirm;
			}}
		>
			Right
		</Button>
	</ButtonGroup>

	<Popconfirm
		bind:show={showTopPopconfirm}
		trigger={topTrigger}
		position="top"
		message="Confirm this action?"
		confirmText="Yes"
		cancelText="No"
	/>

	<Popconfirm
		bind:show={showBottomPopconfirm}
		trigger={bottomTrigger}
		position="bottom"
		message="Confirm this action?"
		confirmText="Yes"
		cancelText="No"
	/>

	<Popconfirm
		bind:show={showLeftPopconfirm}
		trigger={leftTrigger}
		position="left"
		message="Confirm this action?"
		confirmText="Yes"
		cancelText="No"
	/>

	<Popconfirm
		bind:show={showRightPopconfirm}
		trigger={rightTrigger}
		position="right"
		message="Confirm this action?"
		confirmText="Yes"
		cancelText="No"
	/>
</Card>

<!-- Icon Variants (Svelte-specific) -->
<Card title="Icon Variants" subtitle="Different icon styles to indicate the severity of the action">

	<ButtonGroup>
		<Button
			variant="danger"
			onClick={(e) => {
				dangerTrigger = e.currentTarget as HTMLElement;
				showDangerPopconfirm = !showDangerPopconfirm;
			}}
		>
			Danger Icon
		</Button>

		<Button
			variant="warning"
			onClick={(e) => {
				warningTrigger = e.currentTarget as HTMLElement;
				showWarningPopconfirm = !showWarningPopconfirm;
			}}
		>
			Warning Icon
		</Button>

		<Button
			variant="info"
			onClick={(e) => {
				infoTrigger = e.currentTarget as HTMLElement;
				showInfoPopconfirm = !showInfoPopconfirm;
			}}
		>
			Info Icon
		</Button>
	</ButtonGroup>

	<Popconfirm
		bind:show={showDangerPopconfirm}
		trigger={dangerTrigger}
		message="This action is destructive and cannot be undone."
		icon="danger"
		confirmText="Continue"
		confirmVariant="danger"
	/>

	<Popconfirm
		bind:show={showWarningPopconfirm}
		trigger={warningTrigger}
		message="Please review this action carefully before proceeding."
		icon="warning"
		confirmText="Proceed"
		confirmVariant="warning"
	/>

	<Popconfirm
		bind:show={showInfoPopconfirm}
		trigger={infoTrigger}
		message="This will update your preferences. Continue?"
		icon="info"
		confirmText="Update"
		confirmVariant="primary"
	/>
</Card>

<!-- Table with Popconfirms -->
<Card title="Table with Popconfirms" subtitle="Common use case: delete confirmations in data tables" noPadding>

	<Table striped>
		<thead>
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Status</th>
				<th class="col-auto">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each tableData as row, index (row.id)}
				<tr>
					<td>{row.id}</td>
					<td>{row.name}</td>
					<td><Badge variant={row.statusVariant}>{row.status}</Badge></td>
					<td class="col-auto">
						<ButtonGroup>
							<Button size="xs" variant="primary">Edit</Button>
							<Button
								size="xs"
								variant="danger"
								onClick={(e) => toggleTablePopconfirm(index, e)}
							>
								Delete
							</Button>
						</ButtonGroup>
					</td>
				</tr>
			{/each}
		</tbody>
	</Table>

	<!-- Popconfirms outside table to avoid invalid HTML -->
	{#each tableData as row (row.id)}
		<Popconfirm
			bind:show={row.showPopconfirm}
			trigger={row.trigger}
			message={`Delete ${row.name}?`}
			compact
			confirmText="Yes"
			cancelText="No"
			confirmVariant="danger"
			onConfirm={() => handleTableDelete(row.id)}
		/>
	{/each}
</Card>

<!-- Toast notifications -->
<ToastContainer position="top-right">
	<Toast bind:show={showToast} variant="success" title="Success" message={toastMessage} />
</ToastContainer>
