// Pure Admin Svelte Components
// Svelte 5 component library

// Shared Types
export type {
	ColorVariant,
	Size,
	ExtendedSize,
	HorizontalAlignment,
	VerticalAlignment,
	TextMode,
	ValidationState,
	DataVizVariant,
	ThemeColor
} from './types';

// Configuration
export { default as PureAdminProvider } from './config/PureAdminProvider.svelte';
export type { PureAdminConfig } from './config/config';
export { defaultConfig, mergeConfig } from './config/config';
export { usePureAdminConfig } from './config/hooks';

// Internationalization (i18n)
// Re-exports go through ./i18n to ensure auto-initialization runs first
export {
	// i18n service (primary API)
	i18n,
	// Legacy functions (backwards compatibility)
	initI18n,
	registerLibraryTranslations,
	loadLocale,
	isLocaleLoaded,
	// Built-in locales
	en,
	cs,
	// svelte-i18n re-exports
	_,
	locale,
	locales,
	isLoading,
	addMessages,
	register,
	init,
	getLocaleFromNavigator,
	getLocaleFromQueryString,
	getLocaleFromHash,
	getLocaleFromPathname
} from './i18n';
export type { I18nInitOptions, Language, PureAdminTranslations } from './i18n';

// Layout Components
export { default as Layout } from './layout/Layout.svelte';
export { default as LayoutInner } from './layout/LayoutInner.svelte';
export { default as LayoutContent } from './layout/LayoutContent.svelte';
export { default as Navbar } from './layout/Navbar.svelte';
export { default as Sidebar } from './layout/Sidebar.svelte';
export { default as SidebarItem } from './layout/SidebarItem.svelte';
export { default as Main } from './layout/Main.svelte';
export { default as Footer } from './layout/Footer.svelte';
export { default as Grid } from './layout/Grid.svelte';
export { default as Column } from './layout/Column.svelte';
export { default as Section } from './layout/Section.svelte';
export { default as SettingsPanel } from './layout/SettingsPanel.svelte';
export { default as Divider } from './layout/Divider.svelte';
export { default as SlidePanel } from './layout/SlidePanel.svelte';
export type { ThemeOption } from './layout/types';

// Form Components
export { default as Form } from './forms/Form.svelte';
export { default as FormGroup } from './forms/FormGroup.svelte';
export { default as FormLabel } from './forms/FormLabel.svelte';
export { default as FormField } from './forms/FormField.svelte';
export { default as Input } from './forms/Input.svelte';
export { default as NumberInput } from './forms/NumberInput.svelte';
export { default as DateInput } from './forms/DateInput.svelte';
export { default as FileInput } from './forms/FileInput.svelte';
export { default as RangeInput } from './forms/RangeInput.svelte';
export { default as ColorInput } from './forms/ColorInput.svelte';
export { default as Textarea } from './forms/Textarea.svelte';
export { default as Select } from './forms/Select.svelte';
export { default as Checkbox } from './forms/Checkbox.svelte';
export { default as CheckboxBox } from './forms/CheckboxBox.svelte';
export { default as CheckboxGroup } from './forms/CheckboxGroup.svelte';
export { default as Radio } from './forms/Radio.svelte';
export { default as RadioGroup } from './forms/RadioGroup.svelte';
export { default as InputGroup } from './forms/InputGroup.svelte';
export { default as InputGroupPrepend } from './forms/InputGroupPrepend.svelte';
export { default as InputGroupAppend } from './forms/InputGroupAppend.svelte';
export { default as FormHelp } from './forms/FormHelp.svelte';
export { default as FormErrorSummary } from './forms/FormErrorSummary.svelte';
export type { FormErrorItem } from './forms/FormErrorSummary.svelte';
export { default as SmallText } from './forms/SmallText.svelte';

// Button Components
export { default as Button } from './buttons/Button.svelte';
export { default as ButtonGroup } from './buttons/ButtonGroup.svelte';

