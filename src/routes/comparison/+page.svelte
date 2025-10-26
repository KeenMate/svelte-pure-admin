<script lang="ts">
	import Heading from '$lib/typography/Heading.svelte';
	import Paragraph from '$lib/typography/Paragraph.svelte';
	import { Card, Badge, Button, ButtonGroup } from '$lib';
</script>

<svelte:head>
	<title>Comparison - Pure Admin Svelte</title>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
	/>
</svelte:head>

<Heading level={1}>Comparison</Heading>
<Paragraph>Two-column and three-column comparison patterns for version control, data changes, and A/B comparisons.</Paragraph>

<!-- NOTE: Comparison tables use special pa-comparison-table classes -->
<!-- These are not wrapped in a component yet, using raw HTML -->

<!-- Two-Column Comparison -->
<Card>
	{#snippet header()}
		<div style="display: flex; justify-content: space-between; align-items: center;">
			<Heading level={3}>Version Detail (2-Column)</Heading>
			<ButtonGroup>
				<Button variant="primary" size="sm">
					<i class="fa-solid fa-table-list"></i> View in form
				</Button>
				<Button variant="secondary" size="sm">
					<i class="fa-solid fa-table"></i> View in table
				</Button>
				<Button variant="secondary" size="sm" iconOnly>
					<i class="fa-solid fa-location-dot"></i>
				</Button>
			</ButtonGroup>
		</div>
	{/snippet}

	<div class="pa-card__body pa-card__body--no-padding">
		<table class="pa-table pa-comparison-table">
			<thead>
				<tr>
					<th style="width: 20%;">#</th>
					<th style="width: 40%;">Base values</th>
					<th style="width: 40%;">New values</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="pa-comparison-table__label">Country Iso 2</td>
					<td>
						<div class="pa-comparison-table__value">
							<span>be</span>
							<button class="pa-btn pa-btn--xs pa-btn--icon-only pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</button>
						</div>
					</td>
					<td>
						<div class="pa-comparison-table__value">
							<span>be</span>
							<button class="pa-btn pa-btn--xs pa-btn--icon-only pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</button>
						</div>
					</td>
				</tr>
				<tr>
					<td class="pa-comparison-table__label">Region</td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td class="pa-comparison-table__label">Subregion</td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td class="pa-comparison-table__label">Town</td>
					<td>
						<div class="pa-comparison-table__value">
							<span>Beveren</span>
							<button class="pa-btn pa-btn--xs pa-btn--icon-only pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</button>
						</div>
					</td>
					<td class="pa-comparison-table__changed">
						<div class="pa-comparison-table__value">
							<span>Antwerpen</span>
							<button class="pa-btn pa-btn--xs pa-btn--icon-only pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</button>
						</div>
					</td>
				</tr>
				<tr>
					<td class="pa-comparison-table__label">Postal Code</td>
					<td>
						<div class="pa-comparison-table__value">
							<span>9130</span>
							<button class="pa-btn pa-btn--xs pa-btn--icon-only pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</button>
						</div>
					</td>
					<td class="pa-comparison-table__changed">
						<div class="pa-comparison-table__value">
							<span>2018</span>
							<button class="pa-btn pa-btn--xs pa-btn--icon-only pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</button>
						</div>
					</td>
				</tr>
				<tr>
					<td class="pa-comparison-table__label">Street Full Name</td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td class="pa-comparison-table__label">Address line 1</td>
					<td>
						<div class="pa-comparison-table__value">
							<span>Ketenislaan 1</span>
							<button class="pa-btn pa-btn--xs pa-btn--icon-only pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</button>
						</div>
					</td>
					<td class="pa-comparison-table__changed">
						<div class="pa-comparison-table__value">
							<span>Desguinlei 100</span>
							<button class="pa-btn pa-btn--xs pa-btn--icon-only pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</button>
						</div>
					</td>
				</tr>
				<tr class="pa-comparison-table__section">
					<td colspan="3">Address metadata</td>
				</tr>
				<tr>
					<td class="pa-comparison-table__label">Source Location Name</td>
					<td>
						<div class="pa-comparison-table__value">
							<span>2243544870:Beveren:Ketenislaan 1</span>
							<button class="pa-btn pa-btn--xs pa-btn--icon-only pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</button>
						</div>
					</td>
					<td class="pa-comparison-table__changed">
						<div class="pa-comparison-table__value">
							<span>2243544870:Antwerpen:Desguinlei 100</span>
							<button class="pa-btn pa-btn--xs pa-btn--icon-only pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</button>
						</div>
					</td>
				</tr>
				<tr>
					<td class="pa-comparison-table__label">Is active</td>
					<td>
						<i class="fa-solid fa-check" style="color: #10b981;"></i>
					</td>
					<td>
						<i class="fa-solid fa-check" style="color: #10b981;"></i>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</Card>

<!-- Three-Column Comparison -->
<Card>
	{#snippet header()}
		<div style="display: flex; justify-content: space-between; align-items: center;">
			<Heading level={3}>Merge Comparison (3-Column)</Heading>
			<ButtonGroup>
				<Button variant="success" size="sm">
					<i class="fa-solid fa-code-merge"></i> Accept A
				</Button>
				<Button variant="info" size="sm">
					<i class="fa-solid fa-code-merge"></i> Accept B
				</Button>
				<Button variant="secondary" size="sm">
					<i class="fa-solid fa-xmark"></i> Reject Both
				</Button>
			</ButtonGroup>
		</div>
	{/snippet}

	<div class="pa-card__body pa-card__body--no-padding">
		<table class="pa-table pa-comparison-table">
			<thead>
				<tr>
					<th style="width: 20%;">#</th>
					<th style="width: 26.67%;">Base</th>
					<th style="width: 26.67%;">Change A</th>
					<th style="width: 26.67%;">Change B</th>
				</tr>
			</thead>
			<tbody>
				<tr class="pa-comparison-table__section">
					<td colspan="4">Contact Information</td>
				</tr>
				<tr>
					<td class="pa-comparison-table__label">Email</td>
					<td>
						<div class="pa-comparison-table__value">
							<span>john.doe@company.com</span>
							<button class="pa-btn pa-btn--xs pa-btn--icon-only pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</button>
						</div>
					</td>
					<td class="pa-comparison-table__changed">
						<div class="pa-comparison-table__value">
							<span>john.doe@newcompany.com</span>
							<button class="pa-btn pa-btn--xs pa-btn--icon-only pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</button>
						</div>
					</td>
					<td>
						<div class="pa-comparison-table__value">
							<span>john.doe@company.com</span>
							<button class="pa-btn pa-btn--xs pa-btn--icon-only pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</button>
						</div>
					</td>
				</tr>
				<tr>
					<td class="pa-comparison-table__label">Phone</td>
					<td>
						<div class="pa-comparison-table__value">
							<span>+32 123 456 789</span>
							<button class="pa-btn pa-btn--xs pa-btn--icon-only pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</button>
						</div>
					</td>
					<td>
						<div class="pa-comparison-table__value">
							<span>+32 123 456 789</span>
							<button class="pa-btn pa-btn--xs pa-btn--icon-only pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</button>
						</div>
					</td>
					<td class="pa-comparison-table__changed">
						<div class="pa-comparison-table__value">
							<span>+32 987 654 321</span>
							<button class="pa-btn pa-btn--xs pa-btn--icon-only pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</button>
						</div>
					</td>
				</tr>
				<tr>
					<td class="pa-comparison-table__label">Department</td>
					<td>
						<div class="pa-comparison-table__value">
							<span>Sales</span>
							<button class="pa-btn pa-btn--xs pa-btn--icon-only pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</button>
						</div>
					</td>
					<td class="pa-comparison-table__changed">
						<div class="pa-comparison-table__value">
							<span>Marketing</span>
							<button class="pa-btn pa-btn--xs pa-btn--icon-only pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</button>
						</div>
					</td>
					<td class="pa-comparison-table__changed pa-comparison-table__conflict">
						<div class="pa-comparison-table__value">
							<span>Engineering</span>
							<button class="pa-btn pa-btn--xs pa-btn--icon-only pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</button>
						</div>
					</td>
				</tr>
				<tr class="pa-comparison-table__section">
					<td colspan="4">Employment Details</td>
				</tr>
				<tr>
					<td class="pa-comparison-table__label">Start Date</td>
					<td>
						<div class="pa-comparison-table__value">
							<span>2020-01-15</span>
							<button class="pa-btn pa-btn--xs pa-btn--icon-only pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</button>
						</div>
					</td>
					<td>
						<div class="pa-comparison-table__value">
							<span>2020-01-15</span>
							<button class="pa-btn pa-btn--xs pa-btn--icon-only pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</button>
						</div>
					</td>
					<td>
						<div class="pa-comparison-table__value">
							<span>2020-01-15</span>
							<button class="pa-btn pa-btn--xs pa-btn--icon-only pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</button>
						</div>
					</td>
				</tr>
				<tr>
					<td class="pa-comparison-table__label">Status</td>
					<td>
						<Badge variant="success">Active</Badge>
					</td>
					<td>
						<Badge variant="success">Active</Badge>
					</td>
					<td>
						<Badge variant="success">Active</Badge>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</Card>
