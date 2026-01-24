<script lang="ts">
	import {
		Card,
		FormGroup,
		FormLabel,
		FormHelp,
		Input,
		NumberInput,
		DateInput,
		Textarea,
		Select,
		Button,
		ButtonGroup,
		Grid,
		Column,
		Heading,
		Paragraph,
		Alert,
		Callout,
		CodeBlock
	} from '@keenmate/svelte-pure-admin';

	// ==========================================
	// Test 1: Basic Email Validation
	// ==========================================
	let test1Email = $state('');
	let test1Errors = $state<string[]>([]);
	let test1Touched = $state(false);
	let test1Saved = $state(false);

	function validateTest1() {
		test1Errors = [];
		if (!test1Email) {
			test1Errors = ['Email is required'];
		} else if (!test1Email.includes('@')) {
			test1Errors = ['Please enter a valid email address'];
		}
		return test1Errors.length === 0;
	}

	function saveTest1() {
		test1Touched = true;
		if (validateTest1()) {
			test1Saved = true;
			setTimeout(() => test1Saved = false, 3000);
		}
	}

	function resetTest1() {
		test1Email = '';
		test1Errors = [];
		test1Touched = false;
		test1Saved = false;
	}

	// ==========================================
	// Test 2: Multiple Fields Validation
	// ==========================================
	let test2Name = $state('');
	let test2NameErrors = $state<string[]>([]);
	let test2NameTouched = $state(false);

	let test2Age = $state<number | null>(null);
	let test2AgeErrors = $state<string[]>([]);
	let test2AgeTouched = $state(false);

	let test2Bio = $state('');
	let test2BioErrors = $state<string[]>([]);
	let test2BioTouched = $state(false);

	let test2Saved = $state(false);

	function validateTest2Name() {
		test2NameErrors = [];
		if (!test2Name) {
			test2NameErrors = ['Name is required'];
		} else if (test2Name.length < 2) {
			test2NameErrors = ['Name must be at least 2 characters'];
		}
		return test2NameErrors.length === 0;
	}

	function validateTest2Age() {
		test2AgeErrors = [];
		if (test2Age === null) {
			test2AgeErrors = ['Age is required'];
		} else if (test2Age < 0) {
			test2AgeErrors = ['Age cannot be negative'];
		} else if (test2Age > 150) {
			test2AgeErrors = ['Please enter a valid age'];
		}
		return test2AgeErrors.length === 0;
	}

	function validateTest2Bio() {
		test2BioErrors = [];
		if (test2Bio && test2Bio.length > 200) {
			test2BioErrors = ['Bio must be 200 characters or less'];
		}
		return test2BioErrors.length === 0;
	}

	function saveTest2() {
		test2NameTouched = true;
		test2AgeTouched = true;
		test2BioTouched = true;
		const valid = validateTest2Name() && validateTest2Age() && validateTest2Bio();
		if (valid) {
			test2Saved = true;
			setTimeout(() => test2Saved = false, 3000);
		}
	}

	function resetTest2() {
		test2Name = '';
		test2NameErrors = [];
		test2NameTouched = false;
		test2Age = null;
		test2AgeErrors = [];
		test2AgeTouched = false;
		test2Bio = '';
		test2BioErrors = [];
		test2BioTouched = false;
		test2Saved = false;
	}

	// ==========================================
	// Test 3: Touched Behavior
	// ==========================================
	let test3Value = $state('');
	let test3Touched = $state(false);
	const test3Errors = ['This error is always present'];

	function resetTest3() {
		test3Value = '';
		test3Touched = false;
	}

	// ==========================================
	// Test 4: Select with Validation
	// ==========================================
	let test4Country = $state('');
	let test4CountryErrors = $state<string[]>([]);
	let test4CountryTouched = $state(false);

	let test4Date = $state('');
	let test4DateErrors = $state<string[]>([]);
	let test4DateTouched = $state(false);

	let test4Saved = $state(false);

	function validateTest4Country() {
		test4CountryErrors = [];
		if (!test4Country) {
			test4CountryErrors = ['Please select a country'];
		}
		return test4CountryErrors.length === 0;
	}

	function validateTest4Date() {
		test4DateErrors = [];
		if (!test4Date) {
			test4DateErrors = ['Date is required'];
		} else {
			const selected = new Date(test4Date);
			const today = new Date();
			if (selected > today) {
				test4DateErrors = ['Date cannot be in the future'];
			}
		}
		return test4DateErrors.length === 0;
	}

	function saveTest4() {
		test4CountryTouched = true;
		test4DateTouched = true;
		if (validateTest4Country() && validateTest4Date()) {
			test4Saved = true;
			setTimeout(() => test4Saved = false, 3000);
		}
	}

	function resetTest4() {
		test4Country = '';
		test4CountryErrors = [];
		test4CountryTouched = false;
		test4Date = '';
		test4DateErrors = [];
		test4DateTouched = false;
		test4Saved = false;
	}

	// ==========================================
	// Test 5: Real-time Validation (validate on input)
	// ==========================================
	let test5Password = $state('');
	let test5PasswordErrors = $state<string[]>([]);
	let test5PasswordTouched = $state(false);

	let test5Confirm = $state('');
	let test5ConfirmErrors = $state<string[]>([]);
	let test5ConfirmTouched = $state(false);

	let test5Saved = $state(false);

	function validateTest5Password() {
		test5PasswordErrors = [];
		if (!test5Password) {
			test5PasswordErrors = ['Password is required'];
		} else if (test5Password.length < 8) {
			test5PasswordErrors = ['Password must be at least 8 characters'];
		} else if (!/[A-Z]/.test(test5Password)) {
			test5PasswordErrors = ['Password must contain an uppercase letter'];
		} else if (!/[0-9]/.test(test5Password)) {
			test5PasswordErrors = ['Password must contain a number'];
		}
		return test5PasswordErrors.length === 0;
	}

	function validateTest5Confirm() {
		test5ConfirmErrors = [];
		if (!test5Confirm) {
			test5ConfirmErrors = ['Please confirm your password'];
		} else if (test5Confirm !== test5Password) {
			test5ConfirmErrors = ['Passwords do not match'];
		}
		return test5ConfirmErrors.length === 0;
	}

	function saveTest5() {
		test5PasswordTouched = true;
		test5ConfirmTouched = true;
		if (validateTest5Password() && validateTest5Confirm()) {
			test5Saved = true;
			setTimeout(() => test5Saved = false, 3000);
		}
	}

	function resetTest5() {
		test5Password = '';
		test5PasswordErrors = [];
		test5PasswordTouched = false;
		test5Confirm = '';
		test5ConfirmErrors = [];
		test5ConfirmTouched = false;
		test5Saved = false;
	}

	// ==========================================
	// Test 6: State Override
	// ==========================================
	let test6Value = $state('has error but shows success');
	let test6ManualState = $state<'success' | 'warning' | 'error' | undefined>('success');

	// Helper
	function firstError(errors: string[]): string | undefined {
		return errors[0];
	}
