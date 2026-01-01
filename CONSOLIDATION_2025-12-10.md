# svelte-pure-admin Full Parity Update Plan

## Executive Summary

**Objective:** Update svelte-pure-admin to achieve 100% parity with pure-admin-visual CSS framework.

**Current State:**
- pure-admin-visual: 28 snippets, 37 views, 30 SCSS components
- svelte-pure-admin: 74 Svelte 5 components (already well-implemented)

**Scope:** Full parity - all components updated to match pure-admin-visual exactly.

---

## svelte-pure-admin Current State

| Category | Implemented | Notes |
|----------|-------------|-------|
| **Svelte Version** | 5.0.0 | Uses runes ($props, $state, $derived) |
| **TypeScript** | Full strict mode | All components have Props interfaces |
| **Components** | 74 total | Well-organized by category |
| **CSS Integration** | @keenmate/pure-admin-core | BEM class generation from props |

---

## Inventory Overview

### Source Counts
| Category | Count | Notes |
|----------|-------|-------|
| **Snippets** | 28 files | Canonical HTML reference |
| **Views** | 37 files | Demo/showcase pages |
| **SCSS Components** | 30 files | CSS component definitions |

---

## Complete Component Catalog

### 1. ALERTS
**Snippet:** `alerts.html` | **View:** `alerts.mustache` | **SCSS:** `_alerts.scss`

**Classes:**
- Base: `.pa-alert`
- Variants: `--primary`, `--secondary`, `--success`, `--danger`, `--warning`, `--info`, `--light`, `--dark`
- Outlines: `--outline-primary`, `--outline-success`, `--outline-danger`, `--outline-warning`, `--outline-info`
- Sizes: `--sm`, (default), `--lg`
- Modifier: `--dismissible`
- Elements: `__icon`, `__content`, `__heading`, `__list`, `__actions`, `__close`

**Svelte Props:**
```typescript
variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
outline: boolean
size: 'sm' | 'default' | 'lg'
dismissible: boolean
```

---

### 2. BADGES
**Snippet:** `badges.html` | **View:** `badges.mustache` | **SCSS:** `_badges.scss`

**Classes:**
- Base: `.pa-badge`
- Variants: `--primary`, `--secondary`, `--success`, `--danger`, `--warning`, `--info`, `--light`, `--dark`
- Sizes: `--xs`, `--sm`, (default), `--lg`, `--xl`
- Shape: `--pill`
- Fixed widths: `--w-1x` through `--w-10x`
- Special: `--ellipsis-left`
- Elements: `__icon`

**Composite Badge:**
- Base: `.pa-composite-badge`
- Variants: `--primary`, `--secondary`, `--success`, `--danger`, `--warning`, `--info`, `--light`, `--dark`
- Elements: `__icon`, `__label`, `__button`
- Per-section colors: `--label-{variant}`, `--btn-{variant}`

**Badge Group:**
- Base: `.pa-badge-group`
- Modifier: `--show-all`

**Svelte Props:**
```typescript
// Badge
variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
size: 'xs' | 'sm' | 'default' | 'lg' | 'xl'
pill: boolean
width: '1x' | '2x' | ... | '10x'

// CompositeBadge - separate component
variant: string
iconVariant?: string
labelVariant?: string
buttonVariant?: string
```

---

### 3. BUTTONS
**Snippet:** `buttons.html` | **View:** `buttons.mustache` | **SCSS:** `_buttons.scss`

**Classes:**
- Base: `.pa-btn`
- Variants: `--primary`, `--secondary`, `--success`, `--warning`, `--danger`, `--info`, `--light`, `--dark`
- Outlines: `--outline-primary`, `--outline-secondary`, `--outline-success`, `--outline-warning`, `--outline-danger`, `--outline-info`
- Sizes: `--xs`, `--sm`, (default), `--lg`, `--xl`
- States: `--loading`, `--ripple`, `--ripple-active`, `:disabled`
- Layout: `--block`, `--icon-only`
- Fixed widths: `--w-1x` through `--w-10x`
- Alignment: `--align-left`, `--align-right`, `--align-center`, `--align-justify`
- Elements: `__icon`, `__spinner`

**Button Group:**
- Base: `.pa-btn-group`
- Modifier: `--vertical`

**Svelte Props:**
```typescript
variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark'
outline: boolean
size: 'xs' | 'sm' | 'default' | 'lg' | 'xl'
loading: boolean
disabled: boolean
block: boolean
iconOnly: boolean
width: '1x' | '2x' | ... | '10x'
align: 'left' | 'right' | 'center' | 'justify'
```

---

### 4. CARDS
**Snippet:** `cards.html` | **View:** `cards.mustache` | **SCSS:** `_cards.scss`

**Classes:**
- Base: `.pa-card`
- Variants: `--primary`, `--success`, `--warning`, `--danger`, `--stat`
- Elements: `__header`, `__body`, `__footer`, `__title`, `__title-icon`, `__title-text`, `__tools`, `__actions`, `__meta`
- Body modifier: `__body--no-padding`
- Tab elements: `__tabs`, `__tab`, `__tab--active`, `__tab-content`, `__tab-content--active`

**Section:**
- Base: `.pa-section` (h3 with accent border)

