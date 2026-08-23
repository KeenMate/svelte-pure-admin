<script lang="ts">
	// MARKUP-FIDELITY AUDIT SCRATCH PAGE — overwritten per component. Safe to clobber.
	import { Field } from '@keenmate/svelte-pure-admin';
</script>

<div id="audit-root" style="padding:2rem">
	<Field labelText="API key" valueText="USR-1234" copyMode="btn" />
	<Field labelText="User ID" valueText="USR-5678" copyMode="click" />
	<Field labelText="Token" valueText="tok_abc" copyMode="hover" />
	<Field labelText="Plain (no copy)" valueText="just text" />
</div>
