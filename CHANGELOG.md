# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Inputs docs**: Added "Toggle Mode Button (Filter / Search) + Go" example — demonstrates buttons on both sides of an InputGroup with reactive icon/placeholder toggle using `isInputGroupButton` prop
- **Modals docs**: Added code examples section with 4 patterns: basic show/hide, form modal, `beforeCloseCallback`, scrollable/static/variants
- **Modals docs**: Added API reference table with all Modal props and snippet slots
- **Modals docs**: Added live demos for scrollable body (`isScrollable`) and prevent close (`beforeCloseCallback`)
- **Modals docs**: Added "Modal vs dialogService — When to Use Which" comparison card
- **Modal-dialogs docs**: Added callout explaining that `dialogService` is limited to plain text messages, linking to Modals page for complex content

### Changed

- **Inputs docs**: Updated "With Button" example and code snippets to use `isInputGroupButton` prop instead of manual `class="pa-input-group__button"`

### Fixed

- **CheckboxBox**: Changed wrapper element from `<span>` to `<label>` so clicks on the styled box correctly toggle the hidden input (matches pure-admin-core snippet fix)
- **Toast**: Progress bar now animates correctly — deferred `progressWidth` update to `requestAnimationFrame` so the browser paints the initial 100% state before transitioning to 0%
- **Toasts demo**: Replaced deprecated physical positions (`top-right`, `top-left`, etc.) with logical RTL-aware positions (`top-end`, `top-start`, etc.) — physical positions were removed in pure-admin-core v1.4.0
- **Toasts demo**: Replaced Grid/Column layout with ButtonGroup for Toast Variants section (matches pure-admin-core demo update)
- **Tabs demo**: Added `class="mb-4"` to first Grid in "Tabs as Card Header" section to create visible gap between stacked rows
- **Sidebar navigation**: Added `active` prop to all SidebarItem links using `$page.url.pathname` so the current page is visually highlighted

### Breaking Changes

#### Prop Naming Convention Alignment (KeenMate Standard)

All component props have been renamed to follow the KeenMate naming methodology: `is*`/`has*`/`should*` for booleans, `*Text` for string content props, lowercase `on*` for fire-and-forget events, and `*Callback` only when the return value controls behavior.

**Button.svelte:**
- `outline` → `isOutline`
- `block` → `isBlock`
- `iconOnly` → `isIconOnly`
- `loading` → `isLoading`
- `ripple` → `isRipple`
- `title` → `titleText`

**Alert.svelte:**
- `dismissible` → `isDismissible`
- `outline` → `isOutline`
- `heading` → `headingText`
- `onDismiss` → `ondismiss`

**Modal.svelte:**
- `scrollable` → `isScrollable`
- `title` → `titleText`
- `showClose` → `shouldShowClose`
- `closeOnEscape` → `shouldCloseOnEscape`
- `onBeforeClose` → `beforeCloseCallback`
- `onClose` → `onclose`

**Toast.svelte:**
- `title` → `titleText`
- `message` → `messageText`
- `showProgress` → `shouldShowProgress`
- `onClose` → `onclose`

**Popconfirm.svelte:**
- `message` → `messageText`
- `compact` → `isCompact`
- `onConfirm` → `onconfirm`
- `onCancel` → `oncancel`

**Popover.svelte:**
- `title` → `titleText`

**Callout.svelte:**
- `heading` → `headingText`

**Card.svelte:**
- `noPadding` → `hasPadding` (inverted logic: default changed from `false` to `true`)
- `stat` → `isStat`
- `title` → `titleText`
- `subtitle` → `subtitleText`
- `inlineTabs` → `hasInlineTabs`

**Badge.svelte:**
- `pill` → `isPill`
- `ellipsisLeft` → `isEllipsisStart`

**CompositeBadge.svelte:**
- `label` → `labelText`
- `interactive` → `isInteractive`
- `onButtonClick` → `onbuttonclick`
- `onLabelClick` → `onlabelclick`

**BadgeGroup.svelte:**
- `onBadgeClick` → `onbadgeclick`

**CompositeBadgeGroup.svelte:**
- `onLabelClick` → `onlabelclick`
- `onButtonClick` → `onbuttonclick`

**Table.svelte:**
- `striped` → `isStriped`
- `responsiveGrid` → `isResponsiveGrid`

**Timeline.svelte:**
- `onItemClick` → `onitemclick`

**TimelineItem.svelte:**
- `filled` → `isFilled`
- `dateHeader` → `isDateHeader`
- `time` → `timeText`

**Pager.svelte:**
- `onPrevious` → `onprevious`
- `onNext` → `onnext`
- `onPageChange` → `onpagechange`
- `onFirst` → `onfirst`
- `onLast` → `onlast`

**LoadMore.svelte:**
- `loading` → `isLoading`
- `showCount` → `shouldShowCount`
- `onClick` → `onclick`

**CheckboxListItem.svelte:**
- `label` → `labelText`
- `description` → `descriptionText`
- `onChange` → `onchange`

**ListItem.svelte:**
- `title` → `titleText`
- `subtitle` → `subtitleText`
- `meta` → `metaText`

**Stat.svelte:**
- `label` → `labelText`
- `change` → `changeText`
- `symbol` → `symbolText`

**BasicList.svelte:**
- `unstyled` → `isUnstyled`
- `inline` → `isInline`
- `bordered` → `isBordered`
- `striped` → `isStriped`
- `icon` → `hasIcon`

**ActivityFeedItem.svelte:**
- `time` → `timeText`

**CodeBlock.svelte:**
- `compact` → `isCompact`

**CodeBlockWithHeader.svelte:**
- `title` → `titleText`

**DefinitionList.svelte:**
- `inline` → `isInline`

**Label.svelte:**
- `outline` → `isOutline`

**MetricListItem.svelte:**
- `label` → `labelText`
- `value` → `valueText`

**StatusListItem.svelte:**
- `label` → `labelText`
- `value` → `valueText`

**Navbar.svelte:**
- `onBurgerClick` → `onburgerclick`

**Section.svelte:**
- `title` → `titleText`

**SidebarItem.svelte:**
- `label` → `labelText`
- `onClick` → `onclick`

**Checkbox.svelte:**
- `indeterminate` → `isIndeterminate`
- `xMark` → `isXMark`
- `label` → `labelText`
- `onChange` → `onchange`

**CheckboxBox.svelte:**
- `indeterminate` → `isIndeterminate`
- `xMark` → `isXMark`
- `onChange` → `onchange`

**FormField.svelte:**
- `label` → `labelText`
- `help` → `helpText`

**FormGroup.svelte:**
- `hasError` → `isError`
- `hasSuccess` → `isSuccess`

**Radio.svelte:**
- `label` → `labelText`
- `onChange` → `onchange`

**Tabs.svelte:**
- `borderTop` → `isBorderTop`

**TabsContainer.svelte:**
- `bordered` → `isBordered`
- `card` → `isCard`

**TabsVerticalLayout.svelte:**
- `bordered` → `isBordered`

**CommandPalette.svelte:**
- `onGlobalSelect` → `onglobalselect`

**NavbarSearch.svelte:**
- `onClick` → `onclick`

**ProfilePanel.svelte:**
- `noAvatar` → `hasAvatar` (inverted logic: default `true` = show avatar)
- `onClose` → `onclose`

**ProfilePanelFavoriteItem.svelte:**
- `label` → `labelText`
- `onClick` → `onclick`
- `onRemove` → `onremove`

**ProfilePanelNavItem.svelte:**
- `onClick` → `onclick`

**SettingsPanel.svelte:**
- `onSettingsChange` → `onsettingschange`
- `profileNoAvatar` → `profileHasAvatar` (inverted logic)

**Text.svelte:**
- `title` → `titleText`

**DialogContainer.svelte (internal):**
- Modal props updated: `showClose` → `shouldShowClose`, `title` → `titleText`, `onClose` → `onclose`
- Button `outline` → `isOutline` (custom dialog buttons)

**ShortcutHelpDialog.svelte (internal):**
- Modal props updated: `title` → `titleText`, `onClose` → `onclose`

#### Type Changes

**badge-types.ts:**
- `BaseBadgeProps.pill` → `isPill`
- `BaseBadgeProps.ellipsisLeft` → `isEllipsisStart`
- `BadgeItem.pill` → `isPill`
- `CompositeBadgeItem.label` → `labelText`
- `CompositeBadgeItem.interactive` → `isInteractive`

**timeline-types.ts:**
- `TimelineItemData.filled` → `isFilled`
- `TimelineItemData.dateHeader` → `isDateHeader`

**command-palette-types.ts:**
- `onGlobalSelect` → `onglobalselect`

**dialog-service.svelte.ts:**
- `DialogButton.outline` → `DialogButton.isOutline`

**popover-manager.svelte.ts:**
- `PopoverState.alignment`: `'center' | 'right'` → `'center' | 'end'`

**ToastContainer.svelte:**
- `ToastPosition` default changed from `'top-right'` to `'top-end'`
- Old physical positions (`'top-right'`, `'top-left'`, `'bottom-right'`, `'bottom-left'`) are still accepted but deprecated; use logical `'top-end'`, `'top-start'`, `'bottom-end'`, `'bottom-start'` instead

#### i18n System Rewrite

The entire i18n subsystem has been replaced. The custom runes-based `i18nStore` singleton is removed in favor of a `svelte-i18n`-based architecture.

**Deleted files:**
- `src/lib/i18n/store.svelte.ts` — old 351-line custom store with `$state`/`$derived` reactive state
- `src/lib/i18n/hooks.ts` — old convenience wrappers (`useI18n`, `useTranslate`, `useScopedTranslate`)

**New files:**
- `src/lib/i18n/i18n-service.svelte.ts` — new i18n service singleton using `svelte-i18n` under the hood, supports bundled/injected/async loading strategies
- `src/lib/i18n/setup.ts` — backwards-compatible wrapper with deprecated shims (`initI18n`, `loadLocale`, `isLocaleLoaded`)

**Removed exports:**
- `i18nStore`, `useI18n`, `useTranslate`, `useScopedTranslate`
- Types: `AppTranslations`, `TranslationKeys`, `LanguageItem`, `I18nConfig`, `TranslationParams`, `TranslationKeyPath`

**New exports:**
- `i18n` (primary API), `_` (translation store), `locale`, `locales`, `isLoading`
- `initI18n`, `registerLibraryTranslations`, `loadLocale`, `isLocaleLoaded` (backwards compat)
- `addMessages`, `register`, `init`, `getLocaleFromNavigator`, `getLocaleFromQueryString`, `getLocaleFromHash`, `getLocaleFromPathname` (re-exports from `svelte-i18n`)
- Types: `I18nInitOptions`, `Language`, `PureAdminTranslations`

**Translation key format changed:**
- Old: nested typed interface (`TranslationKeys.dialog.confirm`)
- New: flat `Record<string, string>` with `pureAdmin.*` namespace (`pureAdmin.dialog.confirm`)

**Migration example:**
```typescript
// Before
import { i18nStore } from '@keenmate/svelte-pure-admin';
i18nStore.initialize({ locale: 'en' });
i18nStore.t('dialog.confirm');

// After
import { i18n, _ } from '@keenmate/svelte-pure-admin';
i18n.init({ locale: 'en' });
$_('pureAdmin.dialog.confirm'); // in .svelte files
```

**config.ts:**
- `I18nConfig` simplified to `{ locale: string; fallbackLocale?: string }` (removed `translations`, `customTranslations`, `languages`, `loadTranslations` fields — use `i18n.init()` directly for advanced configuration)
- `ui.theme` type widened: `'light' | 'dark'` → `'light' | 'dark' | 'auto'`

#### New Dependency

- Added `svelte-i18n ^4.0.0` as a runtime dependency (previously i18n was self-contained)

### Added

#### New Components

- **SlidePanel** — Fixed overlay panel that slides in from the right. Handles escape key, backdrop click, and body scroll lock. Props: `show` (bindable), `onclose`
- **DetailPanel** — Content shell for detail panels with header (title + close button), scrollable body, optional footer, and drag-to-resize support. Props: `titleText`, `header`, `tabs`, `footer`, `onclose`, `isResizable`, `isBordered`
- **DetailView** — Card overlay wrapper for DetailPanel. Positions panel as overlay within a card/container with optional backdrop. Props: `show` (bindable), `shouldShowBackdrop`, `isOverlay`, `main`, `onclose`
- **FilterCard** — Expandable filter card with inline filters and collapsible advanced section. Props: `isExpanded` (bindable), `shouldShowToggle`, `shouldShowClear`, `shouldShowRefresh`, `onclear`, `onrefresh`, `onapply`, `ontoggle`, `filters`, `advancedFilters`, `actions`
- **TableCard** — Card container designed for tables with no body padding, overflow handling, and border-radius. Props: `titleText`, `variant`, `color` (1-9), `isScrollable`, `isPlain`, `header`, `actions`, `footer`
- **TableContainer** — Table container with optional panel styling (overflow-x scroll, border, border-radius). Props: `isPanel`, `titleText`, `header`, `actions`
- **Field** — Single label-value pair for read-only data display. Supports copy-to-clipboard modes (btn, click, hover). Props: `labelText`, `valueText`, `full`, `copyMode`, `copyValue`, `copyValueCallback`, `oncopy`, `labelSnippet`, `valueSnippet`
- **Fields** — Container for multiple Field components with layout modifiers. Props: `cols` (2/3/4), `isHorizontal`, `isTable`, `isBordered`, `isStriped`, `isCompact`, `isRelaxed`, `isInline`, `isRow`, `isFilled`, `color` (1-9), `hasBorder`
- **FieldGroup** — Labeled section containing Fields with title. Props: `titleText`, `titleSnippet`

#### New Props on Existing Components

- **Button**: `iconPosition` (`'start' | 'end'`, default `'start'`) — controls icon placement relative to children text
- **Card**: `descriptionText` — inline description in header that truncates with ellipsis (three-part header)
- **Card**: `headerWrap` — allows header description to wrap to its own line (`pa-card__header--wrap` modifier)
- **Table**: `isBordered` — adds `pa-table--bordered` class for full cell borders
- **ProfilePanel**: `hasIconOnlyTabs` — shows profile panel tabs as icon-only (hides text labels, adds `pa-profile-panel__tabs--icon-only`)
- **ProfilePanel**: Body scroll lock — automatically adds `pa-scroll-lock` class to `document.body` when panel is open
- **SettingsPanel**: Auto theme mode — `'auto'` option follows OS preference via `prefers-color-scheme` media query
- **SettingsPanel**: RTL mode toggle — sets `dir="rtl"` on `<html>` element
- **SettingsPanel**: Sidebar resizable checkbox
- **SettingsPanel**: Profile icon-only tabs checkbox

#### Accessibility Improvements

