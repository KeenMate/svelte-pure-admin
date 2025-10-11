<script lang="ts">
	import {
		Card,
		FormGroup,
		FormLabel,
		Input,
		Textarea,
		Select,
		Checkbox,
		Radio,
		InputGroup,
		InputGroupPrepend,
		InputGroupAppend,
		SmallText,
		Button,
		Grid,
		Column
	} from '$lib';

	let username = $state('');
	let email = $state('');
	let password = $state('');
	let message = $state('');
	let country = $state('United States');
	let validValue = $state('Valid value');
	let invalidValue = $state('Invalid value');
	let checked = $state(false);
	let radioValue = $state('option1');
	let searchText = $state('');
	let horizontalEmail = $state('');
	let horizontalPassword = $state('');
</script>

<h1>Forms</h1>
<p>Comprehensive form components with validation, sizing, and responsive layouts.</p>

<!-- Two-column card layout for basic forms -->
<Grid>
	<Column size="1" md="1-2">
		<Card>
			{#snippet header()}
				<h3>Basic Form Elements</h3>
			{/snippet}

			<FormGroup>
				<FormLabel for="username">Username</FormLabel>
				<Input id="username" placeholder="Enter username" bind:value={username} />
			</FormGroup>

			<FormGroup>
				<FormLabel for="email">Email</FormLabel>
				<Input id="email" type="email" placeholder="your@email.com" bind:value={email} />
			</FormGroup>

			<FormGroup>
				<FormLabel for="password">Password</FormLabel>
				<Input id="password" type="password" placeholder="Enter password" bind:value={password} />
			</FormGroup>
		</Card>
	</Column>

	<Column size="1" md="1-2">
		<Card>
			{#snippet header()}
				<h3>Textarea & Select</h3>
			{/snippet}

			<FormGroup>
				<FormLabel for="message">Message</FormLabel>
				<Textarea id="message" rows={4} placeholder="Enter your message" bind:value={message} />
			</FormGroup>

			<FormGroup>
				<FormLabel for="country">Country</FormLabel>
				<Select id="country" bind:value={country}>
					<option>United States</option>
					<option>United Kingdom</option>
					<option>Canada</option>
					<option>Australia</option>
				</Select>
			</FormGroup>
		</Card>
	</Column>
</Grid>

<!-- Three-column layout for input sizes -->
<Grid style="margin-top: 2rem;">
	<Column size="1" lg="1-3">
		<Card>
			{#snippet header()}
				<h3>Small Inputs</h3>
			{/snippet}

			<FormGroup>
				<FormLabel>Extra Small</FormLabel>
				<Input size="xs" placeholder="Extra small" />
			</FormGroup>

			<FormGroup>
				<FormLabel>Small</FormLabel>
				<Input size="sm" placeholder="Small" />
			</FormGroup>
		</Card>
	</Column>

	<Column size="1" lg="1-3">
		<Card>
			{#snippet header()}
				<h3>Medium Inputs</h3>
			{/snippet}

			<FormGroup>
				<FormLabel>Default Size</FormLabel>
				<Input placeholder="Default" />
			</FormGroup>

			<FormGroup>
				<FormLabel>With Icon</FormLabel>
				<InputGroup>
					<InputGroupPrepend>@</InputGroupPrepend>
					<Input placeholder="Username" />
				</InputGroup>
			</FormGroup>
		</Card>
	</Column>

	<Column size="1" lg="1-3">
		<Card>
			{#snippet header()}
				<h3>Large Inputs</h3>
			{/snippet}

			<FormGroup>
				<FormLabel>Large</FormLabel>
				<Input size="lg" placeholder="Large" />
			</FormGroup>

			<FormGroup>
				<FormLabel>Extra Large</FormLabel>
				<Input size="xl" placeholder="Extra large" />
			</FormGroup>
		</Card>
	</Column>
</Grid>

<!-- Validation states in two columns -->
<Grid style="margin-top: 2rem;">
	<Column size="1" md="1-2">
		<Card>
			{#snippet header()}
				<h3>Validation States</h3>
			{/snippet}

			<FormGroup hasSuccess={true}>
				<FormLabel for="valid-input">Valid Input</FormLabel>
				<Input id="valid-input" state="success" bind:value={validValue} />
				<SmallText accent="success">Looks good!</SmallText>
			</FormGroup>

			<FormGroup hasError={true}>
				<FormLabel for="invalid-input">Invalid Input</FormLabel>
				<Input id="invalid-input" state="error" bind:value={invalidValue} />
				<SmallText accent="error">This field is required</SmallText>
			</FormGroup>

			<FormGroup isRequired={true}>
				<FormLabel for="required-field">Required Field</FormLabel>
				<Input id="required-field" required />
				<SmallText>This field must be filled out</SmallText>
			</FormGroup>
		</Card>
	</Column>

	<Column size="1" md="1-2">
		<Card>
			{#snippet header()}
				<h3>Input States</h3>
			{/snippet}

			<FormGroup>
				<FormLabel>Disabled Input</FormLabel>
				<Input disabled value="Disabled input" />
			</FormGroup>

			<FormGroup>
				<FormLabel>Readonly Input</FormLabel>
				<Input readonly value="Readonly input" />
			</FormGroup>

			<FormGroup>
				<FormLabel>Search with Button</FormLabel>
				<InputGroup>
					<Input placeholder="Search..." bind:value={searchText} />
					<Button variant="primary">Search</Button>
				</InputGroup>
			</FormGroup>
		</Card>
	</Column>
</Grid>

<!-- Checkboxes and Radios -->
<Grid style="margin-top: 2rem;">
	<Column size="1" md="1-2">
		<Card>
			{#snippet header()}
				<h3>Checkboxes</h3>
			{/snippet}

			<Checkbox id="check1" label="Check me out" bind:checked />
			<Checkbox id="check2" label="Another checkbox" />
			<Checkbox id="check-disabled" label="Disabled checkbox" disabled />
		</Card>
	</Column>

	<Column size="1" md="1-2">
		<Card>
			{#snippet header()}
				<h3>Radio Buttons</h3>
			{/snippet}

			<Radio
				id="radio1"
				name="radioGroup"
				value="option1"
				label="Option 1"
				bind:group={radioValue}
			/>
			<Radio
				id="radio2"
				name="radioGroup"
				value="option2"
				label="Option 2"
				bind:group={radioValue}
			/>
			<Radio
				id="radio3"
				name="radioGroup"
				value="option3"
				label="Option 3"
				bind:group={radioValue}
			/>
		</Card>
	</Column>
</Grid>

<!-- Input Groups -->
<Grid style="margin-top: 2rem;">
	<Column size="1" md="1-2">
		<Card>
			{#snippet header()}
				<h3>Input Groups - Prepend</h3>
			{/snippet}

			<FormGroup>
				<FormLabel>Username</FormLabel>
				<InputGroup>
					<InputGroupPrepend>@</InputGroupPrepend>
					<Input placeholder="username" />
				</InputGroup>
			</FormGroup>

			<FormGroup>
				<FormLabel>Website URL</FormLabel>
				<InputGroup>
					<InputGroupPrepend>https://</InputGroupPrepend>
					<Input placeholder="example.com" />
				</InputGroup>
			</FormGroup>
		</Card>
	</Column>

	<Column size="1" md="1-2">
		<Card>
			{#snippet header()}
				<h3>Input Groups - Append</h3>
			{/snippet}

			<FormGroup>
				<FormLabel>Price</FormLabel>
				<InputGroup>
					<Input placeholder="0.00" />
					<InputGroupAppend>USD</InputGroupAppend>
				</InputGroup>
			</FormGroup>

			<FormGroup>
				<FormLabel>Email Domain</FormLabel>
				<InputGroup>
					<Input placeholder="username" />
					<InputGroupAppend>@example.com</InputGroupAppend>
				</InputGroup>
			</FormGroup>
		</Card>
	</Column>

	<Column size="1">
		<Card>
			{#snippet header()}
				<h3>Input Groups - Both Prepend & Append</h3>
			{/snippet}

			<FormGroup>
				<FormLabel>Amount</FormLabel>
				<InputGroup>
					<InputGroupPrepend>$</InputGroupPrepend>
					<Input placeholder="0.00" />
					<InputGroupAppend>.00</InputGroupAppend>
				</InputGroup>
			</FormGroup>
		</Card>
	</Column>
</Grid>

<!-- Full-width horizontal form example -->
<div style="margin-top: 2rem;">
	<Card>
		{#snippet header()}
			<h3>Horizontal Form Layout (using Grid)</h3>
		{/snippet}

		<p style="margin-bottom: 1rem; color: #666;">
			Using Grid and Column components to create horizontal form layouts with labels on the left.
		</p>

		<Grid>
			<Column size="1" md="1-3">
				<FormLabel>Email Address</FormLabel>
			</Column>
			<Column size="1" md="2-3">
				<Input type="email" placeholder="Email" bind:value={horizontalEmail} />
			</Column>
		</Grid>

		<Grid style="margin-top: 1rem;">
			<Column size="1" md="1-3">
				<FormLabel>Password</FormLabel>
			</Column>
			<Column size="1" md="2-3">
				<Input type="password" placeholder="Password" bind:value={horizontalPassword} />
			</Column>
		</Grid>

		<Grid style="margin-top: 1rem;">
			<Column size="1" md="1-3">
				<FormLabel>Country</FormLabel>
			</Column>
			<Column size="1" md="2-3">
				<Select>
					<option>United States</option>
					<option>United Kingdom</option>
					<option>Canada</option>
				</Select>
			</Column>
		</Grid>

		<Grid style="margin-top: 1rem;">
			<Column size="1" md="1-3"></Column>
			<Column size="1" md="2-3">
				<Checkbox id="remember" label="Remember me" />
			</Column>
		</Grid>

		{#snippet footer()}
			<div style="display: flex; gap: 0.5rem;">
				<Button variant="primary" type="submit">Submit</Button>
				<Button variant="secondary">Cancel</Button>
			</div>
		{/snippet}
	</Card>
</div>