**Svelte Props:**
```typescript
variant: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'stat'
noPadding: boolean // for body
```

---

### 5. FORMS
**Snippet:** `forms.html` | **View:** `forms.mustache`, `inputs.mustache` | **SCSS:** `_forms.scss`

**Form Group:**
- Base: `.pa-form-group`
- Modifiers: `--horizontal`, `--required`, `--error`, `--success`, `--warning`

**Input:**
- Base: `.pa-input`
- Sizes: `--xs`, `--sm`, (default), `--lg`, `--xl`
- States: `--error`, `--success`, `--warning`

**Select:**
- Base: `.pa-select`
- Sizes: `--xs`, `--sm`, (default), `--lg`, `--xl`
- States: `--error`, `--success`, `--warning`

**Textarea:**
- Base: `.pa-textarea`

**Input Group:**
- Base: `.pa-input-group`
- Elements: `__prepend`, `__append`, `__button`

**Input Wrapper:**
- Base: `.pa-input-wrapper`
- Elements: `__clear`, `__clear--hidden`

**Checkbox:**
- Base: `.pa-checkbox`
- Sizes: `--xs`, `--sm`, (default), `--lg`, `--xl`
- Modifiers: `--x`, `--disabled`
- Elements: `__box`, `__label`

**Radio:**
- Base: `.pa-radio`
- Sizes: `--xs`, `--sm`, (default), `--lg`, `--xl`

**Groups:**
- `.pa-checkbox-group`, `.pa-radio-group`

**Svelte Props:**
```typescript
// Input
size: 'xs' | 'sm' | 'default' | 'lg' | 'xl'
state: 'default' | 'error' | 'success' | 'warning'

// Checkbox
size: 'xs' | 'sm' | 'default' | 'lg' | 'xl'
checked: boolean
indeterminate: boolean
disabled: boolean
xMark: boolean // --x modifier
```

---

### 6. TABLES
**Snippet:** `tables.html` | **Views:** `tables.mustache`, `tables-responsive.mustache`, `tables-sizing.mustache` | **SCSS:** `_tables.scss`

**Classes:**
- Base: `.pa-table`
- Modifiers: `--striped`, `--2x`, `--3x`, `--responsive`, `--responsive-grid`
- Container: `.pa-table-container`
- Utility: `.col-auto`

**Pager:**
- Base: `.pa-pager`
- Alignment: `--left`, `--center`, `--right`
- Elements: `__container`, `__controls`, `__info`, `__input`, `__text`

**Load More:**
- Base: `.pa-load-more`
- Alignment: `--left`, `--center`, `--right`
- Elements: `__button`, `__button--loading`, `__spinner`, `__text`, `__count`

**Virtual Table:**
- Base: `.pa-virtual-table`
- Elements: `__header`, `__header-cell`, `__body`, `__row`, `__cell`

**Svelte Props:**
```typescript
striped: boolean
spacing: 'default' | '2x' | '3x'
responsive: boolean | 'grid'
```

---

### 7. MODALS
**Snippet:** `modals.html`, `modal-dialogs.html` | **Views:** `modals.mustache`, `modal-dialogs.mustache` | **SCSS:** `_modals.scss`

**Classes:**
- Base: `.pa-modal`
- State: `--show`, `--top`
- Variants: `--primary`, `--success`, `--warning`, `--danger`
- Elements: `__backdrop`, `__container`, `__header`, `__title`, `__body`, `__footer`
- Container sizes: `__container--sm`, `__container--lg`, `__container--xl`, `__container--xxl`, `__container--fw`
- Body modifier: `__body--scrollable`

**JavaScript API (Promise-based):**
- `PureAdmin.confirm(options)` → `Promise<boolean>`
- `PureAdmin.alert(options)` → `Promise<void>`
- `PureAdmin.prompt(options)` → `Promise<string|null>`
- `PureAdmin.custom(options)` → `Promise<any>`

**Svelte Props:**
```typescript
open: boolean
variant: 'default' | 'primary' | 'success' | 'warning' | 'danger'
size: 'sm' | 'default' | 'lg' | 'xl' | 'xxl' | 'fw'
position: 'center' | 'top'
closeOnBackdrop: boolean
```

---

### 8. TOASTS
**Snippet:** `toasts.html` | **View:** `toasts.mustache` | **SCSS:** `_toasts.scss`

**Container:**
- Base: `.pa-toast-container`
- Positions: `--top-right`, `--top-center`, `--top-left`, `--bottom-right`, `--bottom-center`, `--bottom-left`

**Toast:**
- Base: `.pa-toast`
- States: `--show`, `--hide`
- Variants: `--primary`, `--success`, `--danger`, `--warning`, `--info`
- Elements: `__icon`, `__content`, `__title`, `__message`, `__close`, `__progress`

**Svelte Props:**
```typescript
position: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left'
variant: 'primary' | 'success' | 'danger' | 'warning' | 'info'
title: string
message: string
duration: number
showProgress: boolean
persistent: boolean
```

---

### 9. TABS
**Snippet:** `tabs.html` | **View:** `tabs.mustache` | **SCSS:** `_tabs.scss`

