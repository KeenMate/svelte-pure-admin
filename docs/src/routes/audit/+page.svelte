<script lang="ts">
	// MARKUP-FIDELITY AUDIT SCRATCH PAGE — overwritten per component. Safe to clobber.
	import { Toast, Modal } from '@keenmate/svelte-pure-admin';
</script>

<div id="audit-root" style="padding:2rem">
	<Toast titleText="Saved" messageText="Your changes were saved." duration={0} />

	<!-- default header → close should be pa-btn--secondary -->
	<Modal show titleText="Plain modal">Body</Modal>

	<!-- coloured header → close should be pa-btn--light -->
	<Modal show variant="success" titleText="Success modal">Body</Modal>
</div>
