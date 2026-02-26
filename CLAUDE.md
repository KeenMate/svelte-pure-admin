# @keenmate/svelte-pure-admin - Claude Development Notes

## Project Overview

**@keenmate/svelte-pure-admin** is a **Svelte 5** component library that wraps the Pure Admin CSS framework (`@keenmate/pure-admin-core`) into reusable Svelte components. This library provides type-safe, reactive components that follow the HTML patterns defined in the core framework's snippet library.

## Technology Stack

- **Svelte 5** (latest) - Using new runes API (`$props`, `$state`, `$derived`)
- **SvelteKit 2.x** - Library mode for component packaging
- **TypeScript** - Full type safety with interfaces
- **Vite** - Build tool and dev server
- **@keenmate/pure-admin-core** - Core CSS framework (file dependency)

## Architecture Principles

### 1. **Snippet-Driven Development**

Every component MUST be based on the HTML snippets from `@keenmate/pure-admin-core/snippets/`:

```
../pure-admin/packages/core/snippets/
├── alerts.html            ← Reference for Alert component
├── badges.html            ← Reference for Badge component
├── buttons.html           ← Reference for Button component
├── callouts.html          ← Reference for Callout component
├── cards.html             ← Reference for Card component (ghost mode in 1.5+)
├── checkbox-lists.html    ← Reference for CheckboxList component
├── code.html              ← Reference for Code/CodeBlock components
├── command-palette.html   ← Reference for CommandPalette component
├── comparison.html        ← Reference for Comparison tables
├── customization.html     ← Reference for theme customization
├── detail-panel.html      ← Reference for DetailPanel/DetailView (NEW in 1.2.0)
├── forms.html             ← Reference for Form components
├── grid.html              ← Reference for Grid system
├── layout.html            ← Reference for Layout/Sidebar/ProfilePanel
├── lists.html             ← Reference for Lists component
├── loaders.html           ← Reference for Loader/Spinner
├── modal-dialogs.html     ← Reference for Dialog service
├── modals.html            ← Reference for Modal component
├── popconfirm.html        ← Reference for Popconfirm component
├── profile.html           ← Reference for ProfilePanel
├── tables.html            ← Reference for Table/TableCard components
├── tabs.html              ← Reference for Tabs components
├── timeline.html          ← Reference for Timeline component
├── toasts.html            ← Reference for Toast component
├── tooltips.html          ← Reference for Tooltips/Popovers
├── typography.html        ← Reference for Typography components
├── utilities.html         ← Reference for Utility classes
└── virtual-scroll.html    ← Reference for virtual scrolling
```

**SCSS sources for Data Display components** (no dedicated snippet file):
- `../pure-admin/packages/core/src/scss/core-components/_data-display.scss` — Field/Fields/FieldGroup + DescTable, DotLeaders, PropCard, Banded, AccentGrid
- `../pure-admin/demo/views/data-display-2.mustache` — Demo page for v2 data display patterns

**SCSS sources for Data Visualization components** (no dedicated snippet file):
- `../pure-admin/packages/core/src/scss/core-components/_data-viz.scss` — Progress, StackedBar, ProgressRing, Gauge, DataBar, Heatmap, Sparkline, BarList

**Process for creating a new component:**
1. Read the corresponding `.html` snippet file
2. Identify the HTML structure and CSS classes
3. Create a Svelte component that outputs the exact same HTML
4. Add TypeScript props for customization
5. Use Svelte 5 features (runes, snippets)

### 2. **Svelte 5 Patterns**

This library uses **Svelte 5 runes** exclusively. DO NOT use legacy Svelte syntax.

#### ✅ Correct Svelte 5 Patterns:

```svelte
<script lang="ts">
  // Props with TypeScript interface
  interface Props {
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'lg';
    disabled?: boolean;
    onclick?: (event: MouseEvent) => void;
    children?: import('svelte').Snippet;
  }

  let {
    variant = 'primary',
    size,
    disabled = false,
    onclick,
    children
  }: Props = $props();

  // Reactive state
  let count = $state(0);

  // Derived values
  const classes = $derived(() => {
    const base = ['pa-btn', `pa-btn--${variant}`];
    if (size) base.push(`pa-btn--${size}`);
    return base.join(' ');
  });
</script>

<button class={classes()} {onclick} {disabled}>
  {@render children?.()}
</button>
```

