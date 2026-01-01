<script lang="ts">
	import {
		Card,
		FormGroup,
		FormLabel,
		FormHelp,
		Input,
		Textarea,
		Select,
		Checkbox,
		CheckboxGroup,
		Radio,
		RadioGroup,
		InputGroup,
		InputGroupPrepend,
		InputGroupAppend,
		Button,
		ButtonGroup,
		Grid,
		Column,
		Table,
		Code,
		Paragraph
	} from '$lib';

	// Form state bindings
	let textInput = $state('');
	let emailInput = $state('');
	let passwordInput = $state('');
	let numberInput = $state('');
	let basicSelect = $state('');
	let dateInput = $state('');
	let textareaValue = $state('');

	// Contact form
	let firstName = $state('');
	let lastName = $state('');
	let address = $state('');

	// Quick settings
	let settingName = $state('');
	let notificationPref = $state('');

	// Three column layout
	let fname = $state('');
	let lname = $state('');
	let email3 = $state('');
	let phone = $state('');
	let country = $state('United States');
	let zip = $state('');

	// Input groups
	let prependInput = $state('');
	let appendInput = $state('');
	let bothInput = $state('');
	let buttonAppend = $state('');
	let prependButton = $state('');
	let appendButton = $state('');
	let buttonAppendInput = $state(1);
	let fullGroup = $state('');
	let quantityInput = $state(1);

	// Form states
	let readonlyInput = $state('Read only value');
	let helpInput = $state('');
	let errorInput = $state('');
	let successInput = $state('Valid input');

	// Checkboxes
	let check1 = $state(true);
	let check2 = $state(false);
	let check3 = $state(false);

	// Radios
	let radioGroup = $state('a');
	let radioSizes = $state('xs');

	// Checkbox sizes
	let checkXs = $state(true);
	let checkSm = $state(true);
	let checkDefault = $state(true);
	let checkLg = $state(true);
	let checkXl = $state(true);

	// Horizontal form
	let hFname = $state('');
	let hLname = $state('');
	let hEmail = $state('');
	let hPhone = $state('');
	let hDept = $state('');
	let hTitle = $state('');
	let hAddress = $state('');
	let hCity = $state('');
	let hZip = $state('');
</script>

<Paragraph>Complete set of form elements with various styles and states for data input.</Paragraph>

<!-- Input Sizes Reference -->
<Card title="Input Sizes Reference" noPadding>
	<Table striped>
		<thead>
			<tr>
				<th>Size</th>
				<th>Class</th>
				<th>Font Size</th>
				<th>Padding</th>
				<th>Height</th>
				<th>Example</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><strong>XS</strong></td>
				<td><Code>.pa-input--xs</Code></td>
				<td>1.2rem (12px)</td>
				<td>0.6rem 0.8rem</td>
				<td>~31px</td>
				<td><Input type="text" size="xs" placeholder="Extra small" class="w-140" /></td>
			</tr>
			<tr>
				<td><strong>SM</strong></td>
				<td><Code>.pa-input--sm</Code></td>
				<td>1.4rem (14px)</td>
				<td>0.8rem 0.8rem</td>
				<td>~33px</td>
				<td><Input type="text" size="sm" placeholder="Small" class="w-140" /></td>
			</tr>
			<tr>
				<td><strong>Default</strong></td>
				<td><Code>.pa-input</Code></td>
				<td>1.4rem (14px)</td>
				<td>0.8rem 0.8rem</td>
				<td>~35px</td>
				<td><Input type="text" placeholder="Default" class="w-140" /></td>
			</tr>
			<tr>
				<td><strong>LG</strong></td>
				<td><Code>.pa-input--lg</Code></td>
				<td>1.6rem (16px)</td>
				<td>0.8rem 0.8rem</td>
				<td>~38px</td>
				<td><Input type="text" size="lg" placeholder="Large" class="w-140" /></td>
			</tr>
			<tr>
				<td><strong>XL</strong></td>
				<td><Code>.pa-input--xl</Code></td>
				<td>1.8rem (18px)</td>
				<td>0.8rem 0.8rem</td>
				<td>~41px</td>
				<td><Input type="text" size="xl" placeholder="Extra large" class="w-140" /></td>
			</tr>
		</tbody>
	</Table>
</Card>