- **All close/dismiss buttons** (Modal, Alert, Toast, PopoverContainer): Text characters (`✕`, `×`) replaced with inline SVG X icons
- **All close/dismiss buttons**: `aria-label` changed from hardcoded English strings to i18n-driven `$_('pureAdmin.common.buttons.close')`
- **Navbar**: Burger button `aria-label` now uses `$_('pureAdmin.a11y.toggleSidebar')`
- **NavbarSearch**: `aria-label` now uses `$_('pureAdmin.a11y.openSearch')`
- **TabsScrollable**: Scroll button `aria-label` values now i18n-driven
- **ProfilePanel**: Close button `aria-label` now uses `$_('pureAdmin.a11y.closeProfile')`
- **ProfilePanelFavoriteItem**: Remove button `title` now uses `$_('pureAdmin.a11y.removeFromFavorites')`
- **Sidebar**: Resize handle `title` now uses `$_('pureAdmin.a11y.dragToResizeSidebar')`

#### New i18n Translation Keys

- `pureAdmin.field.clickToCopy`, `pureAdmin.field.copied`
- `pureAdmin.common.buttons.close`, `pureAdmin.common.buttons.clearAll`, `pureAdmin.common.buttons.refresh`, `pureAdmin.common.buttons.moreFilters`, `pureAdmin.common.buttons.hideFilters`, `pureAdmin.common.buttons.clearFilters`, `pureAdmin.common.buttons.applyFilters`
- `pureAdmin.a11y.closeProfile`, `pureAdmin.a11y.closeDetailPanel`, `pureAdmin.a11y.scrollTabsLeft`, `pureAdmin.a11y.scrollTabsRight`, `pureAdmin.a11y.openSearch`, `pureAdmin.a11y.toggleSidebar`, `pureAdmin.a11y.removeFromFavorites`, `pureAdmin.a11y.dragToResizeSidebar`, `pureAdmin.a11y.settings`

#### New Data Display v2 Components

- **DescTable** — Ant Design-style descriptions table with tinted label cells. Props: `cols` (2/3), `class`
- **DescTableItem** — Single label-value pair in DescTable. Props: `labelText`, `isFull`, `children`
- **DotLeaders** — Dotted leader lines container for invoice/menu-style layouts. Props: `class`
- **DotLeadersItem** — Single row with label, dots, value. Props: `labelText`, `valueText`, `isTotal`, `children`
- **PropCard** — Bordered property card with header + row dividers (Stripe-style). Props: `class`, `children`
- **PropCardRow** — Single row in PropCard with label + value. Props: `labelText`, `valueText`, `isBold`, `children`
- **Banded** — Banded rows container with fixed-width tinted label column. Props: `isTruncate`, `class`, `children`
- **BandedRow** — Single row with tinted label + value. Props: `labelText`, `valueText`, `class`, `labelClass`, `children`
- **AccentGrid** — Responsive grid with color-coded left borders. Props: `class`, `children`
- **AccentGridItem** — Grid cell with color-coded left border. Props: `labelText`, `valueText`, `variant` (success/warning/danger/info), `children`

#### New Data Visualization Components

SCSS source: `_data-viz.scss`

- **Progress** — Progress bar with optional label group wrapper. Props: `value` (0-100, `--value: {value}%`), `labelText`, `valueText`, `size` (xs/sm/lg), `variant` (DataVizVariant), `isRounded`, `isStriped`, `isAnimated`
- **ProgressRing** — Circular progress ring via conic-gradient. Props: `value` (0-100, `--value: {value}`), `valueText`, `labelText`, `size` (sm/lg), `variant`
- **Gauge** — Semicircle gauge via conic-gradient. Props: `value` (0-100, `--value: {value}`), `valueText`, `labelText`, `minText`, `maxText`, `variant`, `isZones` (multi-zone green/yellow/red)
- **DataBar** — Inline bar for table cells. Props: `value` (0-100, `--value: {value}%`), `valueText`, `variant`, `isNegative`
- **StackedBar** — Stacked bar container. Props: `size` (sm/lg), `isRounded`
- **StackedBarSegment** — Stacked bar segment. Props: `value` (0-100, `--value: {value}%`), `variant` (success/warning/danger/info/secondary)
- **StackedBarLegend** — Legend container (sibling of StackedBar). Props: `class`, `children`
- **StackedBarLegendItem** — Legend item with color swatch. Props: `variant` (primary/success/warning/danger/info/secondary)
- **Sparkline** — Sparkline bar chart container. Props: `size` (sm/lg), `variant` (DataVizVariant)
- **SparklineBar** — Individual sparkline bar. Props: `value` (0-100, `--value: {value}%`)
- **Heatmap** — Heatmap grid container. Props: `variant` (success/danger), `isCompact`, `cols` (default 53)
- **HeatmapCell** — Heatmap cell. Props: `level` (0-4, maps to `data-level`)
- **HeatmapLegend** — Self-contained legend with 5 fixed cells (levels 0-4). Props: `lessText`, `moreText`
- **BarList** — Bar list container. Props: `variant` (DataVizVariant), `isCompact`
- **BarListItem** — Bar list item with label, value, and bar fill via `::after`. Props: `labelText`, `valueText`, `value` (0-100, `--value: {value}%`)

#### New Type Exports

- **DataVizVariant** — `'success' | 'warning' | 'danger' | 'info'` shared type for data visualization component variants

#### New Props on Existing Components (cont.)

- **Card**: `liveState` (`'up' | 'down' | 'neutral'`) — live-data card state with CSS tint transitions (`pa-card--live-up`, `pa-card--live-down`, `pa-card--live-neutral`)
- **Card**: `title` snippet — rich content title (alternative to `titleText` for titles containing markup like `<code>`)
- **Card**: `description` snippet — rich content description (alternative to `descriptionText` for descriptions containing markup)
- **Card**: `isGhost` — ghost mode, invisible container with no background, border, or shadow (`pa-card--ghost`)
- **Fields**: `isLinear` — ultra-clean side-by-side layout without borders/backgrounds
- **Fields**: `isChips` — Notion-style inline pills layout
- **Field**: `valueVariant` — color variant for chips mode (success/warning/danger)
- **BandedRow**: `labelClass` — additional CSS classes for the label element (e.g., width utilities like `wr-8`)
- **BandedRow**: `copyMode` (`'btn' | 'click' | 'hover'`) — copy-to-clipboard with three interaction styles: always-visible button, click value, hover-reveal button. Also `copyValue` (override text) and `oncopy` callback
- **PropCardRow**: `copyMode` (`'btn' | 'click' | 'hover'`) — copy-to-clipboard support. Copy button renders before value text (`order: -1` in CSS) to keep values right-aligned. Also `copyValue` and `oncopy`
- **DescTableItem**: `copyMode` (`'btn' | 'click' | 'hover'`) — copy-to-clipboard support with button inside value cell. Also `copyValue` and `oncopy`
- **AccentGridItem**: `copyMode` (`'btn' | 'click' | 'hover'`) — copy-to-clipboard support on accent grid items. Also `copyValue` and `oncopy`

#### New Component: ProgressGroup

- **ProgressGroup** — Label row wrapper for progress bars (Progress, StackedBar, etc.). Renders a `pa-progress-group` div with a `pa-progress__label` row containing label text and value text, followed by child content. Props: `labelText`, `valueText`, `class`, `children`

#### New Props on Existing Components (cont. 2 — component completeness)

These props were added so that demo pages can use components instead of raw `pa-*` HTML. The design principle: **if you need to know a `pa-*` class name, the component is failing at its job.**

- **Table**: `isHover` — adds `pa-table--hover` class for row hover highlighting
- **Table**: `isBorderless` — adds `pa-table--borderless` class for removing all cell borders
- **Table**: `isCompact` — adds `pa-table--compact` class for tighter row spacing
- **Table**: `isResponsive` — adds `pa-table--responsive` class for responsive stacking on small screens
- **Badge**: `themeColor` (`ThemeColor`, 1-9) — applies color slot background via `pa-badge--color-{N}`
- **Alert**: `themeColor` (`ThemeColor`, 1-9) — applies color slot background via `pa-bg-color-{N}`
- **FormHelp**: `themeColor` (`ThemeColor`, 1-9) — applies color slot styling via `pa-form-help--color-{N}`
- **Card**: `isHeaderUnderlined` (`boolean`) — accent-colored border under the heading in card header (`pa-card__header--underlined`)
- **Card**: `headerUnderlineColor` (`'success' | 'warning' | 'danger' | 'info'`) — semantic color variant for the header underline (requires `isHeaderUnderlined`)
- **Card**: `headerUnderlineThemeColor` (`ThemeColor`, 1-9) — theme color slot for the header underline (`pa-card__header--underline-color-{N}`, requires `isHeaderUnderlined`)
- **Card**: `headerClass` (`string`) — additional CSS classes appended to the `pa-card__header` element (useful for color slot backgrounds like `pa-bg-color-N`)
- **Button**: Rest props spread (`{...restProps}`) — forwards arbitrary HTML attributes like `data-*`, `aria-*`, `title`, etc. to the underlying `<button>` element
- **InputGroup**: `style` (`string`) — inline style attribute on the `pa-input-group` wrapper
- **Form**: Auto-adds `pa-form` class — the `<Form>` component now always includes the `pa-form` class on the rendered `<form>` element, so consumers no longer need to pass `class="pa-form"` manually

#### Docs: Eliminate Raw HTML Across Demo Pages

Systematic replacement of raw `pa-*` CSS class HTML with proper Svelte component usage across ~27 demo pages. This ensures demo pages serve as correct usage examples and validates that the component API covers all common patterns.

**Pages updated:**
- **kpi-dashboard**: 6× ProgressGroup, Table `isHover`
- **movies, movies-panel, movies/detail**: Table `isHover`, LoaderCenter
- **events-callbacks**: Table `isCompact isStriped`, Input, Grid/Column
- **data-visualization**: Table `isStriped isHover`, ProgressGroup
- **detail-panel**: Table `isBorderless`, LoaderCenter
- **colors**: Card `headerClass`, Alert `themeColor`, Badge `themeColor`
- **loaders**: LoaderCenter, LoaderOverlay
- **forms**: 10× Form (auto `pa-form`)
- **timeline**: 2× Callout
- **code**: 2× CodeBlockWithHeader (removed dead `copyCode` function)
- **inputs**: Input/FormHelp `themeColor`, BasicList
- **i18n**: Select, Input
- **auto-theme**: Select
- **checkbox-lists**: 4× CheckboxBox
- **tables**: 10× TableContainer, 4× BasicList
- **tables-sizing**: 3× TableContainer
- **tables-responsive**: 3× Table `isResponsive`
- **+layout.svelte**: Tabs/TabItem/TabPanel (profile panel tabs)
- **table-filters**: InputGroup with style, DateInput
- **data-display**: 5× BasicList
- **cards**: 7× BasicList
- **grid**: 17× Column
- **batch-rpc**: 1× BasicList
- **command-palette**: 2× OrderedList, 3× Table `isCompact`
- **buttons**: 36× Button (with rest props for `data-*` attributes)

#### Docs Pages

- **Events & Callbacks** (`/events-callbacks`) — Interactive test page with 17 components wired to a shared event log for testing all `on*` event handlers and `*Callback` props
- **Auto Theme** (`/auto-theme`)
- **Data Display** (`/data-display`)
- **Data Display v2** (`/data-display-2`) — Full showcase of v2 data display patterns: DescTable, DotLeaders, PropCard, Banded, AccentGrid with real-world invoice example and copyable fields demo (all 3 copy modes across all 4 pattern types)
- **Data Visualization** (`/data-visualization`) — Full showcase of all data viz components: Progress bars (sizes, colors, rounded, striped, animated), Stacked bars with legend, Progress rings, Gauges (colors, zones), Data bars (colors, negative), Heatmaps (colors, compact, legend), Sparklines, Bar lists, Card live states
- **Detail Panel** (`/detail-panel`)
- **i18n** (`/i18n`)
- **Table Filters** (`/table-filters`)

#### Docs Updates

- **Cards** (`/cards`) — Added Card Header Three-Part Layout section (title + description + actions, truncation, tooltips, wrap modifier), Ghost Card section, Underlined Headers section, and CSS Classes Reference

### Fixed

- **Select**: Default value changed from empty string (`''`) to `undefined` so the browser naturally shows the first `<option>` — previously selects appeared blank until user interacted with them
- **Copy icon mismatch**: Replaced Lucide/Feather stroke SVG with Font Awesome `fa-copy` filled SVG in all copyable components (Field, DescTableItem, PropCardRow, BandedRow, AccentGridItem) to match pure-admin's icon style
- **Modal**: Setting `show` to `false` via binding (e.g., parent toggling `bind:show`) now triggers `beforeCloseCallback` and `onclose`, matching the behavior of closing via X button, backdrop click, or Escape key. Previously, only internal close actions ran the callback flow. Implemented via `$effect.pre()` with `wasOpen`/`internalClose` tracking flags
- **FormErrorSummary**: Changed inner BasicList margin from `mt-2 mb-0` to `mt-0 mb-0`

### Changed