**Card Tabs (inside cards):**
- Container: `.pa-card__tabs`
- Item: `.pa-card__tab`, `--active`
- Content: `.pa-card__tab-content`, `--active`

**Standalone Tabs:**
- Base: `.pa-tabs`
- Variants: `--pills`, `--boxed`, `--vertical`
- Alignment: `--centered`, `--full`
- Overflow: `--nowrap`, `--scrollable`
- Sizes: `--sm`, (default), `--lg`
- Elements: `__item`, `__item--active`, `__content`, `__panel`, `__panel--active`
- Fixed dimensions: `__item--w-1x` through `__item--w-10x`, `__item--h-1x` through `__item--h-10x`
- Scrollable: `__scroll-container`, `__scroll-btn`, `__scroll-btn--left`, `__scroll-btn--right`

**Bordered containers:**
- `.pa-tabs__container--bordered`
- `.pa-tabs__vertical-layout--bordered`

**Svelte Props:**
```typescript
variant: 'default' | 'pills' | 'boxed'
vertical: boolean
centered: boolean
full: boolean
scrollable: boolean
size: 'sm' | 'default' | 'lg'
```

---

### 10. TOOLTIPS & POPOVERS
**Snippet:** `tooltips.html` | **View:** `tooltips.mustache` | **SCSS:** `_tooltips.scss`

**Tooltip:**
- Base: `.pa-tooltip` (with `data-tooltip` attribute)
- Positions: (default=top), `--right`, `--bottom`, `--left`
- Variants: `--primary`, `--success`, `--warning`, `--danger`, `--info`
- Modifiers: `--multiline`, `--help`

**Popover:**
- Base: `.pa-popover`
- Sizes: `--sm`, (default), `--lg`
- Elements: `__trigger`, `__content`, `__header`, `__body`, `__close`
- Position via `data-placement="top|right|bottom|left"`

**Svelte Props:**
```typescript
// Tooltip
position: 'top' | 'right' | 'bottom' | 'left'
variant: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
multiline: boolean
content: string

// Popover
position: 'top' | 'right' | 'bottom' | 'left'
size: 'sm' | 'default' | 'lg'
```

---

### 11. LOADERS
**Snippet:** `loaders.html` | **View:** `loaders.mustache` | **SCSS:** `_loaders.scss`

**Spinner:**
- Base: `.pa-spinner`
- Sizes: `--xs`, `--sm`, `--md`, `--lg`, `--xl`, `--2xl`
- Variants: `--primary`, `--secondary`, `--success`, `--danger`, `--warning`, `--info`

**Advanced Loaders:**
- `.pa-loader-dots`, `--lg`
- `.pa-loader-bars`, `--lg`
- `.pa-loader-pulse`, `--lg`
- `.pa-loader-ring`, `--lg`
- `.pa-loader-wave`, `--lg`

**Utilities:**
- `.pa-loader-center` (centered with text)
- `.pa-loader-overlay` (full-screen)

**Svelte Props:**
```typescript
type: 'spinner' | 'dots' | 'bars' | 'pulse' | 'ring' | 'wave'
size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
```

---

### 12. TIMELINE
**Snippet:** `timeline.html` | **Views:** `timeline.mustache`, `timeline-simple.mustache`, `timeline-block.mustache` | **SCSS:** `_timeline.scss`

**Variants:**
- Simple: `.pa-timeline--simple`
- Block: `.pa-timeline--block`
- Feed: `.pa-timeline--feed`

**Simple Timeline Elements:**
- `__item` with color modifiers: `--primary`, `--success`, `--warning`, `--danger`, `--info`, `--secondary`
- `__item--filled` (solid dot)

**Block Timeline Elements:**
- `__item--left`, `__item--right`
- `__dot`, `__connector`, `__icon`, `__date`

**Feed Timeline Elements:**
- `__icon`, `__avatar`, `__time`, `__comment`, `__date`, `__date-header`

**Svelte Props:**
```typescript
variant: 'simple' | 'block' | 'feed'
// TimelineItem
color: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary'
filled: boolean
```

---

### 13. CHECKBOX LISTS
**Snippet:** `checkbox-lists.html` | **View:** `checkbox-lists.mustache` | **SCSS:** `_checkbox-lists.scss`

**Classes:**
- Base: `.pa-checkbox-list`
- Layout: `--compact`, `--inline`, `--striped`, `--bordered`, `--grid`, `--2col`, `--3col`
- Item: `__item`, `__item--disabled`, `__item--locked`
- Elements: `__label`, `__checkbox`, `__text`, `__description`, `__actions`

**Table integration:**
- `.pa-table__checkbox-col`
- `.pa-table__row--selected`

**Svelte Props:**
```typescript
compact: boolean
inline: boolean
striped: boolean
bordered: boolean
grid: boolean
columns: 2 | 3
```

---

### 14. PROFILE PANEL
**Snippet:** `profile.html` | **SCSS:** `_profile.scss`

**Header Button:**
- `.pa-header__profile-btn`
- `.pa-header__profile-name`

**Panel:**
- Base: `.pa-profile-panel`
- State: `--open`
- Elements: `__overlay`, `__content`, `__header`, `__avatar`, `__avatar-icon`, `__info`, `__name`, `__email`, `__role`, `__close`, `__body`, `__nav`, `__nav-item`, `__nav-icon`, `__actions`, `__section`