#### ❌ Wrong (Legacy Svelte):

```svelte
<!-- DON'T use export let -->
<script>
  export let variant = 'primary'; // ❌ Old syntax

  $: classes = ['pa-btn', `pa-btn--${variant}`]; // ❌ Old reactive syntax
</script>

<button class={classes}>
  <slot /> <!-- ❌ Old slots -->
</button>
```

### 3. **Snippet (Named Slots) Pattern**

Svelte 5 replaces `<slot>` with `{#snippet}` blocks.

**For content sections (header, footer, etc.):**

```svelte
<script lang="ts">
  interface Props {
    header?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
    footer?: import('svelte').Snippet;
  }

  let { header, children, footer }: Props = $props();
</script>

<div class="pa-card">
  {#if header}
    <div class="pa-card__header">
      {@render header()}
    </div>
  {/if}

  <div class="pa-card__body">
    {@render children?.()}
  </div>

  {#if footer}
    <div class="pa-card__footer">
      {@render footer()}
    </div>
  {/if}
</div>
```

**Usage:**

```svelte
<Card>
  {#snippet header()}
    <h3>Title</h3>
  {/snippet}

  Body content

  {#snippet footer()}
    <Button>Action</Button>
  {/snippet}
</Card>
```

### 4. **Class Name Building**

Use `$derived()` with a function for dynamic class strings:

```svelte
const classes = $derived(() => {
  const base = ['pa-btn'];

  // Variant
  if (outline) {
    base.push(`pa-btn--outline-${variant}`);
  } else {
    base.push(`pa-btn--${variant}`);
  }

  // Size
  if (size) base.push(`pa-btn--${size}`);

  // Modifiers
  if (block) base.push('pa-btn--block');
  if (disabled) base.push('pa-btn--disabled');

  // Custom classes
  if (className) base.push(className);

  return base.join(' ');
});
```

Then use: `<button class={classes()}>`

### 5. **BEM Class Names**

All components MUST use Pure Admin's BEM naming convention: `pa-[block]__[element]--[modifier]`

**Examples:**
- `.pa-btn` - Block
- `.pa-btn--primary` - Modifier
- `.pa-btn--outline-primary` - Modifier
- `.pa-card__header` - Element
- `.pa-alert--dismissible` - Modifier

**Never deviate from this pattern.** Always check the snippet files for correct class names.

### 6. **Naming Conventions (KeenMate Standard)**

This library follows the KeenMate naming methodology for consistency, clarity, and self-documenting code.

#### Property Name Suffixes

**`*Member` suffix** - Property mappings (for data binding):
- Indicates which field in a data object to use
- Makes components generic - works with any data structure
- Examples: `idMember`, `displayValueMember`, `searchValueMember`
- **Not commonly used in Pure Admin** (no data binding), but follow pattern if needed

**`*Callback` suffix** - Only when the return value controls component behavior:
- `beforeCloseCallback` - returns `false` to prevent close
- `get*Callback` - returns data for rendering (e.g., `getDisplayValueCallback`, `getVariantCallback`)
- `copyValueCallback` - returns string for clipboard
- ❌ NOT for fire-and-forget notifications (use `on*` instead)

#### Event Handler and Callback Naming

