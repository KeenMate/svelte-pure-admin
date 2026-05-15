# Naming Conventions (KeenMate Standard)

Self-documenting prop names: the suffix or prefix tells you the type and purpose.

## Suffixes

**`*Member`** — property mappings (which field in a data object to use). Examples: `idMember`, `displayValueMember`. Rarely used in Pure Admin (no data binding), but follow the pattern when needed.

**`*Callback`** — only when the return value controls component behavior:
- `beforeCloseCallback` — returns `false` to prevent close
- `get*Callback` — returns data for rendering (e.g. `getDisplayValueCallback`, `getVariantCallback`)
- `copyValueCallback` — returns a string for clipboard
- NOT for fire-and-forget notifications (use `on*` instead)

**`*Class`** — CSS class strings: `bodyClass`, `selectedNodeClass`, `expandIconClass`. Exception: standard `class` prop for additional custom classes.

**`*Timeout`** — durations in milliseconds: `scrollHighlightTimeout`, `indexerTimeout`.

## Event handlers

**`on*` (lowercase)** — fire-and-forget event notifications. Svelte 5 uses native DOM event syntax, so handlers are fully lowercase.

- DOM event forwarders: `onclick`, `onchange`, `oninput`, `onblur`, `onfocus`
- Custom component events: `onclose`, `onconfirm`, `ondismiss`, `onbadgeclick`, `onpagechange`

NOT `onClick` / `onChange` (camelCase) and NOT `closeCallback` / `confirmCallback` for fire-and-forget events.

## Boolean prefixes

**`should*`** — behavior flags (what component should do): `shouldToggleOnNodeClick`, `shouldShowBurger`, `shouldAutoClose`.

**`is*`** — state flags (what something is): `isDisabled`, `isReadonly`, `isExpanded`, `isSelected`, `isCompact`.

Keep native HTML attributes as-is: `disabled`, `readonly`, `required`, `placeholder`. Use `is*` only for custom component state props.

## Visual / structural props

Use `variant`, `size`, `type` for visual/structural props (standard component patterns).

## Pure Admin specific rules

- Keep `class` prop as-is (standard Svelte convention).
- Use `on*` (lowercase) for all fire-and-forget events.
- Use `*Callback` suffix only when the return value is used internally.
- Use `is*` prefix for component state booleans: `isDisabled`, `isReadonly`, `isCompact`.
- Keep native HTML attributes as-is.
- Use `variant`, `size`, `type` for visual/structural props.
