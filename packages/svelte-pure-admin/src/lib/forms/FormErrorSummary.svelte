<script lang="ts">
	/**
	 * FormErrorSummary Component
	 * Displays a summary of form validation errors with clickable anchor links
	 */
	import Alert from '../feedback/Alert.svelte';
	import Strong from '../typography/Strong.svelte';
	import BasicList from '../display/BasicList.svelte';
	import Link from '../typography/Link.svelte';

	export interface FormErrorItem {
		field: string;
		id: string;
		message: string;
	}

	interface Props {
		/** Array of error objects */
		errors: FormErrorItem[];
		/** Whether to show the summary (typically: submitted && errors.length > 0) */
		show?: boolean;
		/** Additional CSS class */
		class?: string;
	}

	let { errors, show = true, class: className = '' }: Props = $props();

	const shouldShow = $derived(show && errors.length > 0);
	const errorCount = $derived(errors.length);
	const errorText = $derived(errorCount === 1 ? 'error' : 'errors');
</script>

{#if shouldShow}
	<Alert variant="danger" class="mb-4 {className}">
		<Strong>{errorCount} {errorText} found:</Strong>
		<BasicList class="mt-0 mb-0">
			{#each errors as error}
				<li><Link href="#{error.id}">{error.field}</Link> - {error.message}</li>
			{/each}
		</BasicList>
	</Alert>
{/if}
