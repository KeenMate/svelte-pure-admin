<script lang="ts">
	import { Grid, Column, Card, Button, ButtonGroup, Tooltip, Popover } from '$lib';
</script>

<svelte:head>
	<title>Tooltips & Popovers - Pure Admin Svelte</title>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
	/>
</svelte:head>

<div class="pa-layout-container">
	<h1 class="mb-4">Tooltips & Popovers</h1>
	<p class="mb-6">Hover tooltips for quick info, click popovers for rich interactive content.</p>

	<Grid>
		<!-- Left Column -->
		<Column size="1" lg="1-2">
			<!-- Tooltip Positions & Colors -->
			<Card class="mb-4">
				{#snippet header()}
					<h3>Tooltip Positions & Colors</h3>
				{/snippet}
				<Grid>
					<Column size="1-2" md="1-4" class="text-center mb-3" style="padding: 1rem;">
						<Tooltip text="Tooltip on top">Top</Tooltip>
					</Column>
					<Column size="1-2" md="1-4" class="text-center mb-3" style="padding: 1rem;">
						<Tooltip text="Tooltip on right" position="right">Right</Tooltip>
					</Column>
					<Column size="1-2" md="1-4" class="text-center mb-3" style="padding: 1rem;">
						<Tooltip text="Tooltip on bottom" position="bottom">Bottom</Tooltip>
					</Column>
					<Column size="1-2" md="1-4" class="text-center mb-3" style="padding: 1rem;">
						<Tooltip text="Tooltip on left" position="left">Left</Tooltip>
					</Column>
				</Grid>
				<hr class="my-3" />
				<Grid>
					<Column size="1-3" md="1-5" class="text-center mb-3" style="padding: 1rem;">
						<Tooltip text="Default dark">Default</Tooltip>
					</Column>
					<Column size="1-3" md="1-5" class="text-center mb-3" style="padding: 1rem;">
						<Tooltip text="Primary blue" variant="primary">Primary</Tooltip>
					</Column>
					<Column size="1-3" md="1-5" class="text-center mb-3" style="padding: 1rem;">
						<Tooltip text="Success green" variant="success">Success</Tooltip>
					</Column>
					<Column size="1-2" md="1-5" class="text-center mb-3" style="padding: 1rem;">
						<Tooltip text="Warning yellow" variant="warning">Warning</Tooltip>
					</Column>
					<Column size="1-2" md="1-5" class="text-center mb-3" style="padding: 1rem;">
						<Tooltip text="Danger red" variant="danger">Danger</Tooltip>
					</Column>
				</Grid>
			</Card>

			<!-- Buttons with Tooltips -->
			<Card class="mb-4">
				{#snippet header()}
					<h3>Buttons & Icon-Only</h3>
				{/snippet}
				<p class="mb-3 text-sm">Regular buttons:</p>
				<div class="text-center mb-4">
					<ButtonGroup>
						<Tooltip text="Save your changes" position="left">
							<Button variant="primary" size="sm">
								<i class="fa-solid fa-floppy-disk"></i> Save
							</Button>
						</Tooltip>
						<Tooltip text="Cancel and go back" position="bottom">
							<Button variant="secondary" size="sm">
								<i class="fa-solid fa-xmark"></i> Cancel
							</Button>
						</Tooltip>
						<Tooltip text="Delete this item" position="bottom">
							<Button variant="danger" size="sm">
								<i class="fa-solid fa-trash"></i> Delete
							</Button>
						</Tooltip>
					</ButtonGroup>
				</div>
				<p class="mb-3 text-sm">Icon-only buttons:</p>
				<div class="text-center">
					<ButtonGroup>
						<Tooltip text="Edit" position="bottom">
							<Button variant="primary" size="sm" iconOnly title="">
								<i class="fa-solid fa-pen"></i>
							</Button>
						</Tooltip>
						<Tooltip text="Copy" position="bottom">
							<Button variant="secondary" size="sm" iconOnly title="">
								<i class="fa-solid fa-copy"></i>
							</Button>
						</Tooltip>
						<Tooltip text="Download" position="bottom">
							<Button variant="success" size="sm" iconOnly title="">
								<i class="fa-solid fa-download"></i>
							</Button>
						</Tooltip>
						<Tooltip text="Settings" position="bottom">
							<Button variant="warning" size="sm" iconOnly title="">
								<i class="fa-solid fa-gear"></i>
							</Button>
						</Tooltip>
						<Tooltip text="Delete" position="bottom">
							<Button variant="danger" size="sm" iconOnly title="">
								<i class="fa-solid fa-trash"></i>
							</Button>
						</Tooltip>
						<Tooltip text="Info" position="bottom">
							<Button variant="info" size="sm" iconOnly title="">
								<i class="fa-solid fa-circle-info"></i>
							</Button>
						</Tooltip>
					</ButtonGroup>
				</div>
			</Card>

			<!-- Multiline Tooltips -->
			<Card class="mb-4">
				{#snippet header()}
					<h3>Multiline Tooltips</h3>
				{/snippet}
				<p class="mb-3 text-sm">
					Use <code>multiline</code> prop for longer text (20rem width, left-aligned):
				</p>
				<div class="text-center">
					<ButtonGroup>
						<Tooltip
							text="This button will save your changes to the database. Make sure you have reviewed all fields before clicking. Changes cannot be undone after saving."
							position="bottom"
							multiline
						>
							<Button variant="primary" size="sm">
								<i class="fa-solid fa-floppy-disk"></i> Save
							</Button>
						</Tooltip>
						<Tooltip
							text="This action will permanently delete the selected item and all associated data. This operation cannot be reversed. Please confirm you want to proceed."
							position="bottom"
							multiline
						>
							<Button variant="danger" size="sm">
								<i class="fa-solid fa-trash"></i> Delete
							</Button>
						</Tooltip>
					</ButtonGroup>
				</div>
			</Card>

			<!-- Inline Text Tooltips -->
			<Card class="mb-4">
				{#snippet header()}
					<h3>Inline Text Tooltips</h3>
				{/snippet}
				<p>
					Tooltips can explain <Tooltip
						text="Application Programming Interface"
						variant="primary"
						class="border-bottom: 1px dotted;">API</Tooltip
					> terms,
					<Tooltip text="Cascading Style Sheets" variant="success" class="border-bottom: 1px dotted;"
						>CSS</Tooltip
					>, or
					<Tooltip text="HyperText Markup Language" variant="danger" class="border-bottom: 1px dotted;"
						>HTML</Tooltip
					> abbreviations.
				</p>
			</Card>
		</Column>

		<!-- Right Column -->
		<Column size="1" lg="1-2">
			<!-- Popovers -->
			<Card class="mb-4">
				{#snippet header()}
					<h3>Popovers - Interactive Help</h3>
				{/snippet}
				<p class="mb-3 text-sm">
					Rich content with links, formatting. Click <strong>?</strong> to open:
				</p>
				<Grid>
					<Column size="1-2" md="1-4" class="mb-3 text-center" style="padding: 0.5rem;">
						<label class="text-sm">
							Basic
							<Popover title="Help" position="bottom">
								<p>
									Basic popover with <strong>bold</strong>, <em>italic</em>, and <a href="#"
										>links</a
									>.
								</p>
							</Popover>
						</label>
					</Column>
					<Column size="1-2" md="1-4" class="mb-3 text-center" style="padding: 0.5rem;">
						<label class="text-sm">
							With List
							<Popover title="Options" position="bottom">
								<p>Select from:</p>
								<ul>
									<li>Option A</li>
									<li>Option B</li>
									<li>Option C</li>
								</ul>
							</Popover>
						</label>
					</Column>
					<Column size="1-2" md="1-4" class="mb-3 text-center" style="padding: 0.5rem;">
						<label class="text-sm">
							Large
							<Popover title="Documentation" position="bottom" size="lg">
								<p>Use <code>size="lg"</code> prop for wider content (up to 28rem).</p>
								<p>
									Perfect for detailed explanations and <a href="/components">documentation</a>.
								</p>
							</Popover>
						</label>
					</Column>
					<Column size="1-2" md="1-4" class="mb-3 text-center" style="padding: 0.5rem;">
						<label class="text-sm">
							Small
							<Popover title="Tip" position="bottom" size="sm">
								<p>Brief hints use <code>size="sm"</code>.</p>
							</Popover>
						</label>
					</Column>
				</Grid>
			</Card>

			<!-- Popover Positions -->
			<Card class="mb-4">
				{#snippet header()}
					<h3>Popover Positions</h3>
				{/snippet}
				<Grid>
					<Column size="1-2" md="1-4" class="text-center mb-3" style="padding: 1rem;">
						<span class="text-sm">Top </span>
					<Popover title="Top">
						<p>Appears above trigger.</p>
					</Popover>
					</Column>
					<Column size="1-2" md="1-4" class="text-center mb-3" style="padding: 1rem;">
						<span class="text-sm">Right </span>
					<Popover title="Right" position="right">
						<p>Appears to the right.</p>
					</Popover>
					</Column>
					<Column size="1-2" md="1-4" class="text-center mb-3" style="padding: 1rem;">
						<span class="text-sm">Bottom </span>
					<Popover title="Bottom" position="bottom">
						<p>Appears below trigger.</p>
					</Popover>
					</Column>
					<Column size="1-2" md="1-4" class="text-center mb-3" style="padding: 1rem;">
						<span class="text-sm">Left </span>
					<Popover title="Left" position="left">
						<p>Appears to the left.</p>
					</Popover>
					</Column>
				</Grid>
			</Card>
		</Column>
	</Grid>

	<!-- Usage Examples -->
	<Card>
		{#snippet header()}
			<h3>Code Examples</h3>
		{/snippet}
		<Grid>
				<Column size="1" md="1-2">
					<h4 class="mb-2 text-sm">Tooltips</h4>
					<pre class="mb-3 text-sm"><code
							>&lt;!-- Basic --&gt;
&lt;Tooltip text="Tooltip text"&gt;Hover&lt;/Tooltip&gt;

&lt;!-- Positions: right, bottom, left (default: top) --&gt;
&lt;Tooltip text="..." position="bottom"&gt;...&lt;/Tooltip&gt;

&lt;!-- Colors: primary, success, warning, danger --&gt;
&lt;Tooltip text="..." variant="success"&gt;...&lt;/Tooltip&gt;

&lt;!-- Multiline --&gt;
&lt;Tooltip text="..." multiline&gt;...&lt;/Tooltip&gt;</code
						></pre>
				</Column>
				<Column size="1" md="1-2">
					<h4 class="mb-2 text-sm">Popovers</h4>
					<pre class="mb-3 text-sm"><code
							>&lt;!-- Basic --&gt;
&lt;Popover title="Title" position="bottom"&gt;
  &lt;p&gt;Rich &lt;strong&gt;HTML&lt;/strong&gt; content.&lt;/p&gt;
&lt;/Popover&gt;

&lt;!-- Sizes: sm, lg (default: medium) --&gt;
&lt;Popover title="Title" size="lg"&gt;...&lt;/Popover&gt;

&lt;!-- Custom trigger --&gt;
&lt;Popover title="Title"&gt;
  &#123;#snippet trigger()&#125;&lt;i class="icon"&gt;&lt;/i&gt;&#123;/snippet&#125;
  &lt;p&gt;Content&lt;/p&gt;
&lt;/Popover&gt;</code
						></pre>
				</Column>
		</Grid>
	</Card>
</div>