</script>

<Callout variant="info" class="mb-4">
	This page covers <strong>Svelte-specific integration</strong> patterns for form validation. For CSS patterns and visual styling, see <a href="/validations">Components &rarr; Validation Patterns</a>.
</Callout>

<Paragraph class="mb-4">
	svelte-pure-admin form components support validation through <code>errors</code> and <code>touched</code> props.
	These integrate seamlessly with validation libraries like <strong>Superforms</strong>, <strong>Felte</strong>, or manual validation.
</Paragraph>

<!-- Props Overview -->
<Card title="Validation Props">
	<Heading level={4}>Core Props</Heading>
	<ul class="pa-list-basic">
		<li><code>errors: string[]</code> - Array of error messages. When non-empty and touched=true, the field shows error state.</li>
		<li><code>touched: boolean</code> - Whether the field has been interacted with. Errors only show when touched=true.</li>
		<li><code>state: 'success' | 'warning' | 'error'</code> - Manual state override (takes precedence over errors).</li>
	</ul>

	<Heading level={4} class="mt-4">How It Works</Heading>
	<CodeBlock language="svelte" code={`<!-- Field shows error only when touched AND has errors -->
<Input
  bind:value={email}
  errors={emailErrors}
  touched={emailTouched}
  onblur={() => { emailTouched = true; validate(); }}
/>

<!-- FormHelp shows appropriate variant -->
{#if emailTouched && emailErrors.length > 0}
  <FormHelp variant="error">{emailErrors[0]}</FormHelp>
{:else}
  <FormHelp>Enter your email</FormHelp>
{/if}`} />

	<Heading level={4} class="mt-4">aria-invalid Accessibility</Heading>
	<Paragraph>
		When <code>touched=true</code> and <code>errors</code> is non-empty, the input automatically sets <code>aria-invalid="true"</code> for screen reader support.
	</Paragraph>
