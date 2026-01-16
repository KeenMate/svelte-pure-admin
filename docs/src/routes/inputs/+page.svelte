<script lang="ts">
	import { Heading, Paragraph, Card, Grid, Column, FormGroup, FormLabel, FormHelp, Input, Textarea, Select, Checkbox, CheckboxGroup, Radio, RadioGroup, InputGroup, InputGroupPrepend, InputGroupAppend, Button, CodeBlock } from '@keenmate/svelte-pure-admin';
</script>

<!-- Text Inputs -->
<Card title="Text Inputs">
	<Grid>
		<!-- States -->
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Normal</FormLabel>
				<Input placeholder="Enter text" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Disabled</FormLabel>
				<Input placeholder="Disabled" disabled />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Readonly</FormLabel>
				<Input value="Read only value" readonly />
			</FormGroup>
		</Column>

		<!-- Sizes -->
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Extra Small</FormLabel>
				<Input size="xs" placeholder="XS" />
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Small</FormLabel>
				<Input size="sm" placeholder="Small" />
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Default</FormLabel>
				<Input placeholder="Default" />
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Large</FormLabel>
				<Input size="lg" placeholder="Large" />
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Extra Large</FormLabel>
				<Input size="xl" placeholder="XL" />
			</FormGroup>
		</Column>

		<!-- Validation States -->
		<Column size="100" md="1-3">
			<FormGroup state="success">
				<FormLabel>Success</FormLabel>
				<Input value="Valid input" />
				<FormHelp>Looks good!</FormHelp>
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup state="warning">
				<FormLabel>Warning</FormLabel>
				<Input value="Warning input" />
				<FormHelp>Please check this field</FormHelp>
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup state="error">
				<FormLabel>Error</FormLabel>
				<Input value="Invalid input" />
				<FormHelp>This field is required</FormHelp>
			</FormGroup>
		</Column>
	</Grid>
</Card>

<!-- Input Groups -->
<Card title="Input Groups (Prepend/Append)">
	<Grid>
		<!-- Prepend -->
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>With Prepend</FormLabel>
				<InputGroup>
					<InputGroupPrepend>@</InputGroupPrepend>
					<Input placeholder="username" />
				</InputGroup>
			</FormGroup>
		</Column>

		<!-- Append -->
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>With Append</FormLabel>
				<InputGroup>
					<Input placeholder="0.00" />
					<InputGroupAppend>.00</InputGroupAppend>
				</InputGroup>
			</FormGroup>
		</Column>

		<!-- Both -->
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>With Both</FormLabel>
				<InputGroup>
					<InputGroupPrepend>$</InputGroupPrepend>
					<Input placeholder="0.00" />
					<InputGroupAppend>.00</InputGroupAppend>
				</InputGroup>
			</FormGroup>
		</Column>

		<!-- Button Append -->
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>With Button</FormLabel>
				<InputGroup>
					<Input placeholder="Search..." />
					<Button variant="primary" class="pa-input-group__button">Go</Button>
				</InputGroup>
			</FormGroup>
		</Column>

		<!-- Multiple Prepends/Appends -->
		<Column size="100">
			<FormGroup>
				<FormLabel>Multiple Prepends & Appends</FormLabel>
				<InputGroup>
					<InputGroupPrepend>https://</InputGroupPrepend>
					<InputGroupPrepend>www.</InputGroupPrepend>
					<Input placeholder="example" />
					<InputGroupAppend>.com</InputGroupAppend>
					<InputGroupAppend>🔗</InputGroupAppend>
				</InputGroup>
			</FormGroup>
		</Column>
	</Grid>
</Card>

<!-- Input Types -->
<Card title="Input Types">
	<Grid>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Email</FormLabel>
				<Input type="email" placeholder="user@example.com" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Password</FormLabel>
				<Input type="password" placeholder="••••••••" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Number</FormLabel>
				<Input type="number" placeholder="0" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Tel</FormLabel>
				<Input type="tel" placeholder="+1 (555) 123-4567" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>URL</FormLabel>
				<Input type="url" placeholder="https://example.com" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Search</FormLabel>
				<Input type="search" placeholder="Search..." />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Date</FormLabel>
				<Input type="date" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Time</FormLabel>
				<Input type="time" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>DateTime</FormLabel>
				<Input type="datetime-local" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Month</FormLabel>
				<Input type="month" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Week</FormLabel>
				<Input type="week" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Color</FormLabel>
				<Input type="color" value="#ff0000" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>File</FormLabel>
				<Input type="file" />
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Range</FormLabel>
				<Input type="range" />
			</FormGroup>
		</Column>
	</Grid>
