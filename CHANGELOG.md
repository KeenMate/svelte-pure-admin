# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