---

### 15. CODE BLOCKS
**Snippet:** `code.html` | **View:** `code.mustache` | **SCSS:** `_code.scss`

**Classes:**
- Base: `.pa-code`
- Modifier: `--compact`
- Languages: `--javascript`, `--json`, `--html`, `--css`, `--bash`, `--sql`, `--python`

**Code Block with Header:**
- Container: `.pa-code-block`
- Elements: `__header`, `__title`, `__body`

**Svelte Props:**
```typescript
language: 'javascript' | 'json' | 'html' | 'css' | 'bash' | 'sql' | 'python'
compact: boolean
title?: string
```

---

### 16. LISTS
**Snippet:** `lists.html` | **View:** `lists.mustache` | **SCSS:** `_lists.scss`

**Basic List:**
- Base: `.pa-list-basic`
- Variants: `--spacious`, `--compact`, `--unstyled`, `--inline`, `--bordered`, `--striped`, `--icon`

**Ordered List:**
- Base: `.pa-list-ordered`
- Variants: `--roman`, `--alpha`

---

### 17. LAYOUT & SIDEBAR
**Snippet:** `layout.html` | **View:** `layout.mustache`, `layouts.mustache` | **SCSS:** `_layout.scss`

**Navbar:**
- Base: `.pa-navbar`
- Elements: `__inner`

**Header Elements:**
- `.pa-header__burger`, `.burger-menu`
- `.pa-header__brand`
- `.pa-header__nav`, `--left`, `--right`
- `.pa-header__title`

**Layout:**
- Base: `.pa-layout`
- Modifier: `--sticky`
- Elements: `__inner`, `__sidebar`, `__content`, `__footer`

**Container widths (on body):**
- `.pa-container-sm` (768px)
- `.pa-container-md` (1024px)
- `.pa-container-lg` (1280px)
- `.pa-container-xl` (1600px)
- `.pa-container-2xl` (1920px)

**Sidebar:**
- `.pa-sidebar__nav`, `__item`, `__link`, `__link--active`
- `.pa-sidebar__toggle`, `__icon`, `__label`, `__chevron`
- `.pa-sidebar__submenu`, `--open`
- `.pa-sidebar__item--open`

**Sidebar modes:**
- (default)
- `__sidebar--sticky`
- `__sidebar--icon-collapse`

**Body states:**
- `sidebar-hidden`
- `sidebar-visible`

---

### 18. GRID
**Snippet:** `grid.html` | **View:** `grid.mustache` | **SCSS:** `_grid.scss`

**Row:**
- Base: `.pa-row`
- Modifiers: `--no-gutter`, `--center`, `--end`, `--between`, `--around`, `--same-height`, `--top`, `--middle`, `--bottom`

**Columns (5% increments):**
- `.pa-col-5` through `.pa-col-100`

**Columns (fractions):**
- `.pa-col-1-2`, `.pa-col-1-3`, `.pa-col-2-3`, `.pa-col-1-4`, `.pa-col-3-4`
- `.pa-col-1-5`, `.pa-col-2-5`, `.pa-col-3-5`, `.pa-col-4-5`
- `.pa-col-1-6`, `.pa-col-5-6`
- `.pa-col-1-12` through `.pa-col-11-12`

**Responsive prefixes:**
- `pa-col-sm-*`, `pa-col-md-*`, `pa-col-lg-*`, `pa-col-xl-*`

**Offsets:**
- `.pa-offset-5` through `.pa-offset-95`
- Responsive: `.pa-offset-sm-*`, etc.

---

### 19. COMMAND PALETTE
**Snippet:** `command-palette.html` | **View:** `command-palette.mustache` | **SCSS:** `_command-palette.scss`

**Classes:**
- Container: `.pa-command-palette`
- State: `--open`
- Elements: `__backdrop`, `__dialog`, `__header`, `__search`, `__input`, `__context`, `__results`, `__list`, `__item`, `__item--active`, `__footer`, `__shortcuts`

**Svelte consideration:** Complex JS-heavy component, may need special handling

---

### 20. POPCONFIRM
**Snippet:** `popconfirm.html` | **View:** `popconfirm.mustache` | **SCSS:** `_popconfirm.scss`

**Classes:**
- Base: `.pa-popconfirm`
- Variants: `--primary`, `--success`, `--warning`, `--danger`
- Elements: `__content`, `__message`, `__actions`

**Svelte Props:**
```typescript
variant: 'default' | 'primary' | 'success' | 'warning' | 'danger'
message: string
confirmText: string
cancelText: string
```

---

### 21. COMPARISON TABLE
**Snippet:** `comparison.html` | **View:** `comparison.mustache` | **SCSS:** `_comparison.scss`

**Classes:**
- Base: `.pa-comparison-table`
- Elements: `__label`, `__value`, `__copy`

---

### 22. STATISTICS
**SCSS:** `_statistics.scss` (no dedicated snippet)

**Classes:**
- Base: `.pa-stat`
- Variants: `--hero`, `--square`
- Elements: `__icon`, `__number`, `__label`, `__content`, `__value`, `__change`
- Icon variants: `__icon--primary`, `--success`, `--warning`, `--info`
- Change variants: `__change--positive`, `--negative`, `--neutral`
- Symbol: `__symbol`