</Card>

<!-- Selects -->
<Card title="Select Dropdowns">
	<Grid>
		<!-- States -->
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Normal</FormLabel>
				<Select>
					<option>Choose option...</option>
					<option>Option 1</option>
					<option>Option 2</option>
					<option>Option 3</option>
				</Select>
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Disabled</FormLabel>
				<Select disabled>
					<option>Disabled</option>
				</Select>
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Multiple</FormLabel>
				<Select multiple>
					<option>Option 1</option>
					<option>Option 2</option>
					<option>Option 3</option>
					<option>Option 4</option>
				</Select>
			</FormGroup>
		</Column>

		<!-- Sizes -->
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Extra Small</FormLabel>
				<Select size="xs">
					<option>XS</option>
				</Select>
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Small</FormLabel>
				<Select size="sm">
					<option>Small</option>
				</Select>
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Default</FormLabel>
				<Select>
					<option>Default</option>
				</Select>
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Large</FormLabel>
				<Select size="lg">
					<option>Large</option>
				</Select>
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Extra Large</FormLabel>
				<Select size="xl">
					<option>XL</option>
				</Select>
			</FormGroup>
		</Column>
	</Grid>
</Card>

<!-- Textareas -->
<Card title="Textareas">
	<Grid>
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>Normal</FormLabel>
				<Textarea placeholder="Enter your message..." />
			</FormGroup>
		</Column>
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>Disabled</FormLabel>
				<Textarea placeholder="Disabled" disabled />
			</FormGroup>
		</Column>

		<!-- Sizes -->
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Extra Small</FormLabel>
				<Textarea size="xs" placeholder="XS" />
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Small</FormLabel>
				<Textarea size="sm" placeholder="Small" />
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Default</FormLabel>
				<Textarea placeholder="Default" />
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Large</FormLabel>
				<Textarea size="lg" placeholder="Large" />
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Extra Large</FormLabel>
				<Textarea size="xl" placeholder="XL" />
			</FormGroup>
		</Column>
	</Grid>
</Card>

<!-- Checkboxes & Radios -->
<Card title="Checkboxes & Radios">
	<Grid>
		<!-- Checkboxes -->
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>Checkboxes</FormLabel>
				<CheckboxGroup>
					<Checkbox checked label="Option 1 (checked)" />
					<Checkbox label="Option 2" />
					<Checkbox disabled label="Option 3 (disabled)" />
				</CheckboxGroup>
			</FormGroup>
		</Column>

		<!-- Radios -->
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>Radio Buttons</FormLabel>
				<RadioGroup name="radio-demo">
					<Radio checked label="Option A (selected)" />
					<Radio label="Option B" />
					<Radio disabled label="Option C (disabled)" />
				</RadioGroup>
			</FormGroup>
		</Column>

		<!-- Checkbox Sizes -->
		<Column size="100">
			<FormGroup>
				<FormLabel>Checkbox Sizes</FormLabel>
				<CheckboxGroup>
					<Checkbox size="xs" checked label="Extra Small" />
					<Checkbox size="sm" checked label="Small" />
					<Checkbox checked label="Default" />
					<Checkbox size="lg" checked label="Large" />
					<Checkbox size="xl" checked label="Extra Large" />
				</CheckboxGroup>
			</FormGroup>
		</Column>

		<!-- Radio Sizes -->
		<Column size="100">
			<FormGroup>
				<FormLabel>Radio Sizes</FormLabel>
				<RadioGroup name="size-demo">
					<Radio size="xs" checked label="Extra Small" />
					<Radio size="sm" label="Small" />
					<Radio label="Default" />
					<Radio size="lg" label="Large" />
					<Radio size="xl" label="Extra Large" />
				</RadioGroup>
			</FormGroup>
		</Column>
	</Grid>
</Card>

