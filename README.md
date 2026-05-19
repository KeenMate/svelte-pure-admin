# @keenmate/svelte-pure-admin

Svelte 5 component library for Pure Admin CSS framework — 100+ ready-to-use components for building admin dashboards and data-heavy applications.

**Ships with AI reference files** — 14 plain-text docs in `ai/` optimized for LLM-assisted development (Claude, ChatGPT, Copilot). Point your AI assistant at `node_modules/@keenmate/svelte-pure-admin/ai/INDEX.txt` for instant component knowledge.

## What's New in 1.7.0

Sync with `@keenmate/pure-admin-core` **v2.5.0 → v2.7.2**.

- **7-component KPI showcase suite** — seven dashboard layouts ready to drop in: `KpiStrip` (numeric strip), `KpiSparklineList`, `KpiGaugeList` (comparison gauges), `KpiHeroList` + `KpiHeroMain` + `KpiHeroSide`, `KpiBento`, `KpiEditorial`, `KpiTerminal` (with optional tabs+panes). Every layout ships with a shared cursor-anchored hover popover (Floating UI), an auto-row "detail" builder (Current → Previous → Δ absolute → Δ percent → Target), and composable layout modifiers (`noPreviousValue` / `noDeltaPercent` / `noTargetBar` for the strip; `isChartFirst` / `noDelta` for sparkline; `gridLayout` / `cellMinWidth` for gauges; `heroSplit` for hero). See the `/kpi-*` demo routes
- **Toast service** — programmatic `toastService.show({...})` with action buttons, custom progress colors, max-width, and sugar methods (`success`, `danger`, `warning`, `info`, `primary`). Pair with a single `<ToastContainer />` to drive toasts from anywhere in your app. See `/toasts` demo
- **Alert** — new `isHeadingLarge` opts into the pre-v2.5.0 large heading style; `isMultiline` correctly stacks an icon at the top of multi-line content. Default heading size is now smaller per core v2.5.0 — set `isHeadingLarge` if you want the punchier look
- **`Stat`** — symbol-prefix mode for currencies (`isSymbolPrefix` renders `$847K` / `¥12.4M` instead of suffix). 5-step `changeDirection` scale (`very-positive` / `positive` / `neutral` / `negative` / `very-negative`) per core v2.6.0/2.7.0
- **`Gauge`** — `gaugeSize` prop overrides `--pa-gauge-size` (default `12rem`); height auto-derives 2:1
- **`KpiGrid`** — wraps `<Stat variant="square">` tiles to align flush with surrounding content (negative-margin negation)
- **`NotificationsPanel` (BREAKING)** — rewritten as data-driven (`items: NotificationItem[]`, per-item `itemActions` snippet, optional bulk-select checkboxes, `isPageView`). The previous hardcoded sample-data version is gone
- **`Spinner` (BREAKING type)** — size narrowed to `'xs'` only. Larger modifiers were never defined in core SCSS and silently rendered at the default size. Use `<Loader type="ring" size="lg">` for visibly larger spinners
- **Docs site theme management** — migrated to the new `@keenmate/pureadmin` CLI (declarations in `pureadmin.json`, resolutions in `pureadmin.lock.json`, per-developer overrides in `.pureadmin.json`). Adding a theme is now a single `pureadmin themes add <id>` away; the settings panel and FOUC-prevention pick it up automatically — no source-code changes needed

