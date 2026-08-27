<script lang="ts">
	import {
		ContainerBreakpoint,
		FitContainer,
		FitSlot,
		FitStep,
		Card
	} from '@keenmate/svelte-pure-admin';
	import MountLog from './MountLog.svelte';

	// Demo 1 — chart↔KPI, mount on demand. A width slider drives the stage; the
	// card inside measures its own width and swaps mode. The "chart" branch is a
	// MountLog that records mount/destroy so you can see it's only built in `wide`.
	let w1 = $state(640);
	let mode1 = $state('kpi');
	let logs = $state<string[]>(['(waiting — the panel is not built until the card reaches wide)']);
	function log(msg: string) {
		logs = [msg, ...logs].slice(0, 8);
	}

	// Demo 2 — one card, three levels (grid → tabs → icons), no JS in the page.
	let w2 = $state(760);
	let tab = $state<'orders' | 'stock' | 'sales'>('orders');
	const panels = {
		orders: { icon: 'fa-cart-shopping', label: 'Orders', n: '1,204' },
		stock: { icon: 'fa-boxes-stacked', label: 'Stock', n: '8,450' },
		sales: { icon: 'fa-chart-line', label: 'Sales', n: '$847K' }
	} as const;
</script>

<div class="pa-page-content">
	<h1>Responsive Fit</h1>
	<p class="text-muted">
		Two tools for making a component adapt to the space it's given — matched to
		cost. <code>ContainerBreakpoint</code> maps an element's width to a named
		<em>mode</em> so you <code>{'{#if}'}</code> on it and Svelte <strong>mounts only
		the branch that shows</strong> (never building the off-screen one).
		<code>FitContainer</code> folds a 1-D toolbar row, shrinking items as space
		runs out. Both wrap the <code>@keenmate/pure-admin-core</code> engines
		(v2.9.0-rc17).
	</p>

	<!-- ============================================================ -->
	<h2 class="mt-5">1 · Mount on demand — build the expensive branch only when it shows</h2>
	<p class="text-muted">
		The <code>chart</code> branch below is a stand-in for a Chart.js instance: it
		logs when it mounts and when it's destroyed. Drag the slider — the panel is
		<strong>constructed only when the card enters <code>chart</code> mode and
		destroyed when it leaves</strong>. That's the thing a CSS
		<code>@container</code> can't do — it would keep the hidden branch in the DOM.
	</p>

	<div class="d-flex align-items-center gap-2 my-3">
		<span class="text-muted">Card width</span>
		<input type="range" min="260" max="720" bind:value={w1} style="flex:1" />
		<output style="min-width:5ch;text-align:end">{w1}px</output>
		<span class="pa-badge pa-badge--primary">mode: {mode1}</span>
	</div>

	<div style="max-width:{w1}px; border:1px dashed var(--pc-border-color); border-radius:8px">
		<ContainerBreakpoint
			steps={{ kpi: 0, chart: 45 }}
			initial="kpi"
			onchange={(m) => (mode1 = m)}
		>
			{#snippet children({ mode })}
				<Card>
					<div class="d-flex align-items-center gap-3" style="padding:0.5rem">
						<div class="flex-1" style="min-width:0">
							<span class="pa-badge pa-badge--color-3">Beverages</span>
							<h4 class="mt-2 mb-1">Arabica Cold Brew</h4>
							<div class="text-muted"><code>SKU-4471</code> · 1 L bottle</div>
						</div>
						<div style="flex:0 0 auto">
							{#if mode === 'chart'}
								<MountLog label="Revenue chart" {log} />
							{:else}
								<div class="pa-stat">
									<div class="pa-stat__icon pa-stat__icon--success">📈</div>
									<div class="pa-stat__content">
										<div class="pa-stat__number">$847K</div>
										<div class="pa-stat__label">Revenue</div>
									</div>
								</div>
							{/if}
						</div>
					</div>
				</Card>
			{/snippet}
		</ContainerBreakpoint>
	</div>

	<div class="pa-card mt-2">
		<div class="pa-card__body">
			<strong>Mount log</strong>
			<ul class="mt-1 mb-0" style="font-family:var(--pc-font-family-mono,monospace);font-size:1.2rem">
				{#each logs as line}<li>{line}</li>{/each}
			</ul>
		</div>
	</div>

	<!-- ============================================================ -->
	<h2 class="mt-5">2 · Multi-level — grid → tabs → icon tabs</h2>
	<p class="text-muted">
		One <code>ContainerBreakpoint</code> with three modes. Wide → the three
		panels sit side-by-side; medium → they collapse into tabs; narrow → the tab
		labels drop to icons. Thresholds are <strong>rem</strong>
		(<code>34</code> = 340px, <code>64</code> = 640px at pure-admin's 10px root).
	</p>

	<div class="d-flex align-items-center gap-2 my-3">
		<span class="text-muted">Card width</span>
		<input type="range" min="260" max="880" bind:value={w2} style="flex:1" />
		<output style="min-width:5ch;text-align:end">{w2}px</output>
	</div>

	<div style="max-width:{w2}px; border:1px dashed var(--pc-border-color); border-radius:8px">
		<ContainerBreakpoint steps={{ icons: 0, tabs: 34, grid: 64 }} initial="tabs">
			{#snippet children({ mode })}
				<Card>
					<div style="padding:0.5rem">
						{#if mode === 'grid'}
							<div class="d-flex gap-3">
								{#each Object.values(panels) as p}
									<div class="flex-1">
										<h5 class="mb-1">{p.label}</h5>
										<div class="pa-stat">
											<div class="pa-stat__content">
												<div class="pa-stat__number">{p.n}</div>
												<div class="pa-stat__label">{p.label} · 30d</div>
											</div>
										</div>
									</div>
								{/each}
							</div>
						{:else}
							<div class="pa-tabs pa-tabs--full">
								{#each Object.entries(panels) as [key, p]}
									<button
										class="pa-tabs__item"
										class:pa-tabs__item--active={tab === key}
										onclick={() => (tab = key as typeof tab)}
									>
										<i class="fa-solid {p.icon}"></i>
										{#if mode === 'tabs'}<span>{p.label}</span>{/if}
									</button>
								{/each}
							</div>
							<div class="mt-3 pa-stat">
								<div class="pa-stat__content">
									<div class="pa-stat__number">{panels[tab].n}</div>
									<div class="pa-stat__label">{panels[tab].label} · 30d</div>
								</div>
							</div>
						{/if}
					</div>
				</Card>
			{/snippet}
		</ContainerBreakpoint>
	</div>

	<!-- ============================================================ -->
	<h2 class="mt-5">3 · FitContainer — fold a toolbar row</h2>
	<p class="text-muted">
		A 1-D row that degrades as it narrows. <strong>Save</strong> is pinned
		(<code>data-pa-fit-ignore</code>); <strong>Duplicate</strong> and
		<strong>Export</strong> shrink label → icon (<code>FitSlot strategy="steps"</code>,
		higher priority survives longer); <strong>Delete</strong> is untagged, so it
		inherits the container's default priority and folds first. Narrow the window
		to watch it fold.
	</p>

	<Card>
		<FitContainer class="d-flex align-items-center gap-2" defaultPriority={20}>
			<button class="pa-btn pa-btn--primary" data-pa-fit-ignore>💾 Save</button>
			<FitSlot strategy="steps" priority={40} tag="button" class="pa-btn">
				<FitStep>⧉ Duplicate</FitStep>
				<FitStep>⧉</FitStep>
			</FitSlot>
			<FitSlot strategy="steps" priority={30} tag="button" class="pa-btn">
				<FitStep>⬇️ Export</FitStep>
				<FitStep>⬇️</FitStep>
			</FitSlot>
			<button class="pa-btn">🗑️ Delete</button>
		</FitContainer>
	</Card>
</div>
