<script lang="ts">
	import { Heading, Paragraph, Card, Badge, Button, ButtonGroup } from '@keenmate/svelte-pure-admin';
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
	/>
</svelte:head>

<!-- Two-Column Comparison -->
<Card>
	{#snippet header()}
		<div class="d-flex justify-content-between align-items-center">
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
					<th class="w-20">#</th>
					<th class="w-40">Base values</th>
					<th class="w-40">New values</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="pa-comparison-table__label">Country Iso 2</td>
					<td>
						<div class="pa-comparison-table__value">
							<span>be</span>
							<Button size="xs" iconOnly class="pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</Button>
						</div>
					</td>
					<td>
						<div class="pa-comparison-table__value">
							<span>be</span>
							<Button size="xs" iconOnly class="pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</Button>
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
							<Button size="xs" iconOnly class="pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</Button>
						</div>
					</td>
					<td class="pa-comparison-table__changed">
						<div class="pa-comparison-table__value">
							<span>Antwerpen</span>
							<Button size="xs" iconOnly class="pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</Button>
						</div>
					</td>
				</tr>
				<tr>
					<td class="pa-comparison-table__label">Postal Code</td>
					<td>
						<div class="pa-comparison-table__value">
							<span>9130</span>
							<Button size="xs" iconOnly class="pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</Button>
						</div>
					</td>
					<td class="pa-comparison-table__changed">
						<div class="pa-comparison-table__value">
							<span>2018</span>
							<Button size="xs" iconOnly class="pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</Button>
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
							<Button size="xs" iconOnly class="pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</Button>
						</div>
					</td>
					<td class="pa-comparison-table__changed">
						<div class="pa-comparison-table__value">
							<span>Desguinlei 100</span>
							<Button size="xs" iconOnly class="pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</Button>
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
							<Button size="xs" iconOnly class="pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</Button>
						</div>
					</td>
					<td class="pa-comparison-table__changed">
						<div class="pa-comparison-table__value">
							<span>2243544870:Antwerpen:Desguinlei 100</span>
							<Button size="xs" iconOnly class="pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</Button>
						</div>
					</td>
				</tr>
				<tr>
					<td class="pa-comparison-table__label">Is active</td>
					<td>
						<i class="fa-solid fa-check text-success"></i>
					</td>
					<td>
						<i class="fa-solid fa-check text-success"></i>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</Card>

<!-- Three-Column Comparison -->
<Card>
	{#snippet header()}
		<div class="d-flex justify-content-between align-items-center">
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
					<th class="w-20">#</th>
					<th class="w-1-3">Base</th>
					<th class="w-1-3">Change A</th>
					<th class="w-1-3">Change B</th>
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
							<Button size="xs" iconOnly class="pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</Button>
						</div>
					</td>
					<td class="pa-comparison-table__changed">
						<div class="pa-comparison-table__value">
							<span>john.doe@newcompany.com</span>
							<Button size="xs" iconOnly class="pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</Button>
						</div>
					</td>
					<td>
						<div class="pa-comparison-table__value">
							<span>john.doe@company.com</span>
							<Button size="xs" iconOnly class="pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</Button>
						</div>
					</td>
				</tr>
				<tr>
					<td class="pa-comparison-table__label">Phone</td>
					<td>
						<div class="pa-comparison-table__value">
							<span>+32 123 456 789</span>
							<Button size="xs" iconOnly class="pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</Button>
						</div>
					</td>
					<td>
						<div class="pa-comparison-table__value">
							<span>+32 123 456 789</span>
							<Button size="xs" iconOnly class="pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</Button>
						</div>
					</td>
					<td class="pa-comparison-table__changed">
						<div class="pa-comparison-table__value">
							<span>+32 987 654 321</span>
							<Button size="xs" iconOnly class="pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</Button>
						</div>
					</td>
				</tr>
				<tr>
					<td class="pa-comparison-table__label">Department</td>
					<td>
						<div class="pa-comparison-table__value">
							<span>Sales</span>
							<Button size="xs" iconOnly class="pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</Button>
						</div>
					</td>
					<td class="pa-comparison-table__changed">
						<div class="pa-comparison-table__value">
							<span>Marketing</span>
							<Button size="xs" iconOnly class="pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</Button>
						</div>
					</td>
					<td class="pa-comparison-table__changed pa-comparison-table__conflict">
						<div class="pa-comparison-table__value">
							<span>Engineering</span>
							<Button size="xs" iconOnly class="pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</Button>
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
							<Button size="xs" iconOnly class="pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</Button>
						</div>
					</td>
					<td>
						<div class="pa-comparison-table__value">
							<span>2020-01-15</span>
							<Button size="xs" iconOnly class="pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</Button>
						</div>
					</td>
					<td>
						<div class="pa-comparison-table__value">
							<span>2020-01-15</span>
							<Button size="xs" iconOnly class="pa-comparison-table__copy">
								<i class="fa-solid fa-clipboard"></i>
							</Button>
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