See [CHANGELOG.md](./CHANGELOG.md#unreleased) for the full list and BREAKING-change migration notes.

## What's New in 1.6.2

- **Timeline layout modifiers** — `alignment="start" | "end"` forces all items to one side; `shouldKeepLayout` preserves the alternating zig-zag on mobile instead of collapsing to a single column
- **Docs: Timeline Block page rewritten** — working Load More (reactive `$state`), working Virtual Scroll with `IntersectionObserver`, plus Start/End/Keep-Layout and combination examples — mirrors pure-admin's `/timeline/block` 1:1
- **Docs: Dashboard cleanup** — dropped orphan components (`ActivityFeed`, `MetricList`, `StatusList`, `QuickActions`) whose CSS classes weren't in pure-admin-core; the dashboard now uses `Timeline` for Recent Activity, compact `Table` for Traffic Sources / Top Products, `List` + `Badge` for System Status, and `ButtonGroup vertical` for Quick Actions

## Installation

```bash
npm install @keenmate/svelte-pure-admin @keenmate/pure-admin-core
```

## Quick Start

```svelte
<script>
  import { PureAdminProvider, Button, Alert, Card } from '@keenmate/svelte-pure-admin';
  import '@keenmate/pure-admin-core/css';
</script>

<PureAdminProvider>
  <Button variant="primary">Click me!</Button>

  <Alert variant="success">
    <strong>Success!</strong> Operation completed.
  </Alert>

  <Card titleText="Card Title">
    Card content goes here.

    {#snippet footer()}
      <Button variant="primary">Action</Button>
    {/snippet}
  </Card>
</PureAdminProvider>
```

## Components

### Configuration
| Component | Description |
|-----------|-------------|
| `PureAdminProvider` | Context provider for app-wide configuration |
| `usePureAdminConfig` | Hook to access configuration |
| `defaultConfig` | Default configuration object |
| `mergeConfig` | Utility to merge configurations |

### Layout
| Component | Description |
|-----------|-------------|
| `Layout` | Main layout container |
| `LayoutInner` | Inner layout wrapper |
| `LayoutContent` | Content area wrapper |
| `Navbar` | Top navigation bar with burger menu, brand, and nav items |
| `NavItem` | Navigation item (link or dropdown trigger) |
| `NavDropdown` | Dropdown menu for navbar |
| `Sidebar` | Collapsible sidebar navigation with localStorage persistence |
| `SidebarItem` | Sidebar menu item with icon, label, and submenu support |
| `Main` | Main content area |
| `Footer` | Page footer with start/end sections |
| `Grid` | Row-based grid container with gap and alignment options |
| `Column` | Grid column with responsive breakpoints (xs through xxl) |
| `Section` | Content section with optional title |
| `Divider` | Horizontal divider |
| `SlidePanel` | Fixed overlay panel that slides in from the right |
| `SettingsPanel` | Settings sidebar for theme, layout, and font controls |

### Forms
| Component | Description |
|-----------|-------------|
| `Form` | Form wrapper (auto-adds `pa-form` class) |
| `FormGroup` | Form group wrapper with validation states |
| `FormField` | Combined label + input + help wrapper |
| `FormLabel` | Form label with required indicator |
| `FormHelp` | Help text with optional `themeColor` (1-9) |
| `FormErrorSummary` | Validation error summary block |
| `Input` | Text input with sizes, validation states, and `themeColor` |
| `NumberInput` | Numeric input with min/max/step |
| `DateInput` | Date picker input |
| `FileInput` | File upload input |
| `RangeInput` | Range slider input |
| `ColorInput` | Color picker input |
| `Textarea` | Multiline text input |
| `Select` | Dropdown select |
| `Checkbox` | Checkbox input with label |
| `CheckboxBox` | Standalone box-style checkbox (no label wrapper) |
| `CheckboxGroup` | Group of checkboxes |
| `Radio` | Radio button with label |
| `RadioGroup` | Group of radio buttons |
| `InputGroup` | Input with prepend/append addons |
| `InputGroupPrepend` | Prepend section for input group |
| `InputGroupAppend` | Append section for input group |
| `SmallText` | Small helper text |

### Buttons
| Component | Description |
|-----------|-------------|
| `Button` | Button with variants, sizes, outline, block, icon, loading, ripple |
| `ButtonGroup` | Horizontal/vertical button group |

### Feedback
| Component | Description |
|-----------|-------------|
| `Alert` | Alert messages with dismissible, outline, compact, `themeColor` |
| `Callout` | Informational callout boxes with heading |
| `Modal` | Modal dialog with sizes, themes, and beforeClose callback |
| `Toast` | Toast notifications with auto-dismiss and progress bar |
| `ToastContainer` | Container for positioning toasts (logical positions: top-end, etc.) |
| `Spinner` | Loading spinner with sizes and colors |
| `Loader` | Loading indicator (dots, bars, pulse, ring, wave) |
| `LoaderCenter` | Utility wrapper that centers loader content |
| `LoaderOverlay` | Semi-transparent overlay with centered loader |
| `Tooltip` | CSS hover tooltips |
| `Popover` | Click-triggered popovers with title and content |
| `PopoverContainer` | Global popover container |
| `Popconfirm` | Confirmation popover with confirm/cancel actions |
| `NotificationsPanel` | Notifications dropdown panel |
| `DialogContainer` | Container for programmatic dialogs |
| `ShortcutHelpDialog` | Keyboard shortcuts help dialog |

### Display — Data Presentation
| Component | Description |
|-----------|-------------|
| `Field` | Single label-value pair with copy-to-clipboard (btn/click/hover) |
| `Fields` | Container with layout modifiers (cols, horizontal, bordered, linear, chips) |
| `FieldGroup` | Titled section for grouping fields |
| `DescTable` | Ant Design-style descriptions table with tinted label cells |
| `DescTableItem` | Single label-value pair in DescTable |
| `DotLeaders` | Dotted leader lines container (invoice/menu style) |
| `DotLeadersItem` | Row with label, dots, and value |
| `PropCard` | Bordered property card with row dividers (Stripe-style) |
| `PropCardRow` | Single row in PropCard |
| `Banded` | Banded rows with fixed-width tinted label column |
| `BandedRow` | Single banded row with label + value |
| `AccentGrid` | Responsive grid with color-coded left borders |
| `AccentGridItem` | Grid cell with variant-colored border |

### Display — Cards, Badges, Tables, Lists
| Component | Description |
|-----------|-------------|
| `Card` | Card with header, body, footer, ghost mode, live state, tabs, subtitle snippet |
| `FilterCard` | Expandable filter card with inline + advanced sections |
| `CardTab` | Tab within a card header |
| `CardTabContent` | Content panel for card tab |
| `TableCard` | Card container optimized for tables |
| `Badge` | Status badges with variants, sizes, pill, `themeColor` |
| `Label` | Inline label with variants |
| `CompositeBadge` | Badge with icon, label, and action button |
| `BadgeGroup` | Group of simple badges |
| `CompositeBadgeGroup` | Group of composite badges |
| `Table` | Data table with striped, hover, compact, borderless, responsive |
| `TableContainer` | Table container with optional panel styling |
| `TableResponsive` | Responsive table wrapper (horizontal scroll) |
| `Pager` | Pagination controls |
| `LoadMore` | Load more button with count display |
| `Stat` | Statistics display with label, value, change indicator |
| `MetricList` | Vertical list of key metrics |
| `MetricListItem` | Single metric with label and value |
| `StatusList` | Status indicator list |
| `StatusListItem` | Status item with label and value |
| `ActivityFeed` | Activity feed container |
| `ActivityFeedItem` | Single activity entry with avatar and time |
| `QuickActions` | Quick action buttons grid |
| `List` | Unordered list |
| `OrderedList` | Ordered list |
| `ListItem` | List item with title, subtitle, meta |
| `BasicList` | Simple list with spacing, bordered, striped options |
| `CheckboxList` | List with checkboxes |
| `CheckboxListItem` | Checkbox list item with label and description |
| `DefinitionList` | Definition list (dt/dd) |
| `DetailView` | Detail panel wrapper with overlay/inline split-view modes |
| `DetailPanel` | Detail panel content shell (header, tabs, body, footer) |
| `Timeline` | Timeline container — simple/alternating/feed variants, `alignment` (start/end), `shouldKeepLayout` |
| `TimelineItem` | Timeline entry with avatar, time, content |
| `Code` | Inline code |
| `CodeBlock` | Code block with optional compact mode |
| `CodeBlockWithHeader` | Code block with title bar and copy button |

### Display — Data Visualization
| Component | Description |
|-----------|-------------|
| `Progress` | Progress bar with sizes, colors, striped, animated |
| `ProgressGroup` | Label row + progress bar wrapper |
| `ProgressRing` | Circular progress ring via conic-gradient |
| `Gauge` | Semicircle gauge with optional multi-zone coloring |
| `DataBar` | Inline bar for table cells with negative support |
| `StackedBar` | Multi-segment stacked bar |
| `StackedBarSegment` | Individual segment in a stacked bar |
| `StackedBarLegend` | Legend container for stacked bar |
| `StackedBarLegendItem` | Legend item with color swatch |
| `Sparkline` | Mini bar chart container |
| `SparklineBar` | Individual sparkline bar |
| `Heatmap` | Grid heatmap with variant and compact modes |
| `HeatmapCell` | Heatmap cell with level (0-4) |
| `HeatmapLegend` | Self-contained heatmap legend |
| `BarList` | Labeled horizontal bar chart |
| `BarListItem` | Bar list item with label, value, and fill |

### Navigation
| Component | Description |
|-----------|-------------|
| `Tabs` | Tab container with alignment options |
| `TabItem` | Individual tab |
| `TabsContent` | Tab content wrapper |
| `TabPanel` | Tab content panel |
| `TabsContainer` | Alternative tab container with bordered/card modes |
| `TabsVerticalLayout` | Vertical tabs layout |
| `TabsScrollable` | Scrollable tabs with overflow arrows |
| `TabsOverflow` | Tabs with dropdown overflow |
| `CommandPalette` | Command palette (Ctrl+K) with multi-step commands |
| `NavbarSearch` | Search input for navbar |

### Profile
| Component | Description |
|-----------|-------------|
| `ProfilePanel` | User profile dropdown with avatar, nav, favorites |
| `ProfilePanelNavItem` | Profile panel navigation item |
| `ProfilePanelFavorites` | Favorites section in profile panel |
| `ProfilePanelFavoriteItem` | Single favorite item |

### Typography
| Component | Description |
|-----------|-------------|
| `Heading` | h1-h6 headings with alignment |
| `Paragraph` | Paragraph text with alignment |
| `Strong` | Bold text |
| `Em` | Italic text |
| `Text` | Inline text with variants |
| `Link` | Styled link |

### Services
| Export | Description |
|--------|-------------|
| `dialogService` | Programmatic confirm/alert/prompt/custom dialogs |
| `dialogStore` | Dialog state store |
| `shortcutRegistry` | Global keyboard shortcut registry |
| `formatShortcut` | Format shortcut for display |

### Internationalization (i18n)
| Export | Description |
|--------|-------------|
| `i18n` | Primary i18n service (init, register locales) |
| `_` | Translation store (`$_('pureAdmin.dialog.confirm')`) |
| `locale` | Current locale store |
| `locales` | Available locales store |
| `en`, `cs` | Built-in English and Czech translations |

Built on [svelte-i18n](https://github.com/kaisermann/svelte-i18n). All internal component strings (close buttons, aria labels, etc.) are translatable.

See [**TRANSLATIONS.md**](./TRANSLATIONS.md) for the full guide: setup, local locale files, runtime switching, overriding library strings, and the complete list of built-in translation keys.

### Batch RPC
| Export | Description |
|--------|-------------|
| `createBatch` | Create a batch of RPC calls |
| `createSignalRTransport` | SignalR transport for batch RPC |
| `createPhoenixTransport` | Phoenix channel transport |
| `createHttpTransport` | HTTP POST transport |

## Svelte 5 Features

This library uses **Svelte 5** runes and snippets exclusively:

```svelte
<script>
  // Runes for reactivity
  let count = $state(0);
  const doubled = $derived(count * 2);
</script>

<!-- Snippets replace slots -->
<Card titleText="My Card">
  {#snippet header()}
    <h3>Custom Header</h3>
  {/snippet}

  Content here

  {#snippet footer()}
    <Button variant="primary">Save</Button>
  {/snippet}
</Card>
```

## CSS Import

Import Pure Admin CSS in your root layout:

```svelte
<script>
  import '@keenmate/pure-admin-core/css';
</script>
```

Or use a theme package:

```svelte
<script>
  import '@keenmate/pure-admin-theme-audi';     // Audi theme
  import '@keenmate/pure-admin-theme-dark';      // Dark theme
  import '@keenmate/pure-admin-theme-corporate'; // Corporate theme
  import '@keenmate/pure-admin-theme-express';   // Express theme
  import '@keenmate/pure-admin-theme-minimal';   // Minimal theme
</script>
```

## Page Loader (Prevent FOUC)

SvelteKit apps can show a flash of unstyled/unhydrated content before Svelte components mount (~1s on typical loads). Add a page loader to `src/app.html` that waits for both fonts and Svelte hydration:

**1. Add loader HTML + script to `app.html` `<body>`** (before `%sveltekit.body%`):

```html
<div class="page-loader" id="pageLoader">
  <div class="page-loader__spinner"></div>
</div>
<script>
  (function() {
    var loader = document.getElementById('pageLoader');
    var fontsReady = false, appReady = false;
    function hide() {
      if (!fontsReady || !appReady) return;
      requestAnimationFrame(function() {
        loader.classList.add('loaded');
        setTimeout(function() { loader.remove(); }, 80);
      });
    }
    if (document.fonts && document.fonts.ready) {
      Promise.race([
        document.fonts.ready,
        new Promise(function(r) { setTimeout(r, 1000); })
      ]).then(function() { fontsReady = true; hide(); });
    } else {
      window.addEventListener('load', function() { fontsReady = true; hide(); });
    }
    window.__pageLoaderReady = function() { appReady = true; hide(); };
    setTimeout(function() { fontsReady = appReady = true; hide(); }, 3000);
  })();
</script>
```

**2. Add critical CSS to `<head>`** (inline):

```html
<style>
  .page-loader {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: var(--page-loader-bg, rgba(26, 26, 26, 0.95));
    backdrop-filter: blur(10px);
    display: flex; align-items: center; justify-content: center;
    z-index: 99999;
    transition: opacity 0.15s ease, visibility 0.15s ease;
  }
  .page-loader.loaded { opacity: 0; visibility: hidden; }
  .page-loader__spinner {
    width: 50px; height: 50px;
    border: 4px solid var(--page-loader-spinner-border, #333);
    border-top-color: var(--page-loader-spinner-accent, #0066cc);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
</style>
```

**3. Signal from your root layout** (`+layout.svelte`):

```svelte
<script>
  import { onMount } from 'svelte';
  onMount(() => {
    if (typeof window.__pageLoaderReady === 'function') {
      window.__pageLoaderReady();
    }
  });
</script>
```

Themeable via CSS variables: `--page-loader-bg`, `--page-loader-spinner-border`, `--page-loader-spinner-accent`. 3s safety timeout ensures it never blocks indefinitely.

## Documentation Site

The `docs/` folder contains a full documentation site showcasing all components with interactive examples.

```bash
npm install       # Install workspace dependencies
make dev          # Install themes via pureadmin CLI + start docs site (http://localhost:5173)
```

`make dev` runs `npx @keenmate/pureadmin themes install` against the project's `pureadmin.json` / `pureadmin.lock.json` to populate `docs/static/themes/`, then starts the SvelteKit dev server. To add or remove a theme, edit `pureadmin.json` (or use `npx @keenmate/pureadmin themes add <id>` / `themes remove <id>`) and re-run `make dev` — the settings panel picks it up automatically because the theme list is derived from `docs/static/themes/*/theme.json` at prerender, not hardcoded.

For local theme iteration (working against a sibling `pure-admin-themes/<id>` repo without publishing):

```bash
npx @keenmate/pureadmin themes add audi --path ../pure-admin-themes/audi
# → writes to .pureadmin.json (gitignored). pureadmin.lock.json stays clean.
```

CI / Docker builds use the strict-reproduce verb instead:

```bash
npx @keenmate/pureadmin themes ci
# → fails fast if pureadmin.json and pureadmin.lock.json are out of sync.
#   Ignores .pureadmin.json overrides. Writes nothing.
```

The docs site includes:
- Interactive component examples matching [pure-admin demo](https://pure-admin.keenmate.dev)
- Form validation patterns (inline errors, summary blocks, timing strategies)
- Dashboard layouts with stats, charts, and activity feeds
- Data visualization components (progress, gauges, heatmaps, sparklines)
- Theme color variants and customization options
- i18n integration examples

## AI Reference

The `ai/` folder contains plain-text reference files optimized for AI assistants. Use these files to quickly understand component APIs, common patterns, and project setup:

```
ai/INDEX.txt              # File overview and keyword index
ai/getting-started.txt    # Installation, CSS import, first component
ai/layout.txt             # Layout, Grid, Column, Sidebar
ai/forms.txt              # Form components, validation, input types
ai/display.txt            # Cards, tables, badges, lists, timeline
ai/data-display.txt       # Field/Fields, DescTable, PropCard, etc.
ai/data-visualization.txt # Progress, Gauge, Heatmap, Sparkline, etc.
ai/feedback.txt           # Alerts, modals, toasts, loaders, dialogs
ai/navigation.txt         # Tabs, CommandPalette, NavbarSearch
ai/theming.txt            # CSS import, theme packages, color slots
ai/i18n.txt               # Internationalization setup and usage
ai/typescript-types.txt   # Exported types and prop interfaces
ai/naming-conventions.txt # KeenMate naming methodology (is*, on*, *Text)
ai/common-patterns.txt    # Snippets, $derived classes, event handlers
```

## Development

```bash
npm install       # Install dependencies
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Build library
npm run package   # Package for npm
npm run check     # Type check
```

## Browser Support

- Modern browsers with ES2020+ support
- No IE11 support (Svelte 5 requirement)

## License

MIT

## Links

- [GitHub Repository](https://github.com/KeenMate/svelte-pure-admin)
- [@keenmate/pure-admin-core](https://www.npmjs.com/package/@keenmate/pure-admin-core) - Core CSS framework
- [Svelte 5 Documentation](https://svelte.dev/docs/svelte/overview)
