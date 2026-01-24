<script lang="ts">
	/**
	 * Pure Admin Link Component (Svelte 5)
	 * For anchor/hyperlink elements
	 */

	interface Props {
		/** Link URL */
		href: string;
		/** Link target */
		target?: '_blank' | '_self' | '_parent' | '_top';
		/** Link title (tooltip) */
		title?: string;
		/** Additional CSS classes */
		class?: string;
		/** Click handler */
		onclick?: (event: MouseEvent) => void;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		href,
		target,
		title,
		class: className = '',
		onclick,
		children
	}: Props = $props();
</script>

<a {href} {target} {title} class={className || undefined} {onclick}>
	{@render children?.()}
</a>
