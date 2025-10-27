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
		Column,
		Heading,
		Paragraph
	} from '$lib';

	// State for form bindings
	let username = $state('');
	let email = $state('');
	let password = $state('');
	let age = $state(0);
	let birthDate = $state('');
	let message = $state('');
	let country = $state('United States');
	let validValue = $state('Valid value');
	let invalidValue = $state('Invalid value');
	let checked = $state(false);
	let radioValue = $state('option1');
	let searchText = $state('');

	// Inline form
	let inlineUsername = $state('');
	let inlinePassword = $state('');

	// Horizontal forms
	let horizontalEmail = $state('');
	let horizontalDepartment = $state('Engineering');
	let horizontalNotes = $state('');

	// Multi-column horizontal form
	let firstName = $state('');
	let lastName = $state('');
	let userEmail = $state('');
	let phone = $state('');
	let dept = $state('');
	let title = $state('');

	// Employee form
	let empFirstName = $state('');
	let empLastName = $state('');
	let empEmail = $state('');
	let empAddress = $state('');
	let empCity = $state('');
	let empZip = $state('');
</script>

<Heading level={1}>Forms</Heading>
<Paragraph>
	Comprehensive form components with validation, sizing, layouts, and responsive grids. All examples based on @pure-admin/core snippets.
</Paragraph>