</Card>

<!-- Library Integration -->
<Card title="Library Integration Patterns">
	<Heading level={4}>With Superforms</Heading>
	<CodeBlock language="svelte" code={`<script>
  import { superForm } from 'sveltekit-superforms/client';

  const { form, errors, constraints } = superForm(data.form);
</script>

<Input
  bind:value={$form.email}
  errors={$errors.email ?? []}
  touched={true}
  {...$constraints.email}
/>`} />

	<Heading level={4} class="mt-4">With Felte</Heading>
	<CodeBlock language="svelte" code={`<script>
  import { createForm } from 'felte';

  const { form, errors, touched } = createForm({
    onSubmit: (values) => { /* ... */ }
  });
</script>

<form use:form>
  <Input
    name="email"
    errors={$errors.email ?? []}
    touched={$touched.email ?? false}
  />
</form>`} />

	<Heading level={4} class="mt-4">Manual Validation</Heading>
	<CodeBlock language="svelte" code={`<script>
  let email = $state('');
  let errors = $state<string[]>([]);
  let touched = $state(false);

  function validate() {
    errors = [];
    if (!email) errors.push('Email is required');
    else if (!email.includes('@')) errors.push('Invalid email');
  }
</script>

<Input
  bind:value={email}
  {errors}
  {touched}
  onblur={() => { touched = true; validate(); }}
  oninput={() => { if (touched) validate(); }}
/>`} />
</Card>

<Heading level={2} class="mt-5 mb-4">Interactive Tests</Heading>

<Paragraph>Each card below can be tested independently with its own Save button.</Paragraph>

