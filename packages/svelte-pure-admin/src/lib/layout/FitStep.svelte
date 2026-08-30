<script lang="ts">
	/**
	 * FitStep — one ranked variant inside a `<FitSlot strategy="steps">` (core
	 * Navbar Fit, `fit.js`). The engine shows the largest step that fits and
	 * climbs down the ladder (0 → 1 → 2 … → hidden) as the header narrows.
	 *
	 * You only order the steps by writing them widest-first; this component derives
	 * each one's `data-pc-fit-step` index from its DOM position (via the parent
	 * `FitSlot`'s context) and stamps `pc-fit-hidden` on every step after the first,
	 * so before the JS runs only the widest variant paints (no stacked-flash, no-JS
	 * safe). That removes the two error-prone authoring rules you'd otherwise hand-apply.
	 *
	 * Renders a single `<span data-pc-fit-step="N">` that must be a DIRECT child of
	 * the steps slot — which it is, since Svelte components add no wrapper DOM.
	 */
	import { getContext } from 'svelte';
	import { FIT_STEPS_KEY, type FitStepsContext } from './fit-steps-context';

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Step content (text or rich markup) */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();

	const ctx = getContext<FitStepsContext | undefined>(FIT_STEPS_KEY);
	// Index in DOM order: 0 = largest/default. Outside a steps FitSlot, fall back to 0.
	const index = ctx ? ctx.next() : 0;

	const classes = $derived(() => {
		const base: string[] = [];
		// Every step past the first is hidden until the engine promotes it — correct first paint.
		if (index > 0) base.push('pc-fit-hidden');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<span class={classes()} data-pc-fit-step={index}>
	{@render children?.()}
</span>
