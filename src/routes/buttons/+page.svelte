<script lang="ts">
	import { Button, ButtonGroup, Card, Grid, Column } from '$lib';
	import { onMount } from 'svelte';
	import Heading from '$lib/typography/Heading.svelte';
	import Paragraph from '$lib/typography/Paragraph.svelte';

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
	<title>Buttons - Pure Admin Svelte</title>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
	/>
</svelte:head>

<Heading level={1}>Buttons</Heading>
<Paragraph>Various button styles and sizes for actions and navigation.</Paragraph>

<!-- Button Variants and Sizes Grid -->
<Grid>
	<!-- Basic Buttons -->
	<Column size="1" lg="1-2">
		<Card>
			{#snippet header()}
				<Heading level={3}>Button Variants</Heading>
			{/snippet}

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
	<Column size="1" lg="1-2">
		<Card>
			{#snippet header()}
				<Heading level={3}>Button Sizes</Heading>
			{/snippet}

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
	<Column size="1" lg="1-2">
		<Card>
			{#snippet header()}
				<Heading level={3}>Outline Buttons</Heading>
			{/snippet}

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
	<Column size="1" lg="1-2">
		<Card>
			{#snippet header()}
				<Heading level={3}>Button States</Heading>
			{/snippet}

			<ButtonGroup>
				<Button variant="primary">Normal</Button>
				<Button variant="primary" disabled>Disabled</Button>
				<button class="pa-btn pa-btn--primary pa-btn--loading">
					<span class="pa-btn__spinner"></span>
					Loading...
				</button>
			</ButtonGroup>
		</Card>
	</Column>
</Grid>

<!-- Block Buttons -->
<Card>
	{#snippet header()}
		<Heading level={3}>Block Buttons</Heading>
	{/snippet}

	<div class="pa-btn-group pa-btn-group--vertical">
		<Button variant="primary" block>Block Level Button</Button>
		<Button variant="secondary" block>Another Block Button</Button>
	</div>
</Card>

<!-- Button Groups -->
<Card>
	{#snippet header()}
		<Heading level={3}>Button Groups</Heading>
	{/snippet}

	<Heading level={4}>Horizontal Button Group</Heading>
	<ButtonGroup>
		<Button variant="secondary">Left</Button>
		<Button variant="secondary">Middle</Button>
		<Button variant="secondary">Right</Button>
	</ButtonGroup>

	<Heading level={4}>Vertical Button Group</Heading>
	<div class="pa-btn-group pa-btn-group--vertical">
		<Button variant="secondary">Top</Button>
		<Button variant="secondary">Middle</Button>
		<Button variant="secondary">Bottom</Button>
	</div>
</Card>

<!-- Icon Buttons Grid -->
<Grid>
	<!-- Button with Icons -->
	<Column size="1" lg="1-2">
		<Card>
			{#snippet header()}
				<Heading level={3}>Buttons with Text Icons</Heading>
			{/snippet}

			<Paragraph class="mb-1">
				Buttons with icons are automatically left-aligned with fixed-width icon container:
			</Paragraph>
			<ButtonGroup>
				<button class="pa-btn pa-btn--primary">
					<span class="pa-btn__icon">→</span>
					Next
				</button>
				<button class="pa-btn pa-btn--secondary">
					<span class="pa-btn__icon">←</span>
					Previous
				</button>
				<button class="pa-btn pa-btn--success">
					<span class="pa-btn__icon">✓</span>
					Save
				</button>
				<button class="pa-btn pa-btn--danger">
					<span class="pa-btn__icon">×</span>
					Delete
				</button>
			</ButtonGroup>
		</Card>
	</Column>

	<!-- Icon Only Buttons -->
	<Column size="1" lg="1-2">
		<Card>
			{#snippet header()}
				<Heading level={3}>Icon Only Buttons</Heading>
			{/snippet}

			<Paragraph class="mb-2">Icon-only button sizes (XS → XL):</Paragraph>
			<Grid class="mb-2">
				<Column size="1">
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
				<Column size="1">
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
				<Column size="1">
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
				<Column size="1">
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
<Card>
	{#snippet header()}
		<Heading level={3}>Fixed Width Buttons</Heading>
	{/snippet}

	<Paragraph class="mb-1">
		Use fixed-width classes for consistent button sizing regardless of text length:
	</Paragraph>
	<div class="pa-btn-group pa-btn-group--vertical">
		<button class="pa-btn pa-btn--primary pa-btn--w-6x">
			<span class="pa-btn__icon">✓</span>
			OK
		</button>
		<button class="pa-btn pa-btn--success pa-btn--w-6x">
			<span class="pa-btn__icon">→</span>
			Save
		</button>
		<button class="pa-btn pa-btn--secondary pa-btn--w-6x">
			<span class="pa-btn__icon">×</span>
			Cancel
		</button>
	</div>

	<Heading level={4} style="margin-top: 1.5rem;">Different Width Multipliers (1x = 1rem)</Heading>
	<div class="pa-btn-group pa-btn-group--vertical">
		<button class="pa-btn pa-btn--primary pa-btn--w-3x">
			<span class="pa-btn__icon">📄</span>
			3x (3rem)
		</button>
		<button class="pa-btn pa-btn--primary pa-btn--w-5x">
			<span class="pa-btn__icon">📄</span>
			5x (5rem)
		</button>
		<button class="pa-btn pa-btn--primary pa-btn--w-7x">
			<span class="pa-btn__icon">📄</span>
			7x (7rem)
		</button>
		<button class="pa-btn pa-btn--primary pa-btn--w-9x">
			<span class="pa-btn__icon">📄</span>
			9x (9rem)
		</button>
		<button class="pa-btn pa-btn--primary pa-btn--w-10x">
			<span class="pa-btn__icon">📄</span>
			10x (10rem)
		</button>
	</div>
</Card>

<!-- Button Text Alignment (Two Column Layout) -->
<Grid>
	<!-- Left Column: Text Icons -->
	<Column size="1" lg="1-2">
		<Card>
			{#snippet header()}
				<Heading level={3}>Button Text Alignment</Heading>
			{/snippet}

			<Paragraph class="mb-1">Control text alignment within fixed-width buttons:</Paragraph>

			<Heading level={4}>Left Aligned (icon has no left padding)</Heading>
			<div class="pa-btn-group pa-btn-group--vertical">
				<button class="pa-btn pa-btn--primary pa-btn--w-8x pa-btn--align-left">
					<span class="pa-btn__icon">✓</span>
					Save
				</button>
				<button class="pa-btn pa-btn--success pa-btn--w-8x pa-btn--align-left">
					<span class="pa-btn__icon">→</span>
					Continue
				</button>
				<button class="pa-btn pa-btn--secondary pa-btn--w-8x pa-btn--align-left">
					<span class="pa-btn__icon">×</span>
					Cancel
				</button>
			</div>

			<Heading level={4} style="margin-top: 1.5rem;">Right Aligned (icon has no right padding)</Heading>
			<div class="pa-btn-group pa-btn-group--vertical">
				<button class="pa-btn pa-btn--primary pa-btn--w-8x pa-btn--align-right">
					Save
					<span class="pa-btn__icon">✓</span>
				</button>
				<button class="pa-btn pa-btn--success pa-btn--w-8x pa-btn--align-right">
					Continue
					<span class="pa-btn__icon">→</span>
				</button>
				<button class="pa-btn pa-btn--secondary pa-btn--w-8x pa-btn--align-right">
					Cancel
					<span class="pa-btn__icon">×</span>
				</button>
			</div>

			<Heading level={4} style="margin-top: 1.5rem;">Center Aligned</Heading>
			<div class="pa-btn-group pa-btn-group--vertical">
				<button class="pa-btn pa-btn--primary pa-btn--w-8x pa-btn--align-center">
					<span class="pa-btn__icon">✓</span>
					Save
				</button>
				<button class="pa-btn pa-btn--success pa-btn--w-8x pa-btn--align-center"> Continue </button>
				<button class="pa-btn pa-btn--secondary pa-btn--w-8x pa-btn--align-center"> Cancel </button>
			</div>

			<Heading level={4} style="margin-top: 1.5rem;">Justified</Heading>
			<div class="pa-btn-group pa-btn-group--vertical">
				<button class="pa-btn pa-btn--primary pa-btn--w-8x pa-btn--align-justify">
					<span class="pa-btn__icon">✓</span>
					Save
				</button>
				<button class="pa-btn pa-btn--success pa-btn--w-8x pa-btn--align-justify">
					<span class="pa-btn__icon">→</span>
					Continue
				</button>
				<button class="pa-btn pa-btn--secondary pa-btn--w-8x pa-btn--align-justify">
					<span class="pa-btn__icon">×</span>
					Cancel
				</button>
			</div>
		</Card>
	</Column>

	<!-- Right Column: Font Awesome Icons -->
	<Column size="1" lg="1-2">
		<Card>
			{#snippet header()}
				<Heading level={3}>Font Awesome Icons</Heading>
			{/snippet}

			<Paragraph class="mb-1">Demonstrating Font Awesome icons with alignments:</Paragraph>

			<Heading level={4}>Left Aligned</Heading>
			<div class="pa-btn-group pa-btn-group--vertical">
				<button class="pa-btn pa-btn--primary pa-btn--w-10x pa-btn--align-left">
					<span class="pa-btn__icon"><i class="fa-solid fa-floppy-disk"></i></span>
					Save Changes
				</button>
				<button class="pa-btn pa-btn--success pa-btn--w-10x pa-btn--align-left">
					<span class="pa-btn__icon"><i class="fa-solid fa-check"></i></span>
					Approve
				</button>
				<button class="pa-btn pa-btn--danger pa-btn--w-10x pa-btn--align-left">
					<span class="pa-btn__icon"><i class="fa-solid fa-trash"></i></span>
					Delete
				</button>
			</div>

			<Heading level={4} style="margin-top: 1.5rem;">Right Aligned</Heading>
			<div class="pa-btn-group pa-btn-group--vertical">
				<button class="pa-btn pa-btn--primary pa-btn--w-10x pa-btn--align-right">
					Save Changes
					<span class="pa-btn__icon"><i class="fa-solid fa-floppy-disk"></i></span>
				</button>
				<button class="pa-btn pa-btn--success pa-btn--w-10x pa-btn--align-right">
					Continue
					<span class="pa-btn__icon"><i class="fa-solid fa-arrow-right"></i></span>
				</button>
				<button class="pa-btn pa-btn--secondary pa-btn--w-10x pa-btn--align-right">
					Settings
					<span class="pa-btn__icon"><i class="fa-solid fa-gear"></i></span>
				</button>
			</div>

			<Heading level={4} style="margin-top: 1.5rem;">Center Aligned</Heading>
			<div class="pa-btn-group pa-btn-group--vertical">
				<button class="pa-btn pa-btn--primary pa-btn--w-10x pa-btn--align-center">
					<span class="pa-btn__icon"><i class="fa-solid fa-upload"></i></span>
					Upload File
				</button>
				<button class="pa-btn pa-btn--success pa-btn--w-10x pa-btn--align-center">
					<span class="pa-btn__icon"><i class="fa-solid fa-plus"></i></span>
					Add New
				</button>
				<button class="pa-btn pa-btn--info pa-btn--w-10x pa-btn--align-center">
					<span class="pa-btn__icon"><i class="fa-solid fa-magnifying-glass"></i></span>
					Search
				</button>
			</div>

			<Heading level={4} style="margin-top: 1.5rem;">Justified</Heading>
			<div class="pa-btn-group pa-btn-group--vertical">
				<button class="pa-btn pa-btn--primary pa-btn--w-10x pa-btn--align-justify">
					<span class="pa-btn__icon"><i class="fa-solid fa-user"></i></span>
					Profile
				</button>
				<button class="pa-btn pa-btn--success pa-btn--w-10x pa-btn--align-justify">
					<span class="pa-btn__icon"><i class="fa-solid fa-envelope"></i></span>
					Messages
				</button>
				<button class="pa-btn pa-btn--danger pa-btn--w-10x pa-btn--align-justify">
					<span class="pa-btn__icon"><i class="fa-solid fa-right-from-bracket"></i></span>
					Logout
				</button>
			</div>
		</Card>
	</Column>
</Grid>

<!-- Interactive Effects Grid -->
<Grid>
	<!-- Ripple Effect Buttons -->
	<Column size="1" lg="1-2">
		<Card>
			{#snippet header()}
				<Heading level={3}>Ripple Effect Buttons</Heading>
			{/snippet}

			<Paragraph class="mb-1">Click buttons to see ripple animation effect:</Paragraph>
			<ButtonGroup>
				<button class="pa-btn pa-btn--primary pa-btn--ripple" data-ripple>Primary Ripple</button>
				<button class="pa-btn pa-btn--secondary pa-btn--ripple" data-ripple
					>Secondary Ripple</button
				>
				<button class="pa-btn pa-btn--success pa-btn--ripple" data-ripple>Success Ripple</button>
				<button class="pa-btn pa-btn--warning pa-btn--ripple" data-ripple>Warning Ripple</button>
				<button class="pa-btn pa-btn--danger pa-btn--ripple" data-ripple>Danger Ripple</button>
			</ButtonGroup>
		</Card>
	</Column>

	<!-- Loading State Buttons -->
	<Column size="1" lg="1-2">
		<Card>
			{#snippet header()}
				<Heading level={3}>Loading State Buttons</Heading>
			{/snippet}

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
<Card>
	{#snippet header()}
		<Heading level={3}>Usage Guide</Heading>
	{/snippet}

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
	<ul>
		<li>
			<strong>Fast Sites:</strong> Always show loading feedback, even for quick operations (200-500ms
			minimum)
		</li>
		<li><strong>User Confidence:</strong> Ripple effects confirm button clicks were registered</li>
		<li>
			<strong>Prevent Double-clicks:</strong> Disable buttons during loading to prevent duplicate submissions
		</li>
		<li><strong>Accessibility:</strong> Loading states are announced to screen readers</li>
	</ul>
</Card>
