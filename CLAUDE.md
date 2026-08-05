# @keenmate/svelte-pure-admin — Claude Notes

Svelte 5 component library wrapping the Pure Admin CSS framework (`@keenmate/pure-admin-core`) into reusable, type-safe components. Every component must mirror the HTML structure from the core framework's snippet library.

**Stack:** Svelte 5 (runes) · SvelteKit 2.x library mode · TypeScript · Vite · `@keenmate/pure-admin-core` v2.9.0-rc08

## Core rules

1. **Snippet-driven** — read the corresponding `.html` snippet (or SCSS source for data-display / data-viz) before writing any component. Never guess HTML structure or class names.
2. **Svelte 5 runes only** — `$props()`, `$state()`, `$derived()`. No `export let`, no `$:`, no `<slot>`. See [guides/svelte5-patterns.md](docs/guides/svelte5-patterns.md).
3. **BEM class names** — `pa-[block]__[element]--[modifier]`, exactly as in snippets.
4. **TypeScript Props interface** — every component declares its props with an `interface Props`.
5. **Children as snippets** — `{#snippet}` blocks via `import('svelte').Snippet`, not `<slot>`.
6. **`class?: string` prop** — always accept custom classes.
7. **Logical directions** — `start`/`end`, never `left`/`right` (RTL support). Tooltip + Popconfirm use logical classes in core ≥ v2.5.0.
8. **KeenMate naming** — `on*` for fire-and-forget events, `*Callback` only when return value is used, `is*` / `should*` for booleans. See [guides/naming-conventions.md](docs/guides/naming-conventions.md).
9. **Test against original** — compare with pure-admin demo (port 3000) for visual parity.

## Guide files

- [Svelte 5 patterns](docs/guides/svelte5-patterns.md) — runes, snippets, class building, standard template, BEM
- [Naming conventions](docs/guides/naming-conventions.md) — KeenMate prop suffixes / prefixes
- [TypeScript types](docs/guides/typescript-types.md) — common variant / size / alignment / sentiment types

## Reference paths

- **Snippets:** `../pure-admin/packages/core/snippets/` — one `.html` file per component
- **Core SCSS:** `../pure-admin/packages/core/src/scss/`
  - `core-components/_data-display.scss` — Field, Fields, DescTable, DotLeaders, PropCard, Banded, AccentGrid (no snippet file)
  - `core-components/_data-viz.scss` — Progress, StackedBar, ProgressRing, Gauge, DataBar, Heatmap, Sparkline, BarList (no snippet file)
- **Demo:** `../pure-admin/demo/` (runs on port 3000)
- **Core changelog:** `../pure-admin/packages/core/CHANGELOG.md` — authoritative breaking-change history
- **Library exports:** `packages/svelte-pure-admin/src/lib/index.ts`

## Component status

All 68 core components are implemented (Layout, Forms, Buttons, Alert, Card, Badge, Table, Modal, Toast, Loader/Spinner, Profile, Data Display, Data Viz, Config). See `src/lib/index.ts` for the full export list. Per-component prop documentation lives in source.

## CSS import (consumer)

Consumers must import the core CSS:

```css
@import '@keenmate/pure-admin-core/css';
```

## Theme management (docs site)

Docs themes are managed by the **`npx @keenmate/pureadmin` CLI** — run `npx @keenmate/pureadmin --llm` for the authoritative reference. Do **not** reverse-engineer the theme loader; use the CLI + config files.

Three config files live in the **project root** (not `docs/`), modelled on `package.json`:

- `pureadmin.json` — committed declarations: `themesDir` (`docs/static/themes`) + the theme list (remote-sourced by default). Hand-edited; never touched by automated commands.
- `pureadmin.lock.json` — committed, tool-managed resolutions (version / content_sha / source per theme).
- `.pureadmin.json` — **gitignored, per-developer** overrides. Local theme `path` overrides go here.

**Load themes from the local `../pure-admin-themes` repo** (built at the current core version): add a `path` per theme to `.pureadmin.json` — `{ "themes": { "audi": { "path": "../pure-admin-themes/audi" }, … } }` (relative to project root) — then `npx @keenmate/pureadmin themes install`. Install re-copies `--path` themes from disk each run (no network) and does **not** pollute the committed lock (reports `override; lock=registry vX`). `docs/static/themes/` is gitignored.

**Version-coupling gotcha:** a theme's CSS (`css/<id>.css` or `dist/<id>.css`) is **compiled CSS that bundles pure-admin-core + theme overrides**. So the docs is *styled* by whichever core version is baked into the active theme — independent of the component-library / core-JS version. Symptom: themes locked at an older core (e.g. 2.7.0) lack newer core CSS (e.g. 2.9.0 Stat fit-mode: `data-pa-stat-fit` / `pa-stat__slot` / `pa-stat__group`), so JS-driven features render then collapse (the JS restructures the DOM but the CSS has no rules for it). Fix: install themes built at the matching core version. `+layout.server.ts` `resolveCssRelative()` probes `css/<id>.css` → `dist/<id>.css` → manifest `file`, so both packaged and local-`dist` layouts resolve.

## Workflow for a new / updated component

1. Read the snippet (or SCSS source).
2. Identify HTML structure, class patterns, variants, modifiers.
3. Create / update `src/lib/[ComponentName].svelte` per the standard template.
4. Add Props interface with full TS types.
5. Export from `src/lib/index.ts`.
6. Add / update the demo showcase.
7. `npm run dev` (port 5173) → compare visually with the pure-admin demo (port 3000).