---

### 23. UTILITIES
**Snippet:** `utilities.html` | **SCSS:** `_utilities.scss`

**Font Size (on html):**
- `font-size-2xs` through `font-size-4xl`

**Font Family:**
- `font-family-serif`, `font-family-mono`

**Compact Mode (on body):**
- `compact-mode`

**Spacing:**
- Margin: `m-{0-20}`, `mt-`, `mr-`, `mb-`, `ml-`, `mx-`, `my-`, `m-auto`
- Padding: `p-{0-20}`, `pt-`, `pr-`, `pb-`, `pl-`, `px-`, `py-`

**Display:**
- `d-none`, `d-inline`, `d-inline-block`, `d-block`, `d-flex`, `d-inline-flex`

**Flexbox:**
- `flex-row`, `flex-column`, `flex-wrap`, `flex-nowrap`
- `justify-content-start/end/center/between/around`
- `align-items-start/end/center/baseline/stretch`
- `flex-fill`, `flex-grow-0/1`, `flex-shrink-0/1`

**Text:**
- `text-left`, `text-center`, `text-right`, `text-nowrap`, `text-truncate`

**Dimensions:**
- `w-25`, `w-50`, `w-75`, `w-100`, `w-auto`
- `h-25`, `h-50`, `h-75`, `h-100`, `h-auto`
- `h-2x` through `h-50x`
- `min-h-2x` through `min-h-30x`
- `max-h-5x` through `max-h-50x`

**Overflow:**
- `overflow-auto`, `overflow-y-auto`, `overflow-x-auto`, `overflow-hidden`, `overflow-visible`

**Position:**
- `position-static`, `position-relative`, `position-absolute`, `position-fixed`, `position-sticky`

**Border:**
- `border`, `border-top`, etc., `border-0`, `border-top-0`, etc.

**Rounded:**
- `rounded`, `rounded-lg`, `rounded-circle`, `rounded-0`, `rounded-top`, etc.

**Shadow:**
- `shadow-none`, `shadow-sm`, `shadow`, `shadow-lg`

**Cursor:**
- `cursor-pointer`, `cursor-help`, `cursor-wait`, `cursor-not-allowed`, etc.

---

### 24. WEB COMPONENTS
**Snippets:** `web-multiselect.html`, `web-daterangepicker.html` | **Views:** `multiselect.mustache`, `date-picker.mustache` | **SCSS:** `_web-components-theme.scss`

**Multiselect:**
- `<web-multiselect>`
- Attributes: `placeholder`, `value-member`, `display-value-member`, `input-size`, `multi-select`

**Date Range Picker:**
- `<web-daterangepicker>`
- Attributes: `placeholder`, `single-date`, `time-picker`

---

## Components NOT in Snippets (need to add)

1. **Statistics** (`_statistics.scss`) - Complete stat card system
2. **File Selector** (`_file-selector.scss`) - File upload component
3. **Logic Tree** (`_logic-tree.scss`) - Tree/hierarchy display
4. **Notifications** (`_notifications.scss`) - System notifications
5. **Settings Panel** (`_settings-panel.scss`) - Settings sidebar

---

## Gap Analysis: Snippets vs Views vs SCSS

### Missing from Snippets (exist in SCSS/Views):
| Component | In SCSS | In Views | Status |
|-----------|---------|----------|--------|
| Statistics | Yes | dashboard.mustache | **Need snippet** |
| File Selector | Yes | file-selector.mustache | **Need snippet** |
| Logic Tree | Yes | No view | Low priority |
| Notifications | Yes | No view | Low priority |
| Settings Panel | Yes | partials/settings-panel | Internal component |

### Views with Patterns Not in Snippets:
| View | Missing Pattern |
|------|-----------------|
| `smart-filters.mustache` | Inline query editor tokens |
| `table-multi-select.mustache` | Cross-filter selection state |
| `virtual-scroll.mustache` | Virtual scroll patterns |

---

## Recommendations for svelte-pure-admin

### Core Components (High Priority)
1. Alert
2. Badge + CompositeBadge + BadgeGroup
3. Button + ButtonGroup
4. Card
5. Form components (Input, Select, Textarea, Checkbox, Radio, InputGroup)
6. Table + Pager + LoadMore
7. Modal + Dialog API (confirm/alert/prompt)
8. Toast
9. Tabs
10. Tooltip + Popover

### Secondary Components (Medium Priority)
11. Loader (multiple types)
12. Timeline (3 variants)
13. Checkbox List
14. Profile Panel
15. Code Block
16. List
17. Popconfirm
18. Statistics

### Layout Components
19. Layout + Sidebar + Navbar
20. Grid (Row + Column)

### Utility Exports
21. Utility classes (exported as CSS, not Svelte components)

### Complex/JS-Heavy Components (Consider separate packages)
22. Command Palette
23. Virtual Scroll
24. Web Components (Multiselect, Date Picker)

---

---

## GAP ANALYSIS: svelte-pure-admin vs pure-admin-visual

### Components Already Implemented (74)

