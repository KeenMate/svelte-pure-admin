# v1.7.0 Test Plan

> Run `npm run dev` then click through each section. Tick each row as you verify.

## 0. Setup

- [ ] `npm install` runs clean (the peerDep bumped from `^2.3.5` to `^2.5.0`)
- [ ] `npm run dev` starts without errors
- [ ] `npm run check` passes — should report **0 errors** in both lib + docs (warnings OK)
- [ ] No console errors on initial page load

---

## 1. Alerts page (`/alerts`) — biggest visual-regression risk

### Visual regression check (v2.5.0 CSS bump changes defaults)

- [ ] **Default alert padding looks tighter vertically, looser horizontally** than before — that's correct (V `1.2 → 0.75rem`, H `1 → 1.25rem`)
- [ ] **Heading + icon + single-line content** centres vertically (was top-aligned)
- [ ] **`pa-alert__actions` divider** — there's now a thin border-top above action button rows (matches toast style)

### "Basic Alerts" — 8 variants

- [ ] All 8 variants render (primary, secondary, success, danger, warning, info, light, dark)
- [ ] No empty `pa-alert__icon` wrapper visible (would show as a gap on the inline-start)

### "Alerts with Icons" — 4 variants

- [ ] Icons (✓ ⚠ ! ⓘ) render on the inline-start
- [ ] Icon + single-line content **centred vertically** in each one

### "Dismissible Alerts"

- [ ] Close button (×) on the inline-end of each
- [ ] Clicking × hides the alert
- [ ] Other alerts are unaffected when one is dismissed

### "Alerts with Additional Content"

- [ ] **Headings render LARGE** (Success! / Storage running low) — because `isHeadingLarge` is set
- [ ] If you toggle `isHeadingLarge` off in DevTools, headings should shrink to body size
- [ ] Bullet list inside Storage running low alert renders correctly with `pa-alert__list` styling
- [ ] `<hr>` divider in Success alert renders with alert-tinted top border

### "Heading size: default vs `isHeadingLarge`" — NEW SECTION

- [ ] Left column shows two SMALL headings ("Validation failed" / "Saved") at body font-size
- [ ] Right column shows the SAME two as LARGER headings
- [ ] Body text below each heading is identical in both columns

### "Alerts with custom actions" — NEW SECTION

- [ ] System update / Sync failed / Cookies disabled all render with the divider above the action row
- [ ] Cookies disabled alert (single button, no `isHeadingLarge`) — heading is small, action divider still present
- [ ] Buttons are inert (no onclick handlers — pure visual showcase, intentional)

### "Sizes" — NEW SECTION

- [ ] Three alerts (sm / default / lg) are **visibly different sizes**
- [ ] sm: smallest font + tightest padding
- [ ] lg: largest font + most padding
- [ ] Default sits in the middle

### "Outline Alerts"

- [ ] All 5 outline variants render with transparent fill + colored border

### "Theme Color Slot Alerts" + "Outline Theme Color Slot Alerts"

- [ ] **All 9 colors render** (not just 6 like before) — even if invisible in base theme, they should at least have visible padding
- [ ] Try switching theme (`/auto-theme` if available) — colors 1-9 should change appearance

### "Icon + multi-line content" — NEW SECTION

- [ ] **Left card (`isMultiline`)**: ⓘ icon sits at the **TOP** next to "Heads up" heading
- [ ] **Right card (default)**: ⓘ icon sits in the **VERTICAL MIDDLE** of the content stack
- [ ] This is the most important visual regression test — confirms `isMultiline` opt-out works

### "Status strip layout"

- [ ] 3 small alerts in a row (Saved / Pending / Failed)
- [ ] Each pill is compact (was the renamed "Compact Alerts in Grid")

### "CSS classes reference" — NEW SECTION

- [ ] Code blocks render with syntax highlighting
- [ ] Component props block at the bottom shows the TypeScript interface

---

## 2. Toasts page (`/toasts`) — fully rewritten

### Quick start

- [ ] Code block renders with `typescript` syntax highlighting

### Positions — verify each button shows toast at correct corner

