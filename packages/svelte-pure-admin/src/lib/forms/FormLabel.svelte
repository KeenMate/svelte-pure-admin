<script lang="ts">
	/**
	 * Pure Admin FormLabel Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/forms.html
	 */

	interface Props {
		/** Input ID for label */
		for?: string;
		/** Mark as required (adds asterisk indicator) */
		required?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { for: htmlFor, required = false, class: className = '', children }: Props = $props();

	// Core styles a BARE <label> inside `.pa-form .pa-form-group` — there is NO
	// `.pa-form-label` class and no required-indicator markup (see
	// snippets/forms.html COMPONENT REFERENCE: "use the native `required`
	// attribute"). So emit a bare label, forwarding only a caller-supplied
	// class. The required `*` is a wrapper-level affordance rendered as a plain
	// unclassed span so it doesn't claim a core class contract.
</script>

<label for={htmlFor} class={className || undefined}>
	{@render children?.()}
	{#if required}<span aria-hidden="true">*</span>{/if}
</label>