**`on*` prefix (lowercase)** - Fire-and-forget event notifications:
- ✅ DOM event forwarders: `onclick`, `onchange`, `oninput`, `onblur`, `onfocus`
- ✅ Custom component events: `onclose`, `onconfirm`, `ondismiss`, `onbadgeclick`, `onpagechange`
- Use for any event where the return value is NOT used internally
- Svelte 5 uses native DOM event syntax, so handlers are fully lowercase
- ❌ NOT `onClick`, `onChange`, `onClose` (camelCase - don't use!)
- ❌ NOT `closeCallback`, `confirmCallback` for fire-and-forget events

#### Boolean Prop Naming

**`should*` prefix** - Behavior flags (what component should do):
- `shouldToggleOnNodeClick`, `shouldUseInternalSearchIndex`
- `shouldShowBurger`, `shouldAutoClose`

**`is*` prefix** - State flags (what something is):
- `isDisabled`, `isReadonly`, `isRequired`
- `isSorted`, `isExpanded`, `isSelected`

**Note:** Keep standard HTML boolean attributes as-is:
- `disabled`, `readonly`, `required` (native HTML)
- But use `is*` for custom component state props

#### Visual/Styling Props

**`*Class` suffix** - CSS class strings:
- `bodyClass`, `selectedNodeClass`, `expandIconClass`
- Exception: `class` prop for additional custom classes (standard Svelte pattern)

**`*Timeout` suffix** - Time durations:
- `scrollHighlightTimeout`, `indexerTimeout`
- Always in milliseconds

#### Benefits of This Methodology

1. **Self-documenting code** - Prop name tells you the type and purpose
2. **No ambiguity** - Is it a boolean? callback? string? The name tells you
3. **Better IntelliSense** - Related props group together (all `*Member`, all `on*`, etc.)
4. **Consistency** - Same patterns across all KeenMate packages
5. **Easier maintenance** - New developers understand prop purpose immediately

#### Pure Admin Specific Rules

- Keep `class` prop as-is (standard Svelte convention)
- Use `on*` (lowercase) for all fire-and-forget events: `onclick`, `onchange`, `onclose`, `onconfirm`, `onbadgeclick`
- Use `*Callback` suffix only when the return value is used internally (e.g., `beforeCloseCallback`, `get*Callback`, `copyValueCallback`)
- Use `is*` prefix for component state booleans: `isDisabled`, `isReadonly`, `isCompact`
- Keep native HTML attributes as-is: `disabled`, `readonly`, `required`, `placeholder`
- Use `variant`, `size`, `type` for visual/structural props (standard component patterns)

## Component Structure

### Standard Component Template

```svelte
<script lang="ts">
  /**
   * Pure Admin [ComponentName] Component (Svelte 5)
   * Based on @keenmate/pure-admin-core snippets
   */

  interface Props {
    /** Prop description */
    variant?: 'primary' | 'secondary';
    /** Additional CSS classes */
    class?: string;
    /** Click handler */
    onclick?: (event: MouseEvent) => void;
    /** Children content */
    children?: import('svelte').Snippet;
  }

  let {
    variant = 'primary',
    class: className = '',
    onclick,
    children
  }: Props = $props();

  // Build class string
  const classes = $derived(() => {
    const base = ['pa-component'];
    base.push(`pa-component--${variant}`);
    if (className) base.push(className);
    return base.join(' ');
  });
</script>

<div class={classes()} {onclick}>
  {@render children?.()}
</div>
```

**Note:** Svelte 5 uses lowercase event handlers (`onclick`, `onchange`) matching native DOM events. Use shorthand `{onclick}` when prop name matches attribute.

## File Structure

```
svelte-pure-admin/
├── src/
│   ├── lib/
│   │   ├── index.ts              # Main export file
│   │   ├── Button.svelte         # Button component
│   │   ├── Alert.svelte          # Alert component
│   │   ├── Card.svelte           # Card component
│   │   ├── Modal.svelte          # Modal component
│   │   └── [ComponentName].svelte
│   ├── routes/
│   │   └── +page.svelte          # Demo/showcase page
│   └── app.html                  # HTML template
├── static/                       # Static assets
├── package.json                  # Package configuration
├── svelte.config.js              # SvelteKit config
├── vite.config.ts                # Vite config
├── tsconfig.json                 # TypeScript config
├── README.md                     # Package documentation
└── CLAUDE.md                     # This file
```

## Component Development Workflow

### 1. Choose a Component to Implement

Check `src/lib/index.ts` - components not yet exported need to be created.

## Component Implementation Checklist

### Configuration & Core (4/4 ✅)
- ✅ **PureAdminProvider** - Context provider for configuration
- ✅ **PureAdminConfig** - Configuration interface and defaults
- ✅ **usePureAdminConfig** - Hook to access config from context
- ✅ **mergeConfig** - Deep merge utility for config objects

### Layout Components (5/5 ✅)
**Snippet:** `layout.html`
- ✅ **Layout** - Main layout container (`pa-layout-container`) with size variants (sm, md, lg, xl, 2xl)
- ✅ **Header** - Header/navbar component (`pa-header`) with burger menu, brand, nav, title
- ✅ **Sidebar** - Sidebar navigation (`pa-sidebar`) with collapsible submenus (2-3 levels), scrolling mode
- ✅ **SidebarItem** - Sidebar item/link with icon, label, submenu support, localStorage persistence
- ✅ **Content** - Main content area (`pa-content`) with inner wrapper
- ✅ **Footer** - Footer component (`admin-footer`)

### Form Components (9/9 ✅)
**Snippet:** `forms.html`
- ✅ **FormGroup** - Form group wrapper (`pa-form-group`) with required/success/error states
- ✅ **FormLabel** - Form label (`pa-form-label`)
- ✅ **Input** - Text input (`pa-input`) with sizes (xs, sm, lg, xl), validation states, disabled/readonly, bindable value
- ✅ **Textarea** - Textarea (`pa-textarea`) with rows prop, bindable value
- ✅ **Select** - Select dropdown (`pa-select`) with bindable value
- ✅ **Checkbox** - Checkbox input (`pa-checkbox`) with label wrapper (`pa-form-check`), bindable checked
- ✅ **Radio** - Radio button (`pa-radio`) with label wrapper (`pa-form-check`), bindable checked
- ✅ **InputGroup** - Input group (`pa-input-group`) with addons and buttons
- ✅ **InputGroupAddon** - Input group addon (`pa-input-group__addon`)

### Button Components (2/2 ✅)
**Snippet:** `buttons.html`
- ✅ **Button** - Button component (basic version complete, enhancements pending: loading, fixed width, alignment, ripple)
- ✅ **ButtonGroup** - Button group (`pa-btn-group`) with horizontal/vertical variants

### Alert Components (1/1 ✅)
**Snippet:** `alerts.html`
- ✅ **Alert** - Alert component (`pa-alert`) with dismissible, outline, compact

### Card Components (1/1 ✅)
**Snippet:** `cards.html`
- ✅ **Card** - Card component (`pa-card`) with header, body, footer snippets, ghost mode (`isGhost`), three-part header layout with `--wrap` modifier

### Badge Components (3/3 ✅)
**Snippet:** `badges.html`
- ✅ **Badge** - Badge component (`pa-badge`) with variants, sizes, pill, icons, fixed width
- ✅ **CompositeBadge** - Composite badge (`pa-composite-badge`) with icon, label, button/count
- ✅ **BadgeGroup** - Badge group (`pa-badge-group`) with show-all variant

### Table Components (2/2 ✅)
**Snippet:** `tables.html`
- ✅ **Table** - Table component (`pa-table`) with striped, hover, compact, bordered, spacing variants
- ✅ **TableResponsive** - Responsive wrapper (`pa-table-responsive`)

### Modal Components (1/1 ✅)
**Snippet:** `modals.html`
- ✅ **Modal** - Modal component (`pa-modal`) with sizes (sm, md, lg, xl, xxl, fw), themes (primary, success, warning, danger), backdrop, header, body, footer, bindable show state

### Toast Components (2/2 ✅)
**Snippet:** `toasts.html`
- ✅ **Toast** - Toast notification (`pa-toast`) with variants, icon, title, message, close, progress bar, auto-dismiss, bindable show state
- ✅ **ToastContainer** - Toast container (`pa-toast-container`) with logical positions (top-end/top-start/top-center/bottom-end/bottom-start/bottom-center) — RTL-aware

### Loader/Spinner Components (8/8 ✅)
**Snippet:** `loaders.html`
- ✅ **Spinner** - Basic spinner (`pa-spinner`) with sizes and colors
- ✅ **LoaderDots** - Dots loader (`pa-loader-dots`) - CSS animations, simple component
- ✅ **LoaderBars** - Bars loader (`pa-loader-bars`) - CSS animations, simple component
- ✅ **LoaderPulse** - Pulse loader (`pa-loader-pulse`) - CSS animations, simple component
- ✅ **LoaderRing** - Ring loader (`pa-loader-ring`) - CSS animations, simple component
- ✅ **LoaderWave** - Wave loader (`pa-loader-wave`) - CSS animations, simple component
- ✅ **LoaderCenter** - Centered loader wrapper (`pa-loader-center`) - Utility component
- ✅ **LoaderOverlay** - Overlay loader (`pa-loader-overlay`) - Utility component

### Profile Components (1/1 ✅)
**Snippet:** `profile.html`
- ✅ **ProfilePanel** - Profile panel (`pa-profile-panel`) with overlay, header (avatar, name, email, role), nav, actions, bindable show state

### Data Display Components (13/13 ✅)
**SCSS source:** `_data-display.scss`
- ✅ **Field** - Single label-value pair (`pa-field`) with full-width modifier, copyable variants, `valueVariant` for chips color (success/warning/danger)
- ✅ **Fields** - Container (`pa-fields`) with cols, horizontal, table, bordered, striped, compact, relaxed, inline, row, filled, color variants, `isLinear` (ultra-clean side-by-side), `isChips` (Notion-style inline pills)
- ✅ **FieldGroup** - Titled section (`pa-field-group`) with title element
- ✅ **DescTable** - Ant Design style descriptions table (`pa-desc-table`) with tinted label cells, `cols` (2 or 3)
- ✅ **DescTableItem** - Single label-value pair in DescTable, `full` prop for full-width value
- ✅ **DotLeaders** - Dotted leader lines container (`pa-dot-leaders`) for invoice/menu style
- ✅ **DotLeadersItem** - Single row with label, dots, value; `isTotal` for bold total row
- ✅ **PropCard** - Bordered property card (`pa-prop-card`) with header + row dividers (Stripe-style)
- ✅ **PropCardRow** - Single row in PropCard with label + value; `isBold` for bold value
- ✅ **Banded** - Banded rows container (`pa-banded`) with fixed-width tinted label column
- ✅ **BandedRow** - Single row with tinted label + value
- ✅ **AccentGrid** - Responsive grid (`pa-accent-grid`) with color-coded left borders
- ✅ **AccentGridItem** - Grid cell with `variant` (success/warning/danger/info) for border color

### Data Visualization Components (15/15 ✅)
**SCSS source:** `_data-viz.scss`
- ✅ **Progress** - Progress bar (`pa-progress`) with sizes (xs/sm/lg), color variants, rounded, striped, animated, label group
- ✅ **ProgressRing** - Circular progress ring (`pa-progress-ring`) via conic-gradient, sizes (sm/lg), color variants
- ✅ **Gauge** - Semicircle gauge (`pa-gauge`) via conic-gradient, color variants, `isZones` (multi-zone green/yellow/red), min/max labels
- ✅ **DataBar** - Inline bar for table cells (`pa-data-bar`) with color variants, `isNegative` (red, right-aligned)
- ✅ **StackedBar** - Multi-segment stacked bar (`pa-stacked-bar`) with sizes (sm/lg), `isRounded`
- ✅ **StackedBarSegment** - Individual segment with variant (success/warning/danger/info/secondary)
- ✅ **StackedBarLegend** - Legend container (sibling of StackedBar)
- ✅ **StackedBarLegendItem** - Legend item with color swatch (primary/success/warning/danger/info/secondary)
- ✅ **Sparkline** - Mini bar chart container (`pa-sparkline`) with sizes (sm/lg), color variants
- ✅ **SparklineBar** - Individual sparkline bar, height via `--value`
- ✅ **Heatmap** - Grid container (`pa-heatmap`) with variant (success/danger), `isCompact`, custom `cols`
- ✅ **HeatmapCell** - Cell with `level` (0-4) mapped to `data-level` attribute
- ✅ **HeatmapLegend** - Self-contained legend with 5 fixed cells (levels 0-4)
- ✅ **BarList** - Labeled horizontal bar chart (`pa-bar-list`) with color variants, `isCompact`
- ✅ **BarListItem** - Item with label, value, bar fill via `--value` CSS var

### Summary
- **Total Components:** 68
- **Completed:** 68 (100%) ✅
- **Remaining:** 0

**Status:** All core components have been implemented based on @pure-admin/core snippets!

All component categories are complete:
- ✅ Configuration & Core (4/4)
- ✅ Layout Components (5/5)
- ✅ Form Components (9/9)
- ✅ Button Components (2/2)
- ✅ Alert Components (1/1)
- ✅ Card Components (1/1)
- ✅ Badge Components (3/3)
- ✅ Table Components (2/2)
- ✅ Modal Components (1/1)
- ✅ Toast Components (2/2)
- ✅ Data Display Components (13/13)
- ✅ Data Visualization Components (15/15)
- ✅ Loader/Spinner Components (8/8)
- ✅ Profile Components (1/1)

### 2. Read the Snippet

Open the corresponding snippet file from `../pure-admin/packages/core/snippets/[component].html`

Example for Badge:
```bash
cat ../pure-admin/packages/core/snippets/badges.html
```

Identify:
- HTML structure
- CSS class patterns
- Variants available
- Modifiers (sizes, styles, states)

### 3. Create the Component

Create `src/lib/[ComponentName].svelte` following the standard template.

**Key rules:**
- Use TypeScript interfaces for props
- Use `$props()` for prop declarations
- Use `$state()` for internal state
- Use `$derived()` for computed values
- Use `import('svelte').Snippet` for children/slots
- Match the HTML structure from snippets exactly
- Use BEM class names exactly as in snippets

### 4. Export the Component

Add to `src/lib/index.ts`:

```typescript
export { default as ComponentName } from './ComponentName.svelte';
```

### 5. Add to Demo Page

Update `src/routes/+page.svelte` to showcase the new component with examples.

### 6. Test

```bash
npm run dev
# Visit http://localhost:5173
```

Compare with `pure-admin-visual` on port 3000 to ensure visual consistency.

## CSS Import

The library depends on `@keenmate/pure-admin-core` for CSS. Users MUST import the CSS:

```svelte
<script>
  import '@keenmate/pure-admin-core/css';
</script>
```

Or in a global CSS file:
```css
@import '@keenmate/pure-admin-core/css';
```

The demo page (`src/routes/+page.svelte`) already imports this.

## TypeScript Types

### Common Type Patterns

**Button variants:**
```typescript
type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
```

**Sizes:**
```typescript
type Size = 'xs' | 'sm' | 'lg' | 'xl';
```

**Alert variants:**
```typescript
type AlertVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
```

**Horizontal alignment (logical, RTL-aware — v1.5.0 breaking change):**
```typescript
type HorizontalAlignment = 'start' | 'center' | 'end';
// Was 'left' | 'center' | 'right' before v1.5.0
```

**Toast positions (logical, RTL-aware — v1.4.0 breaking change):**
```typescript
type ToastPosition = 'top-end' | 'top-center' | 'top-start' | 'bottom-end' | 'bottom-center' | 'bottom-start';
// Physical positions (top-right, top-left, etc.) removed in v1.4.0
```

**Snippet type:**
```typescript
children?: import('svelte').Snippet;
```

## Building & Publishing

### Development

```bash
npm run dev          # Start dev server (port 5173)
npm run check        # Type check
npm run check:watch  # Type check with watch
```

### Build

```bash
npm run build        # Build + package
npm run package      # Package library only
```

### Publish

```bash
npm login
npm publish --access public
```

## Dependencies

**Peer Dependencies:**
- `svelte ^5.0.0` - Required by consumers

**Dependencies:**
- `@keenmate/pure-admin-core` - Core CSS framework (file reference: `file:../pure-admin/packages/core`)

**Dev Dependencies:**
- `@sveltejs/kit` - SvelteKit
- `@sveltejs/package` - Library packaging
- `@sveltejs/vite-plugin-svelte` - Vite plugin
- `svelte-check` - Type checking
- `typescript` - TypeScript support
- `vite` - Build tool

## Related Packages

- **@keenmate/pure-admin-core** - Core CSS framework at `../pure-admin/packages/core`
- **@keenmate/pure-admin-theme-*** - Theme packages at `../pure-admin/packages/theme-*` (audi, dark, express, corporate, minimal)
- **pure-admin demo** - Demo application at `../pure-admin/demo` (port 3000)

## Important Rules

1. **ALWAYS reference snippets** - Never guess HTML structure
2. **Use Svelte 5 syntax only** - No legacy Svelte patterns
3. **Match CSS classes exactly** - Use BEM naming from snippets
4. **Full TypeScript typing** - All components must have Props interfaces
5. **Children as snippets** - Use `{#snippet}` blocks, not `<slot>`
6. **Reactive with runes** - Use `$props()`, `$state()`, `$derived()`
7. **Class prop pattern** - Always accept `class?: string` for custom classes
8. **Test against original** - Compare with pure-admin-visual visually
9. **Use logical directions** - Always use `start`/`end` instead of `left`/`right` for RTL support (since v1.4.0/v1.5.0). Exception: Tooltip and Popconfirm keep physical `left`/`right` for arrow positioning

## Snippet Reference Quick Links

**Local paths (relative to this directory):**
- Snippets: `../pure-admin/packages/core/snippets/`
- Core SCSS: `../pure-admin/packages/core/src/scss/`
- Demo app: `../pure-admin/demo/` (port 3000)
- Changelog: `../pure-admin/packages/core/CHANGELOG.md`

**When implementing a component:**
1. Read snippet file
2. Identify structure
3. Create Svelte component
4. Match HTML/CSS exactly
5. Add TypeScript props
6. Use Svelte 5 features
7. Export from index.ts
8. Add to demo page
9. Test visual match

## Example: Creating a Badge Component

**Step 1:** Read snippet
```bash
cat ../pure-admin/packages/core/snippets/badges.html
```

**Step 2:** Identify patterns
```html
<!-- Basic badge -->
<span class="pa-badge pa-badge--primary">Primary</span>

<!-- Sizes -->
<span class="pa-badge pa-badge--sm">Small</span>
<span class="pa-badge pa-badge--lg">Large</span>

<!-- Pill -->
<span class="pa-badge pa-badge--primary pa-badge--pill">Pill</span>
```

**Step 3:** Create component (`src/lib/Badge.svelte`)
```svelte
<script lang="ts">
  interface Props {
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
    size?: 'sm' | 'lg';
    pill?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    variant = 'primary',
    size,
    pill = false,
    class: className = '',
    children
  }: Props = $props();

  const classes = $derived(() => {
    const base = ['pa-badge', `pa-badge--${variant}`];
    if (size) base.push(`pa-badge--${size}`);
    if (pill) base.push('pa-badge--pill');
    if (className) base.push(className);
    return base.join(' ');
  });
</script>

<span class={classes()}>
  {@render children?.()}
</span>
```

**Step 4:** Export
```typescript
// src/lib/index.ts
export { default as Badge } from './Badge.svelte';
```

**Step 5:** Demo
```svelte
<!-- src/routes/+page.svelte -->
<Badge variant="primary">Primary</Badge>
<Badge variant="success" pill>Success Pill</Badge>
```

Done! ✅

## Breaking Changes Applied

### v1.5.0: Left/right → start/end (RTL support)
- `HorizontalAlignment` type: `'left'` → `'start'`, `'right'` → `'end'`
- All directional CSS classes renamed to logical equivalents
- Components already using `start`/`end`: Button, Navbar, Footer, Pager, LoadMore, TabsScrollable
- Components updated: Heading, Paragraph (via HorizontalAlignment type change)
- Kept physical: Tooltip (`pa-tooltip--left/--right`), Popconfirm (`pa-popconfirm--left/--right`)

### v1.4.0: Toast positions
- Removed deprecated physical positions (`top-right`, `top-left`, `bottom-right`, `bottom-left`)
- Only logical positions remain: `top-end`, `top-start`, `bottom-end`, `bottom-start`, `top-center`, `bottom-center`

### v1.5.0: Card ghost mode
- Added `isGhost` prop to Card component (`pa-card--ghost`)

### v1.5.0+: Data Display v2 components
- Added `isLinear` and `isChips` modifiers to Fields
- Added `valueVariant` to Field (for chips color variants)
- New components: DescTable, DotLeaders, PropCard, Banded, AccentGrid (+ sub-components)

---

**Last Updated:** 2026-02-14
**Svelte Version:** 5.x
**SvelteKit Version:** 2.x
**Pure Admin Core Version:** 1.5.0+ (synced with unreleased)
