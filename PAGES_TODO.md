# Pages Migration TODO

## Status: 10/23 Complete (43%)

### ✅ Already Complete
1. `/` - Dashboard/Home
2. `/alerts` - Alerts page
3. `/badges` - Badges page
4. `/buttons` - Buttons page
5. `/cards` - Cards page
6. `/components` - Components overview
7. `/forms` - Forms page
8. `/modals` - Modals page
9. `/tabs` - Tabs page
10. `/tooltips` - Tooltips page
11. `/tables` - **JUST CREATED** ✅

### 🔨 Missing Pages (Need to Create)

12. **`/code`** - Code blocks with syntax highlighting
    - Inline code examples
    - Basic code blocks (JavaScript, JSON, HTML, CSS, Bash, SQL, Python)
    - Code blocks with headers and copy buttons
    - Terminal output examples
    - Compact variant
    - Language accent colors
    - Usage examples

13. **`/lists`** - List components **JUST CREATED** ✅
    - Basic unordered lists (default, compact, spacious)
    - Icon lists (success, danger, info, warning)
    - Ordered lists (numeric, roman, alpha)
    - Definition lists (standard, inline)
    - Bordered & striped lists
    - Inline & unstyled lists
    - Complex lists with avatars

14. **`/loaders`** - Loading spinners and animations
    - Basic spinner with sizes
    - Spinner color variants
    - Dots loader
    - Bars loader
    - Pulse loader
    - Ring loader
    - Wave loader
    - Loader center utility
    - Loader overlay

15. **`/timeline-simple`** - Simple timeline variant
    - Left-aligned with dots
    - Time on right, content on left
    - Color variants (primary, success, warning, danger, info, secondary)
    - Filled markers

16. **`/timeline-block`** - Block/Alternating timeline
    - Centered zigzag layout
    - Date on top, icon in center, content below
    - Alternating left/right

17. **`/timeline`** - Feed timeline variant
    - Activity feed style
    - With avatars
    - Date headers
    - Comment bubbles
    - Time prefixes

18. **`/command-palette`** - Command palette demo
    - Spotlight-style search
    - Context switching (/p, /o, /u, /i)
    - Keyboard shortcuts demo
    - Result examples
    - Pagination example

19. **`/comparison`** - Comparison page
    - Feature comparison table
    - Side-by-side comparisons

20. **`/tables-sizing`** - Table sizing variations
    - Different spacing options
    - Compact vs spacious

21. **`/virtual-scroll`** - Virtual scroll demo
    - Timeline virtual scroll
    - Table virtual scroll
    - Performance comparison

22. **`/virtual-scroll-code`** - Virtual scroll code examples
    - Implementation examples
    - Code snippets

23. **Other potential pages** from navigation:
    - Settings pages (appear to be hash-based, not separate routes)

---

## Implementation Notes

### Pattern to Follow

Each page should:
1. Import required components from `$lib`
2. Set `<svelte:head><title>` appropriately
3. Include page heading (`<h1>`) and description (`<p>`)
4. Use `<Card>` components to organize content sections
5. Match the exact HTML structure from pure-admin.keenmate.dev
6. Use Grid/Column for layout where needed

### Components Available

- Layout: Grid, Column, Card
- Forms: Input, Textarea, Select, Checkbox, Radio, FormGroup, FormLabel, InputGroup, etc.
- Buttons: Button, ButtonGroup
- Display: Badge, Table, Pager, LoadMore, Code, CodeBlock, CodeBlockWithHeader, List, ListItem, BasicList, OrderedList, DefinitionList, Timeline, TimelineItem
- Feedback: Alert, Modal, Toast, ToastContainer, Spinner, Tooltip, Popover
- Navigation: Tabs, TabItem, TabPanel, TabsContent, CommandPalette

### Missing Components (Use HTML directly)

**NOTE:** If a component doesn't exist yet, use the raw HTML from the website and add a comment:
```svelte
<!-- TODO: Replace with component when available -->
<div class="pa-...">
  ...raw HTML...
</div>
```

Examples of what might be missing:
- Settings panel (floating panel component)
- Profile panel (we have ProfilePanel component)
- Specific loader variants (dots, bars, pulse, ring, wave)

---

## Next Steps

1. Create `/code` page
2. Create `/lists` page
3. Create `/loaders` page
4. Create 3 timeline pages
5. Create `/command-palette` page
6. Create `/comparison` page
7. Create remaining table pages

Each page creation involves:
1. Fetch HTML from pure-admin.keenmate.dev/[page]
2. Convert HTML to Svelte components
3. Match structure exactly for easy comparison
4. Test in dev server
