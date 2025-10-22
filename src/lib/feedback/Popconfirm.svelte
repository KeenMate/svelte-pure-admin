<script lang="ts">
	/**
	 * Pure Admin Popconfirm Component (Svelte 5)
	 * Based on @pure-admin/core snippets/popconfirm.html
	 *
	 * Small confirmation dialogs anchored to trigger elements.
	 * Perfect for delete confirmations and quick yes/no decisions.
	 *
	 * Requires: Floating UI (FloatingUIDOM) loaded globally
	 */

	import { onMount } from 'svelte';

	type Position = 'top' | 'bottom' | 'left' | 'right';
	type IconVariant = 'danger' | 'warning' | 'info';

	interface Props {
		/** Show/hide popconfirm */
		show?: boolean;
		/** Message to display */
		message: string;
		/** Position relative to trigger */
		position?: Position;
		/** Icon variant */
		icon?: IconVariant;
		/** Compact size */
		compact?: boolean;
		/** Confirm button text */
		confirmText?: string;
		/** Cancel button text */
		cancelText?: string;
		/** Confirm button variant */
		confirmVariant?: string;
		/** Trigger element (for positioning) */
		trigger?: HTMLElement | null;
		/** Confirm callback */
		onConfirm?: () => void;
		/** Cancel callback */
		onCancel?: () => void;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		show = $bindable(false),
		message,
		position = 'bottom',
		icon,
		compact = false,
		confirmText = 'Confirm',
		cancelText = 'Cancel',
		confirmVariant = 'primary',
		trigger = null,
		onConfirm,
		onCancel,
		class: className = ''
	}: Props = $props();

	let popconfirmEl: HTMLDivElement;
	let actualPosition = $state<Position>(position);
	let mounted = $state(false);

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-popconfirm', `pa-popconfirm--${actualPosition}`];
		if (compact) base.push('pa-popconfirm--compact');
		if (show) base.push('is-open');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build message class string
	const messageClasses = $derived(() => {
		const base = ['pa-popconfirm__message'];
		if (icon) {
			base.push('pa-popconfirm__icon');
			base.push(`pa-popconfirm__icon--${icon}`);
		}
		return base.join(' ');
	});

	async function updatePosition() {
		if (!show || !trigger || !popconfirmEl || typeof window === 'undefined') return;

		// Check if Floating UI is available
		if (!window.FloatingUIDOM) {
			console.warn('Floating UI not loaded. Popconfirm positioning may be incorrect.');
			return;
		}

		const { computePosition, flip, shift, offset } = window.FloatingUIDOM;

		try {
			const { x, y, placement } = await computePosition(trigger, popconfirmEl, {
				placement: position,
				middleware: [
					offset(8),
					flip(),
					shift({ padding: 10 })
				]
			});

			actualPosition = placement.split('-')[0] as Position;

			Object.assign(popconfirmEl.style, {
				left: `${x}px`,
				top: `${y}px`
			});
		} catch (error) {
			console.error('Error positioning popconfirm:', error);
		}
	}

	function handleConfirm() {
		if (onConfirm) onConfirm();
		show = false;
	}

	function handleCancel() {
		if (onCancel) onCancel();
		show = false;
	}

	function handleClickOutside(event: MouseEvent) {
		if (!show) return;

		const target = event.target as Node;
		if (
			popconfirmEl &&
			!popconfirmEl.contains(target) &&
			trigger &&
			!trigger.contains(target)
		) {
			show = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	$effect(() => {
		if (show && trigger) {
			// Use setTimeout to ensure DOM is ready and trigger is positioned
			setTimeout(() => updatePosition(), 0);
		}
	});

	$effect(() => {
		if (!show) return;

		const handleScroll = () => updatePosition();
		const handleResize = () => updatePosition();

		window.addEventListener('scroll', handleScroll, true);
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('scroll', handleScroll, true);
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div bind:this={popconfirmEl} class={classes()}>
	<div class="pa-popconfirm__arrow"></div>
	<div class="pa-popconfirm__content">
		<div class={messageClasses()}>
			<p>{message}</p>
		</div>
		<div class="pa-popconfirm__actions">
			<button class="pa-btn pa-btn--secondary" onclick={handleCancel}>
				{cancelText}
			</button>
			<button class={`pa-btn pa-btn--${confirmVariant}`} onclick={handleConfirm}>
				{confirmText}
			</button>
		</div>
	</div>
</div>

<svelte:window />