- [ ] **Top Start** → toast appears top-left (in LTR)
- [ ] **Top Center** → top-center
- [ ] **Top End** → top-right
- [ ] **Bottom Start** → bottom-left
- [ ] **Bottom Center** → bottom-center
- [ ] **Bottom End** → bottom-right
- [ ] Auto-dismiss after 5 seconds

### Variants (sugar methods)

- [ ] All 5 buttons fire toasts at top-end with correct color
- [ ] `toastService.success('Saved!')` (string sugar) works
- [ ] Auto-dismiss after 5 seconds

### Progress bar

- [ ] **Standard** — 5 toasts each with shrinking progress bar at bottom
- [ ] **Filled** — 5 filled-color toasts with progress bar
- [ ] **Custom progress color** — progress bars are red / purple / teal respectively
- [ ] All auto-dismiss when bar reaches 0

### Persistent toasts

- [ ] **Important Warning / Critical Error / Important Info** — stay visible until manually closed (× button)
- [ ] **Programmatic 8s dismiss** — toast appears, stays for 8 seconds, then dismisses **without user clicking close** (this verifies `toastService.dismiss(id)`)

### Action toasts (the form-demo use case)

- [ ] **Undo Delete** — danger toast with "Undo" + "Dismiss" buttons separated by border-top
- [ ] Click "Undo" → `alert('Undo!')` fires + toast disappears
- [ ] Click "Dismiss" → toast disappears (no alert)
- [ ] **Retry Failed** — same pattern with warning variant
- [ ] **Update Available** — info variant
- [ ] **Filled + Actions** — green-filled toast with white text, action buttons readable

### Multiple toasts (stacking)

- [ ] **Show 3 Toasts** spawns 3 stacked toasts at top-end with 300ms delay each
- [ ] Toasts stack vertically without overlap
- [ ] Container width "ratchets" — when a wider toast appears, narrower ones don't shrink afterward

### Filled variants

- [ ] All 5 filled variants render with full-color background + white text

### Theme color toasts (1-9)

- [ ] All 9 toast slots fire correctly (top-end)
- [ ] Filled versions of all 9 below

### Bulk dismiss

- [ ] **Spawn 3 toasts** → 3 toasts appear stacked
- [ ] **Dismiss all** → all 3 disappear immediately

### Service API reference

- [ ] Type definitions render with TypeScript syntax highlighting

---

## 3. Notifications panel

> No dedicated demo page — but if used in any sample dashboard:

- [ ] If `items` is empty, list area is empty (no error)
- [ ] If `items` provided, each item shows: icon-wrapper + title + message + time
- [ ] `--unread` items have a subtle accent-tinted background
- [ ] Icon variants: primary / success / warning / danger / secondary all show distinct colors
- [ ] Click "Mark all as read" → `onmarkallread` callback fires
- [ ] Click an item → `onitemclick` callback fires with the item

**Page-view mode** (if showcased anywhere):
- [ ] `isPageView={true}` removes the panel chrome (no header/footer/scroll cap)
- [ ] Items have larger padding + bigger icons
- [ ] If `itemActions` snippet provided: action buttons appear on hover (desktop) / always visible (mobile)
- [ ] If `shouldShowCheckboxes={true}`: leading checkboxes render

---

## 4. KpiGrid (new component)

> No dedicated demo page yet — verify if used anywhere or test in browser console:

- [ ] Wrap a `<div>` with `class="pa-kpi-grid"` containing `<Stat variant="square">` tiles
- [ ] Negative margin `-$spacing-sm` should make the tile grid align flush with surrounding content (no gap on the outside)

---

## 5. Spinner page (`/loaders`)

- [ ] **Spinner Sizes card** now shows only **2 sizes** (Default + xs) plus the explanatory note about `<Loader type="ring">`
- [ ] **Spinner Colors** — all 6 variants visible
- [ ] **Inline Spinners** — xs spinner inline with text
- [ ] **Centered / Card Loading States** — `<Loader type="ring" size="lg">` (large ring) shows in overlay/card body — should be a noticeably bigger spinner than before

---

