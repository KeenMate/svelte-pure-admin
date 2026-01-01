# Settings Panel Implementation Guide

## Overview

The Settings Panel controls various aspects of the Pure Admin layout through CSS classes and attributes applied to the document body and root elements. In a Svelte app, these settings should be configurable as props on layout components.

## Settings Breakdown

### 1. Theme (`data-theme` attribute on `<body>`)

**What it does:**
- Changes the entire color scheme of the application
- Applied as: `<body data-theme="audi">`
- CSS variables are defined per theme in `@keenmate/pure-admin-core/themes/`

**Available themes:**
- `audi` (default)
- `audi-light`
- `corporate`
- `express`
- `dark`
- `dark-blue`
- `dark-green`
- `dark-red`
- `minimal`

**Svelte Implementation:**
```svelte
<PureAdminProvider config={{ theme: 'audi' }}>
  <!-- or -->
<Layout theme="audi">
```

**Effect:** Changes colors, backgrounds, borders, shadows across entire app

---

### 2. Container Width (`pa-container-*` class on `<body>`)

**What it does:**
- Constrains the max-width of the layout container
- Applied as: `<body class="pa-container-lg">`

**Available widths:**
- `fluid` (no class) - Full width, no constraint
- `sm` - `pa-container-sm` - 768px max-width
- `md` - `pa-container-md` - 1024px max-width
- `lg` - `pa-container-lg` - 1280px max-width
- `xl` - `pa-container-xl` - 1600px max-width
- `2xl` - `pa-container-2xl` - 1920px max-width

**Svelte Implementation:**
```svelte
<Layout containerWidth="lg">
```

**Effect:** Centers content and limits max width of `.pa-layout-container`

---

### 3. Sidebar Mode (`pa-layout--sticky` class on `<body>`)

**What it does:**
- Controls whether sidebar scrolls with content or stays fixed

**Options:**
- `` (empty) - Sidebar scrolls with page content (default)
- `sticky` - Sidebar stays fixed while content scrolls

**Applied as:** `<body class="pa-layout--sticky">`

**Svelte Implementation:**
```svelte
<Layout sidebarMode="sticky">
<!-- or -->
<Sidebar sticky={true}>
```

**Effect:** Changes sidebar position from static to fixed

---

### 4. Sidebar Behavior (`pa-layout__sidebar--icon-collapse` class on sidebar)

**What it does:**
- Controls how sidebar collapses

**Options:**
- `hide` (default) - Sidebar completely disappears when collapsed
- `icon-collapse` - Sidebar shows only icons when collapsed

**Applied as:** `<div class="pa-layout__sidebar pa-layout__sidebar--icon-collapse">`

**Svelte Implementation:**
```svelte
<Sidebar behavior="icon-collapse">
<!-- or -->
<Sidebar iconCollapseMode={true}>
```

**Effect:**
- `hide`: Sidebar width becomes 0, content expands
- `icon-collapse`: Sidebar maintains ~60px width showing only icons

---

### 5. Sidebar Collapsed State (`sidebar-hidden` class on `<body>`)

**What it does:**
- Toggles sidebar visibility (works with both behaviors)

**Applied as:** `<body class="sidebar-hidden">`

**Svelte Implementation:**
```svelte
<Sidebar collapsed={sidebarCollapsed}>
<!-- with -->
let sidebarCollapsed = $state(false);
```

**Effect:**
- With `hide` behavior: Completely hides sidebar
- With `icon-collapse` behavior: Shows only icon bar

---

### 6. Compact Mode (`compact-mode` class on `<body>`)

**What it does:**
- Reduces spacing/padding throughout the app

**Applied as:** `<body class="compact-mode">`

**Svelte Implementation:**
```svelte
<Layout compactMode={true}>
```

**Effect:** Reduces padding/margins on:
- Cards (smaller padding)
- Table cells (tighter spacing)
- Form groups (less vertical space)
- Buttons (smaller padding)

---

### 7. Font Size (classes on `<html>`)

**What it does:**
- Changes base font size for entire application

**Applied as:** `<html class="font-size-large">`

**Options:**
- `default` (no class) - 16px base
- `small` - `font-size-small` - 14px base
- `large` - `font-size-large` - 18px base
- `xlarge` - `font-size-xlarge` - 20px base

**Svelte Implementation:**
```svelte
<PureAdminProvider config={{ fontSize: 'large' }}>
```

**Effect:** Scales all text proportionally using rem units