// Feedback Components (Alerts, Callouts, Modals, Toasts, Spinners, Loaders, Tooltips, Popovers, Popconfirm)
export { default as Alert } from './feedback/Alert.svelte';
export { default as Callout } from './feedback/Callout.svelte';
export { default as Modal } from './feedback/Modal.svelte';
export { default as Toast } from './feedback/Toast.svelte';
export { default as ToastContainer } from './feedback/ToastContainer.svelte';
export { default as Spinner } from './feedback/Spinner.svelte';
export { default as Loader } from './feedback/Loader.svelte';
export type { LoaderType, LoaderSize, LoaderColor } from './feedback/Loader.svelte';
export { default as LoaderCenter } from './feedback/LoaderCenter.svelte';
export { default as LoaderOverlay } from './feedback/LoaderOverlay.svelte';
export { default as Tooltip } from './feedback/Tooltip.svelte';
export { default as Popover } from './feedback/Popover.svelte';
export { default as PopoverContainer } from './feedback/PopoverContainer.svelte';
export { default as Popconfirm } from './feedback/Popconfirm.svelte';
export { default as NotificationsPanel } from './feedback/NotificationsPanel.svelte';

// Display Components (Cards, Badges, Tables, Stats, Lists, Code, Timeline)
export { default as Card } from './display/Card.svelte';
export { default as FilterCard } from './display/FilterCard.svelte';
export { default as CardTab } from './display/CardTab.svelte';
export { default as CardTabContent } from './display/CardTabContent.svelte';
export { default as Badge } from './display/Badge.svelte';
export { default as Label } from './display/Label.svelte';
export { default as CompositeBadge } from './display/CompositeBadge.svelte';
export { default as BadgeGroup } from './display/BadgeGroup.svelte';
export { default as CompositeBadgeGroup } from './display/CompositeBadgeGroup.svelte';
export type {
	BadgeVariant,
	BadgeSize,
	BaseBadgeProps,
	BadgeItem,
	CompositeBadgeItem
} from './display/badge-types';
export { default as Table } from './display/Table.svelte';
export { default as TableCard } from './display/TableCard.svelte';
export { default as TableContainer } from './display/TableContainer.svelte';
export { default as TableResponsive } from './display/TableResponsive.svelte';
export { default as Pager } from './display/Pager.svelte';
export { default as LoadMore } from './display/LoadMore.svelte';
export { default as Stat } from './display/Stat.svelte';
export { default as MetricList } from './display/MetricList.svelte';
export { default as MetricListItem } from './display/MetricListItem.svelte';
export { default as StatusList } from './display/StatusList.svelte';
export { default as StatusListItem } from './display/StatusListItem.svelte';
export { default as ActivityFeed } from './display/ActivityFeed.svelte';
export { default as ActivityFeedItem } from './display/ActivityFeedItem.svelte';
export { default as QuickActions } from './display/QuickActions.svelte';
export { default as List } from './display/List.svelte';
export { default as ListItem } from './display/ListItem.svelte';
export { default as BasicList } from './display/BasicList.svelte';
export { default as OrderedList } from './display/OrderedList.svelte';
export { default as DefinitionList } from './display/DefinitionList.svelte';
export { default as Code } from './display/Code.svelte';
export { default as CodeBlock } from './display/CodeBlock.svelte';
export { default as CodeBlockWithHeader } from './display/CodeBlockWithHeader.svelte';
export { default as Timeline } from './display/Timeline.svelte';
export { default as TimelineItem } from './display/TimelineItem.svelte';
export type {
	TimelineVariant,
	TimelineItemVariant,
	TimelineItemData
} from './display/timeline-types';
export { default as CheckboxList } from './display/CheckboxList.svelte';
export { default as CheckboxListItem } from './display/CheckboxListItem.svelte';
export { default as DetailView } from './display/DetailView.svelte';
export { default as DetailPanel } from './display/DetailPanel.svelte';
export { default as Field } from './display/Field.svelte';
export { default as Fields } from './display/Fields.svelte';
export { default as FieldGroup } from './display/FieldGroup.svelte';
export { default as DescTable } from './display/DescTable.svelte';
export { default as DescTableItem } from './display/DescTableItem.svelte';
export { default as DotLeaders } from './display/DotLeaders.svelte';
export { default as DotLeadersItem } from './display/DotLeadersItem.svelte';
export { default as PropCard } from './display/PropCard.svelte';
export { default as PropCardRow } from './display/PropCardRow.svelte';
export { default as Banded } from './display/Banded.svelte';
export { default as BandedRow } from './display/BandedRow.svelte';
export { default as AccentGrid } from './display/AccentGrid.svelte';
export { default as AccentGridItem } from './display/AccentGridItem.svelte';

