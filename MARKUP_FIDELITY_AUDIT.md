# Markup-Fidelity Audit — svelte-pure-admin vs pure-admin-core

Auditing the DOM that `@keenmate/svelte-pure-admin` components emit against the
**canonical markup contract** in `@keenmate/pure-admin-core`
(`packages/core/snippets/*.html` + the compiled component SCSS). The framework
is consumed by code generators and hand-authors who copy the snippet shape, so
the wrapper's output should match the *one blessed structure per component* —
divergences either look wrong under a theme or drift from what downstream tools
expect.

**Method.** A scratch route (`docs/src/routes/audit/+page.svelte`) is overwritten
with one component at a time and its rendered DOM dumped with
`pure-admin/scripts/dump-dom.mjs` (Svelte hydration comments stripped), then
diffed against the core snippet and the component's SCSS.

**Legend.** ✅ faithful · 🟡 benign divergence (renders identically, noted not
fixed) · 🔧 fixed in this pass · ⚠️ needs follow-up / discussion.

---

## Navbar / NavItem / NavbarSearch — 🔧 fixed (prior session)

Sources: `navigation/NavItem.svelte`, `navigation/NavbarSearch.svelte`,
`layout/Navbar.svelte`. These came out of the same contract audit and were fixed
before this pass; recorded here for completeness (full detail in `CHANGELOG.md`).

- **🔧 `NavItem` always emits base `pa-navmenu__item`.** It previously emitted the
  base only for dropdown items, so a plain active item rendered
  `pa-navmenu__item--active` and a plain leaf rendered no class at all — a BEM
  modifier without a base. The core demo puts the base on every top-level `<li>`.
- **🔧 `NavbarSearch` is a real `<button>` and drops the phantom `--lg`.** Was a
  `<div role="button" tabindex="0">` with a hand-rolled Enter/Space handler; now a
  `<button type="button">` (focus + keyboard for free). Its `size` prop emitted
  `pa-navbar-search--{size}` (default `--lg`), but core defines **no** size
  modifier for the pill (only `--field` / `--input`) — dead class, prop removed.
- **🔧 `Navbar` search pill un-wrapped** from a non-core `.pa-header__search` div so
  core's direct-child overflow guard can shrink it (was overflowing onto brand).

---

## Buttons — ✅ faithful (no lib change)

Source: `packages/svelte-pure-admin/src/lib/buttons/Button.svelte`

| Aspect | svelte output | canonical | verdict |
|---|---|---|---|
| Plain label wrapped in `pa-btn__label` | `<span class="pa-btn__label">…</span>` | bare text node | 🟡 `__label` is `flex:0 1 auto` — identical to a bare text node's default, and *required* under `--align-center` (`flex:1`). Always-wrapping is the safer choice. |
| `type="button"` default | present | omitted | ✅ better than canonical |
| Loading | adds `disabled` + `pa-btn__spinner` + `pa-btn__label` | spinner + text | ✅ `disabled` on loading guards double-submit |
| Icon-only wraps glyph in `pa-btn__icon` | `<span class="pa-btn__icon"><i/></span>` | bare `<i>`/glyph | 🟡 `--icon-only` is `padding:0` flex-center and `__icon` is a marginless flex-center span → visual no-op |
| Icon-only accessible name | none unless `titleText` passed | snippet always sets `title` | ⚠️ **usage gap, not a lib defect** — component exposes `titleText`→`title` and forwards `aria-label` via rest props. Docs route simply didn't pass one. Recommend docs pass `titleText`/`aria-label` on every icon-only button. |

**Conclusion:** Button markup is faithful to the contract. No component change
made. The only actionable item is a documentation/usage reminder to always label
icon-only buttons.

---

## Card — ✅ faithful happy-path · 🔧 fixed legacy subtitle

Source: `packages/svelte-pure-admin/src/lib/display/Card.svelte`

