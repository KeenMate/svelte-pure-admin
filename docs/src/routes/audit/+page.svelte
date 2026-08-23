<script lang="ts">
	// MARKUP-FIDELITY AUDIT SCRATCH PAGE — overwritten per component. Safe to clobber.
	import { FilterCard, Input, Select } from '@keenmate/svelte-pure-admin';
	let expanded = $state(true);
</script>

<div id="audit-root" style="padding:2rem">
	<FilterCard bind:isExpanded={expanded}>
		{#snippet filters()}
			<Input placeholder="Search by name" />
			<Select><option>All categories</option></Select>
		{/snippet}
		{#snippet advancedFilters()}
			<div class="pa-row">
				<div class="pa-col-100 pa-col-md-1-3">
					<div class="pa-form-group">
						<label>Category</label>
						<Select><option>All</option></Select>
					</div>
				</div>
			</div>
		{/snippet}
	</FilterCard>
</div>
