<script lang="ts">
	// MARKUP-FIDELITY AUDIT SCRATCH PAGE — overwritten per component. Safe to clobber.
	import { Table, TableCard, Button, Badge } from '@keenmate/svelte-pure-admin';
</script>

<div id="audit-root" style="padding:2rem">
	<!-- compact should map to --xs; hover/borderless removed -->
	<Table isCompact isStriped isHover isBorderless>
		<thead><tr><th>Name</th><th>Email</th></tr></thead>
		<tbody><tr><td>John</td><td>j@x.com</td></tr></tbody>
	</Table>

	<!-- bare h3 title + description + actions + footer -->
	<TableCard titleText="Orders" descriptionText="Recent customer orders" isScrollable>
		{#snippet headerActions()}
			<Badge variant="secondary">12 total</Badge>
			<Button variant="primary" size="sm">Add</Button>
		{/snippet}
		<Table isStriped>
			<thead><tr><th>ID</th><th>Amount</th></tr></thead>
			<tbody><tr><td>#1001</td><td>$250</td></tr></tbody>
		</Table>
		{#snippet footer()}
			<span>Showing 1 of 12</span>
		{/snippet}
	</TableCard>
</div>
