# pure-admin v2.5.0 ↔ svelte-pure-admin v1.6.2 — Sync Comparison

> **Generated:** 2026-04-25
> **Status:** ✅ Sync executed — see "Implementation status" section at the end. Target version: svelte-pure-admin v1.7.0.
> **Reviewed against:** `@keenmate/pure-admin-core` v2.5.0 (was v2.2.0 at last sync per CLAUDE.md)
> **Scope:** core CHANGELOG entries 2.3.0 → 2.5.0, full snippets audit pass (27 audits + 4 new snippets) and `snippets/AUDIT.md`.

---

## TL;DR

The svelte-pure-admin wrapper is **3 minor versions behind** the core (2.2 → 2.5). The good news: most v2.3.x work was already absorbed (SplitButton, FilterCard, NotificationsPanel, theme color slots), so the actual delta is smaller than the version gap suggests.

**Real work to do (in priority order):**
1. **Alerts (BREAKING)** — heading no longer auto-large; `--multiline` modifier; size-scale change. Visible defaults shift.
2. **Toast service API** — `actions` array + `maxWidth` per-toast option only reachable via component snippet today; no programmatic service.
3. **Notifications page-view variant** — only dropdown is implemented; full-page list with hover-revealed actions is missing.
4. **KpiGrid wrapper** — small but useful — negates per-tile margin around `pa-stat--square` grids.
5. **Snippet/SCSS doc sync** — 27 audited snippets now have richer guidance, deferred-component flags, and documented physical/logical mismatches we should mirror in CLAUDE.md.

Nothing in v2.3.x–v2.5.0 invalidates components we already shipped, but **Alerts will look different** after picking up 2.5.0 CSS — even without any Svelte changes — because padding scale and default `align-items` flipped. Plan a coordinated bump.

---

## 1. What changed in pure-admin since v2.2.0

### 1.1 `[2.5.0] 2026-04-25` — published, NOT YET CONSUMED

| Type | Item |
|---|---|
| BREAKING | `pa-alert__heading` no longer hardcoded to `font-size-lg` — defaults to body size + semibold; new `pa-alert__heading--lg` modifier for the punchy variant |
| BREAKING | `pa-popconfirm--right`/`--left` → `--end`/`--start`; SCSS uses `inset-inline-*`/`margin-inline-*` |
| Changed | Alert default `align-items: flex-start` → `center`; new `pa-alert--multiline` opt-out for icon + multi-line content |
| Changed | `pa-alert__actions` now renders with toast-style `border-top` separator |
| Changed | `_pagers.scss` deduplicated; load-more spinner now uses `var(--pa-accent)` (live theme response) |
| Fixed | Alert size scale was a no-op — `--sm`/default/`--lg` now genuinely differ. New variables: `$alert-padding-{sm,lg}-{v,h}`, `$alert-font-size-{sm,lg}`. Default V went from `1.2rem` → `0.75rem` (visibly tighter), H from `1rem` → `1.25rem` (looser). |
| Fixed | Alert flex-wrap: `__heading`, `__list`, `__actions`, top-level `<p>`, `<hr>` now `flex-basis: 100%` (stack instead of inline-flex) |
| Added | `/showcases/form-demo` page in pure-admin demo app (vanilla-JS port of LiveView form pattern) |
| Docs | 27 snippets audited (one per commit), four new snippets added: `filter-card.html`, `statistics.html`, `notifications.html`, `data-display.html` |

### 1.2 `[2.4.0] 2026-04-16`

| Type | Item |
|---|---|
| Added | Theme-aware D3 dashboard chart pattern (demo only, but documents the SVG-text font-family pitfall — useful for our docs site) |
| Removed | `download-themes` bin — now handled by external `pureadmin` CLI (`npx pureadmin themes add <id>`) |
| Fixed | `pa-stat--square` colour variants now use `var(--pa-accent)` etc. instead of raw SCSS vars (themes work) |
| Fixed | Profile panel header readability + role-badge tinting on dark headers |

### 1.3 `[2.3.6] 2026-04-04`

