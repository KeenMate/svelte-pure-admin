<script lang="ts">
	// MARKUP-FIDELITY AUDIT SCRATCH PAGE — overwritten per component. Safe to clobber.
	import { Tabs, TabItem, TabsContent, TabPanel } from '@keenmate/svelte-pure-admin';
</script>

<div id="audit-root" style="padding:2rem">
	<!-- fixed-width tabs: width="6x" should emit minwr-6 (not phantom --w-6x) -->
	<Tabs>
		<TabItem active width="6x">View</TabItem>
		<TabItem width="6x">Edit</TabItem>
		<TabItem width="3x" height="3x">◆</TabItem>
	</Tabs>
	<TabsContent>
		<TabPanel active id="p1">View content</TabPanel>
	</TabsContent>
</div>
