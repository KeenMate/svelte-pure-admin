<script lang="ts">
	import Heading from '$lib/typography/Heading.svelte';
	import Paragraph from '$lib/typography/Paragraph.svelte';
	import Card from '$lib/display/Card.svelte';
	import CheckboxList from '$lib/display/CheckboxList.svelte';
	import CheckboxListItem from '$lib/display/CheckboxListItem.svelte';
	import Button from '$lib/buttons/Button.svelte';
	import ButtonGroup from '$lib/buttons/ButtonGroup.svelte';
	import Table from '$lib/display/Table.svelte';
	import Badge from '$lib/display/Badge.svelte';
	import Grid from '$lib/layout/Grid.svelte';
	import Column from '$lib/layout/Column.svelte';
	import Section from '$lib/layout/Section.svelte';

	// Basic checkbox list state
	let basicOptions = $state({
		option1: false,
		option2: true,
		option3: false,
		option4: false
	});

	// Item states list
	let stateOptions = $state({
		normal: false,
		disabled: false,
		locked: false
	});

	// Features with descriptions
	let features = $state({
		email: false,
		sms: true,
		push: false
	});

	// Task list with actions
	let tasks = $state([
		{ id: 'task1', label: 'Complete project proposal', checked: false },
		{ id: 'task2', label: 'Review design mockups', checked: true },
		{ id: 'task3', label: 'Update documentation', checked: false }
	]);

	// Compact list
	let compactOptions = $state({
		compact1: false,
		compact2: true,
		compact3: false
	});

	// Bordered list
	let borderedOptions = $state({
		bordered1: false,
		bordered2: true,
		bordered3: false
	});

	// Striped list
	let stripedOptions = $state({
		striped1: false,
		striped2: true,
		striped3: false,
		striped4: false
	});

	// Inline list
	let inlineOptions = $state({
		optionA: false,
		optionB: true,
		optionC: false,
		optionD: false
	});

	// Grid list
	let gridOptions = $state({
		grid1: false,
		grid2: true,
		grid3: false,
		grid4: false,
		grid5: true,
		grid6: false
	});

	// Two-column list
	let twoColOptions = $state({
		col21: false,
		col22: true,
		col23: false,
		col24: true
	});

	// Three-column list
	let threeColOptions = $state({
		col31: false,
		col32: true,
		col33: false,
		col34: true,
		col35: false,
		col36: true
	});

	// Table with checkboxes
	let tableData = $state([
		{
			id: 1,
			name: 'John Doe',
			email: 'john@example.com',
			status: 'Active',
			statusVariant: 'success' as const,
			checked: false
		},
		{
			id: 2,
			name: 'Jane Smith',
			email: 'jane@example.com',
			status: 'Active',
			statusVariant: 'success' as const,
			checked: true
		},
		{
			id: 3,
			name: 'Bob Johnson',
			email: 'bob@example.com',
			status: 'Pending',
			statusVariant: 'warning' as const,
			checked: false
		},
		{
			id: 4,
			name: 'Alice Williams',
			email: 'alice@example.com',
			status: 'Active',
			statusVariant: 'success' as const,
			checked: true
		},
		{
			id: 5,
			name: 'Charlie Brown',
			email: 'charlie@example.com',
			status: 'Inactive',
			statusVariant: 'danger' as const,
			checked: false
		}
	]);

	let selectAll = $state(false);

	// Handle select all
	function handleSelectAll() {
		tableData.forEach((row) => {
			row.checked = selectAll;
		});
	}

	// Count selected rows
	const selectedCount = $derived(tableData.filter((row) => row.checked).length);

	// Handle task edit
	function editTask(taskId: string) {
		console.log('Edit task:', taskId);
	}

	// Handle task delete
	function deleteTask(taskId: string) {
		tasks = tasks.filter((t) => t.id !== taskId);
	}

	// Handle table row actions
	function viewRow(id: number) {
		console.log('View row:', id);
	}

	function editRow(id: number) {
		console.log('Edit row:', id);
	}

	function deleteRow(id: number) {
		tableData = tableData.filter((row) => row.id !== id);
	}
</script>

