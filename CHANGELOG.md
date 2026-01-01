# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
