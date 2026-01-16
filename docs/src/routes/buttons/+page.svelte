<script lang="ts">
	import { Heading, Paragraph, Button, ButtonGroup, Card, Grid, Column, BasicList } from '@keenmate/svelte-pure-admin';
	import { onMount } from 'svelte';
		
	onMount(() => {
		function addRippleEffect(button: HTMLElement) {
			button.addEventListener('click', function (e) {
				// Add ripple active class
				this.classList.add('pa-btn--ripple-active');

				// Remove the class after animation completes
				setTimeout(() => {
					this.classList.remove('pa-btn--ripple-active');
				}, 600);
			});
		}

		function addLoadingDemo(button: HTMLButtonElement) {
			const originalHTML = button.innerHTML;
			const originalWidth = button.offsetWidth;
			const originalHeight = button.offsetHeight;

			button.addEventListener('click', function () {
				if (this.classList.contains('pa-btn--loading')) return;

				// Lock dimensions to prevent layout shift
				this.style.width = originalWidth + 'px';
				this.style.minHeight = originalHeight + 'px';

				// Replace content with spinner
				this.innerHTML = `<span class="pa-btn__spinner"></span>`;
				this.classList.add('pa-btn--loading');
				this.disabled = true;

				// Simulate async operation (1-3 seconds)
				const loadingTime = Math.random() * 2000 + 1000;

				setTimeout(() => {
					this.classList.remove('pa-btn--loading');
					this.innerHTML = originalHTML;
					this.disabled = false;
					this.style.removeProperty('width');
					this.style.removeProperty('min-height');
				}, loadingTime);
			});
		}

		// Initialize ripple effects
		document.querySelectorAll('[data-ripple]').forEach((btn) => addRippleEffect(btn as HTMLElement));

		// Initialize loading demos
		document.querySelectorAll('[data-loading-demo]').forEach((btn) => addLoadingDemo(btn as HTMLButtonElement));
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
	/>
</svelte:head>

<!-- Button Variants and Sizes Grid -->
<Grid>
	<!-- Basic Buttons -->
	<Column size="100" lg="1-2">
		<Card title="Button Variants">
			<ButtonGroup>
				<Button variant="primary">Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="success">Success</Button>
				<Button variant="warning">Warning</Button>
				<Button variant="danger">Danger</Button>
				<Button variant="info">Info</Button>
				<Button variant="light">Light</Button>
				<Button variant="dark">Dark</Button>
			</ButtonGroup>
		</Card>
	</Column>

	<!-- Button Sizes -->
	<Column size="100" lg="1-2">
		<Card title="Button Sizes">
			<ButtonGroup>
				<Button variant="primary" size="xs">Extra Small</Button>
				<Button variant="primary" size="sm">Small</Button>
				<Button variant="primary">Default</Button>
				<Button variant="primary" size="lg">Large</Button>
				<Button variant="primary" size="xl">Extra Large</Button>
			</ButtonGroup>
		</Card>
	</Column>
</Grid>

<!-- Outline and States Grid -->
<Grid>
	<!-- Outline Buttons -->
	<Column size="100" lg="1-2">
		<Card title="Outline Buttons">
			<ButtonGroup>
				<Button variant="primary" outline>Primary</Button>
				<Button variant="secondary" outline>Secondary</Button>
				<Button variant="success" outline>Success</Button>
				<Button variant="warning" outline>Warning</Button>
				<Button variant="danger" outline>Danger</Button>
				<Button variant="info" outline>Info</Button>
			</ButtonGroup>
		</Card>
	</Column>

	<!-- Button States -->
	<Column size="100" lg="1-2">
		<Card title="Button States">
			<ButtonGroup>
				<Button variant="primary">Normal</Button>
				<Button variant="primary" disabled>Disabled</Button>
				<Button variant="primary" loading>Loading...</Button>
			</ButtonGroup>
		</Card>
	</Column>
</Grid>

<!-- Block Buttons -->
<Card title="Block Buttons">
	<ButtonGroup vertical>
		<Button variant="primary" block>Block Level Button</Button>
		<Button variant="secondary" block>Another Block Button</Button>
	</ButtonGroup>
</Card>

<!-- Button Groups -->
<Grid>
	<!-- Basic Button Groups -->
	<Column size="100" lg="1-2">
		<Card title="Button Groups - Basic">
			<Heading level={4}>Horizontal (default)</Heading>
			<ButtonGroup>
				<Button variant="secondary">Left</Button>
				<Button variant="secondary">Middle</Button>
				<Button variant="secondary">Right</Button>
			</ButtonGroup>

			<Heading level={4} class="mt-2">Vertical</Heading>
			<ButtonGroup vertical>
				<Button variant="secondary">Top</Button>
				<Button variant="secondary">Middle</Button>
				<Button variant="secondary">Bottom</Button>
			</ButtonGroup>

			<Heading level={4} class="mt-2">No-Wrap (prevents line breaks)</Heading>
			<ButtonGroup nowrap>
				<Button variant="primary">One</Button>
				<Button variant="primary">Two</Button>
				<Button variant="primary">Three</Button>
				<Button variant="primary">Four</Button>
				<Button variant="primary">Five</Button>
			</ButtonGroup>
		</Card>
	</Column>

	<!-- Gap Variants -->
	<Column size="100" lg="1-2">
		<Card title="Button Groups - Gap Sizes">
			<Heading level={4}>Compact Gap (2px) - <code>gap-2</code></Heading>
			<ButtonGroup class="gap-2">
				<Button variant="primary">A</Button>
				<Button variant="primary">B</Button>
				<Button variant="primary">C</Button>
				<Button variant="primary">D</Button>
			</ButtonGroup>

			<Heading level={4} class="mt-2">Default Gap (3px)</Heading>
			<ButtonGroup>
				<Button variant="primary">A</Button>
				<Button variant="primary">B</Button>
				<Button variant="primary">C</Button>
				<Button variant="primary">D</Button>
			</ButtonGroup>

			<Heading level={4} class="mt-2">Loose Gap (8px) - <code>gap-8</code></Heading>
			<ButtonGroup class="gap-8">
				<Button variant="primary">A</Button>
				<Button variant="primary">B</Button>
				<Button variant="primary">C</Button>
				<Button variant="primary">D</Button>
			</ButtonGroup>
		</Card>
	</Column>
</Grid>

<!-- Vertical Alignment & Responsive -->
<Grid>
	<!-- Vertical Alignment -->
	<Column size="100" lg="1-2">
		<Card title="Vertical Alignment">
			<Grid>
				<Column size="25">
					<Heading level={4}>Left (default)</Heading>
					<ButtonGroup vertical>
						<Button variant="secondary">Short</Button>
						<Button variant="secondary">Medium Btn</Button>
						<Button variant="secondary">Long Button</Button>
					</ButtonGroup>
				</Column>
				<Column size="25">
					<Heading level={4}>Center</Heading>
					<ButtonGroup vertical align="center">
						<Button variant="secondary">Short</Button>
						<Button variant="secondary">Medium Btn</Button>
						<Button variant="secondary">Long Button</Button>
					</ButtonGroup>
				</Column>
				<Column size="25">
					<Heading level={4}>End</Heading>
					<ButtonGroup vertical align="end">
						<Button variant="secondary">Short</Button>
						<Button variant="secondary">Medium Btn</Button>
						<Button variant="secondary">Long Button</Button>
					</ButtonGroup>
				</Column>
				<Column size="25">
					<Heading level={4}>Stretch</Heading>
					<ButtonGroup vertical align="stretch">
						<Button variant="primary">Save</Button>
						<Button variant="secondary">Cancel</Button>
						<Button variant="danger">Delete</Button>
					</ButtonGroup>
				</Column>
			</Grid>
		</Card>
	</Column>

	<!-- Responsive Direction -->
	<Column size="100" lg="1-2">
		<Card title="Responsive Direction">
			<Heading level={4}>Horizontal → Vertical at md (768px)</Heading>
			<Paragraph class="text-muted mb-1">Resize window to see change</Paragraph>
			<ButtonGroup mdVertical>
				<Button variant="primary">Save</Button>
				<Button variant="secondary">Cancel</Button>
				<Button variant="danger">Delete</Button>
			</ButtonGroup>

			<Heading level={4} class="mt-2">Vertical → Horizontal at lg (992px)</Heading>
			<Paragraph class="text-muted mb-1">Starts vertical, becomes horizontal on large screens</Paragraph>
			<ButtonGroup vertical lgHorizontal>
				<Button variant="success">Approve</Button>
				<Button variant="warning">Review</Button>
				<Button variant="danger">Reject</Button>
			</ButtonGroup>

			<Heading level={4} class="mt-2">Class Reference</Heading>
			<BasicList class="text-sm">
				<li><code>--sm-vertical</code> / <code>--sm-horizontal</code> at 576px</li>
				<li><code>--md-vertical</code> / <code>--md-horizontal</code> at 768px</li>
				<li><code>--lg-vertical</code> / <code>--lg-horizontal</code> at 992px</li>
				<li><code>--xl-vertical</code> / <code>--xl-horizontal</code> at 1200px</li>
			</BasicList>
		</Card>
	</Column>
</Grid>

<!-- Icon Buttons Grid -->
<Grid>
	<!-- Button with Icons -->
	<Column size="100" lg="1-2">
		<Card title="Buttons with Text Icons">
			<Paragraph class="mb-1">
				Buttons with icons are automatically left-aligned with fixed-width icon container:
			</Paragraph>
			<ButtonGroup>
				<Button variant="primary">
					{#snippet icon()}→{/snippet}
					Next
				</Button>
				<Button variant="secondary">
					{#snippet icon()}←{/snippet}
					Previous
				</Button>
				<Button variant="success">
					{#snippet icon()}✓{/snippet}
					Save
				</Button>
				<Button variant="danger">
					{#snippet icon()}×{/snippet}
					Delete
				</Button>
			</ButtonGroup>
		</Card>
	</Column>

	<!-- Icon Only Buttons -->
	<Column size="100" lg="1-2">
		<Card title="Icon Only Buttons">
			<Paragraph class="mb-2">Icon-only button sizes (XS → XL):</Paragraph>
			<Grid class="mb-2">
				<Column size="100">
					<ButtonGroup>
						<button
							class="pa-btn pa-btn--primary pa-btn--icon-only pa-btn--xs"
							title="XS - 28px"><i class="fa-solid fa-star"></i></button
						>
						<button
							class="pa-btn pa-btn--primary pa-btn--icon-only pa-btn--sm"
							title="SM - 32px"><i class="fa-solid fa-star"></i></button
						>
						<button class="pa-btn pa-btn--primary pa-btn--icon-only" title="Default - 40px"
							><i class="fa-solid fa-star"></i></button
						>
						<button
							class="pa-btn pa-btn--primary pa-btn--icon-only pa-btn--lg"
							title="LG - 48px"><i class="fa-solid fa-star"></i></button
						>
						<button
							class="pa-btn pa-btn--primary pa-btn--icon-only pa-btn--xl"
							title="XL - 56px"><i class="fa-solid fa-star"></i></button
						>
					</ButtonGroup>
				</Column>
			</Grid>
			<Paragraph class="mb-2">Various colors - default size:</Paragraph>
			<Grid class="mb-2">
				<Column size="100">
					<ButtonGroup>
						<button class="pa-btn pa-btn--primary pa-btn--icon-only" title="Save"
							><i class="fa-solid fa-floppy-disk"></i></button
						>
						<button class="pa-btn pa-btn--secondary pa-btn--icon-only" title="Search"
							><i class="fa-solid fa-magnifying-glass"></i></button
						>
						<button class="pa-btn pa-btn--success pa-btn--icon-only" title="Check"
							><i class="fa-solid fa-check"></i></button
						>
						<button class="pa-btn pa-btn--warning pa-btn--icon-only" title="Warning"
							><i class="fa-solid fa-triangle-exclamation"></i></button
						>
						<button class="pa-btn pa-btn--danger pa-btn--icon-only" title="Trash"
							><i class="fa-solid fa-trash"></i></button
						>
						<button class="pa-btn pa-btn--info pa-btn--icon-only" title="Info"
							><i class="fa-solid fa-circle-info"></i></button
						>
					</ButtonGroup>
				</Column>
			</Grid>
			<Paragraph class="mb-2">Compact (XS) - perfect for table actions:</Paragraph>
			<Grid class="mb-2">
				<Column size="100">
					<ButtonGroup>
						<button class="pa-btn pa-btn--primary pa-btn--icon-only pa-btn--xs" title="View"
							>👁️</button
						>
						<button class="pa-btn pa-btn--secondary pa-btn--icon-only pa-btn--xs" title="Edit"
							>✏️</button
						>
						<button class="pa-btn pa-btn--danger pa-btn--icon-only pa-btn--xs" title="Delete"
							>🗑️</button
						>
						<button class="pa-btn pa-btn--success pa-btn--icon-only pa-btn--xs" title="Check"
							><i class="fa-solid fa-check"></i></button
						>
						<button class="pa-btn pa-btn--warning pa-btn--icon-only pa-btn--xs" title="Warning"
							><i class="fa-solid fa-triangle-exclamation"></i></button
						>
						<button class="pa-btn pa-btn--info pa-btn--icon-only pa-btn--xs" title="Download"
							><i class="fa-solid fa-download"></i></button
						>
					</ButtonGroup>
				</Column>
			</Grid>
			<Paragraph class="mb-2">With ripple and loading states (click to test):</Paragraph>
			<Grid>
				<Column size="100">
					<ButtonGroup>
						<button
							class="pa-btn pa-btn--primary pa-btn--icon-only"
							title="Save"
							data-ripple
							data-loading-demo><i class="fa-solid fa-floppy-disk"></i></button
						>
						<button
							class="pa-btn pa-btn--secondary pa-btn--icon-only"
							title="Refresh"
							data-ripple
							data-loading-demo><i class="fa-solid fa-rotate-right"></i></button
						>
						<button
							class="pa-btn pa-btn--success pa-btn--icon-only"
							title="Upload"
							data-ripple
							data-loading-demo><i class="fa-solid fa-upload"></i></button
						>
						<button
							class="pa-btn pa-btn--danger pa-btn--icon-only"
							title="Delete"
							data-ripple
							data-loading-demo><i class="fa-solid fa-trash"></i></button
						>
					</ButtonGroup>
				</Column>
			</Grid>
		</Card>
	</Column>
</Grid>

<!-- Fixed Width Buttons -->
<Card title="Fixed Width Buttons">
	<Paragraph class="mb-1">
		Use fixed-width classes for consistent button sizing regardless of text length:
	</Paragraph>
	<ButtonGroup vertical>
		<Button variant="primary" width="6x">
			{#snippet icon()}✓{/snippet}
			OK
		</Button>
		<Button variant="success" width="6x">
			{#snippet icon()}→{/snippet}
			Save
		</Button>
		<Button variant="secondary" width="6x">
			{#snippet icon()}×{/snippet}
			Cancel
		</Button>
	</ButtonGroup>

	<Heading level={4} class="mt-6">Different Width Multipliers (1x = 1rem)</Heading>
	<ButtonGroup vertical>
		<Button variant="primary" width="3x">
			{#snippet icon()}📄{/snippet}
			3x (3rem)
		</Button>
		<Button variant="primary" width="5x">
			{#snippet icon()}📄{/snippet}
			5x (5rem)
		</Button>
		<Button variant="primary" width="7x">
			{#snippet icon()}📄{/snippet}
			7x (7rem)
		</Button>
		<Button variant="primary" width="9x">
			{#snippet icon()}📄{/snippet}
			9x (9rem)
		</Button>
		<Button variant="primary" width="10x">
			{#snippet icon()}📄{/snippet}
			10x (10rem)
		</Button>
	</ButtonGroup>
</Card>

<!-- Button Text Alignment (Two Column Layout) -->
<Grid>
	<!-- Left Column: Text Icons -->
	<Column size="100" lg="1-2">
		<Card title="Button Text Alignment">
			<Paragraph class="mb-1">Control text alignment within fixed-width buttons:</Paragraph>

			<Heading level={4}>Left Aligned (icon has no left padding)</Heading>
			<ButtonGroup vertical>
				<Button variant="primary" width="8x" align="left">
					{#snippet icon()}✓{/snippet}
					Save
				</Button>
				<Button variant="success" width="8x" align="left">
					{#snippet icon()}→{/snippet}
					Continue
				</Button>
				<Button variant="secondary" width="8x" align="left">
					{#snippet icon()}×{/snippet}
					Cancel
				</Button>
			</ButtonGroup>

			<Heading level={4} class="mt-6">Right Aligned (icon has no right padding)</Heading>
			<ButtonGroup vertical>
				<Button variant="primary" width="8x" align="right">
					Save
					{#snippet icon()}✓{/snippet}
				</Button>
				<Button variant="success" width="8x" align="right">
					Continue
					{#snippet icon()}→{/snippet}
				</Button>
				<Button variant="secondary" width="8x" align="right">
					Cancel
					{#snippet icon()}×{/snippet}
				</Button>
			</ButtonGroup>

			<Heading level={4} class="mt-6">Center Aligned</Heading>
			<ButtonGroup vertical>
				<Button variant="primary" width="8x" align="center">
					{#snippet icon()}✓{/snippet}
					Save
				</Button>
				<Button variant="success" width="8x" align="center">Continue</Button>
				<Button variant="secondary" width="8x" align="center">Cancel</Button>
			</ButtonGroup>

			<Heading level={4} class="mt-6">Justified</Heading>
			<ButtonGroup vertical>
				<Button variant="primary" width="8x" align="justify">
					{#snippet icon()}✓{/snippet}
					Save
				</Button>
				<Button variant="success" width="8x" align="justify">
					{#snippet icon()}→{/snippet}
					Continue
				</Button>
				<Button variant="secondary" width="8x" align="justify">
					{#snippet icon()}×{/snippet}
					Cancel
				</Button>
			</ButtonGroup>
		</Card>
	</Column>

	<!-- Right Column: Font Awesome Icons -->
	<Column size="100" lg="1-2">
		<Card title="Font Awesome Icons">
			<Paragraph class="mb-1">Demonstrating Font Awesome icons with alignments:</Paragraph>

			<Heading level={4}>Left Aligned</Heading>
			<ButtonGroup vertical>
				<Button variant="primary" width="10x" align="left">
					{#snippet icon()}<i class="fa-solid fa-floppy-disk"></i>{/snippet}
					Save Changes
				</Button>
				<Button variant="success" width="10x" align="left">
					{#snippet icon()}<i class="fa-solid fa-check"></i>{/snippet}
					Approve
				</Button>
				<Button variant="danger" width="10x" align="left">
					{#snippet icon()}<i class="fa-solid fa-trash"></i>{/snippet}
					Delete
				</Button>
			</ButtonGroup>

			<Heading level={4} class="mt-6">Right Aligned</Heading>
			<ButtonGroup vertical>
				<Button variant="primary" width="10x" align="right">
					Save Changes
					{#snippet icon()}<i class="fa-solid fa-floppy-disk"></i>{/snippet}
				</Button>
				<Button variant="success" width="10x" align="right">
					Continue
					{#snippet icon()}<i class="fa-solid fa-arrow-right"></i>{/snippet}
				</Button>
				<Button variant="secondary" width="10x" align="right">
					Settings
					{#snippet icon()}<i class="fa-solid fa-gear"></i>{/snippet}
				</Button>
			</ButtonGroup>

			<Heading level={4} class="mt-6">Center Aligned</Heading>
			<ButtonGroup vertical>
				<Button variant="primary" width="10x" align="center">
					{#snippet icon()}<i class="fa-solid fa-upload"></i>{/snippet}
					Upload File
				</Button>
				<Button variant="success" width="10x" align="center">
					{#snippet icon()}<i class="fa-solid fa-plus"></i>{/snippet}
					Add New
				</Button>
				<Button variant="info" width="10x" align="center">
					{#snippet icon()}<i class="fa-solid fa-magnifying-glass"></i>{/snippet}
					Search
				</Button>
			</ButtonGroup>

			<Heading level={4} class="mt-6">Justified</Heading>
			<ButtonGroup vertical>
				<Button variant="primary" width="10x" align="justify">
					{#snippet icon()}<i class="fa-solid fa-user"></i>{/snippet}
					Profile
				</Button>
				<Button variant="success" width="10x" align="justify">
					{#snippet icon()}<i class="fa-solid fa-envelope"></i>{/snippet}
					Messages
				</Button>
				<Button variant="danger" width="10x" align="justify">
					{#snippet icon()}<i class="fa-solid fa-right-from-bracket"></i>{/snippet}
					Logout
				</Button>
			</ButtonGroup>
		</Card>
	</Column>
</Grid>

<!-- Interactive Effects Grid -->
<Grid>
	<!-- Ripple Effect Buttons -->
	<Column size="100" lg="1-2">
		<Card title="Ripple Effect Buttons">
			<Paragraph class="mb-1">Click buttons to see ripple animation effect:</Paragraph>
			<ButtonGroup>
				<Button variant="primary" ripple>Primary Ripple</Button>
				<Button variant="secondary" ripple>Secondary Ripple</Button>
				<Button variant="success" ripple>Success Ripple</Button>
				<Button variant="warning" ripple>Warning Ripple</Button>
				<Button variant="danger" ripple>Danger Ripple</Button>
			</ButtonGroup>
		</Card>
	</Column>

	<!-- Loading State Buttons -->
	<Column size="100" lg="1-2">
		<Card title="Loading State Buttons">
			<Paragraph class="mb-1">Click buttons to simulate loading states:</Paragraph>
			<ButtonGroup>
				<button class="pa-btn pa-btn--primary pa-btn--ripple" data-loading-demo data-ripple>
					Save Changes
				</button>
				<button class="pa-btn pa-btn--secondary pa-btn--ripple" data-loading-demo data-ripple>
					Load Data
				</button>
				<button class="pa-btn pa-btn--success pa-btn--ripple" data-loading-demo data-ripple>
					Submit Form
				</button>
				<button class="pa-btn pa-btn--warning pa-btn--ripple" data-loading-demo data-ripple>
					Process
				</button>
				<button class="pa-btn pa-btn--danger pa-btn--ripple" data-loading-demo data-ripple>
					Delete Item
				</button>
			</ButtonGroup>
		</Card>
	</Column>
</Grid>

<!-- Usage Examples -->
<Card title="Usage Guide">
	<Heading level={4}>Ripple Effect</Heading>
	<Paragraph>
		Add <code>pa-btn--ripple</code> class and <code>data-ripple</code> attribute to any button for
		click animation feedback.
	</Paragraph>

	<Heading level={4}>Loading States</Heading>
	<Paragraph>
		Use <code>pa-btn--loading</code> class to show spinner. JavaScript can toggle this class during
		async operations.
	</Paragraph>

	<Heading level={4}>Best Practices</Heading>
	<BasicList>
		<li>
			<strong>Fast Sites:</strong> Always show loading feedback, even for quick operations (200-500ms
			minimum)
		</li>
		<li><strong>User Confidence:</strong> Ripple effects confirm button clicks were registered</li>
		<li>
			<strong>Prevent Double-clicks:</strong> Disable buttons during loading to prevent duplicate submissions
		</li>
		<li><strong>Accessibility:</strong> Loading states are announced to screen readers</li>
	</BasicList>
</Card>
