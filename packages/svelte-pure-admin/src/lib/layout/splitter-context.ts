/** Splitter orientation, shared from <Splitter> down to <SplitterGutter>. */
export type SplitterOrientation = 'horizontal' | 'vertical';

/** Reactive context carrying the parent splitter's orientation to its gutters. */
export interface SplitterContext {
	readonly orientation: SplitterOrientation;
}

/** Context key. */
export const SPLITTER_CONTEXT = Symbol('pa-splitter');

/** `pa-splitter:resize` detail — fires per pane on every size application. */
export interface SplitterResizeDetail {
	index: number;
	pane: HTMLElement;
	size: number;
}

/** `pa-splitter:collapse` / `pa-splitter:expand` detail. */
export interface SplitterToggleDetail {
	index: number;
	pane: HTMLElement;
}
