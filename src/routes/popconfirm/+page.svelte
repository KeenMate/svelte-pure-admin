<script lang="ts">
	import Card from '$lib/display/Card.svelte';
	import Button from '$lib/buttons/Button.svelte';
	import ButtonGroup from '$lib/buttons/ButtonGroup.svelte';
	import Table from '$lib/display/Table.svelte';
	import Badge from '$lib/display/Badge.svelte';
	import Popconfirm from '$lib/feedback/Popconfirm.svelte';
	import Section from '$lib/layout/Section.svelte';
	import Toast from '$lib/feedback/Toast.svelte';
	import ToastContainer from '$lib/feedback/ToastContainer.svelte';
	import Grid from '$lib/layout/Grid.svelte';
	import Column from '$lib/layout/Column.svelte';
	import Heading from '$lib/typography/Heading.svelte';
	import Paragraph from '$lib/typography/Paragraph.svelte';

	// Popconfirm states and triggers
	let showDeletePopconfirm = $state(false);
	let deleteTrigger = $state<HTMLElement | null>(null);

	let showArchivePopconfirm = $state(false);
	let archiveTrigger = $state<HTMLElement | null>(null);

	let showResetPopconfirm = $state(false);
	let resetTrigger = $state<HTMLElement | null>(null);

	let showCompactPopconfirm = $state(false);
	let compactTrigger = $state<HTMLElement | null>(null);

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

	// Table data
	let tableData = $state([
		{
			id: 1,
			name: 'John Doe',
			email: 'john@example.com',
			status: 'Active',
			statusVariant: 'success' as const,
			showPopconfirm: false,
			trigger: null as HTMLElement | null
		},
		{
			id: 2,
			name: 'Jane Smith',
			email: 'jane@example.com',
			status: 'Active',
			statusVariant: 'success' as const,
			showPopconfirm: false,
			trigger: null as HTMLElement | null
		},
		{
			id: 3,
			name: 'Bob Johnson',
			email: 'bob@example.com',
			status: 'Pending',
			statusVariant: 'warning' as const,
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

<Section>
	<Heading level={1} class="pa-page-title">Popconfirm</Heading>
	<Paragraph class="pa-page-description">
		Small confirmation dialogs anchored to trigger elements. Perfect for delete confirmations and
		quick yes/no decisions. More contextual than modals and ideal for table row actions.
	</Paragraph>

	<!-- Basic Popconfirms -->
	<Card>
		{#snippet header()}
			<Heading level={2} class="pa-card__title">Basic Popconfirms</Heading>
		{/snippet}

		<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
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
				Archive
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
		</div>

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
			message="Archive this item? You can restore it later from the archive."
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
	</Card>

	<!-- Compact Variant -->
	<Card>
		{#snippet header()}
			<Heading level={2} class="pa-card__title">Compact Variant</Heading>
		{/snippet}

		<Paragraph>Smaller variant ideal for table actions and tight spaces.</Paragraph>

		<Button
			size="xs"
			variant="danger"
			onClick={(e) => {
				compactTrigger = e.currentTarget as HTMLElement;
				showCompactPopconfirm = !showCompactPopconfirm;
			}}
		>
			🗑️ Remove
		</Button>

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
	</Card>

	<!-- Position Variants -->
	<Card>
		{#snippet header()}
			<Heading level={2} class="pa-card__title">Position Variants</Heading>
		{/snippet}

		<Paragraph>Popconfirms automatically adjust position based on available space using Floating UI.</Paragraph>

		<div
			style="display: flex; gap: 2rem; flex-wrap: wrap; align-items: center; justify-content: center; padding: 3rem;"
		>
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
		</div>

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

	<!-- Icon Variants -->
	<Card>
		{#snippet header()}
			<Heading level={2} class="pa-card__title">Icon Variants</Heading>
		{/snippet}

		<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
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
		</div>

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
	<Card>
		{#snippet header()}
			<Heading level={2} class="pa-card__title">Table with Popconfirms</Heading>
		{/snippet}

		<Paragraph>Common pattern: Delete confirmations for table rows.</Paragraph>

		<Table striped>
			<thead>
				<tr>
					<th>Name</th>
					<th>Email</th>
					<th>Status</th>
					<th class="col-auto">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each tableData as row, index (row.id)}
					<tr>
						<td>{row.name}</td>
						<td>{row.email}</td>
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
</Section>

<!-- Toast notifications -->
<ToastContainer position="top-right">
	<Toast bind:show={showToast} variant="success" title="Success" dismissible autoDismiss>
		{toastMessage}
	</Toast>
</ToastContainer>