| Category | Component | Status | Notes |
|----------|-----------|--------|-------|
| **Buttons** | Button | ✅ Complete | All variants, sizes, loading, ripple, icons |
| | ButtonGroup | ✅ Complete | Vertical support |
| **Forms** | Input | ✅ Complete | All sizes, states |
| | Textarea | ✅ Complete | |
| | Select | ✅ Complete | All sizes, states |
| | Checkbox | ✅ Complete | Sizes, indeterminate, x-mark |
| | Radio | ✅ Complete | Sizes |
| | FormGroup | ✅ Complete | Horizontal, validation states |
| | FormLabel | ✅ Complete | |
| | InputGroup | ✅ Complete | Prepend/Append |
| | SmallText | ✅ Complete | Helper text |
| **Display** | Card | ✅ Complete | Header/body/footer, variants |
| | CardTab | ✅ Complete | Tab variant |
| | Badge | ✅ Complete | All variants, sizes, pill |
| | Label | ✅ Complete | |
| | CompositeBadge | ✅ Complete | Three-part structure |
| | BadgeGroup | ✅ Complete | |
| | Table | ✅ Complete | Striped, spacing |
| | TableResponsive | ✅ Complete | |
| | Pager | ✅ Complete | Left/center/right |
| | LoadMore | ✅ Complete | |
| | Stat | ✅ Complete | Hero, square variants |
| | List/BasicList/OrderedList | ✅ Complete | Multiple variants |
| | Code/CodeBlock | ✅ Complete | Language variants |
| | Timeline | ✅ Complete | Simple, block, feed variants |
| | TimelineItem | ✅ Complete | Color variants |
| | CheckboxList | ✅ Complete | Layout variants |
| **Feedback** | Alert | ✅ Complete | Dismissible, all variants |
| | Modal | ✅ Complete | Sizes, variants, positions |
| | Toast | ✅ Complete | Progress, auto-dismiss |
| | ToastContainer | ✅ Complete | 6 positions |
| | Spinner | ✅ Complete | All sizes, variants |
| | Tooltip | ✅ Complete | Positions, variants |
| | Popover | ✅ Complete | Sizes, positions |
| | Popconfirm | ✅ Complete | Variants |
| | NotificationsPanel | ✅ Complete | |
| **Layout** | Layout | ✅ Complete | Full layout system |
| | Navbar | ✅ Complete | |
| | Sidebar | ✅ Complete | Items, submenu |
| | Grid/Column | ✅ Complete | PureCSS integration |
| | Footer | ✅ Complete | |
| | Section | ✅ Complete | |
| | SettingsPanel | ✅ Complete | Theme/font/layout switching |
| **Navigation** | Tabs | ✅ Complete | Pills, boxed, vertical, scrollable |
| | TabItem/TabPanel | ✅ Complete | |
| | CommandPalette | ✅ Complete | Context switching, keyboard nav |
| | NavItem/NavDropdown | ✅ Complete | |
| **Profile** | ProfilePanel | ✅ Complete | |
| **Typography** | Heading | ✅ Complete | |
| | Paragraph | ✅ Complete | |
| **Config** | PureAdminProvider | ✅ Complete | Context-based config |

---

### GAPS: Missing Components

| Component | In pure-admin-visual | Priority | Notes |
|-----------|---------------------|----------|-------|
| **Loaders (Advanced)** | `_loaders.scss` | Medium | Only Spinner exists - missing: Dots, Bars, Pulse, Ring, Wave |
| **Virtual Scroll** | `virtual-scroll.html` | Low | Complex JS component |
| **Web Multiselect** | `web-multiselect.html` | Low | Web component wrapper |
| **Web DateRangePicker** | `web-daterangepicker.html` | Low | Web component wrapper |
| **Comparison Table** | `comparison.html` | Low | Specialized component |
| **File Selector** | `_file-selector.scss` | Medium | File upload UI |
| **Logic Tree** | `_logic-tree.scss` | Low | Tree/hierarchy display |
| **Smart Filters** | `smart-filters.mustache` | Low | Query editor with tokens |

---

### GAPS: Missing Props/Features on Existing Components

**Verified against actual svelte-pure-admin code:**

