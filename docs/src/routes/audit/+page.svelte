<script lang="ts">
	// MARKUP-FIDELITY AUDIT SCRATCH PAGE — overwritten per component. Safe to clobber.
	import { CheckboxList, CheckboxListItem, CheckboxBox } from '@keenmate/svelte-pure-admin';
</script>

<div id="audit-root" style="padding:2rem">
	<CheckboxList variant="bordered">
		<CheckboxListItem id="a" labelText="Plain option" />
		<CheckboxListItem id="b" labelText="With description" descriptionText="A muted caption" checked />
		<CheckboxListItem id="c" labelText="Locked" state="locked" />
	</CheckboxList>

	<!-- standalone building block: should be <span class="pa-checkbox"> -->
	<CheckboxBox id="raw" />
</div>
