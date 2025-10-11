<script lang="ts">
	import { Card, Grid, Column, BasicList, OrderedList, DefinitionList, List, ListItem } from '$lib';
</script>

<svelte:head>
	<title>Lists - Pure Admin Svelte</title>
</svelte:head>

<h1>Lists</h1>
<p>Styled lists for content organization - from basic bullets to icon lists and definition lists.</p>

<Grid>
	<!-- Left Column -->
	<Column size="1" lg="1-2">
		<!-- Basic Unordered Lists -->
		<Card class="mb-8">
			{#snippet header()}
				<h3>Basic Unordered Lists</h3>
			{/snippet}

			<h4>Default Spacing</h4>
			<BasicList>
				<li>Dashboard with real-time metrics</li>
				<li>User management and permissions</li>
				<li>Advanced reporting tools</li>
				<li>API integration capabilities</li>
				<li>Multi-language support</li>
			</BasicList>

			<h4 style="margin-top: 2rem;">Compact Spacing</h4>
			<BasicList compact>
				<li>Reduced vertical spacing</li>
				<li>Perfect for dense content</li>
				<li>Saves vertical space</li>
				<li>Easy to scan quickly</li>
			</BasicList>

			<h4 style="margin-top: 2rem;">Spacious Layout</h4>
			<BasicList spacious>
				<li>More breathing room between items</li>
				<li>Better for longer content blocks</li>
				<li>Improved readability</li>
			</BasicList>
		</Card>

		<!-- Ordered Lists -->
		<Card class="mb-8">
			{#snippet header()}
				<h3>Ordered Lists</h3>
			{/snippet}

			<h4>Numeric (Default)</h4>
			<OrderedList>
				<li>Create a new project</li>
				<li>Configure basic settings</li>
				<li>Invite team members</li>
				<li>Set up workflows</li>
				<li>Launch and monitor</li>
			</OrderedList>

			<h4 style="margin-top: 2rem;">Roman Numerals</h4>
			<OrderedList style="roman">
				<li>Executive summary</li>
				<li>Market analysis</li>
				<li>Financial projections</li>
				<li>Implementation roadmap</li>
			</OrderedList>

			<h4 style="margin-top: 2rem;">Alphabetical</h4>
			<OrderedList style="alpha">
				<li>Appendix A: Technical specifications</li>
				<li>Appendix B: User testimonials</li>
				<li>Appendix C: Pricing structure</li>
			</OrderedList>
		</Card>

		<!-- Definition Lists -->
		<Card class="mb-8">
			{#snippet header()}
				<h3>Definition Lists</h3>
			{/snippet}

			<h4>Standard Layout</h4>
			<DefinitionList>
				<dt>API Key</dt>
				<dd>A unique identifier used to authenticate requests to the API</dd>

				<dt>Webhook</dt>
				<dd>HTTP callbacks that send real-time data to your application when events occur</dd>

				<dt>OAuth 2.0</dt>
				<dd>Industry-standard protocol for authorization allowing third-party access</dd>
			</DefinitionList>

			<h4 style="margin-top: 2rem;">Inline Layout</h4>
			<DefinitionList inline>
				<dt>Status</dt>
				<dd>Active</dd>
				<dt>Created</dt>
				<dd>2025-01-15</dd>
				<dt>Modified</dt>
				<dd>2025-10-05</dd>
				<dt>Author</dt>
				<dd>John Doe</dd>
			</DefinitionList>
		</Card>
	</Column>

	<!-- Right Column -->
	<Column size="1" lg="1-2">
		<!-- Icon Lists -->
		<Card class="mb-8">
			{#snippet header()}
				<h3>Icon Lists</h3>
			{/snippet}

			<h4>Success (Checkmarks)</h4>
			<BasicList icon>
				<li>SSL/TLS encryption enabled</li>
				<li>Automatic daily backups</li>
				<li>99.9% uptime SLA guarantee</li>
				<li>24/7 customer support</li>
			</BasicList>

			<h4 style="margin-top: 2rem;">Danger (X marks)</h4>
			<BasicList icon variant="danger">
				<li>Deprecated API endpoint</li>
				<li>Unsupported browser version</li>
				<li>Missing required permissions</li>
			</BasicList>

			<h4 style="margin-top: 2rem;">Info (Arrows)</h4>
			<BasicList icon variant="info">
				<li>Navigate to Settings panel</li>
				<li>Select Integration options</li>
				<li>Choose your provider</li>
				<li>Complete authentication</li>
			</BasicList>

			<h4 style="margin-top: 2rem;">Warning (Exclamation)</h4>
			<BasicList icon variant="warning">
				<li>Rate limit approaching threshold</li>
				<li>Certificate expires in 30 days</li>
				<li>Low disk space warning</li>
			</BasicList>
		</Card>

		<!-- Bordered & Striped Lists -->
		<Card class="mb-8">
			{#snippet header()}
				<h3>Bordered & Striped Lists</h3>
			{/snippet}

			<h4>Bordered List</h4>
			<BasicList bordered>
				<li>User Management Module</li>
				<li>Content Management System</li>
				<li>Analytics Dashboard</li>
				<li>Email Campaign Tools</li>
				<li>Reporting Engine</li>
			</BasicList>

			<h4 style="margin-top: 2rem;">Striped List</h4>
			<BasicList striped>
				<li>Monthly subscription: $99/month</li>
				<li>Annual subscription: $990/year (2 months free)</li>
				<li>Enterprise plan: Custom pricing</li>
				<li>Educational discount: 50% off</li>
			</BasicList>
		</Card>

		<!-- Inline & Unstyled Lists -->
		<Card class="mb-8">
			{#snippet header()}
				<h3>Inline & Unstyled Lists</h3>
			{/snippet}

			<h4>Inline List</h4>
			<BasicList inline>
				<li><a href="#home">Home</a></li>
				<li><a href="#about">About</a></li>
				<li><a href="#services">Services</a></li>
				<li><a href="#contact">Contact</a></li>
			</BasicList>

			<h4 style="margin-top: 2rem;">Unstyled List</h4>
			<BasicList unstyled>
				<li>No bullets or numbers</li>
				<li>Just plain text items</li>
				<li>Perfect for custom styling</li>
				<li>Or semantic markup needs</li>
			</BasicList>
		</Card>

		<!-- Complex Lists -->
		<Card class="mb-8">
			{#snippet header()}
				<h3>Complex Lists with Avatars</h3>
			{/snippet}

			<div class="pa-card__body pa-card__body--no-padding">
				<List>
					<ListItem avatar="👤" title="Sarah Johnson" subtitle="Product Manager" meta="Last active: 2 hours ago" />
					<ListItem avatar="👤" title="Michael Chen" subtitle="Lead Developer" meta="Last active: 15 minutes ago" />
					<ListItem avatar="👤" title="Emily Rodriguez" subtitle="UX Designer" meta="Last active: 1 day ago" />
				</List>
			</div>
		</Card>
	</Column>
</Grid>

<!-- Implementation Notes -->
<Card>
	{#snippet header()}
		<h3>Implementation Guide</h3>
	{/snippet}

	<h4>Available Classes</h4>

	<h5 style="margin-top: 1rem;">Unordered Lists (ul)</h5>
	<BasicList compact>
		<li><code>pa-list-basic</code> - Base unordered list</li>
		<li><code>pa-list-basic--compact</code> - Reduced spacing</li>
		<li><code>pa-list-basic--spacious</code> - Increased spacing</li>
		<li><code>pa-list-basic--unstyled</code> - No bullets, no padding</li>
		<li><code>pa-list-basic--inline</code> - Horizontal layout</li>
		<li><code>pa-list-basic--bordered</code> - Border between items</li>
		<li><code>pa-list-basic--striped</code> - Zebra striping</li>
		<li><code>pa-list-basic--icon</code> - Checkmarks (success)</li>
		<li><code>pa-list-basic--icon pa-list-basic--danger</code> - X marks</li>
		<li><code>pa-list-basic--icon pa-list-basic--info</code> - Arrows</li>
		<li><code>pa-list-basic--icon pa-list-basic--warning</code> - Exclamation marks</li>
	</BasicList>

	<h5 style="margin-top: 1rem;">Ordered Lists (ol)</h5>
	<BasicList compact>
		<li><code>pa-list-ordered</code> - Base ordered list (numeric)</li>
		<li><code>pa-list-ordered--roman</code> - Roman numerals (I, II, III)</li>
		<li><code>pa-list-ordered--alpha</code> - Lowercase letters (a, b, c)</li>
	</BasicList>

	<h5 style="margin-top: 1rem;">Definition Lists (dl)</h5>
	<BasicList compact>
		<li><code>pa-list-definition</code> - Standard definition list</li>
		<li><code>pa-list-definition--inline</code> - Horizontal key-value pairs</li>
	</BasicList>

	<h5 style="margin-top: 1rem;">Complex Lists</h5>
	<BasicList compact>
		<li><code>pa-list</code> - Container for complex list items</li>
		<li><code>pa-list__item</code> - Individual list item with avatar/content</li>
		<li><code>pa-list__avatar</code> - Avatar/icon container</li>
		<li><code>pa-list__content</code> - Content wrapper</li>
		<li><code>pa-list__title</code> - Primary text</li>
		<li><code>pa-list__subtitle</code> - Secondary text</li>
		<li><code>pa-list__meta</code> - Metadata text</li>
	</BasicList>
</Card>