| Component | Missing Feature | CSS Class | Priority | Status |
|-----------|-----------------|-----------|----------|--------|
| **Badge** | `--xs` size | `pa-badge--xs` | High | **MISSING** |
| **Badge** | `--xl` size | `pa-badge--xl` | High | **MISSING** |
| **Badge** | Fixed widths | `pa-badge--w-*` | - | ✅ EXISTS |
| **Badge** | Ellipsis left | `--ellipsis-left` | - | ✅ EXISTS |
| **Alert** | Outline variants | `--outline-*` | - | ✅ EXISTS |
| **Alert** | Icon element | `__icon` | - | ✅ EXISTS |
| **Alert** | Heading element | `__heading` | - | ✅ EXISTS |
| **Alert** | List snippet | `__list` | Medium | **MISSING** |
| **Alert** | Actions snippet | `__actions` | Medium | **MISSING** |
| **Spinner** | All sizes | `--xs` to `--2xl` | - | ✅ EXISTS |
| **Modal** | All sizes | `--xxl`, `--fw` | - | ✅ EXISTS |
| **Modal** | Scrollable body | `__body--scrollable` | High | **MISSING** |
| **Modal** | Top position | `--top` | Medium | **MISSING** |
| **Modal** | Info variant | `--info` | - | ✅ EXISTS |
| **Checkbox** | X-mark variant | `--x` | Medium | **VERIFY** |
| **Input** | Clear button | `__clear` | Medium | **MISSING** |
| **Table** | Responsive grid | `--responsive-grid` | Medium | **MISSING** |
| **Table** | Checkbox column | `__checkbox-col` | Medium | **MISSING** |
| **Table** | Selected row | `__row--selected` | Medium | **MISSING** |
| **Timeline** | Date header | `__date-header` | Low | **MISSING** |
| **Tabs** | Full width | `--full` | Medium | **VERIFY** |
| **Tabs** | No wrap | `--nowrap` | Low | **VERIFY** |
| **Code** | Compact mode | `--compact` | Medium | **VERIFY** |
| **Tooltip** | Help cursor | `--help` | Low | **VERIFY** |
| **Card** | Stat variant | `--stat` | Medium | **VERIFY** |
| **Card** | Title icon | `__title-icon` | Medium | **VERIFY** |
| **Card** | Meta section | `__meta` | Medium | **VERIFY** |
| **CheckboxList** | Grid layouts | `--grid`, `--2col`, `--3col` | Medium | **VERIFY** |
| **Popover** | Sizes | `--sm`, `--lg` | Medium | **VERIFY** |

**Legend:** ✅ EXISTS = Already implemented | **MISSING** = Need to add | **VERIFY** = Need to check implementation

---

### GAPS: Missing Utility Classes (Not Components)

These are CSS-only utilities that don't need Svelte components:

| Utility | CSS Classes | Notes |
|---------|-------------|-------|
| Font size | `font-size-2xs` to `font-size-4xl` | Apply to `<html>` |
| Font family | `font-family-serif`, `font-family-mono` | |
| Compact mode | `compact-mode` | Apply to `<body>` |
| Spacing | `m-*`, `p-*`, `mx-*`, `py-*`, etc. | 0-20 scale |
| Display | `d-none`, `d-flex`, `d-block`, etc. | |
| Flexbox | `flex-row`, `justify-content-*`, etc. | |
| Overflow | `overflow-auto`, `overflow-hidden`, etc. | |
| Position | `position-relative`, `position-absolute`, etc. | |
| Border | `border`, `border-0`, `rounded`, etc. | |
| Shadow | `shadow-sm`, `shadow`, `shadow-lg` | |
| Cursor | `cursor-pointer`, `cursor-help`, etc. | |

**Recommendation:** Export these as a utilities reference, not as components.

---

## PRIORITY IMPLEMENTATION PLAN

### Phase 1: High Priority (Confirmed Missing)
1. **Badge** - Add `xs`, `xl` sizes (type: `BadgeSize = 'xs' | 'sm' | 'lg' | 'xl'`)
2. **Modal** - Add `scrollable` body prop, `position: 'top' | 'center'` prop
3. **Alert** - Add `list` and `actions` snippets

### Phase 2: Medium Priority (Add New Components)
4. **Loader** - NEW component with types: `dots`, `bars`, `pulse`, `ring`, `wave`
5. **Input** - Add clear button wrapper functionality
6. **Table** - Add `responsiveGrid` prop, checkbox column, selected row support

### Phase 3: Verify & Complete (Need Code Review)
7. **Checkbox** - Verify x-mark variant exists
8. **Tabs** - Verify full/nowrap modes exist
9. **Code** - Verify compact mode exists
10. **Card** - Verify stat variant, title-icon, meta exist
11. **CheckboxList** - Verify grid layouts exist
12. **Popover** - Verify sm/lg sizes exist
13. **Tooltip** - Verify help cursor exists

### Phase 4: Low Priority (Nice-to-have)
14. **Timeline** - Add date header element
15. **File Selector** - New component
16. **Virtual Scroll** - Complex JS component
17. **Web Components** - Multiselect, DateRangePicker wrappers

---

## RECOMMENDED ACTIONS

### Immediate Actions (This Session)
1. **Badge** - Update `badge-types.ts` to add `xs` and `xl` to `BadgeSize`
2. **Modal** - Add `scrollable` prop and `position` prop
3. **Alert** - Add `list` and `actions` snippet props
4. **Loader** - Create new Loader.svelte component

### Verification Actions (Quick Review)
5. Check Checkbox for `xMark` prop
6. Check Tabs for `full` and `nowrap` props
7. Check Code for `compact` prop
8. Check Card for `stat` variant
9. Check CheckboxList for grid props
10. Check Popover for `size` prop

### Follow-up Actions
11. Create demo routes for any new features
12. Sync snippets from pure-admin-visual if needed

---

## FILES TO MODIFY

### svelte-pure-admin Components (Confirmed Changes)
| File | Changes |
|------|---------|
| `src/lib/display/badge-types.ts` | Add `xs`, `xl` to BadgeSize type |
| `src/lib/feedback/Modal.svelte` | Add `scrollable`, `position` props |
| `src/lib/feedback/Alert.svelte` | Add `list`, `actions` snippets |
| `src/lib/feedback/Loader.svelte` | **NEW** - Dots, Bars, Pulse, Ring, Wave |
| `src/lib/index.ts` | Export Loader component |