## Known upstream gaps

- **Composite badge missing `--btn-danger` variant.** Other button-section colour overrides exist; the base defaults are danger-coloured so the gap is cosmetic, but inconsistent.
- **Timeline `--alternating` uses physical `left/right`.** `--simple` and `--feed` mirror correctly in RTL; `--alternating` (and its `--start`/`--end`/`--keep-layout`/`--single-column` modifiers) stays on the same physical sides under `dir="rtl"`. Upstream-scope fix.
- **`.pa-spinner` only has `--xs`.** Larger sizes (`--sm/md/lg/xl/2xl`) advertised in pure-admin demo do not exist in SCSS. Our `Spinner.svelte` type now reflects this (`size?: 'xs'`).
- **Do not wrap yet (unstable upstream APIs):** `file-selector`, `logic-tree`, `smart-filters` (a.k.a. `query-editor`).
- **Overflow toolbar (`.pa-overflow` / `js/overflow.js`) is core-JS-driven raw markup, NOT a library component.** rc06 **removed** the earlier auto-absorb mechanism (`.pa-btn-split--auto-absorb` + `.pa-btn-toolbar` + `btn-split-auto-absorb.js`) — where overflowing siblings folded into a domain split button's own dropdown — and replaced it with `.pa-overflow`: a generic progressive-collapse row that auto-appends its own dedicated `[⋮]` "more" trigger, and collapses a `.pa-btn-split` child atomically (primary + its own menu rows, under a section label). Attribute renames: `data-pa-absorb-priority` → `data-pa-actions-priority`, `data-pa-absorb-from` → `data-pa-actions-overflow-from`. The docs demo (`docs/src/routes/buttons/OverflowToolbar.svelte`) renders the raw core markup and drives `overflow.js` + `split-button.js` directly. `Card`'s `isActionsOverflow` already uses the card-flavoured `.pa-card__actions--overflow` alias of the same primitive.
- **`SplitButton` honours `data-pa-keep-open`.** A menu item (or ancestor) with the attribute keeps the menu open on click (for actions that spawn their own popover, e.g. a `Popconfirm`). Backward compatible; mirrors core's rc06 opt-out in `split-button.js` — so `data-pa-keep-open` is one convention across both our Svelte-native `SplitButton` and raw-core overflow/split markup.
- **Buttons are centered by default (core rc06 unified content model).** `.pa-btn` is one `inline-flex` row (center) for every type; icon+label full-width buttons that used to left-align now center — add `--align-start` where the old look is wanted. Our `Button` `align` prop maps to the `--align-*` modifiers.

### Thin JS-wrapper components (core v2.9.0-rc)

Since core 2.9.0-rc04 the framework ships interactive behaviours as IIFEs under `@keenmate/pure-admin-core/js/*` (each attaches a `window.Pa*` API and auto-inits on `DOMContentLoaded`). These wrappers render the BEM markup and drive that JS:

- **Splitter** (`layout/Splitter.svelte` + `SplitterPane` + `SplitterGutter`) → `js/splitter.js` / `window.PaSplitter`. Place panes with a `<SplitterGutter>` between each pair (mirrors the snippet's alternation). Root events `pa-splitter:resize|collapse|expand` → `onresize` / `oncollapse` / `onexpand` callbacks.
- **RangeGroup** (`forms/RangeGroup.svelte`) → `js/range-group.js` / `window.PaRangeGroup`. Data-driven via a `rows` prop; events `pa-range-group:change|apply|reset` → callbacks with the `values` payload. Needs `window.FloatingUIDOM` (same as SplitButton).
- **Card actions-overflow** — `Card` props `isActionsOverflow` / `actionsOverflowFrom` add `.pa-card__actions--overflow` and init `js/overflow.js` (`window.PaOverflow` / back-compat alias `window.PaCardActionsOverflow`). Needs `window.FloatingUIDOM`. Same primitive as the standalone `.pa-overflow` toolbar (see Known upstream gaps); uses `data-pa-actions-priority` / `data-pa-actions-overflow-from`.
- **Stat fit-mode** — `Stat` props `isFit` / `contextText` add `data-pa-stat-fit` and init `js/pa-stat-fit.js` (`window.PaStatFit`), re-fitting on `number` change.

**Wrapper mechanics:** dynamic-import the IIFE inside `onMount` via `internal/core-js.ts` (SSR-safe — the IIFEs read `document` at eval time). `tsconfig.json` maps `@keenmate/pure-admin-core/js/*` to `internal/core-js.stub.d.ts` so `checkJs` doesn't lint the (symlinked, therefore in-program) core JS; the `window.Pa*` APIs are typed in `global.d.ts`. Init helpers that scan *descendants* (`PaRangeGroup`, `PaStatFit`) are given a `display:contents` host to init on.

## Breaking changes

Version-by-version breaking-change history lives in `CHANGELOG.md` (this repo) and `../pure-admin/packages/core/CHANGELOG.md` (upstream). Notable currently-load-bearing items already captured in the rules above (logical directions, runes-only, lowercase event handlers).

---

**Pure Admin Core:** 2.9.0-rc08 (synced) · **Svelte:** 5.x · **SvelteKit:** 2.x