<Section>
	<Heading level={1} class="pa-page-title">Checkbox Lists</Heading>
	<Paragraph class="pa-page-description">
		Interactive checkbox lists with various styles, layouts, and item states. Supports descriptions,
		actions, and table integration.
	</Paragraph>

	<!-- Basic Checkbox Lists -->
	<Card>
		{#snippet header()}
			<Heading level={2} class="pa-card__title">Basic Checkbox Lists</Heading>
		{/snippet}

		<Grid>
			<Column md={6}>
				<Heading level={3}>Default List</Heading>
				<CheckboxList>
					<CheckboxListItem id="check1" label="Option 1" bind:checked={basicOptions.option1} />
					<CheckboxListItem id="check2" label="Option 2 (Selected)" bind:checked={basicOptions.option2} />
					<CheckboxListItem id="check3" label="Option 3" bind:checked={basicOptions.option3} />
					<CheckboxListItem
						id="check4"
						label="Option 4 (Disabled)"
						state="disabled"
						bind:checked={basicOptions.option4}
					/>
				</CheckboxList>
			</Column>

			<Column md={6}>
				<Heading level={3}>Item States Comparison</Heading>
				<CheckboxList variant="bordered">
					<CheckboxListItem id="state1" label="Normal clickable option" bind:checked={stateOptions.normal} />
					<CheckboxListItem
						id="state2"
						label="Disabled - feature not available"
						state="disabled"
						bind:checked={stateOptions.disabled}
					/>
					<CheckboxListItem
						id="state3"
						label="Requires admin permission"
						state="locked"
						bind:checked={stateOptions.locked}
					/>
				</CheckboxList>
			</Column>
		</Grid>
	</Card>

	<!-- Checkbox Lists with Descriptions -->
	<Card>
		{#snippet header()}
			<Heading level={2} class="pa-card__title">Checkbox Lists with Descriptions</Heading>
		{/snippet}

		<CheckboxList>
			<CheckboxListItem
				id="feature1"
				label="Email Notifications"
				description="Receive updates via email"
				bind:checked={features.email}
			/>
			<CheckboxListItem
				id="feature2"
				label="SMS Alerts"
				description="Get urgent alerts via SMS"
				bind:checked={features.sms}
			/>
			<CheckboxListItem
				id="feature3"
				label="Push Notifications"
				description="Browser push notifications"
				bind:checked={features.push}
			/>
		</CheckboxList>
	</Card>

	<!-- Checkbox Lists with Actions -->
	<Card>
		{#snippet header()}
			<Heading level={2} class="pa-card__title">Checkbox Lists with Actions</Heading>
		{/snippet}

		<CheckboxList>
			{#each tasks as task (task.id)}
				<CheckboxListItem id={task.id} label={task.label} bind:checked={task.checked}>
					{#snippet actions()}
						<Button size="xs" variant="secondary" onclick={() => editTask(task.id)}>✏️</Button>
						<Button size="xs" variant="danger" onclick={() => deleteTask(task.id)}>🗑️</Button>
					{/snippet}
				</CheckboxListItem>
			{/each}
		</CheckboxList>
	</Card>

	<!-- List Variants -->
	<Card>
		{#snippet header()}
			<Heading level={2} class="pa-card__title">List Variants</Heading>
		{/snippet}

		<Grid>
			<Column md={4}>
				<Heading level={3}>Compact</Heading>
				<CheckboxList variant="compact">
					<CheckboxListItem id="compact1" label="Compact Option 1" bind:checked={compactOptions.compact1} />
					<CheckboxListItem id="compact2" label="Compact Option 2" bind:checked={compactOptions.compact2} />
					<CheckboxListItem id="compact3" label="Compact Option 3" bind:checked={compactOptions.compact3} />
				</CheckboxList>
			</Column>

			<Column md={4}>
				<Heading level={3}>Bordered</Heading>
				<CheckboxList variant="bordered">
					<CheckboxListItem id="bordered1" label="Bordered Option 1" bind:checked={borderedOptions.bordered1} />
					<CheckboxListItem id="bordered2" label="Bordered Option 2" bind:checked={borderedOptions.bordered2} />
					<CheckboxListItem id="bordered3" label="Bordered Option 3" bind:checked={borderedOptions.bordered3} />
				</CheckboxList>
			</Column>

			<Column md={4}>
				<Heading level={3}>Striped</Heading>
				<CheckboxList variant="striped">
					<CheckboxListItem id="striped1" label="Striped Option 1" bind:checked={stripedOptions.striped1} />
					<CheckboxListItem id="striped2" label="Striped Option 2" bind:checked={stripedOptions.striped2} />
					<CheckboxListItem id="striped3" label="Striped Option 3" bind:checked={stripedOptions.striped3} />
					<CheckboxListItem id="striped4" label="Striped Option 4" bind:checked={stripedOptions.striped4} />
				</CheckboxList>
			</Column>
		</Grid>
	</Card>

	<!-- Alternative Layouts -->
	<Card>
		{#snippet header()}
			<Heading level={2} class="pa-card__title">Alternative Layouts</Heading>
		{/snippet}

		<Heading level={3}>Inline Layout</Heading>
		<CheckboxList layout="inline">
			<CheckboxListItem id="inline1" label="Option A" bind:checked={inlineOptions.optionA} />
			<CheckboxListItem id="inline2" label="Option B" bind:checked={inlineOptions.optionB} />
			<CheckboxListItem id="inline3" label="Option C" bind:checked={inlineOptions.optionC} />
			<CheckboxListItem id="inline4" label="Option D" bind:checked={inlineOptions.optionD} />
		</CheckboxList>

		<Heading level={3}>Grid Layout</Heading>
		<CheckboxList layout="grid">
			<CheckboxListItem id="grid1" label="Grid Item 1" bind:checked={gridOptions.grid1} />
			<CheckboxListItem id="grid2" label="Grid Item 2" bind:checked={gridOptions.grid2} />
			<CheckboxListItem id="grid3" label="Grid Item 3" bind:checked={gridOptions.grid3} />
			<CheckboxListItem id="grid4" label="Grid Item 4" bind:checked={gridOptions.grid4} />
			<CheckboxListItem id="grid5" label="Grid Item 5" bind:checked={gridOptions.grid5} />
			<CheckboxListItem id="grid6" label="Grid Item 6" bind:checked={gridOptions.grid6} />
		</CheckboxList>

		<Heading level={3}>Two-Column Layout</Heading>
		<CheckboxList layout="2col">
			<CheckboxListItem id="col2-1" label="Column 1 - Item 1" bind:checked={twoColOptions.col21} />
			<CheckboxListItem id="col2-2" label="Column 2 - Item 1" bind:checked={twoColOptions.col22} />
			<CheckboxListItem id="col2-3" label="Column 1 - Item 2" bind:checked={twoColOptions.col23} />
			<CheckboxListItem id="col2-4" label="Column 2 - Item 2" bind:checked={twoColOptions.col24} />
		</CheckboxList>

		<Heading level={3}>Three-Column Layout</Heading>
		<CheckboxList layout="3col">
			<CheckboxListItem id="col3-1" label="Col 1 - Item 1" bind:checked={threeColOptions.col31} />
			<CheckboxListItem id="col3-2" label="Col 2 - Item 1" bind:checked={threeColOptions.col32} />
			<CheckboxListItem id="col3-3" label="Col 3 - Item 1" bind:checked={threeColOptions.col33} />
			<CheckboxListItem id="col3-4" label="Col 1 - Item 2" bind:checked={threeColOptions.col34} />
			<CheckboxListItem id="col3-5" label="Col 2 - Item 2" bind:checked={threeColOptions.col35} />
			<CheckboxListItem id="col3-6" label="Col 3 - Item 2" bind:checked={threeColOptions.col36} />
		</CheckboxList>
	</Card>

	<!-- Tables with Checkboxes -->
	<Card>
		{#snippet header()}
			<Heading level={2} class="pa-card__title">Tables with Checkboxes</Heading>
		{/snippet}

		<Paragraph>
			<strong>Selected:</strong>
			{selectedCount} of {tableData.length} items
		</Paragraph>

		<Table striped>
			<thead>
				<tr>
					<th class="pa-table__checkbox-col">
						<input type="checkbox" bind:checked={selectAll} onchange={handleSelectAll} />
					</th>
					<th>Name</th>
					<th>Email</th>
					<th>Status</th>
					<th class="col-auto">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each tableData as row (row.id)}
					<tr class:pa-table__row--selected={row.checked}>
						<td class="pa-table__checkbox-col">
							<input type="checkbox" bind:checked={row.checked} />
						</td>
						<td>{row.name}</td>
						<td>{row.email}</td>
						<td><Badge variant={row.statusVariant}>{row.status}</Badge></td>
						<td class="col-auto">
							<ButtonGroup>
								<Button size="xs" variant="primary" onclick={() => viewRow(row.id)}>👁️</Button>
								<Button size="xs" variant="secondary" onclick={() => editRow(row.id)}>✏️</Button>
								<Button size="xs" variant="danger" onclick={() => deleteRow(row.id)}>🗑️</Button>
							</ButtonGroup>
						</td>
					</tr>
				{/each}
			</tbody>
		</Table>
	</Card>
</Section>
