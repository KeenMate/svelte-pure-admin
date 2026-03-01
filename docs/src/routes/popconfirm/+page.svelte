<script lang="ts">
	import { Card, Button, ButtonGroup, Table, Badge, Popconfirm, Toast, ToastContainer, Grid, Column, Heading, CodeBlock, Callout } from '@keenmate/svelte-pure-admin';
											
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
<Card titleText="Popconfirm Component" subtitleText="Small confirmation dialogs anchored to trigger buttons - perfect for delete confirmations and quick decisions">

	<Grid>
		<Column size="100" md="50">
			<Heading level={4}>Basic Popconfirms</Heading>
			<div class="min-h-12x">
				<ButtonGroup>
					<Button
						variant="danger"
						onclick={(e: MouseEvent) => {
							deleteTrigger = e.currentTarget as HTMLElement;
							showDeletePopconfirm = !showDeletePopconfirm;
						}}
					>
						Delete Item
					</Button>

					<Button
						variant="warning"
						onclick={(e: MouseEvent) => {
							archiveTrigger = e.currentTarget as HTMLElement;
							showArchivePopconfirm = !showArchivePopconfirm;
						}}
					>
						Archive Item
					</Button>

					<Button
						variant="secondary"
						onclick={(e: MouseEvent) => {
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
						onclick={(e: MouseEvent) => {
							compactTrigger = e.currentTarget as HTMLElement;
							showCompactPopconfirm = !showCompactPopconfirm;
						}}
					>
						🗑️
					</Button>

					<Button
						size="xs"
						variant="danger"
						isOutline
						onclick={(e: MouseEvent) => {
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
		messageText="Are you sure you want to delete this item? This action cannot be undone."
		icon="danger"
		confirmText="Delete"
		confirmVariant="danger"
		onconfirm={handleDelete}
	/>

	<Popconfirm
		bind:show={showArchivePopconfirm}
		trigger={archiveTrigger}
		messageText="Archive this item? It will be moved to the archive folder."
		icon="warning"
		confirmText="Archive"
		confirmVariant="warning"
		onconfirm={handleArchive}
	/>

	<Popconfirm
		bind:show={showResetPopconfirm}
		trigger={resetTrigger}
		messageText="Reset all settings to default values?"
		icon="info"
		confirmText="Reset"
		confirmVariant="primary"
		onconfirm={handleReset}
	/>

	<Popconfirm
		bind:show={showCompactPopconfirm}
		trigger={compactTrigger}
		messageText="Delete this item?"
		isCompact
		confirmText="Yes"
		cancelText="No"
		confirmVariant="danger"
		onconfirm={handleRemove}
	/>

	<Popconfirm
		bind:show={showCompact2Popconfirm}
		trigger={compact2Trigger}
		messageText="Remove this item?"
		isCompact
		confirmText="Yes"
		cancelText="No"
		confirmVariant="danger"
		onconfirm={handleRemove}
	/>
</Card>

<!-- Position Variants (Svelte-specific) -->
<Card titleText="Position Variants" subtitleText="Popconfirms automatically adjust position based on available space using Floating UI">

	<ButtonGroup>
		<Button
			variant="primary"
			onclick={(e: MouseEvent) => {
				topTrigger = e.currentTarget as HTMLElement;
				showTopPopconfirm = !showTopPopconfirm;
			}}
		>
			Top
		</Button>

		<Button
			variant="primary"
			onclick={(e: MouseEvent) => {
				bottomTrigger = e.currentTarget as HTMLElement;
				showBottomPopconfirm = !showBottomPopconfirm;
			}}
		>
			Bottom
		</Button>

		<Button
			variant="primary"
			onclick={(e: MouseEvent) => {
				leftTrigger = e.currentTarget as HTMLElement;
				showLeftPopconfirm = !showLeftPopconfirm;
			}}
		>
			Left
		</Button>

		<Button
			variant="primary"
			onclick={(e: MouseEvent) => {
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
		messageText="Confirm this action?"
		confirmText="Yes"
		cancelText="No"
	/>

	<Popconfirm
		bind:show={showBottomPopconfirm}
		trigger={bottomTrigger}
		position="bottom"
		messageText="Confirm this action?"
		confirmText="Yes"
		cancelText="No"
	/>

	<Popconfirm
		bind:show={showLeftPopconfirm}
		trigger={leftTrigger}
		position="left"
		messageText="Confirm this action?"
		confirmText="Yes"
		cancelText="No"
	/>

	<Popconfirm
		bind:show={showRightPopconfirm}
		trigger={rightTrigger}
		position="right"
		messageText="Confirm this action?"
		confirmText="Yes"
		cancelText="No"
	/>
</Card>

<!-- Icon Variants (Svelte-specific) -->
<Card titleText="Icon Variants" subtitleText="Different icon styles to indicate the severity of the action">

	<ButtonGroup>
		<Button
			variant="danger"
			onclick={(e: MouseEvent) => {
				dangerTrigger = e.currentTarget as HTMLElement;
				showDangerPopconfirm = !showDangerPopconfirm;
			}}
		>
			Danger Icon
		</Button>

		<Button
			variant="warning"
			onclick={(e: MouseEvent) => {
				warningTrigger = e.currentTarget as HTMLElement;
				showWarningPopconfirm = !showWarningPopconfirm;
			}}
		>
			Warning Icon
		</Button>

		<Button
			variant="info"
			onclick={(e: MouseEvent) => {
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
		messageText="This action is destructive and cannot be undone."
		icon="danger"
		confirmText="Continue"
		confirmVariant="danger"
	/>

	<Popconfirm
		bind:show={showWarningPopconfirm}
		trigger={warningTrigger}
		messageText="Please review this action carefully before proceeding."
		icon="warning"
		confirmText="Proceed"
		confirmVariant="warning"
	/>

	<Popconfirm
		bind:show={showInfoPopconfirm}
		trigger={infoTrigger}
		messageText="This will update your preferences. Continue?"
		icon="info"
		confirmText="Update"
		confirmVariant="primary"
	/>
</Card>

<!-- Table with Popconfirms -->
<Card titleText="Table with Popconfirms" subtitleText="Common use case: delete confirmations in data tables" hasPadding={false}>

	<Table isStriped>
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
								onclick={(e: MouseEvent) => toggleTablePopconfirm(index, e)}
							>
								Delete
							</Button>
						</ButtonGroup>
					</td>
				</tr>
			{/each}
		</tbody>
	</Table>

	<!-- Popconfirms outside isTable to avoid invalid HTML -->
	{#each tableData as row (row.id)}
		<Popconfirm
			bind:show={row.showPopconfirm}
			trigger={row.trigger}
			messageText={`Delete ${row.name}?`}
			isCompact
			confirmText="Yes"
			cancelText="No"
			confirmVariant="danger"
			onconfirm={() => handleTableDelete(row.id)}
		/>
	{/each}
</Card>

<!-- WebGrid + Shadow DOM Integration -->
<Card titleText="WebGrid Integration (Shadow DOM)" subtitleText="Using a single shared Popconfirm with @keenmate/web-grid inline toolbar — toolbar buttons live inside Shadow DOM, handled transparently since v1.5.1">

	<Callout variant="info">
		Since v1.5.1, Popconfirm automatically handles triggers inside Shadow DOM (e.g. web-grid toolbar buttons). No extra code needed — just pass the trigger element from the event detail.
	</Callout>

	<Heading level={4} class="mt-4">Pattern: Single Shared Popconfirm</Heading>
	<p class="mb-2">Instead of creating a Popconfirm per row, use one shared instance with dynamic trigger, message, and callback:</p>

	<CodeBlock language="svelte">{`<script lang="ts">
  import { Popconfirm, Toast, ToastContainer } from '@keenmate/svelte-pure-admin';

  // Shared popconfirm state
  let showConfirm = $state(false);
  let confirmTrigger = $state<HTMLElement | null>(null);
  let confirmMessage = $state('');
  let confirmCallback = $state<(() => void) | null>(null);

  // Toast feedback
  let showToast = $state(false);
  let toastMessage = $state('');

  // Helper to open popconfirm with dynamic content
  function confirmDelete(
    trigger: HTMLElement,
    message: string,
    callback: () => void
  ) {
    confirmTrigger = trigger;
    confirmMessage = message;
    confirmCallback = callback;
    showConfirm = true;
  }

  function handleConfirm() {
    confirmCallback?.();
    showConfirm = false;
  }

  // WebGrid toolbar definition
  const rowToolbar = [
    {
      id: 'edit',
      icon: '<i class="fas fa-pencil"></i>',
      title: 'Edit'
    },
    {
      id: 'delete',
      icon: '<i class="fas fa-trash text-danger"></i>',
      title: 'Delete'
    }
  ];

  // Handle toolbar button clicks from web-grid
  function handleToolbarClick(e: CustomEvent) {
    const { itemId, toolbarItem, triggerElement } = e.detail;

    if (toolbarItem.id === 'delete') {
      // triggerElement is inside Shadow DOM — handled automatically!
      confirmDelete(
        triggerElement,
        \`Are you sure you want to delete "\${itemId}"?\`,
        () => {
          // your delete logic here
          toastMessage = \`Item \${itemId} deleted\`;
          showToast = true;
        }
      );
    }
  }
</script>

<!-- Web Grid with inline toolbar -->
<km-web-grid
  ontoolbarclick={handleToolbarClick}
  ...
/>

<!-- Single shared Popconfirm for the whole page -->
<Popconfirm
  bind:show={showConfirm}
  trigger={confirmTrigger}
  messageText={confirmMessage}
  icon="danger"
  confirmText="Confirm"
  confirmVariant="danger"
  onconfirm={handleConfirm}
/>

<ToastContainer position="top-end">
  <Toast bind:show={showToast} variant="success"
    titleText="Success" messageText={toastMessage} />
</ToastContainer>`}</CodeBlock>

	<Heading level={4} class="mt-4">Key Points</Heading>
	<ul class="pa-list">
		<li><strong>Single instance</strong> — one <code>&lt;Popconfirm&gt;</code> for all rows, driven by reactive state</li>
		<li><strong>Shadow DOM</strong> — web-grid toolbar buttons live inside Shadow DOM; the <code>triggerElement</code> from the event detail is passed directly and positioning works automatically</li>
		<li><strong>Dynamic callback</strong> — store the delete callback in state so <code>onconfirm</code> calls the right handler per row</li>
		<li><strong>No extra config</strong> — the Shadow DOM proxy (v1.5.1) creates a light-DOM mirror element for Floating UI positioning</li>
	</ul>
</Card>

<!-- Toast notifications -->
<ToastContainer position="top-right">
	<Toast bind:show={showToast} variant="success" titleText="Success" messageText={toastMessage} />
</ToastContainer>