<!-- Width Variations -->
<Card title="Width Variations">
	<FormGroup>
		<FormLabel>Auto Width (inline)</FormLabel>
		<Input placeholder="Auto width" style="width: auto;" />
	</FormGroup>
	<FormGroup>
		<FormLabel>25% Width</FormLabel>
		<Input placeholder="25%" style="width: 25%;" />
	</FormGroup>
	<FormGroup>
		<FormLabel>50% Width</FormLabel>
		<Input placeholder="50%" style="width: 50%;" />
	</FormGroup>
	<FormGroup>
		<FormLabel>75% Width</FormLabel>
		<Input placeholder="75%" style="width: 75%;" />
	</FormGroup>
	<FormGroup>
		<FormLabel>100% Width (full width)</FormLabel>
		<Input placeholder="100%" />
	</FormGroup>
</Card>

<!-- Code Examples -->
<Card title="Code Examples">
	<Grid>
		<Column size="100" md="50">
			<h4 class="mb-2">Basic Input with Sizes</h4>
			<CodeBlock>{`<FormGroup>
  <FormLabel>Label</FormLabel>
  <Input placeholder="Enter text" />
  <FormHelp>Help text</FormHelp>
</FormGroup>

<!-- Sizes: xs, sm, (default), lg, xl -->
<Input size="xs" placeholder="Extra Small" />
<Input size="sm" placeholder="Small" />
<Input placeholder="Default" />
<Input size="lg" placeholder="Large" />
<Input size="xl" placeholder="Extra Large" />`}</CodeBlock>
		</Column>
		<Column size="100" md="50">
			<h4 class="mb-2">Validation States</h4>
			<CodeBlock>{`<!-- Success state -->
<FormGroup state="success">
  <FormLabel>Valid Input</FormLabel>
  <Input value="Correct value" />
  <FormHelp>Looks good!</FormHelp>
</FormGroup>

<!-- Warning state -->
<FormGroup state="warning">
  <FormLabel>Warning</FormLabel>
  <Input value="Check this" />
  <FormHelp>Please review</FormHelp>
</FormGroup>

<!-- Error state -->
<FormGroup state="error">
  <FormLabel>Invalid</FormLabel>
  <Input value="Wrong value" />
  <FormHelp>This field is required</FormHelp>
</FormGroup>`}</CodeBlock>
		</Column>
	</Grid>

	<h4 class="mb-2 mt-4">Input Groups (Prepend/Append)</h4>
	<CodeBlock>{`<!-- With prepend -->
<InputGroup>
  <InputGroupPrepend>@</InputGroupPrepend>
  <Input placeholder="username" />
</InputGroup>

<!-- With append -->
<InputGroup>
  <Input placeholder="0.00" />
  <InputGroupAppend>.00</InputGroupAppend>
</InputGroup>

<!-- With both + button -->
<InputGroup>
  <InputGroupPrepend>$</InputGroupPrepend>
  <Input placeholder="Amount" />
  <InputGroupAppend>.00</InputGroupAppend>
  <Button variant="primary" class="pa-input-group__button">Go</Button>
</InputGroup>

<!-- Multiple prepends/appends -->
<InputGroup>
  <InputGroupPrepend>https://</InputGroupPrepend>
  <InputGroupPrepend>www.</InputGroupPrepend>
  <Input placeholder="example" />
  <InputGroupAppend>.com</InputGroupAppend>
</InputGroup>`}</CodeBlock>

	<Grid class="mt-4">
		<Column size="100" md="50">
			<h4 class="mb-2">Select & Textarea</h4>
			<CodeBlock>{`<!-- Select dropdown -->
<Select>
  <option>Choose...</option>
  <option>Option 1</option>
  <option>Option 2</option>
</Select>

<!-- Multiple select -->
<Select multiple>
  <option>Option 1</option>
  <option>Option 2</option>
</Select>

<!-- Textarea -->
<Textarea placeholder="Enter message..." />
<Textarea rows={5} />`}</CodeBlock>
		</Column>
		<Column size="100" md="50">
			<h4 class="mb-2">Checkboxes & Radios</h4>
			<CodeBlock>{`<!-- Checkbox group -->
<CheckboxGroup>
  <Checkbox label="Option 1" checked />
  <Checkbox label="Option 2" />
  <Checkbox label="Disabled" disabled />
</CheckboxGroup>

<!-- Radio group -->
<RadioGroup name="demo">
  <Radio label="Option A" checked />
  <Radio label="Option B" />
  <Radio label="Disabled" disabled />
</RadioGroup>

<!-- Sizes: xs, sm, (default), lg, xl -->
<Checkbox size="sm" label="Small" />
<Radio size="lg" label="Large" />`}</CodeBlock>
		</Column>
	</Grid>
</Card>