The three-part header (`title` → `description` → `actions`), title icon, footer
actions, underline modifiers, tabs, and body-no-padding all render **exactly**
the canonical `pa-card__*` shape — the v2.9.0-rc05 card-header canonicalization
is fully ported. Verified DOM:

```html
<div class="pa-card"><div class="pa-card__header">
  <div class="pa-card__title"><span class="pa-card__title-icon">📊</span>
    <h3 class="pa-card__title-text">Dashboard</h3></div>
  <p class="pa-card__description">Live metrics.</p>
  <div class="pa-card__actions"><button class="pa-btn pa-btn--secondary pa-btn--sm">…</button></div>
</div> … <div class="pa-card__footer"><div class="pa-card__actions">…</div></div></div>
```

**🔧 Fix — deprecated `subtitle`/`subtitleText` escaped the card contract.**
It rendered `<p class="pa-text pa-text--secondary">` — a *generic text utility*,
not a card sub-element, so it didn't participate in the header slot layout and
diverged from the blessed shape. The canonical element for a muted header
byline ("Published 2h ago") is `.pa-card__meta` (see the "CARD WITH METADATA"
snippet: `<span class="pa-card__meta">…</span>`, styled `--pa-text-color-2` +
`font-size-sm`). Changed both subtitle branches to emit
`<span class="pa-card__meta">`. Low-risk (deprecated prop, near-identical muted
styling) and now on-contract.

---

## Badge — ✅ faithful · ⚠️ one core gap

Source: `packages/svelte-pure-admin/src/lib/display/Badge.svelte`

Variants, sizes, `--pill`, `--ellipsis-start`, and the `pa-badge__icon` wrapper
all match. Clickable badge (role/tabindex/keydown) is a reasonable a11y add.

**⚠️ `themeColor` maps to the generic `pa-bg-color-N` utility.** Core defines no
`pa-badge--color-N` (grep of `_badges.scss` = 0 hits), unlike buttons/cards/alerts
which all have a `--color-N` pair that sets **both** background and a contrasting
`--pa-color-N-text`. The generic `pa-bg-color-N` only paints the background, so a
theme-slot badge can land dark-text-on-dark. **This is a core gap, not a wrapper
defect** — the wrapper improvises the only class available. *Follow-up:* add
`pa-badge--color-{1..9}` to core `_badges.scss` (mirror the alert pattern), then
switch the wrapper to it. Left as-is for now.

---

## Alert — 🔧 two fixes

Source: `packages/svelte-pure-admin/src/lib/feedback/Alert.svelte`

**🔧 Fix 1 — over-wrapped content in `.pa-alert__content`.** The wrapper wrapped
the body whenever `icon || isDismissible`. But `.pa-alert` spaces its stacked
children via **flex `gap`** — `__heading`, `__list`, `__actions` all set
`margin: 0` and rely on it. `.pa-alert__content` is a plain block (no gap), so
wrapping structural children there **collapses the vertical rhythm**. Canonical
rule (`snippets/alerts.html`, "MARKUP SHAPES — WITH vs WITHOUT ICON"): wrap
**only** when there's an icon to flow around; `--dismissible` is just a padding
modifier and the absolutely-positioned `__close` needs no wrapper. Changed the
condition to `{#if icon}`. A dismissible no-icon alert with heading + body +
actions now renders them as direct children (correctly spaced), matching the
snippet.

**🔧 Fix 2 — close glyph.** Used a literal `<span aria-hidden>×</span>`; canonical
uses the masked icon primitive `<span class="pa-icon pa-icon--x" aria-hidden>`
(consistent crisp × across themes vs a font-dependent glyph). Every dismissible
snippet uses `pa-icon--x`. Swapped it in.

Verified all three shapes: (A) dismissible no-icon structural → direct children,
(B) icon + multiline → `__content` wrapper, (C) simple dismissible inline → text
direct.

*Follow-up to check elsewhere:* the literal-`×` close glyph likely recurs in
Toast / Modal / NotificationsPanel — audit those against `pa-icon--x`.

---
