# @keenmate/svelte-pure-admin — Claude Notes

Svelte 5 component library wrapping the Pure Admin CSS framework (`@keenmate/pure-admin-core`) into reusable, type-safe components. Every component must mirror the HTML structure from the core framework's snippet library.

**Stack:** Svelte 5 (runes) · SvelteKit 2.x library mode · TypeScript · Vite · `@keenmate/pure-admin-core` v2.7.0

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

## Breaking changes

Version-by-version breaking-change history lives in `CHANGELOG.md` (this repo) and `../pure-admin/packages/core/CHANGELOG.md` (upstream). Notable currently-load-bearing items already captured in the rules above (logical directions, runes-only, lowercase event handlers).

---

**Pure Admin Core:** 2.7.0 (synced) · **Svelte:** 5.x · **SvelteKit:** 2.x