---

### 8. Font Family (classes on `<body>`)

**What it does:**
- Changes the font family for the entire application

**Applied as:** `<body class="font-family-serif">`

**Options:**
- `default` (no class) - Theme's default font
- `serif` - `font-family-serif`
- `mono` - `font-family-mono`
- `delivery` - `font-family-delivery`
- `cuprum` - `font-family-cuprum`
- `fira-sans-condensed` - `font-family-fira-sans-condensed`
- `manrope` - `font-family-manrope`
- `martel` - `font-family-martel`
- `maven-pro` - `font-family-maven-pro`
- `monda` - `font-family-monda`
- `play` - `font-family-play`
- `signika` - `font-family-signika`
- `yanone-kaffeesatz` - `font-family-yanone-kaffeesatz`

**Svelte Implementation:**
```svelte
<PureAdminProvider config={{ fontFamily: 'serif' }}>
```

**Effect:** Changes font stack globally

---

## Recommended Svelte API Design

### Option 1: Layout Component Props (Simple)

```svelte
<Layout
  theme="audi"
  containerWidth="lg"
  sidebarMode="sticky"
  compactMode={false}
>
  <Sidebar
    behavior="icon-collapse"
    collapsed={sidebarCollapsed}
  >
    <!-- sidebar items -->
  </Sidebar>

  <Main>
    <!-- content -->
  </Main>
</Layout>
```

### Option 2: Configuration Context (Recommended)

```svelte
<PureAdminProvider config={{
  theme: 'audi',
  containerWidth: 'lg',
  sidebarMode: 'sticky',
  compactMode: false,
  fontSize: 'default',
  fontFamily: 'default'
}}>
  <Layout>
    <Sidebar behavior="icon-collapse" collapsed={sidebarCollapsed} />
    <Main><!-- content --></Main>
  </Layout>
</PureAdminProvider>
```

### Option 3: Hybrid Approach (Most Flexible)

```svelte
<!-- Global settings via config -->
<PureAdminProvider config={{
  theme: 'audi',
  fontSize: 'large',
  fontFamily: 'serif'
}}>
  <!-- Layout-specific settings via props -->
  <Layout containerWidth="lg" compactMode={false}>
    <!-- Component-specific settings -->
    <Sidebar
      mode="sticky"
      behavior="icon-collapse"
      collapsed={sidebarCollapsed}
      onToggle={() => sidebarCollapsed = !sidebarCollapsed}
    />
    <Main><!-- content --></Main>
  </Layout>
</PureAdminProvider>
```

---

## Implementation Priority

### Phase 1: Core Layout Settings (High Priority)
1. ✅ Theme (already via config/props)
2. ⬜ Container Width - Add to Layout component
3. ⬜ Sidebar Collapsed State - Add to Sidebar component
4. ⬜ Sidebar Behavior (hide/icon-collapse) - Add to Sidebar component

### Phase 2: Enhancement Settings (Medium Priority)
5. ⬜ Sidebar Mode (sticky) - Add to Layout or Sidebar component
6. ⬜ Compact Mode - Add to Layout component
7. ✅ Font Size (already in SettingsPanel via document classes)
8. ✅ Font Family (already in SettingsPanel via document classes)

### Phase 3: Settings Persistence (Optional)
- Add localStorage integration for user preferences
- Provide `useSettings()` hook for accessing/updating settings
- Add `onSettingsChange` callback prop

---

## CSS Classes Summary

**Body Classes:**
- `data-theme="[theme]"` - Theme selection (attribute, not class)
- `pa-container-sm|md|lg|xl|2xl` - Container width constraints
- `pa-layout--sticky` - Fixed sidebar mode
- `sidebar-hidden` - Sidebar collapsed/hidden state
- `compact-mode` - Reduced spacing
- `font-family-[family]` - Font family override

**HTML Classes:**
- `font-size-small|large|xlarge` - Font size scaling

**Sidebar Classes:**
- `pa-layout__sidebar--icon-collapse` - Icon-only collapse mode

---

## Next Steps

1. Update `Layout.svelte` to accept `containerWidth`, `sidebarMode`, `compactMode` props
2. Update `Sidebar.svelte` to accept `behavior`, `collapsed`, `mode` props
3. Add prop-to-class mapping logic in components
4. Update `+layout.svelte` to demonstrate all settings
5. Optionally integrate with SettingsPanel for live updates
6. Document prop interfaces in TypeScript
