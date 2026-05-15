# Svelte 5 Patterns

This library uses **Svelte 5 runes** exclusively. No legacy Svelte syntax.

## Correct vs legacy

```svelte
<script lang="ts">
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

  let count = $state(0);

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

Do NOT use `export let`, `$:` reactive declarations, or `<slot>`.

## Snippet (named slot) pattern

Svelte 5 replaces `<slot>` with `{#snippet}` blocks.

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
    <div class="pa-card__header">{@render header()}</div>
  {/if}
  <div class="pa-card__body">{@render children?.()}</div>
  {#if footer}
    <div class="pa-card__footer">{@render footer()}</div>
  {/if}
</div>
```

Usage:

```svelte
<Card>
  {#snippet header()}<h3>Title</h3>{/snippet}
  Body content
  {#snippet footer()}<Button>Action</Button>{/snippet}
</Card>
```

## Class name building

Use `$derived()` with a function:

```svelte
const classes = $derived(() => {
  const base = ['pa-btn'];
  if (outline) {
    base.push(`pa-btn--outline-${variant}`);
  } else {
    base.push(`pa-btn--${variant}`);
  }
  if (size) base.push(`pa-btn--${size}`);
  if (block) base.push('pa-btn--block');
  if (className) base.push(className);
  return base.join(' ');
});
```

Then: `<button class={classes()}>` (note the call).

## Standard component template

```svelte
<script lang="ts">
  interface Props {
    variant?: 'primary' | 'secondary';
    class?: string;
    onclick?: (event: MouseEvent) => void;
    children?: import('svelte').Snippet;
  }

  let {
    variant = 'primary',
    class: className = '',
    onclick,
    children
  }: Props = $props();

  const classes = $derived(() => {
    const base = ['pa-component', `pa-component--${variant}`];
    if (className) base.push(className);
    return base.join(' ');
  });
</script>

<div class={classes()} {onclick}>
  {@render children?.()}
</div>
```

Svelte 5 uses lowercase event handlers (`onclick`, `onchange`) matching native DOM events. Use shorthand `{onclick}` when prop name matches attribute name.

## BEM class names

All components MUST use Pure Admin's BEM convention: `pa-[block]__[element]--[modifier]`.

- `.pa-btn` — block
- `.pa-btn--primary` — modifier
- `.pa-btn--outline-primary` — modifier
- `.pa-card__header` — element
- `.pa-alert--dismissible` — modifier

Always check the snippet file for the exact class names — never guess.

## Logical directions (RTL-aware)

Always use `start`/`end` instead of `left`/`right`. Tooltip uses logical `--start/--end` (core v2.1.0). Popconfirm now emits logical classes directly (core v2.5.0).