<!-- Test 1: Basic Email -->
<Card title="Test 1: Basic Email Validation">
	{#if test1Saved}
		<Alert variant="success" class="mb-4">Email saved successfully!</Alert>
	{/if}

	<FormGroup>
		<FormLabel>Email Address *</FormLabel>
		<Input
			type="email"
			placeholder="Enter your email"
			bind:value={test1Email}
			errors={test1Errors}
			touched={test1Touched}
			onblur={() => { test1Touched = true; validateTest1(); }}
			oninput={() => { if (test1Touched) validateTest1(); }}
		/>
		{#if test1Touched && test1Errors.length > 0}
			<FormHelp variant="error">{firstError(test1Errors)}</FormHelp>
		{:else}
			<FormHelp>Enter a valid email address</FormHelp>
		{/if}
	</FormGroup>

	<ButtonGroup class="mt-4">
		<Button variant="primary" onclick={saveTest1}>Save</Button>
		<Button variant="secondary" onclick={resetTest1}>Reset</Button>
	</ButtonGroup>

	<div class="mt-3 p-2 bg-light rounded">
		<small><strong>State:</strong> value="{test1Email}", touched={test1Touched}, errors={JSON.stringify(test1Errors)}</small>
	</div>
</Card>

<!-- Test 2: Multiple Fields -->
<Card title="Test 2: Multiple Fields Validation">
	{#if test2Saved}
		<Alert variant="success" class="mb-4">Profile saved successfully!</Alert>
	{/if}

	<Grid>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Name *</FormLabel>
				<Input
					placeholder="Your name"
					bind:value={test2Name}
					errors={test2NameErrors}
					touched={test2NameTouched}
					onblur={() => { test2NameTouched = true; validateTest2Name(); }}
					oninput={() => { if (test2NameTouched) validateTest2Name(); }}
				/>
				{#if test2NameTouched && test2NameErrors.length > 0}
					<FormHelp variant="error">{firstError(test2NameErrors)}</FormHelp>
				{/if}
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Age *</FormLabel>
				<NumberInput
					placeholder="Your age"
					bind:value={test2Age}
					errors={test2AgeErrors}
					touched={test2AgeTouched}
					min={0}
					max={150}
					onblur={() => { test2AgeTouched = true; validateTest2Age(); }}
					oninput={() => { if (test2AgeTouched) validateTest2Age(); }}
				/>
				{#if test2AgeTouched && test2AgeErrors.length > 0}
					<FormHelp variant="error">{firstError(test2AgeErrors)}</FormHelp>
				{/if}
			</FormGroup>
		</Column>
		<Column size="100" md="1-3">
			<FormGroup>
				<FormLabel>Bio (optional, max 200 chars)</FormLabel>
				<Textarea
					placeholder="Tell us about yourself"
					bind:value={test2Bio}
					errors={test2BioErrors}
					touched={test2BioTouched}
					rows={2}
					onblur={() => { test2BioTouched = true; validateTest2Bio(); }}
					oninput={() => { if (test2BioTouched) validateTest2Bio(); }}
				/>
				{#if test2BioTouched && test2BioErrors.length > 0}
					<FormHelp variant="error">{firstError(test2BioErrors)}</FormHelp>
				{:else}
					<FormHelp>{test2Bio.length}/200 characters</FormHelp>
				{/if}
			</FormGroup>
		</Column>
	</Grid>

	<ButtonGroup class="mt-4">
		<Button variant="primary" onclick={saveTest2}>Save Profile</Button>
		<Button variant="secondary" onclick={resetTest2}>Reset</Button>
	</ButtonGroup>

	<div class="mt-3 p-2 bg-light rounded">
		<small><strong>State:</strong> name="{test2Name}" (touched={test2NameTouched}), age={test2Age} (touched={test2AgeTouched}), bio.length={test2Bio.length} (touched={test2BioTouched})</small>
	</div>
</Card>

<!-- Test 3: Touched Behavior -->
<Card title="Test 3: Touched Behavior">
	<Paragraph class="mb-4">
		Both inputs have the same error, but only the touched one shows the error styling.
	</Paragraph>

	<Grid>
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>touched=false (pristine)</FormLabel>
				<Input
					placeholder="Type here, then click elsewhere"
					bind:value={test3Value}
					errors={test3Errors}
					touched={false}
				/>
				<FormHelp>Error exists but not shown (touched=false)</FormHelp>
			</FormGroup>
		</Column>
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>touched=true</FormLabel>
				<Input
					placeholder="Same value as left"
					value={test3Value}
					errors={test3Errors}
					touched={true}
				/>
				<FormHelp variant="error">{test3Errors[0]}</FormHelp>
			</FormGroup>
		</Column>
	</Grid>

	<ButtonGroup class="mt-4">
		<Button variant="primary" onclick={() => test3Touched = true}>Mark as Touched</Button>
		<Button variant="secondary" onclick={resetTest3}>Reset</Button>
	</ButtonGroup>

	<div class="mt-3 p-2 bg-light rounded">
		<small><strong>Note:</strong> Click in left input, type, then blur. Left stays clean, right shows error.</small>
	</div>
</Card>

<!-- Test 4: Select and Date -->
<Card title="Test 4: Select & Date Validation">
	{#if test4Saved}
		<Alert variant="success" class="mb-4">Location data saved!</Alert>
	{/if}

	<Grid>
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>Country *</FormLabel>
				<Select
					bind:value={test4Country}
					errors={test4CountryErrors}
					touched={test4CountryTouched}
					onchange={() => { test4CountryTouched = true; validateTest4Country(); }}
				>
					<option value="">Select a country...</option>
					<option value="us">United States</option>
					<option value="uk">United Kingdom</option>
					<option value="ca">Canada</option>
					<option value="au">Australia</option>
					<option value="de">Germany</option>
				</Select>
				{#if test4CountryTouched && test4CountryErrors.length > 0}
					<FormHelp variant="error">{firstError(test4CountryErrors)}</FormHelp>
				{/if}
			</FormGroup>
		</Column>
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>Birth Date * (not in future)</FormLabel>
				<DateInput
					bind:value={test4Date}
					errors={test4DateErrors}
					touched={test4DateTouched}
					onblur={() => { test4DateTouched = true; validateTest4Date(); }}
					onchange={() => { if (test4DateTouched) validateTest4Date(); }}
				/>
				{#if test4DateTouched && test4DateErrors.length > 0}
					<FormHelp variant="error">{firstError(test4DateErrors)}</FormHelp>
				{/if}
			</FormGroup>
		</Column>
	</Grid>

	<ButtonGroup class="mt-4">
		<Button variant="primary" onclick={saveTest4}>Save Location</Button>
		<Button variant="secondary" onclick={resetTest4}>Reset</Button>
	</ButtonGroup>

	<div class="mt-3 p-2 bg-light rounded">
		<small><strong>State:</strong> country="{test4Country}" (touched={test4CountryTouched}), date="{test4Date}" (touched={test4DateTouched})</small>
	</div>
</Card>

<!-- Test 5: Password with Real-time Validation -->
<Card title="Test 5: Password with Real-time Validation">
	{#if test5Saved}
		<Alert variant="success" class="mb-4">Password set successfully!</Alert>
	{/if}

	<Paragraph class="mb-4">
		Password requires: 8+ characters, uppercase letter, and a number.
	</Paragraph>

	<Grid>
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>Password *</FormLabel>
				<Input
					type="password"
					placeholder="Enter password"
					bind:value={test5Password}
					errors={test5PasswordErrors}
					touched={test5PasswordTouched}
					onblur={() => { test5PasswordTouched = true; validateTest5Password(); }}
					oninput={() => {
						if (test5PasswordTouched) validateTest5Password();
						if (test5ConfirmTouched) validateTest5Confirm();
					}}
				/>
				{#if test5PasswordTouched && test5PasswordErrors.length > 0}
					<FormHelp variant="error">{firstError(test5PasswordErrors)}</FormHelp>
				{:else if test5PasswordTouched && test5PasswordErrors.length === 0 && test5Password}
					<FormHelp variant="success">Password meets requirements</FormHelp>
				{:else}
					<FormHelp>Min 8 chars, 1 uppercase, 1 number</FormHelp>
				{/if}
			</FormGroup>
		</Column>
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>Confirm Password *</FormLabel>
				<Input
					type="password"
					placeholder="Confirm password"
					bind:value={test5Confirm}
					errors={test5ConfirmErrors}
					touched={test5ConfirmTouched}
					onblur={() => { test5ConfirmTouched = true; validateTest5Confirm(); }}
					oninput={() => { if (test5ConfirmTouched) validateTest5Confirm(); }}
				/>
				{#if test5ConfirmTouched && test5ConfirmErrors.length > 0}
					<FormHelp variant="error">{firstError(test5ConfirmErrors)}</FormHelp>
				{:else if test5ConfirmTouched && test5ConfirmErrors.length === 0 && test5Confirm}
					<FormHelp variant="success">Passwords match!</FormHelp>
				{/if}
			</FormGroup>
		</Column>
	</Grid>

	<ButtonGroup class="mt-4">
		<Button variant="primary" onclick={saveTest5}>Set Password</Button>
		<Button variant="secondary" onclick={resetTest5}>Reset</Button>
	</ButtonGroup>

	<div class="mt-3 p-2 bg-light rounded">
		<small><strong>State:</strong> password.length={test5Password.length}, confirm.length={test5Confirm.length}, match={test5Password === test5Confirm}</small>
	</div>
</Card>

<!-- Test 6: State Override -->
<Card title="Test 6: Manual State Override">
	<Paragraph class="mb-4">
		The <code>state</code> prop takes precedence over auto-derived state from <code>errors</code>.
	</Paragraph>

	<Grid>
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>Input with errors + manual state</FormLabel>
				<Input
					bind:value={test6Value}
					errors={['This error is ignored visually']}
					state={test6ManualState}
				/>
				<FormHelp variant={test6ManualState}>
					errors=['...'] but state="{test6ManualState}" overrides
				</FormHelp>
			</FormGroup>
		</Column>
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>Change manual state:</FormLabel>
				<Select bind:value={test6ManualState}>
					<option value={undefined}>undefined (use errors)</option>
					<option value="success">success</option>
					<option value="warning">warning</option>
					<option value="error">error</option>
				</Select>
			</FormGroup>
		</Column>
	</Grid>

	<div class="mt-3 p-2 bg-light rounded">
		<small><strong>Note:</strong> When state is undefined, the input would show error styling from errors prop.</small>
	</div>
</Card>

<!-- Aria-Invalid Check -->
<Card title="Test 7: Accessibility (aria-invalid)">
	<Paragraph class="mb-4">
		Open browser DevTools and inspect these inputs to verify <code>aria-invalid</code> attribute.
	</Paragraph>

	<Grid>
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>Has errors + touched</FormLabel>
				<Input
					placeholder="Inspect me - has aria-invalid=true"
					errors={['Error!']}
					touched={true}
				/>
				<FormHelp variant="error">Should have aria-invalid="true"</FormHelp>
			</FormGroup>
		</Column>
		<Column size="100" md="50">
			<FormGroup>
				<FormLabel>No errors</FormLabel>
				<Input
					placeholder="Inspect me - no aria-invalid"
				/>
				<FormHelp>Should NOT have aria-invalid attribute</FormHelp>
			</FormGroup>
		</Column>
	</Grid>
</Card>
