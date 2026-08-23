<script lang="ts">
	// MARKUP-FIDELITY AUDIT SCRATCH PAGE — overwritten per component. Safe to clobber.
	import { Alert, Button } from '@keenmate/svelte-pure-admin';
</script>

<div id="audit-root" style="padding:2rem">
	<!-- A) dismissible, NO icon, structural content → must be DIRECT children (flex gap) -->
	<Alert variant="danger" isDismissible headingText="Validation failed">
		<p class="mb-0">Please fix the errors below.</p>
		{#snippet actions()}<Button size="sm" variant="primary">Retry</Button>{/snippet}
	</Alert>

	<!-- B) icon + multi-line → wrapped in __content -->
	<Alert variant="info" isMultiline headingText="System update">
		{#snippet icon()}ⓘ{/snippet}
		<p class="mb-0">A new version is available.</p>
	</Alert>

	<!-- C) simple dismissible inline -->
	<Alert variant="success" isDismissible>Saved successfully.</Alert>
</div>