### svelte-pure-admin Components (Verify First)
| File | Check For |
|------|-----------|
| `src/lib/forms/Checkbox.svelte` | `xMark` prop |
| `src/lib/navigation/Tabs.svelte` | `full`, `nowrap` props |
| `src/lib/display/Code.svelte` | `compact` prop |
| `src/lib/display/Card.svelte` | `stat` variant |
| `src/lib/display/CheckboxList.svelte` | `grid`, `columns` props |
| `src/lib/feedback/Popover.svelte` | `size` prop |
| `src/lib/feedback/Tooltip.svelte` | `help` prop |

### pure-admin-visual Reference Files
| File | Use For |
|------|---------|
| `snippets/loaders.html` | Loader component HTML patterns |
| `snippets/badges.html` | Badge size verification |
| `snippets/modals.html` | Modal scrollable/position patterns |
| `snippets/alerts.html` | Alert list/actions patterns |

---

## IMPLEMENTATION CHECKLIST

### Step 1: Badge Component Updates
- [ ] Update `C:\Git\KM\svelte-pure-admin\src\lib\display\badge-types.ts`
  - Change `BadgeSize = 'sm' | 'lg'` to `BadgeSize = 'xs' | 'sm' | 'lg' | 'xl'`

### Step 2: Modal Component Updates
- [ ] Update `C:\Git\KM\svelte-pure-admin\src\lib\feedback\Modal.svelte`
  - Add `position?: 'center' | 'top'` prop
  - Add `scrollable?: boolean` prop for body
  - Update `modalClasses` to include `pa-modal--top` when position is 'top'
  - Update body div to include `pa-modal__body--scrollable` when scrollable is true

### Step 3: Alert Component Updates
- [ ] Update `C:\Git\KM\svelte-pure-admin\src\lib\feedback\Alert.svelte`
  - Add `list?: Snippet` prop
  - Add `actions?: Snippet` prop
  - Render `<div class="pa-alert__list">{@render list()}</div>` when provided
  - Render `<div class="pa-alert__actions">{@render actions()}</div>` when provided

### Step 4: Create Loader Component (NEW)
- [ ] Create `C:\Git\KM\svelte-pure-admin\src\lib\feedback\Loader.svelte`
  - Props: `type: 'dots' | 'bars' | 'pulse' | 'ring' | 'wave'`, `size: 'default' | 'lg'`
  - CSS classes: `pa-loader-dots`, `pa-loader-bars`, `pa-loader-pulse`, `pa-loader-ring`, `pa-loader-wave`
  - Size modifier: `pa-loader-{type}--lg`
- [ ] Update `C:\Git\KM\svelte-pure-admin\src\lib\index.ts` to export Loader

### Step 5: Verify Existing Components (Quick Audit)
- [ ] `Checkbox.svelte` - Check for `xMark` prop → if missing, add it
- [ ] `Tabs.svelte` - Check for `full`, `nowrap` props → if missing, add them
- [ ] `Code.svelte` / `CodeBlock.svelte` - Check for `compact` prop → if missing, add it
- [ ] `Card.svelte` - Check for `stat` variant → if missing, add it
- [ ] `CheckboxList.svelte` - Check for `grid`, `columns` props → if missing, add them
- [ ] `Popover.svelte` - Check for `size` prop → if missing, add it
- [ ] `Tooltip.svelte` - Check for `help` cursor prop → if missing, add it

### Step 6: Table Component Updates (if needed after audit)
- [ ] Add `responsiveGrid?: boolean` prop
- [ ] Document checkbox column usage pattern
- [ ] Document selected row usage pattern

### Step 7: Demo Routes (Optional)
- [ ] Create/update demo routes to showcase new features
- [ ] Verify all components render correctly with new props

---

## FILE PATHS SUMMARY

**svelte-pure-admin base:** `C:\Git\KM\svelte-pure-admin\`

| Action | File |
|--------|------|
| MODIFY | `src/lib/display/badge-types.ts` |
| MODIFY | `src/lib/feedback/Modal.svelte` |
| MODIFY | `src/lib/feedback/Alert.svelte` |
| CREATE | `src/lib/feedback/Loader.svelte` |
| MODIFY | `src/lib/index.ts` |
| VERIFY | `src/lib/forms/Checkbox.svelte` |
| VERIFY | `src/lib/navigation/Tabs.svelte` |
| VERIFY | `src/lib/display/Code.svelte` |
| VERIFY | `src/lib/display/CodeBlock.svelte` |
| VERIFY | `src/lib/display/Card.svelte` |
| VERIFY | `src/lib/display/CheckboxList.svelte` |
| VERIFY | `src/lib/feedback/Popover.svelte` |
| VERIFY | `src/lib/feedback/Tooltip.svelte` |
| VERIFY | `src/lib/display/Table.svelte` |

**pure-admin-visual reference:** `C:\Git\KM\pure-admin\pure-admin-visual\`

| Reference | File |
|-----------|------|
| Loaders HTML | `snippets/loaders.html` |
| Loaders SCSS | `src/scss/core-components/_loaders.scss` |