## 6. Popconfirm page (`/popconfirm`)

- [ ] All position demos work (top, bottom, **start, end** — were left/right)
- [ ] Start popconfirm appears on the inline-start of trigger
- [ ] End popconfirm appears on the inline-end of trigger
- [ ] Confirm button fires `onconfirm`
- [ ] Cancel button fires `oncancel` and closes
- [ ] **RTL test** (if you can switch direction): start/end should flip with the page

---

## 7. Tooltips page (`/tooltips`)

- [ ] Top / Bottom tooltips work
- [ ] **"Right" labelled tooltip** appears on the inline-end (was `position="right"`, now `end`)
- [ ] **"Left" labelled tooltip** appears on the inline-start
- [ ] Popovers with `placement="start/end"` work
- [ ] No console errors

---

## 8. Modals page (`/modals`) — was crashing the page

- [ ] **Page actually loads now** (the `<script>` parse error from `</script>` inside CodeBlock template literals is fixed)
- [ ] Code blocks in "Code Examples" section render with `<script lang="ts">` and `</script>` text **visibly inside the code block** (not as actual script tags)
- [ ] All modal demos still work (open/close, sizes, variants, etc.)

---

## 9. Cards page (`/cards`)

- [ ] "Mark All Read" / **"Clear" buttons** render — Clear button is a danger outline button (was `variant="outline-danger"`, now `variant="danger" isOutline`)

---

## 10. Pagers page (`/pagers`)

- [ ] "Current page X of Y" info alert renders as a small alert (`size="sm"`, was `isCompact`)
- [ ] "Buttons Only" / "With Info Text" cards render side-by-side at md+ width
- [ ] Load More alignment cards (Start / Center / End) render in 3 equal columns at md+
- [ ] "All products loaded" success alert is small (`size="sm"`)

---

## 11. Other docs pages — sanity check (no expected changes)

Just open each and verify no console errors / no obvious layout breakage:

- [ ] `/buttons`
- [ ] `/badges`
- [ ] `/forms`
- [ ] `/inputs`
- [ ] `/checkbox-lists`
- [ ] `/cards`
- [ ] `/data-display`
- [ ] `/data-display-2`
- [ ] `/data-visualization`
- [ ] `/timeline-feed`
- [ ] `/timeline-block` — Spinner inside loader was `size="sm"`, now `xs` (slightly smaller)
- [ ] `/command-palette`
- [ ] `/i18n` — Spinner during locale switch was `sm`, now `xs`
- [ ] `/batch-rpc` — 3× spinners during batch run were `sm`, now `xs`
- [ ] `/events-callbacks` — toast container moved from `bottom-right` to `bottom-end` (looks identical in LTR)

---

## 12. Build verification

- [ ] `npm run build:all` succeeds (lib + docs)
- [ ] No TypeScript errors during build
- [ ] `dist/index.js` exports include: `toastService`, `toastStore`, `KpiGrid`, `NotificationItem` type, `ToastVariant` / `ToastPosition` / `ToastAction` / `ToastOptions` / `ToastState` types, `DEFAULT_TOAST_POSITION` constant

---

## Known things NOT changed (don't be surprised)

- Spinner colors still take all 6 variants — only `size` was narrowed
- ToastContainer's declarative `children` snippet API still works (so anyone with the old pattern won't break)
- Existing alerts that don't set `isHeadingLarge` will look smaller than before — this is the intentional v2.5.0 default change
- 25 lint warnings remain (`state_referenced_locally` reactivity hints in SidebarItem and 5 docs files) — not errors, just style suggestions

---

## Bug-finder shortlist (most-likely-to-break)

If you only have 30 minutes, hit these in order:

1. `/alerts` — heading sizes + multiline (most-likely visual regressions)
2. `/toasts` — bulk dismiss + action buttons (new code paths)
3. `/modals` — was throwing a parse error, verify whole page renders
4. `/loaders` — Spinner sizes (was advertising 6, now 2)
5. `/popconfirm` and `/tooltips` — position renames

If anything looks off, grab a screenshot + which section + browser DevTools console output.
