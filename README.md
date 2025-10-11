# @pure-admin/svelte

Svelte 5 component library for Pure Admin framework.

## Installation

```bash
npm install @pure-admin/svelte @pure-admin/core
```

## Quick Start

```svelte
<script>
  import { Button, Alert, Card } from '@pure-admin/svelte';
  import '@pure-admin/core/css'; // Import Pure Admin CSS
</script>

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
```

## Components

### Button

Full-featured button component with variants, sizes, and states.

```svelte
<Button variant="primary">Primary</Button>
<Button variant="secondary" size="lg">Large Secondary</Button>
<Button variant="danger" outline>Outline Danger</Button>
<Button variant="success" block>Full Width</Button>
<Button variant="info" disabled>Disabled</Button>
```

**Props:**
- `variant` - Button color variant: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark`
- `size` - Button size: `xs`, `sm`, `lg`, `xl` (default is medium)
- `outline` - Outline style (boolean)
- `block` - Full width (boolean)
- `iconOnly` - Icon-only button (boolean)
- `disabled` - Disabled state (boolean)
- `type` - Button type: `button`, `submit`, `reset`
- `onclick` - Click handler function
- `class` - Additional CSS classes

### Alert

Alert component with dismissible functionality.

```svelte
<Alert variant="success">Success message</Alert>
<Alert variant="danger" dismissible>Dismissible error</Alert>
<Alert variant="warning" outline>Outline warning</Alert>
```

**Props:**
- `variant` - Alert color variant: `primary`, `secondary`, `success`, `danger`, `warning`, `info`
- `dismissible` - Add close button (boolean)
- `outline` - Outline style (boolean)
- `compact` - Compact padding (boolean)
- `class` - Additional CSS classes

### Card

Flexible card component with header, body, and footer snippets.

```svelte
<Card>
  {#snippet header()}
    <h3>Card Title</h3>
  {/snippet}

  Card body content

  {#snippet footer()}
    <Button>Action</Button>
  {/snippet}
</Card>
```

**Props:**
- `header` - Header snippet (optional)
- `children` - Body content (main snippet)
- `footer` - Footer snippet (optional)
- `class` - Additional CSS classes

## Svelte 5 Features

This library uses **Svelte 5** features:

- **Runes**: `$props()`, `$state()`, `$derived()`
- **Snippets**: Named slots replacement with `{#snippet}` blocks
- **Modern TypeScript**: Full type safety with interfaces

## CSS Import

Always import the Pure Admin CSS in your root layout or app:

```svelte
<script>
  import '@pure-admin/core/css';
</script>
```

Or import in your global CSS:

```css
@import '@pure-admin/core/css';
```

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build library
npm run build

# Package library
npm run package
```

## Demo

Run the demo application:

```bash
npm run dev
```

Visit `http://localhost:5173` to see the component showcase.

## Browser Support

- Modern browsers with ES2020+ support
- No IE11 support (Svelte 5 requirement)

## License

MIT

## Links

- [@pure-admin/core](https://github.com/pure-admin/core) - Core CSS framework
- [Pure Admin](https://github.com/pure-admin) - Framework homepage
- [Svelte 5 Documentation](https://svelte.dev/docs/svelte/overview)
