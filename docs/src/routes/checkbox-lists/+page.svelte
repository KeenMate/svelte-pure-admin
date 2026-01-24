<script lang="ts">
	import { Heading, Paragraph, Card, Checkbox, CheckboxList, CheckboxListItem, Button, ButtonGroup, Table, Badge, Alert, Grid, Column, BasicList } from '@keenmate/svelte-pure-admin';
													
	// ===== Card 1: Custom Tri-State Checkbox =====
	let uncheckedDemo = $state(false);
	let checkedDemo = $state(true);
	let indeterminateDemo = $state(false);

	// Size variants (all checked to show checkmark)
	let sizeXs = $state(true);
	let sizeSm = $state(true);
	let sizeDefault = $state(true);
	let sizeLg = $state(true);
	let sizeXl = $state(true);

	// X mark variants (all checked to show X)
	let xMarkXs = $state(true);
	let xMarkSm = $state(true);
	let xMarkDefault = $state(true);
	let xMarkLg = $state(true);
	let xMarkXl = $state(true);

	// ===== Card 2: Select All Pattern =====
	let fruits = $state({
		apple: true,
		banana: false,
		orange: true,
		grape: false
	});

	// Derived: compute select-all state
	const fruitCount = $derived(Object.values(fruits).filter(Boolean).length);
	const totalFruits = 4;
	const selectAllFruits = $derived(fruitCount === totalFruits);
	const selectAllIndeterminate = $derived(fruitCount > 0 && fruitCount < totalFruits);

	function handleSelectAllFruits(e: Event) {
		const checked = (e.target as HTMLInputElement).checked;
		fruits.apple = checked;
		fruits.banana = checked;
		fruits.orange = checked;
		fruits.grape = checked;
	}

	// ===== Card 3: Disabled Checkboxes =====
	let disabledUnchecked = $state(false);
	let disabledChecked = $state(true);
	let disabledIndeterminate = $state(false);

	// ===== Card 4: Basic Checkbox Lists =====
	let basicOptions = $state({
		option1: false,
		option2: true,
		option3: false,
		option4: false
	});

	// With descriptions
	let features = $state({
		email: false,
		sms: true,
		push: false
	});

	// ===== Card 5: Item States =====
	let stateOptions = $state({
		normal: false,
		disabled: false,
		locked1: false,
		locked2: false,
		normalSelected: true
	});

	// ===== Card 6: List Variants =====
	let compactOptions = $state({
		compact1: false,
		compact2: false,
		compact3: false
	});

	let borderedOptions = $state({
		bordered1: false,
		bordered2: false,
		bordered3: false
	});

	let stripedOptions = $state({
		striped1: false,
		striped2: false,
		striped3: false,
		striped4: false
	});

	// ===== Card 7: Checkbox Lists with Actions =====
	let tasks = $state([
		{ id: 'task1', label: 'Complete project proposal', checked: false },
		{ id: 'task2', label: 'Review design mockups', checked: true },
		{ id: 'task3', label: 'Update documentation', checked: false }
	]);

	function editTask(taskId: string) {
		console.log('Edit task:', taskId);
	}

	function deleteTask(taskId: string) {
		tasks = tasks.filter((t) => t.id !== taskId);
	}

	// ===== Card 8: Alternative Layouts =====
	let inlineOptions = $state({
		optionA: false,
		optionB: false,
		optionC: false,
		optionD: false
	});

	let gridOptions = $state({
		grid1: false,
		grid2: false,
		grid3: false,
		grid4: false
	});

	let twoColOptions = $state({
		col21: false,
		col22: false,
		col23: false,
		col24: false
	});

	let threeColOptions = $state({
		col31: false,
		col32: false,
		col33: false,
		col34: false,
		col35: false,
		col36: false
	});

	// ===== Card 9: Tables with Checkboxes (static) =====
	let staticTableData = $state([
		{ id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', statusVariant: 'success' as const, checked: false },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', statusVariant: 'success' as const, checked: true },
		{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Pending', statusVariant: 'warning' as const, checked: false },
		{ id: 4, name: 'Alice Williams', email: 'alice@example.com', status: 'Active', statusVariant: 'success' as const, checked: true },
		{ id: 5, name: 'Charlie Brown', email: 'charlie@example.com', status: 'Inactive', statusVariant: 'danger' as const, checked: false }
	]);

	// ===== Card 10: Interactive Demo =====
	let interactiveTableData = $state([
		{ id: 1, product: 'Laptop Pro 15"', sku: 'LPT-001', price: '$1,299', stock: 'In Stock', stockVariant: 'success' as const, checked: false },
		{ id: 2, product: 'Wireless Mouse', sku: 'MSE-042', price: '$29', stock: 'In Stock', stockVariant: 'success' as const, checked: false },
		{ id: 3, product: 'USB-C Hub', sku: 'HUB-123', price: '$49', stock: 'Low Stock', stockVariant: 'warning' as const, checked: false },
		{ id: 4, product: 'Monitor 27"', sku: 'MON-789', price: '$399', stock: 'Out of Stock', stockVariant: 'danger' as const, checked: false },
		{ id: 5, product: 'Keyboard Mechanical', sku: 'KBD-555', price: '$89', stock: 'In Stock', stockVariant: 'success' as const, checked: false }
	]);

	const interactiveSelectedCount = $derived(interactiveTableData.filter((row) => row.checked).length);
	const interactiveSelectAll = $derived(interactiveSelectedCount === interactiveTableData.length);

	function handleInteractiveSelectAll(e: Event) {
		const checked = (e.target as HTMLInputElement).checked;
		interactiveTableData.forEach((row) => {
			row.checked = checked;
		});
	}
</script>

<!-- Card 1: Custom Tri-State Checkbox -->
<Card title="Custom Tri-State Checkbox" subtitle="Fully styled custom checkboxes with 3 states: unchecked, checked, and indeterminate">

	<Grid>
		<Column size="100" md="50">
			<Heading level={4}>Three States</Heading>
			<div class="d-flex flex-column gap-12">
				<Checkbox id="unchecked-demo" label="Unchecked" bind:checked={uncheckedDemo} />
				<Checkbox id="checked-demo" label="Checked" bind:checked={checkedDemo} />
				<Checkbox id="indeterminate-demo" label="Indeterminate" bind:checked={indeterminateDemo} indeterminate={true} />
			</div>
		</Column>
		<Column size="100" md="50">
			<Heading level={4}>Size Variants</Heading>
			<div class="d-flex flex-column gap-12">
				<Checkbox id="size-xs" label="Extra Small (xs)" size="xs" bind:checked={sizeXs} />
				<Checkbox id="size-sm" label="Small (sm)" size="sm" bind:checked={sizeSm} />
				<Checkbox id="size-default" label="Default" bind:checked={sizeDefault} />
				<Checkbox id="size-lg" label="Large (lg)" size="lg" bind:checked={sizeLg} />
				<Checkbox id="size-xl" label="Extra Large (xl)" size="xl" bind:checked={sizeXl} />
			</div>
		</Column>
		<Column size="100" md="50">
			<Heading level={4}>X Mark Modifier</Heading>
			<div class="d-flex flex-column gap-12">
				<Checkbox id="xmark-xs" label="Extra Small with X" size="xs" xMark bind:checked={xMarkXs} />
				<Checkbox id="xmark-sm" label="Small with X" size="sm" xMark bind:checked={xMarkSm} />
				<Checkbox id="xmark-default" label="Default with X" xMark bind:checked={xMarkDefault} />
				<Checkbox id="xmark-lg" label="Large with X" size="lg" xMark bind:checked={xMarkLg} />
				<Checkbox id="xmark-xl" label="Extra Large with X" size="xl" xMark bind:checked={xMarkXl} />
			</div>
		</Column>
	</Grid>
</Card>

<!-- Card 2: Select All Pattern -->
<Card title="Select All Pattern" subtitle="Interactive demo showing indeterminate state for partial selection">

	<Grid>
		<Column size="100" md="50">
			<div class="d-flex flex-column gap-12">
				<Checkbox
					id="select-all-fruits"
					label="Select All Fruits"
					checked={selectAllFruits}
					indeterminate={selectAllIndeterminate}
					onChange={handleSelectAllFruits}
					class="font-weight-500"
				/>
				<div class="d-flex flex-column gap-8 ml-10">
					<Checkbox id="fruit-apple" bind:checked={fruits.apple}>
						{#snippet labelSnippet()}
							🍎 Apple
						{/snippet}
					</Checkbox>
					<Checkbox id="fruit-banana" bind:checked={fruits.banana}>
						{#snippet labelSnippet()}
							🍌 Banana
						{/snippet}
					</Checkbox>
					<Checkbox id="fruit-orange" bind:checked={fruits.orange}>
						{#snippet labelSnippet()}
							🍊 Orange
						{/snippet}
					</Checkbox>
					<Checkbox id="fruit-grape" bind:checked={fruits.grape}>
						{#snippet labelSnippet()}
							🍇 Grape
						{/snippet}
					</Checkbox>
				</div>
			</div>
		</Column>
		<Column size="100" md="50">
			<Alert variant="info">
				<strong>How it works:</strong>
				<BasicList class="mt-3 mb-0">
					<li>When <strong>none</strong> are selected → "Select All" is unchecked</li>
					<li>When <strong>some</strong> are selected → "Select All" shows <strong>indeterminate</strong> state (dash)</li>
					<li>When <strong>all</strong> are selected → "Select All" is checked</li>
				</BasicList>
			</Alert>
			<Paragraph class="pa-text pa-text--secondary mt-5">
				<code>checkbox.indeterminate = true</code> is set via JavaScript. The CSS <code>:indeterminate</code> pseudo-class handles the styling.
			</Paragraph>
		</Column>
	</Grid>
</Card>

<!-- Card 3: Disabled Checkboxes -->
<Card title="Disabled Checkboxes" subtitle="Disabled state with reduced opacity">

	<div class="d-flex flex-wrap gap-2xl">
		<Checkbox id="disabled-unchecked" label="Disabled unchecked" disabled bind:checked={disabledUnchecked} />
		<Checkbox id="disabled-checked" label="Disabled checked" disabled bind:checked={disabledChecked} />
		<Checkbox id="disabled-indeterminate" label="Disabled indeterminate" disabled indeterminate bind:checked={disabledIndeterminate} />
	</div>
</Card>

<hr class="my-8" />
<Heading level={2} class="mb-6">Checkbox Lists</Heading>

<!-- Card 4: Basic Checkbox Lists -->
<Card title="Basic Checkbox Lists" subtitle="Simple vertical checkbox lists with hover effects - full item area is clickable">

	<Grid>
		<Column size="100" md="50">
			<Heading level={4}>Default List</Heading>
			<CheckboxList>
				<CheckboxListItem id="check1" label="Option 1" bind:checked={basicOptions.option1} />
				<CheckboxListItem id="check2" label="Option 2 (Selected)" bind:checked={basicOptions.option2} />
				<CheckboxListItem id="check3" label="Option 3" bind:checked={basicOptions.option3} />
				<CheckboxListItem id="check4" label="Option 4 (Disabled)" state="disabled" bind:checked={basicOptions.option4} />
			</CheckboxList>
		</Column>
		<Column size="100" md="50">
			<Heading level={4}>With Descriptions</Heading>
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
		</Column>
	</Grid>
</Card>

<!-- Card 5: Item States -->
<Card title="Item States" subtitle="Clickable, disabled, and locked states with different visual feedback">

	<Heading level={4}>State Comparison</Heading>
	<CheckboxList variant="bordered">
		<CheckboxListItem id="state1" label="Normal clickable option" bind:checked={stateOptions.normal} />
		<CheckboxListItem id="state2" label="Disabled - feature not available" state="disabled" bind:checked={stateOptions.disabled} />
		<CheckboxListItem id="state3" label="Requires admin permission" state="locked" bind:checked={stateOptions.locked1} />
		<CheckboxListItem id="state4" label="Pro feature - upgrade required" state="locked" bind:checked={stateOptions.locked2} />
		<CheckboxListItem id="state5" label="Normal selected option" bind:checked={stateOptions.normalSelected} />
	</CheckboxList>

	<Alert variant="info" class="mt-4">
		<small>
			<strong>State differences:</strong><br />
			• <strong>Normal</strong> - Full opacity, pointer cursor, default text color<br />
			• <strong>Disabled</strong> - 50% opacity on entire item, not-allowed cursor, muted color (feature unavailable)<br />
			• <strong>Locked</strong> - 50% opacity on checkbox only, not-allowed cursor, warning color text with 🔒 icon (requires permission)
		</small>
	</Alert>
</Card>

<!-- Card 6: List Variants -->
<Card title="List Variants" subtitle="Different styles for checkbox lists">

	<Grid>
		<Column size="100" md="1-3">
			<Heading level={4}>Compact</Heading>
			<CheckboxList variant="compact">
				<CheckboxListItem id="compact1" label="Compact Option 1" bind:checked={compactOptions.compact1} />
				<CheckboxListItem id="compact2" label="Compact Option 2" bind:checked={compactOptions.compact2} />
				<CheckboxListItem id="compact3" label="Compact Option 3" bind:checked={compactOptions.compact3} />
			</CheckboxList>
		</Column>
		<Column size="100" md="1-3">
			<Heading level={4}>Bordered</Heading>
			<CheckboxList variant="bordered">
				<CheckboxListItem id="bordered1" label="Bordered Option 1" bind:checked={borderedOptions.bordered1} />
				<CheckboxListItem id="bordered2" label="Bordered Option 2" bind:checked={borderedOptions.bordered2} />
				<CheckboxListItem id="bordered3" label="Bordered Option 3" bind:checked={borderedOptions.bordered3} />
			</CheckboxList>
		</Column>
		<Column size="100" md="1-3">
			<Heading level={4}>Striped</Heading>
			<CheckboxList variant="striped">
				<CheckboxListItem id="striped1" label="Striped Option 1" bind:checked={stripedOptions.striped1} />
				<CheckboxListItem id="striped2" label="Striped Option 2" bind:checked={stripedOptions.striped2} />
				<CheckboxListItem id="striped3" label="Striped Option 3" bind:checked={stripedOptions.striped3} />
				<CheckboxListItem id="striped4" label="Striped Option 4" bind:checked={stripedOptions.striped4} />
			</CheckboxList>
		</Column>
	</Grid>
</Card>

<!-- Card 7: Checkbox Lists with Actions -->
<Card title="Checkbox Lists with Actions" subtitle="Lists with action buttons for each item">

	<Heading level={4}>Task List</Heading>
	<CheckboxList variant="bordered">
		{#each tasks as task (task.id)}
			<CheckboxListItem id={task.id} label={task.label} bind:checked={task.checked}>
				{#snippet actions()}
					<Button size="xs" variant="secondary" iconOnly onclick={() => editTask(task.id)}>✏️</Button>
					<Button size="xs" variant="danger" iconOnly onclick={() => deleteTask(task.id)}>🗑️</Button>
				{/snippet}
			</CheckboxListItem>
		{/each}
	</CheckboxList>
</Card>

<!-- Card 8: Alternative Layouts -->
<Card title="Alternative Layouts" subtitle="Inline, grid, and multi-column layouts">

	<Heading level={4}>Inline Layout</Heading>
	<CheckboxList layout="inline">
		<CheckboxListItem id="inline1" label="Option A" bind:checked={inlineOptions.optionA} />
		<CheckboxListItem id="inline2" label="Option B" bind:checked={inlineOptions.optionB} />
		<CheckboxListItem id="inline3" label="Option C" bind:checked={inlineOptions.optionC} />
		<CheckboxListItem id="inline4" label="Option D" bind:checked={inlineOptions.optionD} />
	</CheckboxList>

	<Heading level={4} class="mt-6">Grid Layout</Heading>
	<CheckboxList layout="grid">
		<CheckboxListItem id="grid1" label="Grid Item 1" bind:checked={gridOptions.grid1} />
		<CheckboxListItem id="grid2" label="Grid Item 2" bind:checked={gridOptions.grid2} />
		<CheckboxListItem id="grid3" label="Grid Item 3" bind:checked={gridOptions.grid3} />
		<CheckboxListItem id="grid4" label="Grid Item 4" bind:checked={gridOptions.grid4} />
	</CheckboxList>

	<Heading level={4} class="mt-6">Two-Column Layout</Heading>
	<CheckboxList layout="2col" variant="bordered">
		<CheckboxListItem id="col2-1" label="Column 1 - Item 1" bind:checked={twoColOptions.col21} />
		<CheckboxListItem id="col2-2" label="Column 2 - Item 1" bind:checked={twoColOptions.col22} />
		<CheckboxListItem id="col2-3" label="Column 1 - Item 2" bind:checked={twoColOptions.col23} />
		<CheckboxListItem id="col2-4" label="Column 2 - Item 2" bind:checked={twoColOptions.col24} />
	</CheckboxList>

	<Heading level={4} class="mt-6">Three-Column Layout</Heading>
	<CheckboxList layout="3col" variant="bordered">
		<CheckboxListItem id="col3-1" label="Col 1 - Item 1" bind:checked={threeColOptions.col31} />
		<CheckboxListItem id="col3-2" label="Col 2 - Item 1" bind:checked={threeColOptions.col32} />
		<CheckboxListItem id="col3-3" label="Col 3 - Item 1" bind:checked={threeColOptions.col33} />
		<CheckboxListItem id="col3-4" label="Col 1 - Item 2" bind:checked={threeColOptions.col34} />
		<CheckboxListItem id="col3-5" label="Col 2 - Item 2" bind:checked={threeColOptions.col35} />
		<CheckboxListItem id="col3-6" label="Col 3 - Item 2" bind:checked={threeColOptions.col36} />
	</CheckboxList>
</Card>

<!-- Card 9: Tables with Checkboxes -->
<Card title="Tables with Checkboxes" subtitle="Checkboxes in table first column for row selection">

	<Table striped>
		<thead>
			<tr>
				<th class="pa-table__checkbox-col">
					<span class="pa-checkbox"><input type="checkbox" id="select-all" /><span class="pa-checkbox__box"></span></span>
				</th>
				<th>Name</th>
				<th>Email</th>
				<th>Status</th>
				<th class="col-auto">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each staticTableData as row (row.id)}
				<tr class:pa-table__row--selected={row.checked}>
					<td class="pa-table__checkbox-col">
						<span class="pa-checkbox"><input type="checkbox" class="row-checkbox" checked={row.checked} /><span class="pa-checkbox__box"></span></span>
					</td>
					<td>{row.name}</td>
					<td>{row.email}</td>
					<td><Badge variant={row.statusVariant}>{row.status}</Badge></td>
					<td class="col-auto">
						<ButtonGroup>
							<Button size="xs" variant="primary" iconOnly>👁️</Button>
							<Button size="xs" variant="secondary" iconOnly>✏️</Button>
							<Button size="xs" variant="danger" iconOnly>🗑️</Button>
						</ButtonGroup>
					</td>
				</tr>
			{/each}
		</tbody>
	</Table>
</Card>

<!-- Card 10: Interactive Demo -->
<Card title="Interactive Demo" subtitle="Select-all functionality and row selection">

	<Table striped>
		<thead>
			<tr>
				<th class="pa-table__checkbox-col">
					<span class="pa-checkbox">
						<input type="checkbox" id="select-all-demo" checked={interactiveSelectAll} onchange={handleInteractiveSelectAll} />
						<span class="pa-checkbox__box"></span>
					</span>
				</th>
				<th>Product</th>
				<th>SKU</th>
				<th>Price</th>
				<th>Stock</th>
			</tr>
		</thead>
		<tbody>
			{#each interactiveTableData as row (row.id)}
				<tr class:pa-table__row--selected={row.checked}>
					<td class="pa-table__checkbox-col">
						<span class="pa-checkbox">
							<input type="checkbox" class="row-checkbox-demo" bind:checked={row.checked} />
							<span class="pa-checkbox__box"></span>
						</span>
					</td>
					<td>{row.product}</td>
					<td>{row.sku}</td>
					<td>{row.price}</td>
					<td><Badge variant={row.stockVariant}>{row.stock}</Badge></td>
				</tr>
			{/each}
		</tbody>
	</Table>

	{#snippet footer()}
		<div id="selection-info" class="text-sm text-secondary">
			{interactiveSelectedCount} item{interactiveSelectedCount !== 1 ? 's' : ''} selected
		</div>
	{/snippet}
</Card>
