<script lang="ts">
	/**
	 * Pure Admin Popover Component (Svelte 5)
	 * Based on @pure-admin/core popovers
	 */

	type PopoverPosition = 'top' | 'right' | 'bottom' | 'left';
	type PopoverSize = 'sm' | 'lg';

	interface Props {
		/** Popover title */
		title: string;
		/** Popover position */
		position?: PopoverPosition;
		/** Popover size */
		size?: PopoverSize;
		/** Trigger button text */
		triggerText?: string;
		/** Additional CSS classes */
		class?: string;
		/** Trigger snippet (custom trigger button) */
		trigger?: import('svelte').Snippet;
		/** Children content (popover body) */
		children?: import('svelte').Snippet;
	}

	let {
		title,
		position,
		size,
		triggerText = '?',
		class: className = '',
		trigger,
		children
	}: Props = $props();

	let isOpen = $state(false);
	let popoverRef = $state<HTMLDivElement>();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-popover'];
		if (position) base.push(`pa-popover--${position}`);
		if (size) base.push(`pa-popover--${size}`);
		if (isOpen) base.push('pa-popover--open');
		if (className) base.push(className);
		return base.join(' ');
	});

	function togglePopover(event: MouseEvent) {
		event.stopPropagation();
		isOpen = !isOpen;
	}

	function closePopover() {
		isOpen = false;
	}

	function handleClickOutside(event: MouseEvent) {
		if (popoverRef && !popoverRef.contains(event.target as Node)) {
			closePopover();
		}
	}

	$effect(() => {
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
			return () => {
				document.removeEventListener('click', handleClickOutside);
			};
		}
	});
</script>

<div bind:this={popoverRef} class={classes()}>
	{#if trigger}
		<button class="pa-popover__trigger" onclick={togglePopover}>
			{@render trigger()}
		</button>
	{:else}
		<button class="pa-popover__trigger" onclick={togglePopover}>{triggerText}</button>
	{/if}
	<div class="pa-popover__content">
		<div class="pa-popover__header">
			<h4>{title}</h4>
			<button class="pa-popover__close" onclick={closePopover}>×</button>
		</div>
		<div class="pa-popover__body">
			{@render children?.()}
		</div>
	</div>
</div>