| Type | Item |
|---|---|
| Added | `pa-font-responsive` shorthand + `pa-font-base-{9-12}`/`pa-font-mobile-{9-12}` utility classes for declarative, FOUC-free `<html>` font scaling |
| Added | Getting Started demo page (CLI install, theme management, RTL, BEM reference) |

### 1.4 `[2.3.5] 2026-04-01`

| Type | Item |
|---|---|
| Fixed | Navbar `__end` alignment (added `margin-inline-start: auto`) |
| Fixed | `pa-scroll-lock` changed from `overflow: hidden` → `overflow-y: scroll` to prevent layout shift |

### 1.5 `[2.3.4] 2026-03-31` — Command palette home & hotkeys

| Type | Item |
|---|---|
| Added | Command palette home screen (`__home`, `__home-section`, `__home-heading`) with categorized commands + hotkey badges |
| Added | Hotkeys: `Alt+D` Deploy, `Alt+A` Assign, `Alt+G` Go to Page, `Alt+T` Switch Theme |
| Added | `pa-command-palette__shortcut` flex container for multi-key badge groups |
| Added | CSS variables `--pa-command-palette-key-font-size` and `--pa-command-palette-key-font-weight` |
| Added | Form codes for `/go` (numeric quick-jump codes) |
| Changed | Dropdown `z-index` 1000 → 7500 |
| Fixed | Palette resets on close (placeholder/results/tokens/mode); search highlights persist during arrow nav |

### 1.6 `[2.3.3] 2026-03-30` — Command palette rewrite

| Type | Item |
|---|---|
| Added | Multi-step wizards (`/deploy`, `/assign`, `/go`, `/theme`), context search (`:p`, `:u`, `:o`), inline/tokens display modes |
| Added | `pa-command-palette__input-wrapper`, `__token-prompt`, `__menu-inner` |
| Added | `--pa-command-palette__key-bg/key-text` CSS variables |
| Changed | Standardized `pa-badge` instead of bespoke `__item-badge` |
| Changed | Loading overlay uses `color-mix()` with `var(--pa-modal-content-bg)` (fixes white-on-dark) |

### 1.7 `[2.3.2] 2026-03-30`

| Type | Item |
|---|---|
| Added | `--pa-border-radius-sm/--pa-border-radius/--pa-border-radius-lg` CSS variables (themable) |
| Added | `--pa-btn-secondary-outline-color` CSS variable |
| Added | `pa-btn-split__menu-inner` (two-container clip pattern) and `pa-btn-split__item-row` (inline-action rows) |
| Removed | `translateY(-1px)` hover lift on `.pa-btn` and `.pa-stat--square` (was clipping inside `overflow: hidden` containers) |
| Fixed | Button `vertical-align: middle` for mixed-size rows |

### 1.8 `[2.3.0] 2026-03-26` — Toast actions