<!-- Form with Buttons in Header -->
<Card>
	{#snippet header()}
		<h3>User Profile</h3>
		<div class="pa-card__header-actions">
			<ButtonGroup>
				<Button variant="secondary" size="sm">
					{#snippet icon()}×{/snippet}
					Cancel
				</Button>
				<Button variant="success" size="sm">
					{#snippet icon()}✓{/snippet}
					Save
				</Button>
			</ButtonGroup>
		</div>
	{/snippet}

	<form class="pa-form">
		<Grid>
			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="text-input">Text Input</FormLabel>
					<Input id="text-input" placeholder="Enter text" bind:value={textInput} />
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="email-input">Email Input</FormLabel>
					<Input type="email" id="email-input" placeholder="user@example.com" bind:value={emailInput} />
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="password-input">Password Input</FormLabel>
					<Input type="password" id="password-input" placeholder="Enter password" bind:value={passwordInput} />
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="number-input">Number Input</FormLabel>
					<Input type="number" id="number-input" placeholder="0" bind:value={numberInput} />
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="basic-select">Select Dropdown</FormLabel>
					<Select id="basic-select" bind:value={basicSelect}>
						<option>Choose an option...</option>
						<option>Option 1</option>
						<option>Option 2</option>
						<option>Option 3</option>
					</Select>
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="date-input">Date Input</FormLabel>
					<Input type="date" id="date-input" bind:value={dateInput} />
				</FormGroup>
			</Column>

			<Column size="100">
				<FormGroup>
					<FormLabel for="textarea">Textarea (Full Width)</FormLabel>
					<Textarea id="textarea" placeholder="Enter your message here..." bind:value={textareaValue} />
				</FormGroup>
			</Column>
		</Grid>
	</form>
</Card>

<!-- Form with Buttons in Footer -->
<Card title="Contact Information">
	<form class="pa-form">
		<Grid>
			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="fname2">First Name</FormLabel>
					<Input id="fname2" placeholder="John" bind:value={firstName} />
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="lname2">Last Name</FormLabel>
					<Input id="lname2" placeholder="Doe" bind:value={lastName} />
				</FormGroup>
			</Column>

			<Column size="100">
				<FormGroup>
					<FormLabel for="address">Address</FormLabel>
					<Input id="address" placeholder="123 Main St" bind:value={address} />
				</FormGroup>
			</Column>
		</Grid>
	</form>

	{#snippet footer()}
		<ButtonGroup>
			<Button variant="secondary">
				{#snippet icon()}←{/snippet}
				Back
			</Button>
			<Button variant="light">
				{#snippet icon()}🗑{/snippet}
				Delete
			</Button>
		</ButtonGroup>
		<ButtonGroup class="ml-auto">
			<Button variant="secondary">Cancel</Button>
			<Button variant="success">
				{#snippet icon()}✓{/snippet}
				Save Changes
			</Button>
		</ButtonGroup>
	{/snippet}
</Card>

<!-- Form with Buttons in Body -->
<Card title="Quick Settings">
	<form class="pa-form">
		<FormGroup>
			<FormLabel for="setting1">Setting Name</FormLabel>
			<Input id="setting1" placeholder="Enter value" bind:value={settingName} />
		</FormGroup>

		<FormGroup>
			<FormLabel for="setting2">Notification Preference</FormLabel>
			<Select id="setting2" bind:value={notificationPref}>
				<option>All notifications</option>
				<option>Important only</option>
				<option>None</option>
			</Select>
		</FormGroup>

		<ButtonGroup>
			<Button variant="secondary">Cancel</Button>
			<Button variant="primary">
				{#snippet icon()}📄{/snippet}
				Preview
			</Button>
			<Button variant="success">
				{#snippet icon()}✓{/snippet}
				Apply
			</Button>
		</ButtonGroup>
	</form>
</Card>

<!-- Three Column Compact Form -->
<Card title="Compact Three Column Layout">
	<form class="pa-form">
		<Grid>
			<Column size="100" md="1-3">
				<FormGroup>
					<FormLabel for="fname">First Name</FormLabel>
					<Input id="fname" placeholder="John" bind:value={fname} />
				</FormGroup>
			</Column>

			<Column size="100" md="1-3">
				<FormGroup>
					<FormLabel for="lname">Last Name</FormLabel>
					<Input id="lname" placeholder="Doe" bind:value={lname} />
				</FormGroup>
			</Column>

			<Column size="100" md="1-3">
				<FormGroup>
					<FormLabel for="email3">Email</FormLabel>
					<Input type="email" id="email3" placeholder="john@example.com" bind:value={email3} />
				</FormGroup>
			</Column>

			<Column size="100" md="1-3">
				<FormGroup>
					<FormLabel for="phone">Phone</FormLabel>
					<Input type="tel" id="phone" placeholder="+1 234 567 8900" bind:value={phone} />
				</FormGroup>
			</Column>

			<Column size="100" md="1-3">
				<FormGroup>
					<FormLabel for="country">Country</FormLabel>
					<Select id="country" bind:value={country}>
						<option>United States</option>
						<option>Canada</option>
						<option>United Kingdom</option>
					</Select>
				</FormGroup>
			</Column>

			<Column size="100" md="1-3">
				<FormGroup>
					<FormLabel for="zip">ZIP Code</FormLabel>
					<Input id="zip" placeholder="12345" bind:value={zip} />
				</FormGroup>
			</Column>
		</Grid>
	</form>
</Card>

<!-- Input Groups with Icons -->
<Card title="Input Groups">
	<form class="pa-form">
		<Grid>
			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="prepend-input">Input with Prepended Text</FormLabel>
					<InputGroup>
						<InputGroupPrepend>@</InputGroupPrepend>
						<Input id="prepend-input" placeholder="username" bind:value={prependInput} />
					</InputGroup>
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="append-input">Input with Appended Text</FormLabel>
					<InputGroup>
						<Input id="append-input" placeholder="0.00" bind:value={appendInput} />
						<InputGroupAppend>USD</InputGroupAppend>
					</InputGroup>
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="both-input">Input with Both Prepend and Append</FormLabel>
					<InputGroup>
						<InputGroupPrepend>$</InputGroupPrepend>
						<Input id="both-input" placeholder="0.00" bind:value={bothInput} />
						<InputGroupAppend>.00</InputGroupAppend>
					</InputGroup>
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="button-append">Input with Button</FormLabel>
					<InputGroup>
						<Input id="button-append" placeholder="Search..." bind:value={buttonAppend} />
						<Button variant="primary" class="pa-input-group__button">Search</Button>
					</InputGroup>
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="prepend-button">Prepend + Input + Button</FormLabel>
					<InputGroup>
						<InputGroupPrepend>🔍</InputGroupPrepend>
						<Input id="prepend-button" placeholder="Search..." bind:value={prependButton} />
						<Button variant="primary" class="pa-input-group__button">Go</Button>
					</InputGroup>
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="append-button">Input + Append + Button</FormLabel>
					<InputGroup>
						<Input id="append-button" placeholder="Enter amount" bind:value={appendButton} />
						<InputGroupAppend>USD</InputGroupAppend>
						<Button variant="success" class="pa-input-group__button">Convert</Button>
					</InputGroup>
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="button-append-input">Button + Input + Append</FormLabel>
					<InputGroup>
						<Button variant="secondary" class="pa-input-group__button">-</Button>
						<Input type="number" id="button-append-input" bind:value={buttonAppendInput} />
						<InputGroupAppend>items</InputGroupAppend>
					</InputGroup>
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="full-group">Prepend + Input + Append + Button</FormLabel>
					<InputGroup>
						<InputGroupPrepend>https://</InputGroupPrepend>
						<Input id="full-group" placeholder="example.com" bind:value={fullGroup} />
						<InputGroupAppend>.com</InputGroupAppend>
						<Button variant="primary" class="pa-input-group__button">Visit</Button>
					</InputGroup>
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel for="quantity-input">Button + Input + Button (Quantity)</FormLabel>
					<InputGroup>
						<Button variant="secondary" class="pa-input-group__button">-</Button>
						<Input type="number" id="quantity-input" bind:value={quantityInput} class="text-center" />
						<Button variant="secondary" class="pa-input-group__button">+</Button>
					</InputGroup>
				</FormGroup>
			</Column>
		</Grid>
	</form>
</Card>

<!-- Form States -->
<Card title="Form States">
	<form class="pa-form">
		<Grid>
			<Column size="100" md="1-3">
				<FormGroup>
					<FormLabel for="disabled-input">Disabled Input</FormLabel>
					<Input id="disabled-input" placeholder="Disabled" disabled />
				</FormGroup>
			</Column>

			<Column size="100" md="1-3">
				<FormGroup>
					<FormLabel for="readonly-input">Readonly Input</FormLabel>
					<Input id="readonly-input" bind:value={readonlyInput} readonly />
				</FormGroup>
			</Column>

			<Column size="100" md="1-3">
				<FormGroup>
					<FormLabel for="help-input">Input with Help Text</FormLabel>
					<Input id="help-input" placeholder="Username" bind:value={helpInput} />
					<FormHelp>Must be 3-20 characters long</FormHelp>
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup hasError>
					<FormLabel for="error-input">Input with Error</FormLabel>
					<Input id="error-input" state="error" placeholder="Invalid input" bind:value={errorInput} />
					<FormHelp variant="error">This field is required</FormHelp>
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup hasSuccess>
					<FormLabel for="success-input">Input with Success</FormLabel>
					<Input id="success-input" state="success" bind:value={successInput} />
					<FormHelp variant="success">Looks good!</FormHelp>
				</FormGroup>
			</Column>
		</Grid>
	</form>
</Card>

<!-- Input Sizes -->
<Card title="Input Sizes">
	<form class="pa-form">
		<FormGroup>
			<FormLabel for="xs-input">Extra Small Input</FormLabel>
			<Input id="xs-input" size="xs" placeholder="Extra small" />
		</FormGroup>

		<FormGroup>
			<FormLabel for="sm-input">Small Input</FormLabel>
			<Input id="sm-input" size="sm" placeholder="Small" />
		</FormGroup>

		<FormGroup>
			<FormLabel for="normal-input">Normal Input (Default)</FormLabel>
			<Input id="normal-input" placeholder="Normal" />
		</FormGroup>

		<FormGroup>
			<FormLabel for="lg-input">Large Input</FormLabel>
			<Input id="lg-input" size="lg" placeholder="Large" />
		</FormGroup>

		<FormGroup>
			<FormLabel for="xl-input">Extra Large Input</FormLabel>
			<Input id="xl-input" size="xl" placeholder="Extra large" />
		</FormGroup>
	</form>
</Card>

<!-- Checkboxes and Radio Buttons -->
<Card title="Checkboxes and Radio Buttons">
	<form class="pa-form">
		<FormGroup>
			<FormLabel>Checkboxes (Custom Tri-State)</FormLabel>
			<CheckboxGroup>
				<Checkbox id="check1" label="Option 1 (checked)" bind:checked={check1} />
				<Checkbox id="check2" label="Option 2" bind:checked={check2} />
				<Checkbox id="check3" label="Option 3 (disabled)" disabled />
			</CheckboxGroup>
		</FormGroup>

		<FormGroup>
			<FormLabel>Radio Buttons</FormLabel>
			<RadioGroup>
				<Radio name="radio-group" value="a" bind:group={radioGroup} label="Choice A (selected)" />
				<Radio name="radio-group" value="b" bind:group={radioGroup} label="Choice B" />
				<Radio name="radio-group" value="c" disabled label="Choice C (disabled)" />
			</RadioGroup>
		</FormGroup>
	</form>
</Card>

<!-- Checkbox and Radio Sizes -->
<Card title="Checkbox & Radio Sizes">
	<form class="pa-form">
		<Grid>
			<Column size="100" md="50">
				<FormGroup>
					<FormLabel>Checkbox Sizes</FormLabel>
					<CheckboxGroup>
						<Checkbox id="check-xs" size="xs" label="Extra Small (12px)" bind:checked={checkXs} />
						<Checkbox id="check-sm" size="sm" label="Small (14px)" bind:checked={checkSm} />
						<Checkbox id="check-default" label="Default (16px)" bind:checked={checkDefault} />
						<Checkbox id="check-lg" size="lg" label="Large (20px)" bind:checked={checkLg} />
						<Checkbox id="check-xl" size="xl" label="Extra Large (24px)" bind:checked={checkXl} />
					</CheckboxGroup>
				</FormGroup>
			</Column>

			<Column size="100" md="50">
				<FormGroup>
					<FormLabel>Radio Button Sizes</FormLabel>
					<RadioGroup>
						<Radio name="radio-sizes" value="xs" size="xs" bind:group={radioSizes} label="Extra Small (12px)" />
						<Radio name="radio-sizes" value="sm" size="sm" bind:group={radioSizes} label="Small (14px)" />
						<Radio name="radio-sizes" value="default" bind:group={radioSizes} label="Default (16px)" />
						<Radio name="radio-sizes" value="lg" size="lg" bind:group={radioSizes} label="Large (20px)" />
						<Radio name="radio-sizes" value="xl" size="xl" bind:group={radioSizes} label="Extra Large (24px)" />
					</RadioGroup>
				</FormGroup>
			</Column>
		</Grid>
	</form>
</Card>

<!-- Horizontal Form Layout -->
<Card>
	{#snippet header()}
		<h3>Horizontal Form Layout</h3>
		<Paragraph class="pa-text--sm pa-text--secondary m-0">Labels on the left, inputs on the right with varying field widths</Paragraph>
	{/snippet}

	<form class="pa-form">
		<!-- Line 1: First Name, Last Name, Email (equal widths) -->
		<Grid>
			<!-- First Name -->
			<Column size="100" md="1-3">
				<FormGroup horizontal>
					<FormLabel for="h-fname">First Name</FormLabel>
					<Input id="h-fname" placeholder="John" bind:value={hFname} />
				</FormGroup>
			</Column>

			<!-- Last Name -->
			<Column size="100" md="1-3">
				<FormGroup horizontal>
					<FormLabel for="h-lname">Last Name</FormLabel>
					<Input id="h-lname" placeholder="Doe" bind:value={hLname} />
				</FormGroup>
			</Column>

			<!-- Email -->
			<Column size="100" md="1-3">
				<FormGroup horizontal>
					<FormLabel for="h-email">Email</FormLabel>
					<Input type="email" id="h-email" placeholder="john.doe@company.com" bind:value={hEmail} />
				</FormGroup>
			</Column>
		</Grid>

		<!-- Line 2: Phone (smaller), Department (larger), Job Title (medium) -->
		<Grid>
			<!-- Phone -->
			<Column size="100" md="25">
				<FormGroup horizontal>
					<FormLabel for="h-phone">Phone</FormLabel>
					<Input type="tel" id="h-phone" placeholder="+1 555-0123" bind:value={hPhone} />
				</FormGroup>
			</Column>

			<!-- Department -->
			<Column size="100" md="1-3">
				<FormGroup horizontal>
					<FormLabel for="h-dept">Department</FormLabel>
					<Select id="h-dept" bind:value={hDept}>
						<option value="">Select department...</option>
						<option value="engineering">Engineering</option>
						<option value="marketing">Marketing</option>
						<option value="sales">Sales</option>
						<option value="hr">Human Resources</option>
					</Select>
				</FormGroup>
			</Column>

			<!-- Job Title -->
			<Column size="100" md="1-3">
				<FormGroup horizontal>
					<FormLabel for="h-title">Job Title</FormLabel>
					<Input id="h-title" placeholder="Senior Developer" bind:value={hTitle} />
				</FormGroup>
			</Column>
		</Grid>

		<!-- Line 3: Address (larger), City (medium), Zip (small) -->
		<Grid>
			<!-- Address -->
			<Column size="100" md="50">
				<FormGroup horizontal>
					<FormLabel for="h-address">Address</FormLabel>
					<Input id="h-address" placeholder="123 Main Street" bind:value={hAddress} />
				</FormGroup>
			</Column>

			<!-- City -->
			<Column size="100" md="1-3">
				<FormGroup horizontal>
					<FormLabel for="h-city">City</FormLabel>
					<Input id="h-city" placeholder="San Francisco" bind:value={hCity} />
				</FormGroup>
			</Column>

			<!-- Zip Code -->
			<Column size="100" md="15">
				<FormGroup horizontal>
					<FormLabel for="h-zip">Zip</FormLabel>
					<Input id="h-zip" placeholder="94102" bind:value={hZip} />
				</FormGroup>
			</Column>
		</Grid>

		<!-- Submit Buttons -->
		<Grid>
			<Column size="100" class="text-right mt-3">
				<ButtonGroup>
					<Button variant="secondary">Cancel</Button>
					<Button variant="primary">Submit</Button>
				</ButtonGroup>
			</Column>
		</Grid>
	</form>

	{#snippet footer()}
		<Paragraph class="pa-text--sm pa-text--secondary m-0">
			<strong>Layout pattern:</strong> Each field uses <Code>.pa-form-group--horizontal</Code> (label left, input right) inside <Code>pa-col-*</Code> columns.
			Line 1: equal widths (1/3 each).
			Line 2: varying sizes (1/4 + 5/12 + 1/3).
			Line 3: very different sizes (1/2 + 1/3 + 1/6).
		</Paragraph>
	{/snippet}
</Card>