- **Grid**: `GapSize` type expanded to match pure-admin's full `$semantic-spacers` map: `'0' | 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl' | '2xl'`
- **Grid**: `gap` prop now also accepts numbers (1-20), producing `gap-{n}` utility classes matching pure-admin's numeric gap system
- **SettingsPanel**: Container width and sidebar mode now use `localStorage` instead of URL query params (no more page reloads for layout changes)
- **SettingsPanel**: Removed `'font-family-delivery'` font option
- **package.json**: GitHub URLs corrected from `keenmate` (lowercase) to `KeenMate` (proper case) in repository URL, homepage, and bugs URL
- **package.json**: Dev dependencies changed from `file:` references to versioned `^1.5.0` for `@keenmate/pure-admin-core` and `@keenmate/pure-admin-theme-audi`
- **package.json**: Bumped `@keenmate/pure-admin-core` peer dependency from `^1.5.1` to `^2.0.0`
- **package.json**: Added `ai/` to `files` array and build script copies `ai/` reference files into package at build time
- **docs/buttons**: Fixed Button Text Alignment demo to use `wr-20` (matching pure-admin demo) instead of `wr-15`
- **docs/package.json**: Bumped all `@keenmate/pure-admin-*` packages (core + 5 themes) from `^1.5.0` to `^1.5.1`

### CSS Features (via pure-admin-core unreleased)
These features are available through CSS classes (use via `class` prop) without dedicated Svelte component props:
- **Detail view min-height support**: `.pa-table-card` with `.pa-detail-view` properly fills available height when using min-height utilities (e.g., `minhr-25`)

---

## [1.5.0] - 2026-02-03

### Breaking Changes

#### Left/Right → Start/End Rename (RTL Consistency)
All component props and CSS class references using physical `left`/`right` have been renamed to logical `start`/`end` for full RTL (Right-to-Left) support. This aligns with **pure-admin-core v1.5.0**.

**Button.svelte:**
- `ButtonAlign` type: `'left' | 'right' | 'center' | 'justify'` → `'start' | 'end' | 'center' | 'justify'`
- CSS classes: `pa-btn--align-left` → `pa-btn--align-start`, `pa-btn--align-right` → `pa-btn--align-end`

**Pager.svelte:**
- `PagerAlign` type: `'left' | 'center' | 'right'` → `'start' | 'center' | 'end'`
- CSS classes: `pa-pager--left` → `pa-pager--start`, `pa-pager--right` → `pa-pager--end`

**LoadMore.svelte:**
- `LoadMoreAlign` type: `'left' | 'center' | 'right'` → `'start' | 'center' | 'end'`
- CSS classes: `pa-load-more--left` → `pa-load-more--start`, `pa-load-more--right` → `pa-load-more--end`

**Navbar.svelte:**
- Props renamed: `navLeft` → `navStart`, `navRight` → `navEnd`
- CSS classes: `pa-header__left` → `pa-header__start`, `pa-header__right` → `pa-header__end`, `pa-header__nav--left` → `pa-header__nav--start`, `pa-header__nav--right` → `pa-header__nav--end`

**Footer.svelte:**
- Props renamed: `left` → `start`, `right` → `end`, `rightVertical` → `endVertical`
- CSS classes: `pa-footer__left` → `pa-footer__start`, `pa-footer__right` → `pa-footer__end`, `pa-footer__right--vertical` → `pa-footer__end--vertical`

**TabsScrollable.svelte:**
- CSS classes: `pa-tabs__scroll-btn--left` → `pa-tabs__scroll-btn--start`, `pa-tabs__scroll-btn--right` → `pa-tabs__scroll-btn--end`

**Popover.svelte:**
- `PopoverAlignment` type: `'center' | 'right'` → `'center' | 'end'`

**Migration Example:**
```svelte
<!-- Before -->
<Button align="left">Save</Button>
<Pager align="right" />
<LoadMore align="left" />
<Navbar>
  {#snippet navLeft()}...{/snippet}
  {#snippet navRight()}...{/snippet}
</Navbar>
<Footer>
  {#snippet left()}...{/snippet}
  {#snippet right()}...{/snippet}
</Footer>
<Popover alignment="right" />

<!-- After -->
<Button align="start">Save</Button>
<Pager align="end" />
<LoadMore align="start" />
<Navbar>
  {#snippet navStart()}...{/snippet}
  {#snippet navEnd()}...{/snippet}
</Navbar>
<Footer>
  {#snippet start()}...{/snippet}
  {#snippet end()}...{/snippet}
</Footer>
<Popover alignment="end" />
```

### Changed

#### Peer Dependency Update
- **@keenmate/pure-admin-core**: Updated minimum version from `^1.4.1` to `^1.5.0`

#### Buttons Demo Page: Improved Text Alignment Examples
- Button alignment examples now use wider buttons (`minwr-15`/`minwr-18`) with varied text lengths to clearly demonstrate alignment differences
- Updated alignment values from `left`/`right` to `start`/`end`

### CSS Features (via pure-admin-core 1.5.0)
These features are available through CSS without Svelte component changes:
- **Text alignment utilities**: `pa-text--left`/`pa-text--right` removed, use `pa-text--start`/`pa-text--end`
- **Timeline positioning**: `pa-timeline--left`/`pa-timeline--right` renamed to `pa-timeline--start`/`pa-timeline--end`

---

## [1.4.0] - 2026-02-02

### Changed

#### Peer Dependency Update
- **@keenmate/pure-admin-core**: Updated minimum version from `^1.4.0` to `^1.4.1`
- **Theme packages**: Updated to v1.4.0 (`@keenmate/pure-admin-theme-audi`, `theme-corporate`, `theme-dark`, `theme-express`, `theme-minimal`)

#### ToastContainer Default Position (RTL Improvement)
- Default position changed from `'top-right'` to `'top-end'` for better RTL support
- Physical position props (`top-right`, `top-left`, etc.) are now deprecated but still supported
- Documentation updated to recommend logical positions for all new code

#### Card Component: Three-Part Header Layout (v1.4.1)
- New `descriptionText` prop for inline description that truncates with ellipsis
- New `headerWrap` prop adds `--wrap` modifier to allow description to wrap to its own line
- Three-part layout: `[Title]` — `[Description (truncates)]` — `[Tools/Actions]`
- Existing `subtitleText` prop still works for below-title descriptions

```svelte
<!-- Three-part header with truncating description -->
<Card
  titleText="Analytics Dashboard"
  descriptionText="Real-time metrics and performance indicators for your application"
  headerWrap={false}
>
  {#snippet tools()}
    <Button size="sm">Refresh</Button>
  {/snippet}
  ...
</Card>
```

#### Scroll Lock Support (v1.4.1)
- **SlidePanel**: Now adds `pa-scroll-lock` class to body when open, preventing background scrolling
- **ProfilePanel**: Now adds `pa-scroll-lock` class to body when open
- Scroll lock is automatically removed when panels are closed or unmounted

### CSS Features (via pure-admin-core 1.4.1)
These features are available through CSS without Svelte component changes:
- **Height utilities**: `.h-full`, `.h-screen`, `.min-h-full`, `.min-h-screen`, `.max-h-full`, `.max-h-screen`
- **Flex utilities**: `.flex-1`, `.flex-auto`, `.flex-grow`, `.flex-shrink-0`
- **Scroll lock**: `.pa-scroll-lock` utility class for disabling body scroll
- **Detail panel z-index fix**: Card overlay mode stays below header
- **Card title truncation fix**: Nested titles in `.pa-card__title` now truncate correctly

---

## [1.3.0] - 2026-01-31

### Changed

#### Peer Dependency Update
- **@keenmate/pure-admin-core**: Updated minimum version from `^1.2.0` to `^1.4.0`
- **Theme packages**: Updated to v1.3.0 (`@keenmate/pure-admin-theme-audi`, `theme-corporate`, `theme-dark`, `theme-express`, `theme-minimal`)

#### Font Size Scaling Fix (via pure-admin-core 1.4.0)
- Fixed `html.font-size-small`, `font-size-large`, etc. classes using incorrect rem values
- Font size settings in SettingsPanel now work correctly

#### RTL (Right-to-Left) Support
**ToastContainer.svelte:**
- Now uses logical CSS position classes internally (`--top-end`, `--top-start`, etc.) for RTL support
- Physical position props (`top-right`, `top-left`, etc.) still work and are mapped automatically
- New logical position props available: `top-end`, `top-start`, `bottom-end`, `bottom-start`
- Toasts will automatically flip position in RTL layouts

```svelte
<!-- Both work - physical positions mapped to logical internally -->
<ToastContainer position="top-right" />  <!-- Maps to --top-end -->
<ToastContainer position="top-end" />    <!-- Direct logical position -->
```

#### SettingsPanel Sync with pure-admin-core
**SettingsPanel.svelte:**
- Added **RTL Mode** checkbox - toggles `dir="rtl"` on `<html>` element
- Added **Sidebar Resizable** checkbox - toggles resizable sidebar
- Added **Profile Icon-Only Tabs** checkbox - toggles icon-only tabs in profile panel
- Renamed internal state `profileNoAvatar` → `profileHasAvatar` (inverted logic for consistency)
- Removed "Delivery" from font family options (not in pure-admin-core)
- **Fixed Layout Width** - now applies `pa-container-*` classes to body and persists to localStorage (no page reload)
- **Fixed Sidebar Mode** - now applies `pa-layout--sticky` class to body and persists to localStorage (no page reload)
- **Fixed Icon-Only Tabs** - ProfilePanel now has `hasIconOnlyTabs` prop for reactive Svelte 5 integration (DOM manipulation alone loses class on re-render)

New settings state properties:
- `rtlMode: boolean` - RTL layout mode
- `sidebarResizable: boolean` - Sidebar resize handle
- `profileHasAvatar: boolean` - Show avatar (true) or hide (false)
- `profileIconOnlyTabs: boolean` - Icon-only profile tabs

### Breaking Changes

#### Naming Convention: Boolean Props Use `is*`/`should*`/`has*` Prefixes
Renamed boolean props to follow naming conventions per CLAUDE.md guidelines:
- `is*` prefix for state flags (what something IS)
- `should*` prefix for behavior flags (what component SHOULD do)
- `has*` prefix for presence flags (what component HAS)

**Table.svelte:**
- `striped` → `isStriped`
- `bordered` → `isBordered`
- `responsiveGrid` → `isResponsiveGrid`

**TableCard.svelte:**
- `plain` → `isPlain`
- `scrollable` → `isScrollable`

**TableContainer.svelte:**
- `panel` → `isPanel`

**Button.svelte:**
- `outline` → `isOutline`
- `block` → `isBlock`
- `iconOnly` → `isIconOnly`
- `loading` → `isLoading`
- `ripple` → `isRipple`

**Alert.svelte:**
- `dismissible` → `isDismissible`
- `outline` → `isOutline`

**Badge.svelte:**
- `pill` → `isPill`
- `ellipsisLeft` → `isEllipsisStart` (renamed for RTL compatibility - uses logical direction)

**Checkbox.svelte & CheckboxBox.svelte:**
- `indeterminate` → `isIndeterminate`
- `xMark` → `isXMark`

**Modal.svelte:**
- `scrollable` → `isScrollable`
- `showClose` → `shouldShowClose`
- `closeOnEscape` → `shouldCloseOnEscape`

**Tabs.svelte:**
- `borderTop` → `isBorderTop`

**TabsContainer.svelte:**
- `bordered` → `isBordered`
- `card` → `isCard`

**TabsVerticalLayout.svelte:**
- `bordered` → `isBordered`

**Card.svelte:**
- `noPadding` → `hasPadding` (inverted logic, default `true` - set to `false` to remove padding)
- `stat` → `isStat`
- `inlineTabs` → `hasInlineTabs`

**CompositeBadge.svelte:**
- `interactive` → `isInteractive`
- `label` → `labelText` (consistency with `buttonText` - both are string props, not slots)

**FilterCard.svelte:**
- `expanded` → `isExpanded`
- `showToggle` → `shouldShowToggle`
- `showClear` → `shouldShowClear`
- `showRefresh` → `shouldShowRefresh`
- `showAdvancedActions` → `shouldShowAdvancedActions`
- `loading` → `isLoading`

**LoadMore.svelte:**
- `loading` → `isLoading`
- `showCount` → `shouldShowCount`

**Fields.svelte:**
- `horizontal` → `isHorizontal`
- `table` → `isTable`
- `bordered` → `isBordered`
- `striped` → `isStriped`
- `compact` → `isCompact`
- `relaxed` → `isRelaxed`
- `inline` → `isInline`
- `row` → `isRow`
- `filled` → `isFilled`
- `noBorder` → `hasBorder` (inverted logic, default `true` - set to `false` to remove border)

**FormGroup.svelte:**
- `hasError` → `isError`
- `hasSuccess` → `isSuccess`

**Toast.svelte:**
- `showProgress` → `shouldShowProgress`

**ProfilePanel.svelte:**
- `noAvatar` → `hasAvatar` (inverted logic, default `true` - set to `false` to hide avatar)
- Added `hasIconOnlyTabs?: boolean` prop - hides tab text labels, shows icons only (for SettingsPanel integration)

**Label.svelte:**
- `outline` → `isOutline`

**DefinitionList.svelte:**
- `inline` → `isInline`

**TimelineItem.svelte & timeline-types.ts:**
- `filled` → `isFilled`
- `dateHeader` → `isDateHeader`

**CodeBlock.svelte:**
- `compact` → `isCompact`

**BasicList.svelte:**
- `unstyled` → `isUnstyled`
- `inline` → `isInline`
- `bordered` → `isBordered`
- `striped` → `isStriped`
- `icon` → `hasIcon`

**DialogButton interface (dialog-service.svelte.ts):**
- `outline` → `isOutline`

#### Naming Convention: Event Handlers Use Lowercase
Renamed event handler props to match Svelte 5/DOM event naming convention (lowercase):

**ProfilePanelNavItem.svelte, ProfilePanelFavoriteItem.svelte, NavbarSearch.svelte, SidebarItem.svelte, LoadMore.svelte:**
- `onClick` → `onclick`

**Checkbox.svelte, CheckboxBox.svelte, Radio.svelte:**
- `onChange` → `onchange`

#### Naming Convention: Custom Callbacks Use `*Callback` Suffix
Renamed all custom callbacks (non-DOM event forwarders) to use `*Callback` suffix for clarity and consistency:

**Alert.svelte:**
- `onDismiss` → `dismissCallback`

**Modal.svelte:**
- `onBeforeClose` → `beforeCloseCallback`
- `onClose` → `closeCallback`

**Toast.svelte:**
- `onClose` → `closeCallback`

**Popconfirm.svelte:**
- `onConfirm` → `confirmCallback`
- `onCancel` → `cancelCallback`
- `compact` → `isCompact` (boolean prop, uses is*/has*/should* prefix)

**ProfilePanel.svelte:**
- `onClose` → `closeCallback`

**ProfilePanelFavoriteItem.svelte:**
- `onRemove` → `removeCallback`

**SlidePanel.svelte:**
- `onClose` → `closeCallback`

**DetailPanel.svelte:**
- `onClose` → `closeCallback`

**DetailView.svelte:**
- `onClose` → `closeCallback`

**Navbar.svelte:**
- `onBurgerClick` → `burgerClickCallback`

**SettingsPanel.svelte:**
- `onSettingsChange` → `settingsChangeCallback`

**CommandPalette.svelte & command-palette-types.ts:**
- `onGlobalSelect` → `globalSelectCallback`

**FilterCard.svelte:**
- `onClear` → `clearCallback`
- `onRefresh` → `refreshCallback`
- `onApply` → `applyCallback`
- `onToggle` → `toggleCallback`

**Pager.svelte:**
- `onPrevious` → `previousCallback`
- `onNext` → `nextCallback`
- `onPageChange` → `pageChangeCallback`
- `onFirst` → `firstCallback`
- `onLast` → `lastCallback`

**Field.svelte:**
- `onCopy` → `copyCallback`

**CheckboxListItem.svelte:**
- `onChange` → `changeCallback`

**BadgeGroup.svelte:**
- `onBadgeClick` → `badgeClickCallback`
- `onBadgeClickLegacy` → `badgeClickLegacyCallback`

**CompositeBadge.svelte:**
- `onButtonClick` → `buttonClickCallback`
- `onLabelClick` → `labelClickCallback`

**CompositeBadgeGroup.svelte:**
- `onLabelClick` → `labelClickCallback`
- `onButtonClick` → `buttonClickCallback`
- `onLabelClickLegacy` → `labelClickLegacyCallback`
- `onButtonClickLegacy` → `buttonClickLegacyCallback`

**Timeline.svelte:**
- `onItemClick` → `itemClickCallback`
- `onItemClickLegacy` → `itemClickLegacyCallback`

#### Naming Convention: String Props Use `*Text` Suffix
Renamed string props representing text content to use `*Text` suffix for consistency and clarity:

**Alert.svelte & Callout.svelte:**
- `heading` → `headingText`

**Toast.svelte:**
- `title` → `titleText`
- `message` → `messageText`

**Modal.svelte:**
- `title` → `titleText`

**Popconfirm.svelte:**
- `message` → `messageText`

**Popover.svelte:**
- `title` → `titleText`

**Card.svelte:**
- `title` → `titleText`
- `subtitle` → `subtitleText`

**DetailPanel.svelte, TableCard.svelte, TableContainer.svelte, FieldGroup.svelte, CodeBlockWithHeader.svelte, Section.svelte:**
- `title` → `titleText`

**Field.svelte:**
- `label` → `labelText`
- `value` → `valueText`

**Stat.svelte:**
- `label` → `labelText`
- `change` → `changeText`
- `symbol` → `symbolText`

**SidebarItem.svelte, Checkbox.svelte, Radio.svelte, ProfilePanelFavoriteItem.svelte:**
- `label` → `labelText`

**FormField.svelte:**
- `label` → `labelText`
- `help` → `helpText`

**ListItem.svelte:**
- `title` → `titleText`
- `subtitle` → `subtitleText`
- `meta` → `metaText`

**MetricListItem.svelte & StatusListItem.svelte:**
- `label` → `labelText`
- `value` → `valueText`

**CheckboxListItem.svelte:**
- `label` → `labelText`
- `description` → `descriptionText`

**ActivityFeedItem.svelte & TimelineItem.svelte:**
- `time` → `timeText`

**Button.svelte:**
- `title` → `titleText`

**Text.svelte (typography):**
- `title` → `titleText`

**Migration Example:**
```svelte
<!-- Before (boolean props) -->
<Table bordered striped />
<Button outline block loading title="Save" />
<Modal scrollable showClose closeOnEscape title="Edit" />
<Badge pill ellipsisLeft /> <!-- ellipsisLeft is now isEllipsisStart -->
<BasicList icon bordered unstyled />

<!-- After (boolean props with is*/should*/has* prefix) -->
<Table isBordered isStriped />
<Button isOutline isBlock isLoading titleText="Save" />
<Modal isScrollable shouldShowClose shouldCloseOnEscape titleText="Edit" />
<Badge isPill isEllipsisStart />
<BasicList hasIcon isBordered isUnstyled />

<!-- Before (string props) -->
<Card title="My Card" subtitle="Info" />
<Toast title="Success" message="Saved!" />
<TimelineItem time="14:32" />

<!-- After (string props with *Text suffix) -->
<Card titleText="My Card" subtitleText="Info" />
<Toast titleText="Success" messageText="Saved!" />
<TimelineItem timeText="14:32" />

<!-- Before (event handlers - DOM events) -->
<Checkbox onChange={handleChange} />
<LoadMore onClick={loadMore} />
<NavbarSearch onClick={openSearch} />

<!-- After (event handlers - DOM events use lowercase) -->
<Checkbox onchange={handleChange} />
<LoadMore onclick={loadMore} />
<NavbarSearch onclick={openSearch} />

<!-- Before (custom callbacks) -->
<Modal onClose={handleClose} onBeforeClose={validate} />
<Popconfirm onConfirm={handleDelete} onCancel={handleCancel} compact />
<Toast onClose={dismiss} />
<FilterCard onClear={clear} onRefresh={refresh} onToggle={handleToggle} />
<Timeline onItemClick={handleClick} />

<!-- After (custom callbacks use *Callback suffix) -->
<Modal closeCallback={handleClose} beforeCloseCallback={validate} />
<Popconfirm confirmCallback={handleDelete} cancelCallback={handleCancel} isCompact />
<Toast closeCallback={dismiss} />
<FilterCard clearCallback={clear} refreshCallback={refresh} toggleCallback={handleToggle} />
<Timeline itemClickCallback={handleClick} />
```

#### i18n: Flat Structure with `pureAdmin.*` Namespace
All library translation keys now use a flat structure with `pureAdmin.` prefix for easy merging with app translations.

**Before (nested):**
```typescript
{
  dialog: { confirm: 'Confirm', cancel: 'Cancel' },
  field: { clickToCopy: 'Click to copy' }
}
```

**After (flat with namespace):**
```typescript
{
  'pureAdmin.dialog.confirm': 'Confirm',
  'pureAdmin.dialog.cancel': 'Cancel',
  'pureAdmin.field.clickToCopy': 'Click to copy'
}
```

**Migration:** If you had custom translations, update keys to flat format with `pureAdmin.` prefix.

**Benefits:**
- App translations merge cleanly: just spread library + app objects
- Easy to search: `grep "pureAdmin.field"` finds all field translations
- No collisions: library keys won't conflict with app keys
- Override any key: `{ 'pureAdmin.dialog.confirm': 'Yes!' }` in your locale file

**Type change:** `TranslationKeys` → `PureAdminTranslations` (now `Record<string, string>`)

### Added

#### Table Card Component
New component for card-like table containers. Synced with `@keenmate/pure-admin-core` v1.3.0.

**`TableCard`** (`display/TableCard.svelte`) - Card container specifically designed for tables and web-grids
- `titleText?: string` - Card title text
- `variant?: 'primary' | 'success' | 'warning' | 'danger'` - Semantic color variant
- `color?: 1-9` - Theme color variant
- `isScrollable?: boolean` - Enable horizontal scrolling for wide tables
- `isPlain?: boolean` - Plain variant removes card styling (border, shadow, background)
- `header?: Snippet` - Custom header content (replaces title)
- `actions?: Snippet` - Actions in header (buttons, etc.)
- `children?: Snippet` - Table content
- `footer?: Snippet` - Footer content (pagination, summary)
- CSS classes: `pa-table-card`, `pa-table-card--{variant}`, `pa-table-card--color-{n}`, `pa-table-card--plain`

```svelte
<TableCard titleText="Orders" variant="primary">
  {#snippet actions()}
    <Button size="sm">Export</Button>
  {/snippet}
  <Table isStriped>...</Table>
  {#snippet footer()}
    <Pager ... />
  {/snippet}
</TableCard>
```

#### Table Container Panel Modifier
New component for table containers with optional panel styling. Synced with `@keenmate/pure-admin-core` v1.3.0.

**`TableContainer`** (`display/TableContainer.svelte`) - Container with optional panel styling
- `isPanel?: boolean` - Panel modifier adds card-like visual containment (shadow, border-radius, hover effect)
- `titleText?: string` - Title text (only shown when `isPanel=true`)
- `header?: Snippet` - Custom header content (only shown when `isPanel=true`)
- `actions?: Snippet` - Actions in header (only shown when `isPanel=true`)
- `children?: Snippet` - Table content
- CSS classes: `pa-table-container`, `pa-table-container--panel`

```svelte
<TableContainer isPanel titleText="Customer Orders">
  {#snippet actions()}
    <Button size="sm" isOutline>Filter</Button>
  {/snippet}
  <Table>...</Table>
</TableContainer>
```

#### Data Display Components
New components for displaying read-only label-value field pairs. Synced with `@keenmate/pure-admin-core` v1.3.0 data-display feature.

**New Components:**

**`Field`** (`display/Field.svelte`) - Single label-value pair with optional copy-to-clipboard
- `label?: string` - Label text (simple mode)
- `value?: string | number` - Value text (simple mode)
- `full?: boolean` - Full width in grid layouts (spans entire row)
- `copyMode?: 'btn' | 'click' | 'hover'` - Copy to clipboard mode
  - `'btn'` - Copy button always visible next to value
  - `'click'` - Entire value clickable with "Click to copy" hint
  - `'hover'` - Copy button appears only on field hover
- `copyValue?: string` - Override what gets copied (useful for masked values like passwords)
- `copyValueCallback?: () => string` - Callback to get value to copy (for dynamic values)
- `copyHintText?: string` - Hint text override (default: uses i18n `pureAdmin.field.clickToCopy`)
- `copiedText?: string` - Feedback text override (default: uses i18n `pureAdmin.field.copied`)
- `onCopy?: (value: string) => void` - Callback after successful copy
- `labelSnippet?: Snippet` - Complex label content
- `valueSnippet?: Snippet` - Complex value content
- `children?: Snippet` - Alias for valueSnippet
- CSS classes: `pa-field`, `pa-field--full`, `pa-field--copy-btn`, `pa-field--copy-click`, `pa-field--copy-hover`, `pa-field--copied`
- Uses `navigator.clipboard.writeText()` for clipboard access
- Visual feedback: "Copied!" state shown for 1.5 seconds after copy (checkmark icon + green color for button modes)
- Smart copy detection: Copy UI (button, click handler, hint text) only renders when there's something to copy (`value`, `copyValue`, or `copyValueCallback`). This prevents showing non-functional copy buttons when using snippet content without explicit copy value.
- i18n support: Automatically uses `pureAdmin.field.clickToCopy` and `pureAdmin.field.copied` from locale files (built-in `en` and `cs` translations included). Use `copyHintText`/`copiedText` props only to override.

**`Fields`** (`display/Fields.svelte`) - Container with layout modifiers
- `cols?: 2 | 3 | 4` - Grid columns (`--cols-2/3/4`)
- `horizontal?: boolean` - Label left, value right
- `table?: boolean` - Consistent label widths
- `bordered?: boolean` - Bottom border separators
- `striped?: boolean` - Alternating backgrounds
- `compact?: boolean` - Tighter spacing
- `relaxed?: boolean` - Larger gaps
- `inline?: boolean` - Fields flow on one line
- `row?: boolean` - Equal-width auto columns
- `filled?: boolean` - Subtle background panel
- `color?: 1-9` - Theme color for left border
- `noBorder?: boolean` - Remove left border
- CSS classes: `pa-fields`, `pa-fields--cols-{2,3,4}`, `pa-fields--horizontal`, `pa-fields--table`, `pa-fields--bordered`, `pa-fields--striped`, `pa-fields--compact`, `pa-fields--relaxed`, `pa-fields--inline`, `pa-fields--row`, `pa-fields--filled`, `pa-fields--color-{1-9}`, `pa-fields--no-border`

**`FieldGroup`** (`display/FieldGroup.svelte`) - Titled section
- `title?: string` - Group title text
- `titleSnippet?: Snippet` - Complex title content
- CSS classes: `pa-field-group`, `pa-field-group__title`

**Usage Examples:**
```svelte
<!-- Basic stacked fields -->
<Fields>
  <Field label="Name" value="John Doe" />
  <Field label="Email" value="john@example.com" />
</Fields>

<!-- Multi-column grid -->
<Fields cols={3}>
  <Field label="City" value="New York" />
  <Field label="State" value="NY" />
  <Field label="ZIP" value="10001" />
</Fields>

<!-- Horizontal with border -->
<Fields horizontal bordered>
  <Field label="Order ID" value="#ORD-12345" />
  <Field label="Status" value="Processing" />
</Fields>

<!-- Themed section -->
<Fields color={1} filled>
  <Field label="Primary Contact" value="John Doe" />
</Fields>

<!-- Grouped sections -->
<FieldGroup title="Customer Information">
  <Fields cols={2}>
    <Field label="Name" value="John Doe" />
    <Field label="Email" value="john@example.com" />
    <Field label="Address" value="123 Main St" full />
  </Fields>
</FieldGroup>

<!-- Complex value with snippet -->
<Field label="Status">
  <Badge variant="success">Active</Badge>
</Field>

<!-- Copyable fields -->
<Field label="API Key" value="sk-1234567890abcdef" copyMode="btn" />
<Field label="Order ID" value="#ORD-12345" copyMode="click" />
<Field label="Account ID" value="ACC-001" copyMode="hover" />
<Field label="Password" value="••••••••" copyValue="actual-password" copyMode="btn" />
```

**Exports:**
- `Field`, `Fields`, `FieldGroup` components

#### Docs: Data Display Demo Page
New `/data-display` demo page with comprehensive examples:
- Basic stacked fields
- Multi-column layouts (2, 3, 4 columns)
- Full-width fields in grids
- Layout modifiers (horizontal, table, inline, row)
- Visual modifiers (bordered, striped, filled)
- Spacing modifiers (compact, relaxed)
- Theme colors (1-9) with filled backgrounds
- No border variant
- Copyable fields (all three modes: btn, click, hover)
- Field groups with titled sections
- Complex values using snippets (badges, links, progress bars)
- Practical order details example

---

## [1.2.0] - 2026-01-26

### Added

#### Detail Panel Components
Three new components for displaying detail views alongside data tables. The system separates content (DetailPanel) from positioning (DetailView for card overlay, SlidePanel for full-screen overlay).

**New Components:**

**`SlidePanel`** (`layout/`) - Fixed overlay panel that slides in from the right. Shared behavioral base for full-screen overlay panels.
- `show: boolean` (bindable) - Controls panel visibility
- `onClose?: () => void` - Called on escape key or backdrop click
- `children: Snippet` - Panel content
- `class?: string` - Additional CSS classes
- Escape key listener (only active when open)
- Backdrop click-to-close

**`DetailPanel`** (`display/`) - Mode-agnostic content shell with header, scrollable body, and optional footer. Works inside either DetailView or SlidePanel.
- `title?: string` - Panel title text
- `header?: Snippet` - Custom header content (replaces title, close button always rendered)
- `children: Snippet` - Body content (scrollable)
- `footer?: Snippet` - Footer content (action buttons, fixed at bottom)
- `onClose?: () => void` - Close button callback
- `isResizable?: boolean` (default `true`) - Drag-to-resize handle on left edge (min 28rem, max 64rem, double-click to reset, persisted to localStorage)
- `class?: string` - Additional CSS classes

**`DetailView`** (`display/`) - Card overlay wrapper that positions a DetailPanel over a main content area within a card/container.
- `show: boolean` (bindable) - Controls panel visibility
- `shouldShowBackdrop?: boolean` (default `true`) - Show/hide backdrop overlay
- `main?: Snippet` - Main content area (table, list, etc.)
- `children: Snippet` - Panel content (DetailPanel goes here)
- `onClose?: () => void` - Called on backdrop click or escape key
- `class?: string` - Additional CSS classes

**Usage - Card Overlay:**
```svelte
<DetailView bind:show={panelOpen} shouldShowBackdrop>
  {#snippet main()}
    <Table>...</Table>
  {/snippet}
  <DetailPanel title="User Details" onClose={() => panelOpen = false}>
    <p>Content here</p>
    {#snippet footer()}
      <Button variant="primary">Save</Button>
    {/snippet}
  </DetailPanel>
</DetailView>
```

**Usage - Full-Screen Overlay:**
```svelte
<SlidePanel bind:show={panelOpen}>
  <DetailPanel title="User Details" onClose={() => panelOpen = false}>
    <p>Content here</p>
    {#snippet footer()}
      <Button variant="primary">Save</Button>
    {/snippet}
  </DetailPanel>
</SlidePanel>
```

**Supported modes:**
- **Inline split-view** — table shrinks and panel appears alongside (`isOverlay={false}`)
- Card overlay with backdrop (click backdrop to close)
- Card overlay without backdrop (table stays interactive for rapid row browsing)
- **Tabbed panel** — tabs between header and body for content sections (`tabs` snippet)
- **Header actions** — custom header with icon buttons, no footer
- Full-screen fixed overlay (slides in from right, like ProfilePanel)

**`DetailView` — new prop:**
- `isOverlay?: boolean` (default `true`) — When `false`, omits `pa-detail-view--overlay` class and backdrop element, enabling inline split-view mode where the table shrinks and the panel appears alongside

**`DetailPanel` — new prop:**
- `tabs?: Snippet` — Renders between header and body inside `<div class="pa-detail-panel__tabs">`. Use with `<Tabs>` + `<TabItem>` for tabbed panel content

#### Docs: Detail Panel Demo Page
Rewritten `/detail-panel` demo page with 6 interactive sections matching the pure-admin demo:
1. **Inline Split-View** — `isOverlay={false}`, table shrinks alongside panel
2. **Card Overlay (with Backdrop)** — panel overlays table, backdrop click closes
3. **Card Overlay (No Backdrop)** — panel stays open while clicking rows
4. **Tabbed Detail Panel** — 3 tabs (Details/Activity/Notes) with tab switching
5. **Header Actions (No Footer)** — custom header with icon ButtonGroup
6. **Full-Screen Overlay** — SlidePanel + DetailPanel slide-in

All demos include 8 users (expanded from 6) with `location` and `joined` fields, 600ms simulated loading with Spinner, avatar initial circle + key-value table detail layout, and reusable `{#snippet}` blocks.

4 reference tables: Component Props (updated), CSS Reference, SCSS Variables, CSS Custom Properties.

#### Docs: Sidebar Navigation Sync
Synced sidebar navigation with pure-admin demo:
- Moved **Detail Panel** from Tables to Components section (after Command Palette)
- Tables section reordered: **Filters** (renamed from "Table Filters") moved before **Comparison**
- Added `detail-panel` and `comparison` to command palette search pages

### Changed

- **Close button icons:** Replaced unicode characters (✕, ×, &#x2715;) with inline Lucide X SVG icon across all components (Alert, Modal, Toast, PopoverContainer, ProfilePanel, DetailPanel) for consistent rendering across platforms
- **Peer dependency:** `@keenmate/pure-admin-core` bumped from `^1.1.3` to `^1.2.0` (required for detail-panel CSS classes)

---

## [1.1.5] - 2026-01-24

### Added

#### FormErrorSummary Component
New component that encapsulates the form validation error summary pattern, reducing boilerplate when displaying validation errors with clickable anchor links.

**Props:**
- `errors: FormErrorItem[]` - Array of error objects with `field`, `id`, and `message`
- `show?: boolean` - Whether to show the summary (default: `true`)
- `class?: string` - Additional CSS class

**Usage:**
```svelte
<FormErrorSummary errors={allErrors()} show={submitted} />
```

**Before (10 lines of boilerplate per form):**
```svelte
{#if submitted && errors().length > 0}
  <Alert variant="danger" class="mb-4">
    <Strong>{errors().length} error{errors().length > 1 ? 's' : ''} found:</Strong>
    <BasicList class="mt-2 mb-0">
      {#each errors() as error}
        <li><Link href="#{error.id}">{error.field}</Link> - {error.message}</li>
      {/each}
    </BasicList>
  </Alert>
{/if}
```

**After (1 line):**
```svelte
<FormErrorSummary errors={allErrors()} show={submitted} />
```

**Exports:**
- `FormErrorSummary` component
- `FormErrorItem` type interface

#### Docs: Real Use Case Form Example
Added comprehensive "Create User Form" example to `/validation` page demonstrating:
- Multiple fields (First Name, Last Name, Email, Role, Department)
- Async API submission with 1.5s simulated delay
- Loading state on submit button ("Creating User...")
- Server-side validation error simulation (use `admin@example.com`)
- Random server error simulation (10% chance)
- FormErrorSummary integration with clickable error links
- Success message showing created user details

---

## [1.1.4] - 2026-01-24

### Added

#### Batch RPC Service
New transport-agnostic batch RPC system for collecting multiple RPC calls into a single request. Reduces round-trips and enables backend parallelization.

**New Files:**
- `src/lib/rpc/types.ts` - Core types (BatchCall, BatchRequest, BatchResult, BatchResponse, RpcError)
- `src/lib/rpc/batch.ts` - `createBatch()` function for collecting and executing calls
- `src/lib/rpc/transport/types.ts` - Transport interfaces and configuration presets
- `src/lib/rpc/transport/signalr.ts` - SignalR transport factory for ASP.NET
- `src/lib/rpc/transport/phoenix.ts` - Phoenix Channels transport factory for Elixir
- `src/lib/rpc/transport/http.ts` - HTTP transport factory for REST APIs
- `src/lib/rpc/index.ts` - Module exports

**Core API:**
```typescript
import { createBatch, createHttpTransport, pureDataConfig } from '@keenmate/svelte-pure-admin';

const transport = createHttpTransport('/api/rpc/batch', pureDataConfig);
const batch = createBatch(transport);

// Queue calls - returns promises
const users = batch.add<User[]>('users.getAll');
const orders = batch.add<Order[]>('orders.getRecent');

// Execute - single request, all promises resolve/reject independently
await batch.execute();

console.log(await users);  // User[]
console.log(await orders); // Order[]
```

**Transport Factories:**
- `createSignalRTransport(connection, config, options?)` - ASP.NET SignalR hubs
- `createPhoenixTransport(channel, config)` - Elixir Phoenix channels
- `createHttpTransport(url, config, options?)` - REST API endpoints

**HTTP Transport Options:**
- `headers` - Static headers
- `getHeaders` - Dynamic headers callback (for auth tokens)
- `getRequestMetadata` - Request metadata callback (for sessionId, tenantId in request body)
- `onBeforeRequest` - Request interceptor
- `onAfterResponse` - Response interceptor (for 401 handling)
- `fetchOptions` - Additional fetch options (credentials, etc.)
- `timeout` - Request timeout (default: 30000ms)

**SignalR/Phoenix Transport Options:**
- `methodName` / `eventName` - Hub method or channel event name
- `getRequestMetadata` - Request metadata callback (same as HTTP)
- `timeout` - Request timeout (Phoenix only)

**Configuration Presets:**
- `commonResponseConfig` - For ASP.NET CommonResponse wrapper pattern
- `pureDataConfig` - For Phoenix/clean REST APIs returning data directly

**Exports:**
- `createBatch`, `createSignalRTransport`, `createPhoenixTransport`, `createHttpTransport`
- `commonResponseConfig`, `pureDataConfig`
- Types: `BatchCall`, `BatchRequest`, `BatchResult`, `BatchResponse`, `RpcError`
- Types: `RpcTransport`, `RpcTransportConfig`, `HttpTransportOptions`, `SignalRTransportOptions`, `PhoenixTransportOptions`

#### FormField Component
New wrapper component that combines `FormGroup`, `FormLabel`, and `FormHelp` with automatic error/success state handling. Reduces validation boilerplate significantly.

**Props:**
- `label` - Field label text
- `required` - Show required indicator (*)
- `help` - Default help text
- `successMessage` - Success message (shown when valid)
- `errors` - Error messages array from validation
- `touched` - Whether field has been interacted with
- `hasValue` - Field has a value (for success state)
- `state` - Manual state override ('success' | 'warning' | 'error')
- `horizontal` - Horizontal layout

**Usage with Felte:**
```svelte
<FormField
  label="Email"
  required
  help="Enter your email"
  successMessage="Valid email"
  errors={$errors.email}
  touched={$touched.email ?? false}
  hasValue={!!$data.email}
>
  {#snippet children({ errors, touched })}
    <Input name="email" {errors} {touched} />
  {/snippet}
</FormField>
```

**Exports:**
- `FormField` component

#### Docs: Felte Validation Integration
Reworked `/validation` page to use Felte + Zod for form validation instead of manual state management.

**New dependencies (docs only):**
- `felte` - Form management library
- `@felte/validator-zod` - Zod schema validator
- `zod` - Schema validation

**Features demonstrated:**
- Felte + Zod setup and integration
- Type-safe forms with `z.infer<typeof schema>`
- Cross-field validation (password confirmation)
- All 7 test cases using `FormField` component

### Changed

#### Peer Dependency Update
- Updated `@keenmate/pure-admin-core` peer dependency: `^1.1.2` → `^1.1.3`

#### Docs: Batch RPC Page
New interactive documentation page at `/batch-rpc` demonstrating:
- Live demo comparing batched vs sequential requests
- Error handling with partial failures
- Transport adapter examples (SignalR, Phoenix, HTTP)
- Authentication patterns (dynamic headers, interceptors, cookies)
- Configuration presets usage
- Wire protocol format
- Complete API reference

#### Docs: Syntax Highlighting
Added `HighlightedCode` component using highlight.js for code examples in documentation.
- Languages: JavaScript, TypeScript, JSON, HTML, XML, CSS, Bash, SQL, Python, Svelte
- GitHub Dark theme styling
- Optional line numbers

### Changed

#### FormLabel Component
- Added `required?: boolean` prop - adds `pa-form-label--required` class for asterisk indicator

#### FormGroup Component
- Added `horizontal?: boolean` prop as alias for `isHorizontal`

### Fixed

#### Docs Type Errors
Fixed pre-existing type errors in documentation pages:

**cards/+page.svelte:**
- Fixed dynamic CardVariant type error by using typed array instead of string interpolation

**validation/+page.svelte:**
- Fixed `<script>` tag parsing in code examples by moving to constants with string concatenation
- Replaced CodeBlock with HighlightedCode component

**callouts/+page.svelte:**
- Fixed `{#snippet}` syntax parsing in code examples
- Replaced CodeBlock with HighlightedCode component

**timeline-feed/+page.svelte:**
- Fixed `{#snippet}` syntax parsing in raw `<pre><code>` blocks
- Replaced with HighlightedCode component

**validations/+page.svelte:**
- Fixed FormLabel `required` prop (now supported)
- Fixed FormGroup `horizontal` prop (now alias for `isHorizontal`)

---

## [1.1.3] - 2026-01-24

### Changed

#### Docs Sync with pure-admin Demo

**Cards Page:**
- Added info variant card to Colored Cards section (5th semantic color)
- Added "Theme Color Cards" section demonstrating color-1 through color-9 theme slots
- Added "Bordered Cards" section showing `pa-card--bordered` modifier with different variants
- Added "Statistics with Trends" section showing Stat component's `change` and `changeDirection` props (positive/negative/neutral indicators)

**Validations Page:**
- Fixed Pattern 2: Added required asterisk to checkbox label using `labelSnippet`
- Fixed Pattern 3: Corrected anchor link IDs from `#card-number-input`/`#cvv-input` to `#card-number`/`#cvv` to match pure-admin
- Fixed Pattern 5: Changed `<Text variant="danger">` to `<FormHelp variant="error" class="mt-0">` for correct CSS classes (`pa-form-help--error` instead of `text-danger`), added `align-items-center` class to horizontal FormGroups
- Fixed Pattern 10: Added `class="pa-badge--default"` to Badge step 3 for proper neutral styling

### Known Limitations

- Button component doesn't support `variant="default"` (pure-admin's `pa-btn--default`). Use `variant="secondary"` as closest equivalent for neutral/cancel buttons.
- Badge component doesn't have `variant="default"` - use `class="pa-badge--default"` as workaround.

---

## [1.1.2] - 2026-01-22

### Added

#### Dashboard Components
New Svelte 5 components for building dashboard-style displays.

**MetricList & MetricListItem** (`src/lib/display/MetricList.svelte`, `MetricListItem.svelte`):
- Simple label/value list for displaying metrics
- CSS classes: `pa-metric-list`, `pa-metric-list__item`, `pa-metric-list__label`, `pa-metric-list__value`
- Props: `MetricList`: `class`; `MetricListItem`: `label`, `value`, `class`

**StatusList & StatusListItem** (`src/lib/display/StatusList.svelte`, `StatusListItem.svelte`):
- Status indicators with colored dots
- CSS classes: `pa-status-list`, `pa-status-list__item`, `pa-status-list__indicator--{status}`, `pa-status-list__label`, `pa-status-list__value`
- Props: `StatusList`: `class`; `StatusListItem`: `label`, `value`, `status` ('success' | 'warning' | 'danger' | 'info'), `class`

**ActivityFeed & ActivityFeedItem** (`src/lib/display/ActivityFeed.svelte`, `ActivityFeedItem.svelte`):
- Activity feed with icon, text, and timestamp
- CSS classes: `pa-activity-feed`, `pa-activity-feed__item`, `pa-activity-feed__icon`, `pa-activity-feed__content`, `pa-activity-feed__text`, `pa-activity-feed__time`
- Props: `ActivityFeed`: `class`; `ActivityFeedItem`: `time`, `icon` (snippet), `children` (snippet), `class`

**QuickActions** (`src/lib/display/QuickActions.svelte`):
- Container for vertically stacked action buttons
- CSS class: `pa-quick-actions`
- Props: `class`, `children` (snippet)

**Usage:**
```svelte
<MetricList>
  <MetricListItem label="Organic Search" value="42.3%" />
  <MetricListItem label="Direct" value="28.7%" />
</MetricList>

<StatusList>
  <StatusListItem label="API Services" value="Operational" status="success" />
  <StatusListItem label="Payment Gateway" value="Degraded" status="warning" />
</StatusList>

<ActivityFeed>
  <ActivityFeedItem time="2 minutes ago">
    {#snippet icon()}👤{/snippet}
    New user registration
  </ActivityFeedItem>
</ActivityFeed>

<QuickActions>
  <Button variant="primary" block>New Order</Button>
  <Button variant="secondary" block>Add Customer</Button>
</QuickActions>
```

**Exports:**
- `MetricList`, `MetricListItem`
- `StatusList`, `StatusListItem`
- `ActivityFeed`, `ActivityFeedItem`
- `QuickActions`

### Changed

#### Stat Component: Renamed trend to change
The Stat component's hero variant now uses `change` and `changeDirection` props instead of `trend` and `trendDirection` to match the pure-admin-core CSS naming.

**Before:**
```svelte
<Stat variant="hero" trend="+12.5%" trendDirection="up" />
```

**After:**
```svelte
<Stat variant="hero" change="+12.5%" changeDirection="positive" />
```

- `trend` → `change`
- `trendDirection` type changed from `'up' | 'down'` to `'positive' | 'negative' | 'neutral'`
- CSS class: `pa-stat__change` with `pa-stat__change--positive`, `pa-stat__change--negative`, `pa-stat__change--neutral`

#### Peer Dependency Update
- Updated `@keenmate/pure-admin-core` peer dependency: `^1.1.1` → `^1.1.2`

**pure-admin-core 1.1.2 includes:**
- Web Multiselect group label styling improvements
- Removed ~650 lines of unnecessary web component CSS variable overrides from themes
- Fixed `.pa-link` class color (now uses `$accent-color`)

#### Docs Sync with pure-admin Demo

**Buttons Page:**
- Updated "Button Groups - Gap Sizes" card to use semantic gap classes (`gap-xs`, `gap-sm`, `gap-md`, `gap-base`, `gap-lg`, `gap-xl`) with different button variants per size
- Updated "Vertical Alignment" card with explanatory text about semantic gap classes and added different gap classes per column (`gap-sm`, `gap-md`, `gap-lg`, `gap-xl`)
- Updated "Fixed Width Buttons" card to use `minwr-*`/`maxwr-*` utility class pattern with inner `<span class="text-truncate">` for ellipsis instead of component props
- Added comprehensive "CSS Classes Reference" section at the end documenting all button-related classes

**Inputs Page:**
- Added "Theme Color Variants" section showing `pa-input--color-1`, `--color-2`, `--color-3` with colored help text
- Updated "Input Groups" section with width utility tip (`wr-*` for rem-based, `wp-*` for percentage-based) on prepend/append elements
- Added example showing `wr-3` on prepend element for fixed width
- Added comprehensive "CSS Classes Reference" section at the end documenting all input-related classes

**Dashboard Page:**
- Completely redesigned to match pure-admin demo dashboard
- **KPI Metric Cards**: 4 hero stat cards (Total Revenue, Active Users, Conversion Rate, Avg Order Value) with change indicators
- **Key Performance Indicators**: 6 square stat tiles with variants (Completion Rate, Customer Satisfaction, Market Share, Server Capacity, Error Rate, Uptime)
- **Charts Section**: Chart placeholders for Top Sales Products and Revenue Trend with SVG mockups
- **Traffic Sources**: Metric list showing traffic distribution
- **Recent Activity**: Activity feed with icons and timestamps
- **Recent Orders**: Compact table with order data and status badges
- **Top Products**: Metric list with product sales
- **System Status**: Status list with operational indicators
- **Quick Actions**: Block button group for common actions
- Uses Svelte components (Card, Grid, Column, Badge, Button, Table, TableResponsive) where available

---

## [1.1.1] - 2026-01-19

### Fixed

#### Docs Sidebar Submenu Icons
Added icons to all submenu items in the docs sidebar to match pure-admin demo.

**Components submenu:** 🧩 Overview, 🔘 Buttons, ✏️ Inputs, 🃏 Cards, ⊞ Grid System, 📑 Tabs, 🏷️ Badges, 📃 Lists, ☑️ Checkbox Lists, 💻 Code, ⚠️ Alerts, 📌 Callouts, 🔔 Toasts, ⏳ Loaders, 💬 Tooltips, 🔳 Modals, 💬 Modal Dialogs, 💬 Popconfirm, 🔍 Command Palette

**Tables submenu:** 📊 Standard Tables, 📏 Table Sizing, 📱 Responsive, 📈 Comparison

**Timeline & Layout submenus:** • (bullet points)

#### Buttons Page Alignment with pure-admin
- **Vertical Alignment card**: Fixed column sizes from `size="25"` to `size="50" xl="25"` to match pure-admin's responsive behavior (2 columns on smaller screens, 4 columns at xl)
- Added `text-truncate` class to all buttons in Vertical Alignment card
- Changed "Delete" to "DELETE" in Stretch section to match pure-admin
- **Added missing Text Truncation card**: New card demonstrating `.text-truncate` with fixed widths (`.wr-*`) and tooltips showing full text on hover

### Added

#### Resizable Sidebar
Implemented drag-to-resize functionality for the Sidebar component.

**Sidebar Component:**
- `resizable?: boolean` prop - enables drag-to-resize
- Adds resize handle (`pa-sidebar-resize`) on right edge when enabled
- Width range: 180px (min) to 500px (max)
- Default width: 288px (28.8rem)
- Width saved to `localStorage` under `sidebar-width` key
- Double-click resize handle to reset to default width
- Touch support for mobile devices
- Uses CSS variable `--pa-local-sidebar-width` for dynamic width

**FOUC Prevention:**
- Early sidebar width loading in `<head>` section before body renders
- Prevents layout shift when restoring saved sidebar width

**Usage:**
```svelte
<Sidebar resizable>
  <SidebarItem href="/" label="Dashboard" />
</Sidebar>
```

#### Getting Started Documentation Page
New `/getting-started` page added to docs with comprehensive introduction:
- What is svelte-pure-admin (Svelte 5 component library wrapping pure-admin-core)
- About theme switching in demo (FOUC explanation)
- Installation instructions (npm, pnpm, yarn)
- Basic setup guide with code examples
- PureAdminProvider explanation (configuration context + keyboard shortcuts)
- Available themes overview (5 starter themes)
- Component categories overview (40+ components)

#### Form Validation State: Warning
Added `warning` state support to form components, matching pure-admin-core 1.1.1.

**FormGroup:**
- New `state` prop: `'success' | 'warning' | 'error'`
- CSS class: `pa-form-group--warning`
- Legacy `hasError`/`hasSuccess` boolean props still supported

**Input:**
- Added `'warning'` to state type
- CSS class: `pa-input--warning`

**Select:**
- Added `state` prop: `'success' | 'warning' | 'error'`
- CSS class: `pa-select--warning`

**Textarea:**
- Added `state` prop: `'success' | 'warning' | 'error'`
- CSS class: `pa-textarea--warning`

#### Theme Color Variants for Form Elements
New `color` prop (1-9) for custom input accents beyond semantic states.

**Input:**
- `color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9`
- CSS classes: `pa-input--color-1` through `pa-input--color-9`

**Select:**
- `color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9`
- CSS classes: `pa-select--color-1` through `pa-select--color-9`

**Textarea:**
- `color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9`
- CSS classes: `pa-textarea--color-1` through `pa-textarea--color-9`

#### Select Component: Size Prop
Added `size` prop to Select component for consistent sizing with Input/Textarea.
- `size?: 'xs' | 'sm' | 'lg' | 'xl'`
- CSS classes: `pa-select--xs`, `pa-select--sm`, `pa-select--lg`, `pa-select--xl`

#### Textarea Component: Size Prop
Added `size` prop to Textarea component.
- `size?: 'xs' | 'sm' | 'lg' | 'xl'`
- CSS classes: `pa-textarea--xs`, `pa-textarea--sm`, `pa-textarea--lg`, `pa-textarea--xl`
- Note: pure-admin-core 1.1.1 fixed textarea sizes to actually render different heights

#### Input Component: Additional Types
Extended Input `type` prop with more HTML5 input types:
- Added: `month`, `week`, `color`, `file`, `range`

#### Docker Support
Added Docker configuration for deploying docs site:
- `Dockerfile` - Multi-stage build (node for building, caddy for serving)
- `Caddyfile` - SPA routing configuration
- `.dockerignore` - Excludes node_modules, build outputs, etc.

**Build from parent directory:**
```bash
cd C:/Git/KM
docker build -f svelte-pure-admin/Dockerfile -t svelte-pure-admin .
docker run -p 8080:80 svelte-pure-admin
```

### Changed

#### Peer Dependency Update
- Updated `@keenmate/pure-admin-core` peer dependency: `^1.1.0` → `^1.1.1`

#### Package Version
- Bumped version: `1.1.0` → `1.1.1`

### Fixed

#### Select Component: Multiple Attribute
Removed dynamic `multiple` prop from Select component. Svelte requires `multiple` to be static when using `bind:value`.

**Migration:** Use native `<select class="pa-select" multiple>` for multiple select dropdowns.

---

## [Unreleased]

### Changed

#### Navbar Three-Section Layout
Updated Navbar component to support three-section layout matching pure-admin-core pattern.

**New Snippet Props:**
- `left?: Snippet` - Left section content (e.g., burger menu, brand)
- `center?: Snippet` - Center section content (e.g., page title)
- `right?: Snippet` - Right section content (e.g., nav items, user menu)

**HTML Structure:**
```html
<nav class="pa-navbar">
  <div class="pa-navbar__left">...</div>
  <div class="pa-navbar__center">...</div>
  <div class="pa-navbar__right">...</div>
</nav>
```

#### Footer Three-Section Layout
Updated Footer component to support three-section layout matching pure-admin-core pattern.

**New Snippet Props:**
- `left?: Snippet` - Left section content (e.g., copyright)
- `center?: Snippet` - Center section content
- `right?: Snippet` - Right section content (e.g., links)

**HTML Structure:**
```html
<footer class="pa-footer">
  <div class="pa-footer__left">...</div>
  <div class="pa-footer__center">...</div>
  <div class="pa-footer__right">...</div>
</footer>
```

#### Dynamic Page Titles in Docs
Implemented dynamic page titles that display in navbar instead of page content.

**Changes:**
- Updated `docs/src/routes/+layout.svelte` to use `$page.data.pageTitle` from SvelteKit's page store
- Added `<svelte:head>` for dynamic browser tab titles
- Created 31 `+page.ts` files exporting `pageTitle` for each route
- Removed redundant `<Heading level={1}>` and `<svelte:head><title>` from all page content

**Pattern:**
```typescript
// docs/src/routes/buttons/+page.ts
export const load = () => {
    return { pageTitle: 'Buttons' };
};
```

### Fixed

#### Column Component Auto-Sizing
Fixed Column component to add `pa-col` class by default when no size or responsive props are specified.

**Problem:** Columns without explicit size props didn't get any class, breaking the pure-admin flex grid auto-sizing behavior.

**Solution:** Added logic to output `pa-col` class when `size`, `sm`, `md`, `lg`, and `xl` props are all undefined.

```typescript
// Before: No class output when no size specified
// After: Outputs 'pa-col' for flex auto-sizing
if (size) {
    base.push(`pa-col-${size}`);
} else if (!sm && !md && !lg && !xl) {
    base.push('pa-col');
}
```

**Use Case:** Theme color grids where columns should auto-size evenly:
```svelte
<Grid>
  <Column>Color 1</Column>  <!-- Now gets pa-col class -->
  <Column>Color 2</Column>
  <Column>Color 3</Column>
</Grid>
```

#### Lists Page Prop Names
Fixed incorrect prop names in docs lists page to match BasicList component API.

**Fixes:**
- Changed `variant="danger"` → `iconVariant="danger"` (also info, warning)
- Changed `<BasicList compact>` → `<BasicList spacing="compact">`
- Changed `<BasicList spacious>` → `<BasicList spacing="spacious">`

#### Dark Mode FOUC with Audi Theme
Fixed flash of dark mode on page reload when using light mode with the Audi theme.

**Problem:** The FOUC prevention script in `app.html` only added `pa-mode-dark` class when dark mode was saved, but didn't handle light mode. Since the Audi theme uses `:root, .pa-mode-dark` for dark defaults, pages would briefly flash dark before SettingsPanel mounted and applied `pa-mode-light`.

**Solution:** Updated the blocking script to also apply `pa-mode-light` class when light mode is saved (or no preference), ensuring the override is in place before CSS renders.

```javascript
// Before: Only handled dark mode
if (themeMode === 'dark') {
    document.body.classList.add('pa-mode-dark');
}

// After: Handles both modes
if (themeMode === 'dark') {
    document.body.classList.add('pa-mode-dark');
} else {
    document.body.classList.add('pa-mode-light');
}
```

---

## [1.0.0-rc05] - 2026-01-09

### Added

#### TabsContainer Card Variant
- New `card?: boolean` prop - makes tabs look like a card with tabs replacing the header
- CSS class: `pa-tabs__container--card`
- Height aligned with card header (40px)
- Same border, border-radius, background, and shadow as regular cards

**Usage:**
```svelte
<TabsContainer card>
  <Tabs>
    <TabItem active>Tab 1</TabItem>
    <TabItem>Tab 2</TabItem>
  </Tabs>
  <TabsContent>
    <!-- panels -->
  </TabsContent>
</TabsContainer>
```

#### TabsOverflow Component (NEW)
- New component for tab overflow dropdown when tabs don't fit in container
- CSS classes: `pa-tabs__overflow`, `pa-tabs__overflow-toggle`, `pa-tabs__overflow-menu`
- Props: `hasActive` (shows accent underline), `show` (bindable dropdown state), `toggle` (custom icon snippet)
- Click outside to close dropdown

**Usage:**
```svelte
<TabsContainer card>
  <Tabs>
    <TabItem active>Tab 1</TabItem>
    <TabItem>Tab 2</TabItem>
    <TabsOverflow hasActive={false} bind:show={overflowOpen}>
      {#snippet toggle()}<i class="fa-solid fa-ellipsis"></i>{/snippet}
      <TabItem>Hidden Tab 1</TabItem>
      <TabItem>Hidden Tab 2</TabItem>
    </TabsOverflow>
  </Tabs>
</TabsContainer>
```

#### Modal Static Modifier
- New `isStatic?: boolean` prop - prevents closing via ESC key or backdrop click
- CSS class: `pa-modal--static`
- Use case: License agreements, critical confirmations, required actions

**Usage:**
```svelte
<Modal bind:show isStatic title="License Agreement">
  <p>You must accept the terms to continue.</p>
  {#snippet footer()}
    <Button onclick={() => (show = false)}>I Accept</Button>
  {/snippet}
</Modal>
```

#### Tooltip Color Variants
- Extended `variant` prop to include theme color variants: `color-1` through `color-9`
- CSS classes: `pa-tooltip--color-1` through `pa-tooltip--color-9`
- Uses `--pa-color-*` CSS variables that themes can define

**Usage:**
```svelte
<Tooltip text="Custom color" variant="color-1">Hover me</Tooltip>
```

#### Popover Alignment Modifiers
- New `alignment?: 'center' | 'right'` prop - controls text alignment in popover body
- CSS classes: `pa-popover--center`, `pa-popover--right`
- Default is left-aligned (no modifier class)

**Usage:**
```svelte
<Popover title="Centered" alignment="center">
  <p>This content is centered.</p>
</Popover>
```

#### Card Inline Tabs
- New `inlineTabs?: boolean` prop - places tabs inside the card header row as pill-style buttons
- CSS class: `pa-card__tabs--inline`
- Height aligned with cards without tabs

**Usage:**
```svelte
<Card inlineTabs>
  {#snippet tabs()}
    <button class="pa-card__tab pa-card__tab--active">Tab 1</button>
    <button class="pa-card__tab">Tab 2</button>
  {/snippet}
  Body content
</Card>
```

#### ProfilePanel Footer Support
- New `footer?: Snippet` prop for fixed action buttons at bottom of panel
- CSS class: `pa-profile-panel__footer`
- Footer renders outside body, always visible at bottom (doesn't scroll)
- Proper pattern for "Sign Out", "Switch Account" buttons per pure-admin-core

**Usage:**
```svelte
<ProfilePanel bind:show name="John Doe" email="john@example.com">
  {#snippet nav()}
    <ProfilePanelNavItem href="/profile">Profile Settings</ProfilePanelNavItem>
  {/snippet}

  {#snippet footer()}
    <Button variant="secondary" block>Switch Account</Button>
    <Button variant="danger" block>Sign Out</Button>
  {/snippet}
</ProfilePanel>
```

**Note:** The existing `actions` snippet (inside body) is deprecated. Use `footer` for action buttons.

### Changed

#### Peer Dependency Update
- Updated `@keenmate/pure-admin-core` peer dependency: `^1.0.0-rc04` → `^1.0.0-rc05`

### Exports
- Added `TabsOverflow` component export

---

## [1.0.0-rc04] - 2026-01-06

### Breaking Changes

#### Removed Component-Specific Width/Gap Props
Following pure-admin-core rc04's consolidation of sizing utilities, several component props have been removed in favor of utility classes.

**Badge Component:**
- Removed `width` prop and `BadgeWidth` type
- Migration: Use utility classes like `class="wr-5 minwr-5"` instead of `width="5x"`

**Button Component:**
- Removed `width` prop and `ButtonWidth` type
- Migration: Use utility classes like `class="wr-8 minwr-8"` instead of `width="8x"`

**ButtonGroup Component:**
- Removed `gap` prop (`'compact' | 'loose'`)
- Migration: Use utility classes like `class="gap-2"` for compact, `class="gap-8"` for loose

**Migration Examples:**
```svelte
<!-- Before (rc03) -->
<Badge width="5x">Tag</Badge>
<Button width="8x">Click</Button>
<ButtonGroup gap="compact">...</ButtonGroup>

<!-- After (rc04) - use utility classes -->
<Badge class="wr-5 minwr-5">Tag</Badge>
<Button class="wr-8 minwr-8">Click</Button>
<ButtonGroup class="gap-2">...</ButtonGroup>
```

### Added

#### Tabs Component
- New `borderTop?: boolean` prop - moves active indicator from bottom to top
- CSS class: `pa-tabs--border-top`
- Useful for profile panel tabs and similar UI patterns

### Changed

#### Peer Dependency Update
- Updated `@keenmate/pure-admin-core` peer dependency: `^1.0.0-rc03` → `^1.0.0-rc04`

---

## [1.0.0-rc03] - 2026-01-05

### Added

#### ProfilePanel No-Avatar Variant
- New `noAvatar?: boolean` prop - hides avatar for corporate apps without user photos
- CSS class: `pa-profile-panel__header--no-avatar`
- Avatar is always in DOM (CSS controls visibility for SettingsPanel toggle support)

#### SettingsPanel Profile Toggle
- New "Profile Panel" section with "Hide Avatar" checkbox
- Setting persisted to `localStorage.getItem('profile-no-avatar')`
- Dynamically toggles `pa-profile-panel__header--no-avatar` class on profile panel

### Changed

#### Peer Dependency Update
- Updated `@keenmate/pure-admin-core` peer dependency: `^1.0.0-rc02` → `^1.0.0-rc03`

---

## [1.0.0-rc02] - 2026-01-05

### Added

#### Profile Panel Favorites Components
New components to support the profile panel favorites feature from pure-admin-core rc02.

**New Components:**
- **ProfilePanelFavorites** (`src/lib/profile/ProfilePanelFavorites.svelte`)
  - Container for favorites list with optional add button
  - Props: `children` (favorite items), `addButton` (snippet for add button), `class`
  - CSS class: `pa-profile-panel__favorites`

- **ProfilePanelFavoriteItem** (`src/lib/profile/ProfilePanelFavoriteItem.svelte`)
  - Individual favorite item with icon, label, and remove button
  - Props: `href`, `icon` (snippet), `label`, `removable`, `onClick`, `onRemove`, `class`
  - CSS classes: `pa-profile-panel__favorite-item`, `__favorite-icon`, `__favorite-label`, `__favorite-remove`

**ProfilePanel Enhancements:**
- Added `tabs` snippet prop - renders between header and body for tabbed interface
- Added `children` snippet prop - replaces nav+actions for full body content control
- Supports new pure-admin-core rc02 tabbed profile panel pattern (Profile + Favorites tabs)

**Usage Example:**
```svelte
<ProfilePanel bind:show name="John Doe" email="john@example.com" role="Admin">
  {#snippet tabs()}
    <Tabs variant="full">
      <TabItem active>Profile</TabItem>
      <TabItem>Favorites</TabItem>
    </Tabs>
  {/snippet}

  <!-- Tab panels content -->
  <TabPanel active>
    <ProfilePanelNavItem href="/profile">Profile Settings</ProfilePanelNavItem>
  </TabPanel>
  <TabPanel>
    <ProfilePanelFavorites>
      <ProfilePanelFavoriteItem label="Dashboard" href="/dashboard">
        {#snippet icon()}📊{/snippet}
      </ProfilePanelFavoriteItem>
    </ProfilePanelFavorites>
  </TabPanel>
</ProfilePanel>
```

**Exports:**
- `ProfilePanelFavorites`
- `ProfilePanelFavoriteItem`

### Changed

#### Peer Dependency Update
- Updated `@keenmate/pure-admin-core` peer dependency: `^1.0.0-rc01` → `^1.0.0-rc02`

---

## [1.0.0-rc01] - 2026-01-02

First release candidate of @keenmate/svelte-pure-admin.

### Release Highlights
- **80+ Svelte 5 components** for building admin dashboards
- Full TypeScript support with type definitions
- Svelte 5 runes (`$props`, `$state`, `$derived`) and snippets
- Comprehensive component library: Layout, Forms, Buttons, Feedback, Display, Navigation
- Dialog service for programmatic modals
- Keyboard shortcut registry
- Command palette with multi-step commands
- FOUC prevention for theme/layout settings

### Package Details
- Package size: 70.7 kB (compressed)
- Unpacked size: 313.5 kB
- Total files: 200
- Peer dependencies: `svelte ^5.0.0`, `@keenmate/pure-admin-core ^1.0.0-rc01`

---

### Changed - 2025-12-25

#### Grid Component Enhancements
Updated Grid component with row modifiers to match pure-admin-core snippets.

**New Props:**
- `noGutter?: boolean` - Remove spacing between columns (`pa-row--no-gutter`)
- `justify?: 'center' | 'end' | 'between' | 'around'` - Horizontal alignment of columns
- `align?: 'top' | 'middle' | 'bottom'` - Vertical alignment of columns
- `sameHeight?: boolean` - Force all columns to equal height (`pa-row--same-height`)

**Usage:**
```svelte
<Grid justify="center" sameHeight>
  <Column size="1-3">Card 1</Column>
  <Column size="1-3">Card 2</Column>
  <Column size="1-3">Card 3</Column>
</Grid>
```

#### Column Component Enhancements
Added offset support for left margin positioning.

**New Props:**
- `offset?: OffsetSize` - Left margin offset (5% increments: '5' to '95')
- `offsetSm?: OffsetSize` - Offset on small screens (≥576px)
- `offsetMd?: OffsetSize` - Offset on medium screens (≥768px)
- `offsetLg?: OffsetSize` - Offset on large screens (≥992px)
- `offsetXl?: OffsetSize` - Offset on extra large screens (≥1200px)

**Usage:**
```svelte
<Grid>
  <Column size="50" offset="25">Centered column</Column>
</Grid>
```

### Verified - 2025-12-25

#### Component Alignment with pure-admin-core
Verified component alignment after pure-admin-core workspace migration and updates.

**Components Verified:**
- **Column** - Already supports all fraction sizes (`1-2`, `1-3`, `2-3`, `1-4`, etc.) and percentage sizes
- **Checkbox** - Matches new tri-state checkbox pattern from snippets (`pa-checkbox__box`, `pa-checkbox__label`)
- **ButtonGroup** - Has all modifiers: `gap`, `align`, `mdVertical`, `lgHorizontal`, `nowrap`
- **Button** - Has all variants including `iconOnly`, `loading`, `ripple`, `width`, `align`
- **Tabs/TabItem** - Supports all styles, sizes, alignments, and overflow modes

**No Invalid Classes Found:**
- Searched for deprecated `pa-col-md-33`, `pa-col-md-67` classes - none found
- All grid classes use valid fraction or percentage values

---

### Added - 2025-12-18

#### Global Keyboard Shortcut Registry
Centralized service for managing keyboard shortcuts across components.

**New Files:**
- `src/lib/services/shortcut-registry.svelte.ts` - Svelte 5 runes-based registry service
- `src/lib/services/shortcut-registry-types.ts` - TypeScript type definitions
- `src/lib/feedback/ShortcutHelpDialog.svelte` - Modal showing all registered shortcuts

**Features:**
- `shortcutRegistry.register()` - Register shortcuts with auto-cleanup on unmount
- `shortcutRegistry.unregister()` - Manual unregistration
- `shortcutRegistry.enable()` / `disable()` - Toggle without unregistering
- Conflict detection - Warns if same shortcut registered twice
- Priority system - Higher priority shortcuts handled first
- Scope support - `global`, `modal`, `input`, or custom scopes
- Reactive getters (`all`, `byCategory`, `count`) for Svelte 5 components

**Shortcut Help Dialog:**
- Press `Shift+?` to view all registered shortcuts
- Shortcuts grouped by category (Navigation, General, etc.)
- Styled keyboard key display (`Ctrl`, `K`, etc.)

**Default Shortcuts:**
- `Ctrl+K` - Open command palette
- `Shift+?` - Show keyboard shortcuts help

**Exports:**
- `shortcutRegistry`, `formatShortcut` from services
- `ShortcutHelpDialog` component
- Types: `Shortcut`, `ShortcutModifiers`, `ShortcutScope`, `ShortcutRegistration`, `ShortcutRegistry`

**Component Updates:**
- `PureAdminProvider` - Now manages global keydown listener and `?` shortcut
- `CommandPalette` - Uses registry instead of direct event listener

#### Modal Component Enhancements
- Added `closeOnEscape?: boolean` prop (default: `true`) - Close modal on Escape key
- Added `onBeforeClose?: () => boolean | void` prop - Return `false` to prevent closing

**Usage:**
```svelte
<Modal
  bind:show
  closeOnEscape={true}
  onBeforeClose={() => {
    if (hasUnsavedChanges) return false; // Prevent close
  }}
  onClose={() => console.log('Closed')}
>
```

---

### Added - 2025-12-17

#### CommandPalette v2
Complete redesign of the CommandPalette component with multi-step commands and scoped search.

**New Features:**
- `/commands` - Multi-step action wizards with conditional steps
- `:contexts` - Scoped entity search (e.g., `:p` for products, `:u` for users)
- Global search (no prefix) - Search across all contexts
- Async support with loading states and debouncing
- Error handling with user-visible error messages
- Configurable `errorSnippet` prop for custom error display

**New Components:**
- `NavbarSearch` - Search input that opens CommandPalette on click
- Shows keyboard shortcut hint (Ctrl+K)
- Responsive design (hides placeholder on mobile)

**New Types (exported from `$lib`):**
- `Command`, `CommandStep`, `StepOption`, `StepSelection`
- `SearchContext`, `SearchResult`
- `PaletteMode`

**Navbar Integration:**
- Added `search` snippet prop to `Navbar` component
- CommandPalette added to main layout with navigation commands

**Default Commands in Demo:**
- `/go` - Navigate to any page
- `/theme` - Toggle dark/light mode
- `/sidebar` - Toggle sidebar visibility
- `/settings` - Open settings panel

**Default Search Contexts in Demo:**
- `:p` / `:pages` - Search all pages
- `:c` / `:components` - Search component pages

### Changed - 2025-12-13

#### Tables Page Parity
Updated `/tables` page to match pure-admin-visual structure and patterns.

**Structure Changes:**
- Removed page header (Heading level 1 + Paragraph) - visual uses plain `<p>` description
- Added "Pager Positioning Examples" card (left/center/right alignment demos)
- Added "Alternative Pager Icon Sets" card (4 icon style variations)
- Right Load More now shows loading state (matches visual)

**Inline Styles Removed:**
- `<Heading level={4} style="margin-top: 2rem;">` → `<h4 class="mt-8">`
- Replaced all `<Heading level={4}>` with raw `<h4>` elements

**Data Updates:**
- Center Load More table: Updated to match visual (Sarah Johnson, Mike Davis)
- Center Load More count: "showing 3 of 500" → "3 of 1,247"
- Right Load More invoice amounts: Updated to match visual ($234.56, $567.89, $123.45)

**Interactive Enhancement:**
- "Load more products" button now functional with Svelte 5 state
- Shows 3 of 9 products initially, loads 3 more per click
- Displays loading spinner during simulated 800ms delay
- Button hides when all products loaded

#### Popconfirm Page Parity
Updated `/popconfirm` page to match pure-admin-visual structure and patterns.

**Structure Changes:**
- Removed page header (Section with Heading/Paragraph) - visual doesn't have one
- Combined "Basic Popconfirms" and "Compact Variant" into single card with Grid layout
- Added `min-h-12x` wrapper around ButtonGroups (matches visual)
- Table now uses `noPadding` Card prop with ID/Name/Status columns (removed Email)
- Table data updated to match visual: Active/Pending/Inactive statuses

**Inline Styles Removed:**
- Position Variants: `style="display: flex; gap: 2rem; ..."` → `<ButtonGroup>` component
- Icon Variants: `style="display: flex; gap: 1rem; ..."` → `<ButtonGroup>` component
- Basic Popconfirms: raw flex div → `<ButtonGroup>` component

**Type Fixes:**
- Column sizes: `size={100}` → `size="100"` (string type)
- Button outline: `variant="outline-danger"` → `variant="danger" outline`
- Toast: children content → `message` prop

**Svelte-Specific Sections Kept:**
- Position Variants card (demonstrates Floating UI positioning)
- Icon Variants card (shows danger/warning/info icon styles)

#### Modal Dialogs Page Cleanup
Converted `/modal-dialogs` page from Grid/Column layouts to ButtonGroup components.

**Sections Updated:**
- Confirm Dialogs (6 buttons)
- Position Options (4 buttons)
- Alert Dialogs (4 buttons)
- Prompt Dialogs (3 buttons)
- Custom Dialogs (4 buttons)

**Changes:**
- Removed Grid/Column imports, added ButtonGroup import
- Removed `class="w-100"` from buttons (not needed in ButtonGroup)
- Simplified button text (e.g., "Custom Button Text" → "Custom Text")
- Fixed card headers: `{#snippet header()}<Heading level={3}>` → `title` prop
- All 8 cards now use `title` prop instead of header snippet with Heading

#### Card Headers Pattern Fix
Fixed card headers in `/popconfirm` and `/modal-dialogs` to use proper Card API.

**Wrong (creates tab-like appearance):**
```svelte
<Card>
  {#snippet header()}
    <Heading level={3}>Title</Heading>
    <Paragraph>Description</Paragraph>
  {/snippet}
</Card>
```

**Correct:**
```svelte
<Card title="Title" subtitle="Description">
</Card>
```

**Files Updated:**
- `/popconfirm` - 4 cards fixed
- `/modal-dialogs` - 8 cards fixed

#### ButtonGroup Component Enhancement
Enhanced ButtonGroup with new modifiers from buttons.html snippet.

**New Props:**
| Prop | Type | Description |
|------|------|-------------|
| `gap` | `'compact' \| 'loose'` | Gap between buttons (tight/spacious) |
| `align` | `'center' \| 'end' \| 'stretch'` | Vertical alignment (for vertical groups) |
| `mdVertical` | `boolean` | Horizontal on mobile, vertical on md+ |
| `lgHorizontal` | `boolean` | Vertical on mobile/tablet, horizontal on lg+ |
| `nowrap` | `boolean` | Prevent wrapping (single line) |

**CSS Classes Generated:**
- `pa-btn-group--compact`, `pa-btn-group--loose`
- `pa-btn-group--center`, `pa-btn-group--end`, `pa-btn-group--stretch`
- `pa-btn-group--md-vertical`, `pa-btn-group--lg-horizontal`
- `pa-btn-group--nowrap`

---

### Added - 2025-12-13

#### Custom Dialog Service
Added `dialogService.custom<T>()` method for defining dialogs with custom buttons and typed return values.

**New Types:**
- `DialogButton<T>` - Button definition with `label`, `value`, `variant`, `outline`, `class`, `disabled`
- `CustomDialogOptions<T>` - Extends base options with `buttons` array and `dismissValue`

**Features:**
- Define any number of buttons with custom labels and return values
- Full TypeScript generics support for type-safe return values
- Each button supports: variant, outline style, custom class, disabled state
- `dismissValue` option for Escape/backdrop click return value
- Custom CSS classes: `class`, `bodyClass`, `footerClass` on all dialog types

**Usage:**
```typescript
const result = await dialogService.custom<'save' | 'discard' | 'cancel'>({
  title: 'Unsaved Changes',
  message: 'You have unsaved changes.',
  variant: 'warning',
  dismissValue: 'cancel',
  buttons: [
    { label: 'Cancel', value: 'cancel', variant: 'secondary' },
    { label: 'Discard', value: 'discard', variant: 'danger', outline: true },
    { label: 'Save', value: 'save', variant: 'success' }
  ]
});
```

**Demo Page** (`/modal-dialogs`):
- Added Custom Dialogs section with 4 examples:
  - Save Changes (3-button: Save/Discard/Cancel)
  - Delete Options (3-button: Permanent/Trash/Cancel)
  - Feedback Rating (5-button rating scale)
  - Merge Conflict (4-button: Ours/Theirs/Manual/Abort)
- Added full API reference for `dialogService.custom()` and `DialogButton`

**Exports:**
- `CustomDialogOptions` type
- `DialogButton` type

---

### Changed - 2025-12-11

#### Page Parity with pure-admin-visual

**Modals Page** (`src/routes/modals/+page.svelte`):
- Removed page header - Visual doesn't have `<Heading level={1}>Modal Windows</Heading>` at top
- Added missing Position Modifiers section with Centered and Top-Aligned buttons
- Added 2 new modal definitions (Centered Modal, Top-Aligned Modal)
- Replaced all inline style attributes with CSS utility classes:
  - `style="margin-top: 2rem;"` → `class="mt-4"`
  - `style="margin-top: 1rem;"` → `class="mt-3"`
  - `style="margin-bottom: 1rem;"` → `class="mb-4"`
  - `style="list-style: none; padding: 0;"` → `class="pa-list-unstyled"`
  - `style="padding: 0.5rem 0;"` → `class="py-2"`

**Badges Page** (`src/routes/badges/+page.svelte`):
- Removed page header - Visual doesn't have `<Heading level={1}>Badges</Heading>` at top
- Added two reference table cards matching Visual:
  - "Badge Sizes Reference" - table showing XS, SM, Default, LG, XL sizes with classes, font-size, padding, examples
  - "Label Sizes Reference" - same structure for labels
- Replaced all inline style attributes with CSS utility classes:
  - `style="margin-top: 1rem;"` → `class="mt-4"`
  - `style="margin-bottom: 0.5rem;"` → `class="mb-2"`
  - `style="font-size: 0.75rem;"` → `class="text-xs"`
  - `style="font-size: 0.875rem; color: var(--text-secondary);"` → `class="text-sm text-secondary"`

**Lists Page** (`src/routes/lists/+page.svelte`):
- Removed page header - Visual only has intro `<p>` text, no h1
- Replaced all inline style attributes with CSS utility classes:
  - 14 instances of `style="margin-top: 2rem;"` → `class="mt-8"` on H4 headings
  - 4 instances of `style="margin-top: 1rem;"` → `class="mt-4"` on H5 headings
- Fixed Complex Lists Card structure:
  - Removed nested `<div class="pa-card__body pa-card__body--no-padding">` wrapper
  - Now uses `noPadding` prop on Card component instead

### Fixed - 2025-12-11

- **Tooltip double-display bug**: Added `pa-tooltip--floating` class to Tooltip component (`src/lib/feedback/Tooltip.svelte`) to disable CSS pseudo-element tooltips when using Floating UI

---

### Added - 2025-12-10

#### Grid System Migration
Migrated from PureCSS grid to native Pure Admin flexbox grid system.

**Grid Component** (`src/lib/layout/Grid.svelte`):
- Changed output class from `pure-g` to `pa-row`
- Native flexbox container for responsive layouts
- Added `style?: string` prop for inline styles

**Column Component** (`src/lib/layout/Column.svelte`):
- Complete rewrite for new grid system
- Changed from `pure-u-*` to `pa-col-*` classes
- **Percentage sizes** (5% increments): `'5' | '10' | '15' | ... | '100'`
- **Fraction sizes**: `'1-2' | '1-3' | '2-3' | '1-4' | '3-4' | '1-5' | ... | '11-12'`
- **Auto width**: `'auto'`
- **Responsive breakpoints**: `sm`, `md`, `lg`, `xl` props
- Added `style?: string` prop for inline styles
- Example: `<Column size="100" md="50">` renders `pa-col-100 pa-col-md-50`

**Pages Updated:**
- All route pages updated to use `size="100"` instead of invalid `size="1"`
- Home page (`+page.svelte`) converted from raw `pure-g`/`pure-u-*` classes to Grid/Column components

#### Checkbox Icon Support
- Added `icon?: Snippet` prop to Checkbox component
- Icon renders inside `<span class="pa-checkbox__icon">` before label text
- Usage: `<Checkbox id="x" label="Favorite">{#snippet icon()}<Icon name="star" />{/snippet}</Checkbox>`

#### CheckboxBox Component (New)
New low-level checkbox component (`src/lib/forms/CheckboxBox.svelte`) for building composite checkbox patterns.

- Renders the raw checkbox structure without label wrapper:
  ```html
  <span class="pa-checkbox">
    <input type="checkbox" />
    <span class="pa-checkbox__box"></span>
  </span>
  ```
- All checkbox features via props: `checked`, `indeterminate`, `disabled`, `xMark`, `size`
- Used internally by CheckboxListItem
- Exported from lib index for direct use

#### Card Component Enhancement
- Added `subtitle?: string` prop for description text below title
- Renders as `<p class="pa-text pa-text--secondary">`
- Eliminates need for raw HTML in card headers

#### CheckboxListItem Refactor
- Now uses CheckboxBox component internally (zero raw HTML)
- Maintains same API: `id`, `label`, `description`, `state`, `checked`, `disabled`, `onChange`, `actions`

**Exports:**
- Added `CheckboxBox` component export to `src/lib/index.ts`

---

#### Full Parity Update with pure-admin-visual
Comprehensive update to achieve 100% feature parity with pure-admin-visual CSS framework.

**New Components:**
- **Loader Component** (`src/lib/feedback/Loader.svelte`): Advanced loader animations
  - Types: `dots`, `bars`, `pulse`, `ring`, `wave`
  - Sizes: `default`, `lg`
  - CSS classes: `pa-loader-{type}`, `pa-loader-{type}--lg`
  - Complements existing Spinner component for different loading UI needs

**Enhanced Components:**

- **Badge** (`src/lib/display/badge-types.ts`):
  - Added `xs` and `xl` sizes to `BadgeSize` type
  - Full size range now: `'xs' | 'sm' | 'lg' | 'xl'`

- **Modal** (`src/lib/feedback/Modal.svelte`):
  - Added `position?: 'center' | 'top'` prop for modal positioning
  - Added `scrollable?: boolean` prop for scrollable body content
  - New CSS classes: `pa-modal--top`, `pa-modal__body--scrollable`

- **Alert** (`src/lib/feedback/Alert.svelte`):
  - Added `list?: Snippet` prop for alert list content
  - Added `actions?: Snippet` prop for alert action buttons
  - New elements: `pa-alert__list`, `pa-alert__actions`
  - Both snippets work in icon and non-icon alert layouts

- **Checkbox** (`src/lib/forms/Checkbox.svelte`): Major refactor to match pure-admin-visual pattern
  - Added `xMark?: boolean` prop for X mark variant (`pa-checkbox--x`)
  - Added `indeterminate?: boolean` prop with JavaScript sync via `$effect`
  - Added `size?: 'xs' | 'sm' | 'lg' | 'xl'` prop
  - Refactored HTML structure to use proper BEM pattern:
    - `<label class="pa-checkbox">` wrapper
    - `<span class="pa-checkbox__box">` for custom checkbox styling
    - `<span class="pa-checkbox__label">` for label text
  - Supports tri-state: unchecked, checked, indeterminate
  - One component handles all variants via props (plain, with X mark, indeterminate, disabled, all sizes)

**Exports:**
- Added `Loader` component export to `src/lib/index.ts`

**Verified Existing Features (Already Implemented):**
| Component | Feature | Status |
|-----------|---------|--------|
| Tabs | `align: 'full'`, `overflow: 'nowrap'` | ✅ Already exists |
| CodeBlock | `compact: boolean` | ✅ Already exists |
| Card | `stat: boolean`, `titleIcon`, `meta` snippets | ✅ Already exists |
| CheckboxList | `layout: 'grid' \| '2col' \| '3col'` | ✅ Already exists |
| Popover | `size: 'sm' \| 'lg'` | ✅ Already exists |
| Tooltip | `help: boolean` | ✅ Already exists |

### Added
- **Tabs Page**: Complete tabs demonstration page matching pure-admin.keenmate.dev
  - All tab examples: Card Tabs, Standalone, Pills, Vertical, Boxed, Sizes, Badges, Centered, Full Width, Icon-Only, Bordered, Long Titles
  - 20+ interactive tab examples with proper state management
  - Font Awesome icons integration via CDN

- **TabsScrollable Component**: Scrollable tabs with automatic arrow buttons
  - Left/right scroll buttons that appear/disappear based on scroll position
  - Smooth scrolling (200px increments) with click handlers
  - Reactive arrow visibility based on scroll position and container overflow
  - Responsive updates on window resize
  - Supports style variants (pills, boxed) and size variants (sm, lg)
  - Pure Svelte implementation with `onMount` lifecycle and reactive state

- **TabItem Component Enhancement**: Support for arbitrary HTML attributes
  - Extends `HTMLButtonAttributes` interface for full button attribute support
  - Rest props spreading (`{...restProps}`) for custom attributes like `data-tooltip`
  - Enables CSS-based tooltips on tabs using `pa-tooltip` class and `data-tooltip` attribute
  - Tooltip positioning support (top, right, bottom, left) via Pure Admin CSS

- **BadgeGroup Component Enhancement**: Interactive expand/collapse functionality
  - New data-driven API: Pass `badges` array prop for automatic expand/collapse behavior
  - Automatically shows "» N more" badge when items exceed the `limit` (default: 5)
  - Click "» N more" to expand and show all badges with "« Collapse" button
  - Pure Svelte implementation - no CSS tricks or DOM queries needed
  - Backward compatible: Still supports snippet-based rendering with `children` prop
  - Example usage: `<BadgeGroup badges={items} limit={5} />`

- **Badge Component Enhancement**: Added click and style support
  - New `onclick` prop for handling click events
  - New `style` prop for inline styles
  - Makes badges interactive and clickable when needed

- **SettingsPanel Component**: Global settings management with dual persistence architecture
  - **URL-based settings** (require page reload, persist via cookies):
    - Layout width options (fluid, sm, md, lg, xl, 2xl)
    - Sidebar mode (scrolls with content / fixed position)
  - **localStorage-based settings** (apply immediately without reload):
    - Sidebar behavior (hide completely / show icons only)
    - Sidebar collapsed state toggle
    - Compact mode toggle
    - Font size options (small 14px, default 16px, large 18px, xlarge 20px)
    - Font family options (11 fonts: serif, mono, delivery, cuprum, fira-sans-condensed, manrope, martel, maven-pro, monda, play, signika, yanone-kaffeesatz)
  - Settings panel UI shows current values from storage
  - Reset to defaults functionality for all settings
  - Floating panel with toggle button

- **Server-side settings loading** (`+layout.server.ts`):
  - Reads settings from URL query parameters with cookie fallback
  - Priority: query params > cookies > defaults
  - Automatically updates cookies when query params are provided
  - Settings available to all pages via SvelteKit load function

- **Client-side settings application** (`+layout.svelte`):
  - Applies URL-based settings (containerWidth, sidebarMode) on mount
  - Applies localStorage-based settings (fontSize, fontFamily, sidebarBehavior, etc.) on mount
  - Uses `requestAnimationFrame` to ensure DOM is ready before applying sidebar classes
  - Proper cleanup of applied classes on unmount

- **PopoverContainer Component**: Fixed positioning issues
  - Improved FOUC (Flash of Unstyled Content) prevention
  - Fixed popover jumping when switching between triggers
  - Better position calculation with validation
  - Proper handling of multiple popovers
  - Single autoUpdate setup per popover instance

### Changed
- **Sidebar Menu**: Synchronized menu structure with pure-admin.keenmate.dev
  - Updated to match production site navigation
  - Added 3-level nested menu support
  - Dashboard, Components (14 items), Tables (4 items), Timeline (3 items), Virtual Scroll (2 items)
  - Settings menu with nested System Settings, User Settings, and Advanced submenus

- **Card Component Usage Pattern**: Fixed snippet API usage across tabs page
  - Removed incorrect `{#snippet body()}` wrappers
  - Content now properly placed as direct children of Card component
  - Card tabs use `{#snippet tabs()}` for proper rendering
  - Maintains backward compatibility with existing Card usage

### Fixed
- Popover positioning with size and placement props
- Popover FOUC at (0,0) coordinates
- Badge group CSS interference with Svelte-controlled rendering
- **SettingsPanel persistence**: Fixed `$effect` running before settings load from localStorage
  - Added `mounted` flag to prevent default values from overwriting stored settings
  - Settings now properly persist across page reloads
- **Sidebar behavior CSS classes**: Corrected selector from `.pa-sidebar` to `.pa-layout__sidebar`
  - Fixed icon-collapse mode not applying to sidebar element
  - Proper BEM naming convention now used throughout

## [1.0.0] - Initial Release

### Added
- Initial Svelte 5 component library
- Pure Admin CSS framework integration
- Core components: Layout, Sidebar, Navbar, Footer, Main
- Form components: Input, Textarea, Select, Checkbox, Radio, FormGroup
- Button components: Button, ButtonGroup
- Feedback components: Alert, Modal, Toast, Spinner, Tooltip, Popover, Popconfirm
- Display components: Card, Badge, CompositeBadge, BadgeGroup, Table, List, Code, Timeline
- Navigation components: Tabs, CommandPalette
- Profile components: ProfilePanel
- Configuration system with PureAdminProvider