| Type | Item |
|---|---|
| Added | `pa-toast__actions` (border-top separator, flex row); JS `actions: [{label, variant, onClick}]` option |
| Added | Toast service `maxWidth` per-toast option |
| Added | Container `min-width` ratchet (widest toast pins width, shorter toasts don't shrink) |
| Changed | Toast progress bar 3 → 5px height, opacity 0.3 → 0.6 |

---

## 2. svelte-pure-admin status — what's already done

| pure-admin change | Svelte status |
|---|---|
| Toast `__actions` element (v2.3.0) | ✅ `Toast.svelte` exposes `actions` snippet + `maxWidth` prop (verified at `feedback/Toast.svelte:32-37`) |
| `pa-btn-split__menu-inner` two-container (v2.3.2) | ✅ Already rendered at `buttons/SplitButton.svelte:246` |
| Theme color slot variants on Alert/Button/Callout/Toast (v2.2.0) | ✅ `themeColor: 1-9` prop on all four components |
| FilterCard component (new snippet v2.5.0) | ✅ `display/FilterCard.svelte` covers all BEM elements + `--loading` and `--disabled` |
| Statistics — `.pa-stat`, `--hero`, `--hero-compact`, `--square`, 6 colour variants (new snippet v2.5.0) | ✅ `display/Stat.svelte` covers everything except `.pa-kpi-grid` wrapper |
| NotificationsPanel — bell + dropdown (new snippet v2.5.0) | ⚠️ Dropdown panel done; **page-view variant missing** |
| Data display — Field/Fields/FieldGroup/DescTable/PropCard/Banded/AccentGrid/DotLeaders (new snippet v2.5.0) | ✅ Full coverage including 15+ `.pa-fields` modifiers and copy patterns |
| Command palette home screen + hotkeys (v2.3.3/v2.3.4) | ⚠️ `navigation/CommandPalette.svelte` has tokens + multi-step + home; **no separate `ShortcutHelp` component**, hotkey conventions undocumented |
| Border-radius CSS vars (v2.3.2) | ✅ Components use `var(--pa-border-radius-*)` already (CSS-side; nothing to do in Svelte) |
| Popconfirm logical positioning (v2.5.0 BREAKING) | ⚠️ Component already accepts `start`/`end` and **maps to physical CSS classes internally** — works today, but the mapping hack can now be removed because SCSS uses logical class names natively |

---

## 3. Real gaps — what we need to do

### 3.1 Alert (BREAKING — visible default change without any Svelte edits)

**File:** `packages/svelte-pure-admin/src/lib/feedback/Alert.svelte`

Picking up core 2.5.0 changes the *appearance* of every existing alert in our consumers, even with no API change:
- Default vertical padding goes from `1.2rem` to `0.75rem` (tighter).
- Default horizontal padding goes from `1rem` to `1.25rem` (looser).
- Default `align-items` is now `center` — single-line icon + content centres correctly, but multi-line will look wrong without `pa-alert--multiline`.
- `pa-alert__heading` is no longer big — anyone who used `headingText="…"` will get a smaller heading. To preserve old appearance, must apply `pa-alert__heading--lg`.

**Required props to add:**
```ts
/** Larger heading style (was the default before v2.5.0 — opt-in now) */
isHeadingLarge?: boolean;
/** Switch back to flex-start alignment (icon + multi-line content stacks cleanly) */
isMultiline?: boolean;
```

Apply `pa-alert__heading--lg` on the `<h4>` when `isHeadingLarge`, and `pa-alert--multiline` on the root container when `isMultiline`.

### 3.2 Toast service (programmatic API gap)

We expose `Toast.svelte` with `actions` snippet + `maxWidth` prop, but **there's no toast service** (`PureAdmin.toast.show(...)` equivalent). The pure-admin demo invokes:
```js
PureAdmin.toast.show({
  variant: 'success', titleText: '…', messageText: '…',
  maxWidth: '50rem',
  actions: [{ label: 'Undo', variant: 'secondary', onClick: id => {…} }]
});
```

The form-demo page leans on this for optimistic-delete-with-undo. To match, `services/` needs a `toast.svelte.ts` or similar that:
- Owns a `$state` array of toasts.
- Renders via a `<ToastContainer>` mounted at app root.
- Accepts `actions: { label, variant, onclick }[]` and `maxWidth` per call.
- Implements the **container `min-width` ratchet** (pure-admin-only behaviour today; tracks max width seen, resets when empty).

**File:** new `packages/svelte-pure-admin/src/lib/services/toast.svelte.ts`.

### 3.3 NotificationsPanel — page-view variant

**File:** `packages/svelte-pure-admin/src/lib/feedback/NotificationsPanel.svelte`

Today it's bell + dropdown only. The new snippet documents `.pa-notifications__list--page` for full-page lists with:
- Larger padding + bigger icons.
- `__actions` slot with hover-reveal on desktop, always-visible on mobile.
- Optional `pa-checkbox` integration for bulk operations.

Add `isPageView?: boolean` (or split into `<NotificationsList>` standalone) and an `actions` snippet per item.

### 3.4 KpiGrid wrapper component — new

**File:** new `packages/svelte-pure-admin/src/lib/display/KpiGrid.svelte`

Single-purpose wrapper that applies `.pa-kpi-grid` (negative margin negating the per-tile `$spacing-sm` of `.pa-stat--square`). One file; small but documented in the new statistics snippet.

### 3.5 Popconfirm — drop physical-class mapping

**File:** `packages/svelte-pure-admin/src/lib/feedback/Popconfirm.svelte`

CLAUDE.md notes the component currently maps logical `start`/`end` props to physical `pa-popconfirm--left`/`--right` CSS classes because the SCSS used physical class names. v2.5.0 fixes the SCSS — we can now emit `pa-popconfirm--start`/`--end` directly and delete the translation layer. Pure cleanup; visible RTL benefit.

### 3.6 Command palette — extract `ShortcutHelp`, document hotkeys

**File:** `packages/svelte-pure-admin/src/lib/navigation/CommandPalette.svelte` (refactor) + new `ShortcutHelpDialog`-style `ShortcutHelp.svelte` (we already have `ShortcutHelpDialog.svelte` — verify it matches the v2.3.3+ structure).

Less urgent than alerts/toast but worth aligning with the rewritten snippet (home screen elements, hotkey badge styling, `__menu-inner`, `__token-prompt`).

---

## 4. Documentation/CLAUDE.md gaps

These don't change shipped code but block future work from being correct first time:

- **CLAUDE.md says "Pure Admin Core Version: 2.2.0 (synced)"** — bump to 2.5.0 once the work above lands. Update the breaking-changes log with v2.3.x and v2.5.0 entries (alerts heading, popconfirm logical, etc.).
- **No mention of `pa-font-responsive` / `pa-font-base-N` / `pa-font-mobile-N` utility classes (v2.3.6).** These are pure CSS — no Svelte component needed — but the docs site setup guide should call them out so consumers know how to scale base font.
- **No mention of border-radius CSS variables (v2.3.2)** as a theming surface. Add to docs site theming section.
- **No mention of Command Palette hotkey conventions** (Ctrl+K, Alt+D/A/G/T) in our docs. Useful for downstream apps.
- **`AUDIT.md` flags known issues we should track in our backlog**:
  - Composite badge missing `--btn-danger` variant (parity gap upstream — informational).
  - Timeline `--alternating` uses physical `left/right` (broken in RTL upstream — note in our Timeline component docs).
  - `.pa-spinner` ghost size modifiers (`--sm/md/lg/xl/2xl`) don't exist in SCSS — only `--xs` does. Our `Spinner.svelte` should not advertise those sizes.

---

## 5. Recommended sequencing

**Phase 1 — Visible-impact bump (target v1.7.0):**
1. Bump `@keenmate/pure-admin-core` dependency to `^2.5.0`.
2. Alert: add `isHeadingLarge` + `isMultiline` props (with deprecation notice in changelog explaining the visual shift).
3. Popconfirm: drop the physical-class translation; emit logical classes directly.
4. Smoke-test the demo/docs site for any alert that suddenly looks wrong; add `isHeadingLarge` where needed.
5. Spinner: prune the non-existent ghost size modifiers.

**Phase 2 — API parity (target v1.7.0 or v1.7.1):**
6. New `services/toast.svelte.ts` with `actions` + `maxWidth` + `min-width` ratchet.
7. NotificationsPanel: add `isPageView` variant + per-item `actions` snippet.
8. New `display/KpiGrid.svelte`.

**Phase 3 — Polish (v1.7.x):**
9. Verify `ShortcutHelpDialog` against v2.3.3+ snippet structure; refactor if needed.
10. CLAUDE.md sync: bump version, add v2.3.x/v2.5.0 breaking-change notes, add font-utility reference, add CSS-var theming section, note known upstream gaps (composite badge `--btn-danger`, alternating timeline RTL).
11. Docs site: add font-sizing utilities guide; add hotkey conventions to Command Palette doc.

---

## 6. Out of scope (deferred upstream — don't build)

`AUDIT.md` lists three components pure-admin themselves are deferring until APIs stabilize:
- `file-selector` (`_file-selector.scss`)
- `logic-tree` (`_logic-tree.scss`)
- `smart-filters` aka `query-editor` (`forms/_query-editor.scss`)

Don't wrap these in Svelte yet — they'll churn.

---

## Implementation status (2026-04-25)

All Phase 1 + 2 + 3 items shipped in a single pass.

| # | Item | File(s) | Status |
|---|---|---|---|
| 1 | Bump core peerDependency `^2.3.5` → `^2.5.0` | `packages/svelte-pure-admin/package.json` | ✅ |
| 2 | Alert: `isHeadingLarge` + `isMultiline` props | `src/lib/feedback/Alert.svelte` | ✅ |
| 3 | Popconfirm: drop physical-class translation | `src/lib/feedback/Popconfirm.svelte` | ✅ |
| 4 | Spinner: prune non-existent ghost size modifiers (type narrowed to `'xs'` only) | `src/lib/feedback/Spinner.svelte` | ✅ Type-level breaking |
| 5 | Toast service (`toastService.show/success/danger/warning/info/primary/dismiss/dismissAll`) with `actions`, `maxWidth`, `iconClass`, `isFilled`, `themeColor` etc. | `src/lib/feedback/toast-service.svelte.ts` (new) | ✅ |
| 6 | `ToastContainer` auto-renders both service toasts AND declarative children; conditional `icon`/`actions` snippets | `src/lib/feedback/ToastContainer.svelte` | ✅ |
| 7 | `NotificationsPanel` data-driven rewrite — `items`, `isPageView`, `itemActions` snippet, `shouldShowCheckboxes`, `customItems`/`header`/`footer` snippets, callbacks (`onmarkallread`, `onitemclick`, `onitemtoggle`) | `src/lib/feedback/NotificationsPanel.svelte` | ✅ Breaking (old version was hardcoded sample data, never usable in production) |
| 8 | New `KpiGrid` wrapper component (`pa-kpi-grid` negative-margin) | `src/lib/display/KpiGrid.svelte` (new) | ✅ |
| 9 | New `i18n` keys: `pureAdmin.notifications.title/markAllRead/viewAll` (en + cs) | `src/lib/i18n/locales/{en,cs}.ts` | ✅ |
| 10 | Exports updated: `toastService`, `toastStore`, `ToastVariant`, `ToastAction`, `ToastOptions`, `ToastState`, `KpiGrid`, `NotificationItem` | `src/lib/index.ts` | ✅ |
| 11 | `CLAUDE.md` synced — version 2.2.0 → 2.5.0, full v2.3.x/v2.5.0 breaking-changes log, v1.7.0 additions, known upstream gaps section | `CLAUDE.md` | ✅ |
| 12 | `ShortcutHelpDialog` cross-checked against v2.3.3+ snippet — no changes needed (only stylistic differences `<kbd>` vs `<span>`, h4 vs h3; SCSS uses class selectors throughout so both render identically) | `src/lib/feedback/ShortcutHelpDialog.svelte` | ✅ Verified |
| 13 | Type check (`npm run check:lib`) | — | ✅ Net 0 new errors. The 3 remaining errors are pre-existing Floating UI `Placement` type issues in Tooltip/PopoverContainer/Popconfirm — confirmed via `git stash` + recheck on the prod commit. Out of scope for this sync. |

### Known follow-ups (deferred, not blocking)

- **3 pre-existing Floating UI `Placement` type errors** — `toFloatingPlacement()` returns `string` but Floating UI expects its `Placement` union. Trivial to fix (cast or change helper return type) but unrelated to this sync.
- **Component count in CLAUDE.md** is stale (says 68 but the actual count is much higher — drift from earlier work). Not updated in this pass.
- **Docs site:** add font-sizing utility guide (`pa-font-responsive`, `pa-font-base-N`, `pa-font-mobile-N`) and document the toast service usage pattern.

---

## Source references

- pure-admin core CHANGELOG: `../pure-admin/packages/core/CHANGELOG.md`
- Snippets audit log: `../pure-admin/packages/core/snippets/AUDIT.md`
- Snippets manifest (file hashes): `../pure-admin/packages/core/snippets/manifest.json`
- New snippets: `filter-card.html`, `statistics.html`, `notifications.html`, `data-display.html`
- Updated snippets: `alerts.html`, `popconfirm.html`, `buttons.html`, `toasts.html`, `command-palette.html`, plus 22 others in the audit pass
