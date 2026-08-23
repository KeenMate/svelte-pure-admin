<script lang="ts">
	// MARKUP-FIDELITY AUDIT SCRATCH PAGE — overwritten per component. Safe to clobber.
	import { Loader, Spinner, LoaderCenter, LoaderOverlay } from '@keenmate/svelte-pure-admin';
</script>

<div id="audit-root" style="padding:2rem">
	<Loader type="dots" color="success" />
	<Loader type="bars" size="lg" />
	<Loader type="ring" />
	<LoaderCenter>
		<Spinner variant="primary" />
		<p>Loading…</p>
	</LoaderCenter>
	<LoaderOverlay><Spinner /></LoaderOverlay>
</div>