<!-- BASIC FORM ELEMENTS -->
<Heading level={2} style="margin-top: 2rem;">Basic Form Elements</Heading>
<Grid>
	<Column size="1" md="1-2">
		<Card>
			{#snippet header()}
				<Heading level={3}>Text Inputs</Heading>
			{/snippet}

			<!-- Text Input -->
			<FormGroup>
				<FormLabel for="username">Username</FormLabel>
				<Input id="username" type="text" placeholder="Enter username" bind:value={username} />
			</FormGroup>

			<!-- Email Input -->
			<FormGroup>
				<FormLabel for="email">Email</FormLabel>
				<Input id="email" type="email" placeholder="your@email.com" bind:value={email} />
			</FormGroup>

			<!-- Password Input -->
			<FormGroup>
				<FormLabel for="password">Password</FormLabel>
				<Input id="password" type="password" placeholder="Enter password" bind:value={password} />
			</FormGroup>

			<!-- Number Input -->
			<FormGroup>
				<FormLabel for="age">Age (Number)</FormLabel>
				<Input id="age" type="number" placeholder="Enter age" bind:value={age} />
			</FormGroup>

			<!-- Date Input -->
			<FormGroup>
				<FormLabel for="birthdate">Birth Date</FormLabel>
				<Input id="birthdate" type="date" bind:value={birthDate} />
			</FormGroup>
		</Card>
	</Column>

	<Column size="1" md="1-2">
		<Card>
			{#snippet header()}
				<Heading level={3}>Textarea & Select</Heading>
			{/snippet}

			<!-- Textarea -->
			<FormGroup>
				<FormLabel for="message">Message</FormLabel>
				<Textarea id="message" rows={4} placeholder="Enter your message" bind:value={message} />
			</FormGroup>

			<!-- Select -->
			<FormGroup>
				<FormLabel for="country">Country</FormLabel>
				<Select id="country" bind:value={country}>
					<option>United States</option>
					<option>United Kingdom</option>
					<option>Canada</option>
				</Select>
			</FormGroup>
		</Card>
	</Column>
</Grid>

<!-- INPUT SIZES -->
<Heading level={2} style="margin-top: 2rem;">Input Sizes</Heading>
<Card>
	{#snippet header()}
		<Heading level={3}>All Available Sizes</Heading>
	{/snippet}

	<FormGroup>
		<FormLabel>Extra Small</FormLabel>
		<Input size="xs" placeholder="Extra small" />
	</FormGroup>

	<FormGroup>
		<FormLabel>Small</FormLabel>
		<Input size="sm" placeholder="Small" />
	</FormGroup>

	<FormGroup>
		<FormLabel>Default</FormLabel>
		<Input placeholder="Default" />
	</FormGroup>

	<FormGroup>
		<FormLabel>Large</FormLabel>
		<Input size="lg" placeholder="Large" />
	</FormGroup>

	<FormGroup>
		<FormLabel>Extra Large</FormLabel>
		<Input size="xl" placeholder="Extra large" />
	</FormGroup>
</Card>

<!-- INPUT STATES -->
<Heading level={2} style="margin-top: 2rem;">Input States</Heading>
<Card>
	{#snippet header()}
		<Heading level={3}>Input States</Heading>
	{/snippet}

	<!-- Disabled Input -->
	<FormGroup>
		<FormLabel>Disabled Input</FormLabel>
		<Input disabled value="Disabled input" />
	</FormGroup>

	<!-- Readonly Input -->
	<FormGroup>
		<FormLabel>Readonly Input</FormLabel>
		<Input readonly value="Readonly input" />
	</FormGroup>

	<!-- Required Field -->
	<FormGroup isRequired={true}>
		<FormLabel for="required-field">Required Field</FormLabel>
		<Input id="required-field" required />
	</FormGroup>
</Card>

<!-- VALIDATION STATES -->
<Heading level={2} style="margin-top: 2rem;">Validation States</Heading>
<Grid>
	<Column size="1" md="1-2">
		<Card>
			{#snippet header()}
				<Heading level={3}>Success State</Heading>
			{/snippet}

			<FormGroup hasSuccess={true}>
				<FormLabel for="valid-input">Valid Input</FormLabel>
				<Input id="valid-input" state="success" bind:value={validValue} />
				<SmallText accent="success">Looks good!</SmallText>
			</FormGroup>
		</Card>
	</Column>

	<Column size="1" md="1-2">
		<Card>
			{#snippet header()}
				<Heading level={3}>Error State</Heading>
			{/snippet}

			<FormGroup hasError={true}>
				<FormLabel for="invalid-input">Invalid Input</FormLabel>
				<Input id="invalid-input" state="error" bind:value={invalidValue} />
				<SmallText accent="error">Please provide a valid value.</SmallText>
			</FormGroup>
		</Card>
	</Column>
</Grid>

<!-- CHECKBOXES AND RADIOS -->
<Heading level={2} style="margin-top: 2rem;">Checkboxes and Radios</Heading>
<Grid>
	<Column size="1" md="1-2">
		<Card>
			{#snippet header()}
				<Heading level={3}>Checkboxes</Heading>
			{/snippet}

			<Checkbox id="check1" label="Check me out" bind:checked />
			<Checkbox id="check2" label="Another checkbox" />
			<Checkbox id="check-disabled" label="Disabled checkbox" disabled />
		</Card>
	</Column>

	<Column size="1" md="1-2">
		<Card>
			{#snippet header()}
				<Heading level={3}>Radio Buttons</Heading>
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

<!-- INPUT GROUPS -->
<Heading level={2} style="margin-top: 2rem;">Input Groups</Heading>

<!-- Basic Input Groups -->
<Heading level={3} style="margin-top: 1rem;">Basic Input Groups</Heading>
<Grid>
	<Column size="1" md="1-2">
		<Card>
			{#snippet header()}
				<Heading level={4}>Prepend & Append</Heading>
			{/snippet}

			<!-- Prepend only -->
			<FormGroup>
				<FormLabel>Username</FormLabel>
				<InputGroup>
					<InputGroupPrepend>@</InputGroupPrepend>
					<Input placeholder="Username" />
				</InputGroup>
			</FormGroup>

			<!-- Append only -->
			<FormGroup>
				<FormLabel>Amount</FormLabel>
				<InputGroup>
					<Input placeholder="Amount" />
					<InputGroupAppend>USD</InputGroupAppend>
				</InputGroup>
			</FormGroup>

			<!-- Prepend and Append -->
			<FormGroup>
				<FormLabel>Price</FormLabel>
				<InputGroup>
					<InputGroupPrepend>$</InputGroupPrepend>
					<Input placeholder="0.00" />
					<InputGroupAppend>.00</InputGroupAppend>
				</InputGroup>
			</FormGroup>
		</Card>
	</Column>

	<Column size="1" md="1-2">
		<Card>
			{#snippet header()}
				<Heading level={4}>With Buttons</Heading>
			{/snippet}

			<!-- Input with Button -->
			<FormGroup>
				<FormLabel>Search</FormLabel>
				<InputGroup>
					<Input placeholder="Search..." bind:value={searchText} />
					<Button variant="primary" isInputGroupButton={true}>Search</Button>
				</InputGroup>
			</FormGroup>

			<!-- Prepend + Input + Button -->
			<FormGroup>
				<FormLabel>Quick Search</FormLabel>
				<InputGroup>
					<InputGroupPrepend>🔍</InputGroupPrepend>
					<Input placeholder="Search..." />
					<Button variant="primary" isInputGroupButton={true}>Go</Button>
				</InputGroup>
			</FormGroup>

			<!-- Input + Append + Button -->
			<FormGroup>
				<FormLabel>Convert Currency</FormLabel>
				<InputGroup>
					<Input placeholder="Enter amount" />
					<InputGroupAppend>USD</InputGroupAppend>
					<Button variant="success" isInputGroupButton={true}>Convert</Button>
				</InputGroup>
			</FormGroup>
		</Card>
	</Column>
</Grid>

<!-- Advanced Input Groups -->
<Heading level={3} style="margin-top: 2rem;">Advanced Input Groups</Heading>
<Grid>
	<Column size="1" md="1-2">
		<Card>
			{#snippet header()}
				<Heading level={4}>Complex Combinations</Heading>
			{/snippet}

			<!-- Button + Input + Append -->
			<FormGroup>
				<FormLabel>Quantity Control</FormLabel>
				<InputGroup>
					<Button variant="secondary" isInputGroupButton={true}>-</Button>
					<Input type="number" value="1" />
					<InputGroupAppend>items</InputGroupAppend>
				</InputGroup>
			</FormGroup>

			<!-- Prepend + Input + Append + Button -->
			<FormGroup>
				<FormLabel>Full URL</FormLabel>
				<InputGroup>
					<InputGroupPrepend>https://</InputGroupPrepend>
					<Input placeholder="example.com" />
					<InputGroupAppend>.com</InputGroupAppend>
					<Button variant="primary" isInputGroupButton={true}>Visit</Button>
				</InputGroup>
			</FormGroup>
		</Card>
	</Column>

	<Column size="1" md="1-2">
		<Card>
			{#snippet header()}
				<Heading level={4}>Quantity Spinners</Heading>
			{/snippet}

			<!-- Button + Input + Button (quantity controls) -->
			<FormGroup>
				<FormLabel>Item Quantity</FormLabel>
				<InputGroup>
					<Button variant="secondary" isInputGroupButton={true}>-</Button>
					<Input type="number" value="1" style="text-align: center;" />
					<Button variant="secondary" isInputGroupButton={true}>+</Button>
				</InputGroup>
			</FormGroup>
		</Card>
	</Column>
</Grid>

<!-- HORIZONTAL FORM GROUPS -->
<Heading level={2} style="margin-top: 2rem;">Horizontal Form Groups</Heading>
<Paragraph style="color: #666;">
	Single horizontal field layout with label on the left and input on the right (pa-form-group--horizontal).
</Paragraph>

<Card style="margin-top: 1rem;">
	{#snippet header()}
		<Heading level={3}>Horizontal Form Layout</Heading>
	{/snippet}

	<!-- Single Horizontal Field -->
	<FormGroup horizontal={true}>
		<FormLabel for="h-email">Email</FormLabel>
		<Input id="h-email" type="email" placeholder="your@email.com" bind:value={horizontalEmail} />
	</FormGroup>

	<!-- Horizontal Field with Select -->
	<FormGroup horizontal={true}>
		<FormLabel for="h-department">Department</FormLabel>
		<Select id="h-department" bind:value={horizontalDepartment}>
			<option>Engineering</option>
			<option>Marketing</option>
			<option>Sales</option>
		</Select>
	</FormGroup>

	<!-- Horizontal Field with Textarea -->
	<FormGroup horizontal={true}>
		<FormLabel for="h-notes">Notes</FormLabel>
		<Textarea id="h-notes" rows={3} placeholder="Additional notes..." bind:value={horizontalNotes} />
	</FormGroup>
</Card>

<!-- MULTI-COLUMN HORIZONTAL FORMS WITH GRIDS -->
<Heading level={2} style="margin-top: 2rem;">Multi-Column Horizontal Forms (with pure-g grids)</Heading>
<Paragraph style="color: #666;">
	Horizontal forms using pure-g grids for responsive multi-column layouts.
</Paragraph>

<!-- Three equal columns -->
<Card style="margin-top: 1rem;">
	{#snippet header()}
		<Heading level={3}>Three Equal Columns (1/3 each)</Heading>
	{/snippet}

	<form class="pa-form">
		<div class="pure-g">
			<div class="pure-u-1 pure-u-md-1-3">
				<FormGroup horizontal={true}>
					<FormLabel for="fname">First Name</FormLabel>
					<Input id="fname" placeholder="John" bind:value={firstName} />
				</FormGroup>
			</div>

			<div class="pure-u-1 pure-u-md-1-3">
				<FormGroup horizontal={true}>
					<FormLabel for="lname">Last Name</FormLabel>
					<Input id="lname" placeholder="Doe" bind:value={lastName} />
				</FormGroup>
			</div>

			<div class="pure-u-1 pure-u-md-1-3">
				<FormGroup horizontal={true}>
					<FormLabel for="u-email">Email</FormLabel>
					<Input id="u-email" type="email" placeholder="john@example.com" bind:value={userEmail} />
				</FormGroup>
			</div>
		</div>
	</form>
</Card>

<!-- Varying widths -->
<Card style="margin-top: 1rem;">
	{#snippet header()}
		<Heading level={3}>Varying Column Widths</Heading>
	{/snippet}

	<form class="pa-form">
		<div class="pure-g">
			<!-- Phone (smaller - 1/4) -->
			<div class="pure-u-1 pure-u-md-1-4">
				<FormGroup horizontal={true}>
					<FormLabel for="phone">Phone</FormLabel>
					<Input id="phone" type="tel" placeholder="+1 555-0123" bind:value={phone} />
				</FormGroup>
			</div>

			<!-- Department (larger - 5/12) -->
			<div class="pure-u-1 pure-u-md-5-12">
				<FormGroup horizontal={true}>
					<FormLabel for="dept">Department</FormLabel>
					<Select id="dept" bind:value={dept}>
						<option value="">Select...</option>
						<option>Engineering</option>
						<option>Marketing</option>
					</Select>
				</FormGroup>
			</div>

			<!-- Job Title (medium - 1/3) -->
			<div class="pure-u-1 pure-u-md-1-3">
				<FormGroup horizontal={true}>
					<FormLabel for="title">Job Title</FormLabel>
					<Input id="title" placeholder="Senior Developer" bind:value={title} />
				</FormGroup>
			</div>
		</div>
	</form>
</Card>

<!-- COMPLETE HORIZONTAL FORM EXAMPLE -->
<Heading level={2} style="margin-top: 2rem;">Complete Horizontal Form Example</Heading>
<Card>
	{#snippet header()}
		<Heading level={3}>Employee Information</Heading>
	{/snippet}

	<form class="pa-form">
		<!-- Line 1: Personal Info -->
		<div class="pure-g">
			<div class="pure-u-1 pure-u-md-1-3">
				<FormGroup horizontal={true}>
					<FormLabel for="first">First Name</FormLabel>
					<Input id="first" placeholder="John" bind:value={empFirstName} />
				</FormGroup>
			</div>
			<div class="pure-u-1 pure-u-md-1-3">
				<FormGroup horizontal={true}>
					<FormLabel for="last">Last Name</FormLabel>
					<Input id="last" placeholder="Doe" bind:value={empLastName} />
				</FormGroup>
			</div>
			<div class="pure-u-1 pure-u-md-1-3">
				<FormGroup horizontal={true}>
					<FormLabel for="mail">Email</FormLabel>
					<Input id="mail" type="email" placeholder="john.doe@company.com" bind:value={empEmail} />
				</FormGroup>
			</div>
		</div>

		<!-- Line 2: Address -->
		<div class="pure-g">
			<div class="pure-u-1 pure-u-md-1-2">
				<FormGroup horizontal={true}>
					<FormLabel for="address">Address</FormLabel>
					<Input id="address" placeholder="123 Main Street" bind:value={empAddress} />
				</FormGroup>
			</div>
			<div class="pure-u-1 pure-u-md-1-3">
				<FormGroup horizontal={true}>
					<FormLabel for="city">City</FormLabel>
					<Input id="city" placeholder="San Francisco" bind:value={empCity} />
				</FormGroup>
			</div>
			<div class="pure-u-1 pure-u-md-1-6">
				<FormGroup horizontal={true}>
					<FormLabel for="zip">Zip</FormLabel>
					<Input id="zip" placeholder="94102" bind:value={empZip} />
				</FormGroup>
			</div>
		</div>

		<!-- Submit Buttons -->
		<div class="pure-g">
			<div class="pure-u-1" style="text-align: right;">
				<Button variant="secondary">Cancel</Button>
				<Button variant="primary" type="submit">Submit</Button>
			</div>
		</div>
	</form>
</Card>

<div style="margin-bottom: 2rem;"></div>
