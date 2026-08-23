<script lang="ts">
	// MARKUP-FIDELITY AUDIT SCRATCH PAGE — overwritten per component. Safe to clobber.
	import {
		Form,
		FormGroup,
		FormLabel,
		FormHelp,
		FormField,
		Input,
		Radio
	} from '@keenmate/svelte-pure-admin';
</script>

<div id="audit-root" style="padding:2rem">
	<Form>
		<!-- bare label expected — NO pa-form-label class; required → trailing * -->
		<FormGroup isRequired>
			<FormLabel for="u" required>Username</FormLabel>
			<Input id="u" placeholder="user" />
			<FormHelp>Pick a handle.</FormHelp>
		</FormGroup>

		<!-- radio disabled → native attr only, NO pa-radio--disabled -->
		<Radio name="r" value="a" labelText="Enabled" />
		<Radio name="r" value="b" disabled labelText="Disabled" />
	</Form>
</div>
