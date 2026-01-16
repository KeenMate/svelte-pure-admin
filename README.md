# @keenmate/svelte-pure-admin

Svelte 5 component library for Pure Admin CSS framework - 80+ ready-to-use components for building admin dashboards.

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

  <Card>
    {#snippet header()}
      <h3>Card Title</h3>
    {/snippet}

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
| `Sidebar` | Collapsible sidebar navigation |
| `SidebarItem` | Sidebar menu item with submenu support |
| `Main` | Main content area |
| `Footer` | Page footer |
| `Grid` | CSS grid container |
| `Column` | Grid column |

### Forms
| Component | Description |
|-----------|-------------|
| `FormGroup` | Form group wrapper with validation states |
| `FormLabel` | Form label with required indicator |
| `FormHelp` | Help text for form fields |
| `Input` | Text input with sizes and validation |
| `Textarea` | Multiline text input |
| `Select` | Dropdown select |
| `Checkbox` | Checkbox input |
| `CheckboxBox` | Box-style checkbox |
| `CheckboxGroup` | Group of checkboxes |
| `Radio` | Radio button |
| `RadioGroup` | Group of radio buttons |
| `InputGroup` | Input with addons/buttons |
| `InputGroupAddon` | Addon for input group |
| `SmallText` | Small helper text |

### Buttons
| Component | Description |
|-----------|-------------|
| `Button` | Button with variants, sizes, outline, block |
| `ButtonGroup` | Horizontal/vertical button group |

### Feedback
| Component | Description |
|-----------|-------------|
| `Alert` | Alert messages with dismissible option |
| `Modal` | Modal dialog with sizes and themes |
| `Toast` | Toast notifications with auto-dismiss |
| `ToastContainer` | Container for positioning toasts |
| `Spinner` | Loading spinner |
| `Loader` | Loading indicator |
| `Tooltip` | Hover tooltips |
| `Popover` | Click-triggered popovers |
| `PopoverContainer` | Global popover container |
| `Popconfirm` | Confirmation popover |

### Display
| Component | Description |
|-----------|-------------|
| `Badge` | Status badges with variants and sizes |
| `BadgeGroup` | Group of badges |
| `CompositeBadge` | Badge with icon, label, and action |
| `Card` | Card with header, body, footer |
| `Table` | Data table with striped, hover, compact |
| `TableResponsive` | Responsive table wrapper |
| `List` | Unordered list |
| `OrderedList` | Ordered list |
| `ListItem` | List item |
| `BasicList` | Simple list |
| `CheckboxList` | List with checkboxes |
| `CheckboxListItem` | Checkbox list item |
| `DefinitionList` | Definition list (dt/dd) |
| `Timeline` | Timeline container |
| `TimelineItem` | Timeline entry |
| `Code` | Inline code |
| `CodeBlock` | Code block with syntax highlighting |
| `CodeBlockWithHeader` | Code block with title |
| `Label` | Text label |
| `Stat` | Statistics display |
| `Pager` | Pagination controls |
| `LoadMore` | Load more button |

### Navigation
| Component | Description |
|-----------|-------------|
| `Tabs` | Tab container |
| `TabsContainer` | Alternative tab container |
| `TabsContent` | Tab content wrapper |
| `TabItem` | Individual tab |
| `TabPanel` | Tab content panel |
| `TabsVerticalLayout` | Vertical tabs layout |
| `CommandPalette` | Command palette (Ctrl+K) |
| `NavbarSearch` | Search input for navbar |

### Profile & Settings
| Component | Description |
|-----------|-------------|
| `ProfilePanel` | User profile dropdown panel |
| `NotificationsPanel` | Notifications dropdown |
| `SettingsPanel` | Settings sidebar panel |

### Typography
| Component | Description |
|-----------|-------------|
| `Heading` | h1-h6 headings |
| `Paragraph` | Paragraph text |

### Services
| Export | Description |
|--------|-------------|
| `dialogService` | Programmatic dialog/modal service |
| `dialogStore` | Dialog state store |
| `shortcutRegistry` | Keyboard shortcut registry |
| `formatShortcut` | Format shortcut for display |
| `ShortcutHelpDialog` | Keyboard shortcuts help dialog |

## Svelte 5 Features

This library uses **Svelte 5** runes and snippets:

```svelte
<script>
  // Runes for reactivity
  let count = $state(0);
  const doubled = $derived(count * 2);
</script>

<!-- Snippets for named slots -->
<Card>
  {#snippet header()}
    <h3>Title</h3>
  {/snippet}

  Content here
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
  import '@keenmate/pure-admin-theme-audi'; // Audi theme
</script>
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

- [GitHub Repository](https://github.com/keenmate/svelte-pure-admin)
- [@keenmate/pure-admin-core](https://www.npmjs.com/package/@keenmate/pure-admin-core) - Core CSS framework
- [Svelte 5 Documentation](https://svelte.dev/docs/svelte/overview)