// Data Visualization Components
export { default as Progress } from './display/Progress.svelte';
export { default as ProgressRing } from './display/ProgressRing.svelte';
export { default as Gauge } from './display/Gauge.svelte';
export { default as DataBar } from './display/DataBar.svelte';
export { default as StackedBar } from './display/StackedBar.svelte';
export { default as StackedBarSegment } from './display/StackedBarSegment.svelte';
export { default as StackedBarLegend } from './display/StackedBarLegend.svelte';
export { default as StackedBarLegendItem } from './display/StackedBarLegendItem.svelte';
export { default as Sparkline } from './display/Sparkline.svelte';
export { default as SparklineBar } from './display/SparklineBar.svelte';
export { default as Heatmap } from './display/Heatmap.svelte';
export { default as HeatmapCell } from './display/HeatmapCell.svelte';
export { default as HeatmapLegend } from './display/HeatmapLegend.svelte';
export { default as BarList } from './display/BarList.svelte';
export { default as BarListItem } from './display/BarListItem.svelte';
export { default as ProgressGroup } from './display/ProgressGroup.svelte';

// Profile Components
export { default as ProfilePanel } from './profile/ProfilePanel.svelte';
export { default as ProfilePanelNavItem } from './profile/ProfilePanelNavItem.svelte';
export { default as ProfilePanelFavorites } from './profile/ProfilePanelFavorites.svelte';
export { default as ProfilePanelFavoriteItem } from './profile/ProfilePanelFavoriteItem.svelte';

// Navigation Components
export { default as Tabs } from './navigation/Tabs.svelte';
export { default as TabItem } from './navigation/TabItem.svelte';
export { default as TabsContent } from './navigation/TabsContent.svelte';
export { default as TabPanel } from './navigation/TabPanel.svelte';
export { default as TabsContainer } from './navigation/TabsContainer.svelte';
export { default as TabsVerticalLayout } from './navigation/TabsVerticalLayout.svelte';
export { default as TabsScrollable } from './navigation/TabsScrollable.svelte';
export { default as TabsOverflow } from './navigation/TabsOverflow.svelte';
export { default as CommandPalette } from './navigation/CommandPalette.svelte';
export { default as NavbarSearch } from './navigation/NavbarSearch.svelte';
export type {
	Command,
	CommandStep,
	StepOption,
	StepSelection,
	SearchContext,
	SearchResult,
	PaletteMode
} from './navigation/command-palette-types';
export { default as NavItem } from './navigation/NavItem.svelte';
export { default as NavDropdown } from './navigation/NavDropdown.svelte';

// Typography Components
export { default as Heading } from './typography/Heading.svelte';
export { default as Paragraph } from './typography/Paragraph.svelte';
export { default as Strong } from './typography/Strong.svelte';
export { default as Em } from './typography/Em.svelte';
export { default as Text } from './typography/Text.svelte';
export { default as Link } from './typography/Link.svelte';

export { default as DialogContainer } from './feedback/DialogContainer.svelte';
export { dialogService, dialogStore } from './feedback/dialog-service.svelte';
export type {
	DialogVariant,
	DialogSize,
	DialogPosition,
	ConfirmDialogOptions,
	AlertDialogOptions,
	PromptDialogOptions,
	CustomDialogOptions,
	DialogButton
} from './feedback/dialog-service.svelte';

// Shortcut Registry (Global keyboard shortcuts)
export { shortcutRegistry, formatShortcut } from './services/shortcut-registry.svelte';
export { default as ShortcutHelpDialog } from './feedback/ShortcutHelpDialog.svelte';
export type {
	Shortcut,
	ShortcutModifiers,
	ShortcutScope,
	ShortcutRegistration,
	ShortcutRegistry
} from './services/shortcut-registry-types';

// Batch RPC Service
export {
	createBatch,
	createSignalRTransport,
	createPhoenixTransport,
	createHttpTransport,
	commonResponseConfig,
	pureDataConfig
} from './rpc';
export type {
	Batch,
	BatchCall,
	BatchRequest,
	BatchResult,
	BatchResponse,
	RpcError,
	RpcTransport,
	RpcTransportConfig,
	SignalRConnection,
	SignalRTransportOptions,
	PhoenixChannel,
	PhoenixPush,
	PhoenixTransportOptions,
	HttpTransportOptions
} from './rpc';

