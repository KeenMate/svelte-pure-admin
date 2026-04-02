<script lang="ts">
	import { Heading, Paragraph, Card, Grid, Column, Button, ButtonGroup, Toast, ToastContainer, CodeBlock } from '@keenmate/svelte-pure-admin';

	// Toast state management
	type ToastVariant = 'primary' | 'success' | 'danger' | 'warning' | 'info';
	type ToastPosition = 'top-end' | 'top-center' | 'top-start' | 'bottom-end' | 'bottom-center' | 'bottom-start';

	interface ToastData {
		id: number;
		title: string;
		message: string;
		variant: ToastVariant;
		show: boolean;
		duration?: number;
		shouldShowProgress?: boolean;
		isFilled?: boolean;
		themeColor?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
		progressColor?: string;
	}

	// Separate toast arrays for each position
	let topEndToasts = $state<ToastData[]>([]);
	let topCenterToasts = $state<ToastData[]>([]);
	let topStartToasts = $state<ToastData[]>([]);
	let bottomEndToasts = $state<ToastData[]>([]);
	let bottomCenterToasts = $state<ToastData[]>([]);
	let bottomStartToasts = $state<ToastData[]>([]);

	let toastId = $state(0);

	const toastMessages: Record<ToastVariant, { title: string; message: string }> = {
		primary: { title: 'Primary', message: 'This is a primary toast notification.' },
		success: { title: 'Success!', message: 'Your action was completed successfully.' },
		danger: { title: 'Error', message: 'An error occurred. Please try again.' },
		warning: { title: 'Warning', message: 'Please review this warning message.' },
		info: { title: 'Information', message: 'Here is some useful information for you.' }
	};

	function addToast(position: ToastPosition, variant: ToastVariant, options: { duration?: number; shouldShowProgress?: boolean; title?: string; message?: string; isFilled?: boolean; themeColor?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9; progressColor?: string } = {}) {
		const id = toastId++;
		const msg = toastMessages[variant];
		const newToast: ToastData = {
			id,
			title: options.title || msg.title,
			message: options.message || msg.message,
			variant,
			show: true,
			duration: options.duration ?? 5000,
			shouldShowProgress: options.shouldShowProgress ?? false,
			isFilled: options.isFilled ?? false,
			themeColor: options.themeColor,
			progressColor: options.progressColor
		};

		switch (position) {
			case 'top-end':
				topEndToasts = [...topEndToasts, newToast];
				break;
			case 'top-center':
				topCenterToasts = [...topCenterToasts, newToast];
				break;
			case 'top-start':
				topStartToasts = [...topStartToasts, newToast];
				break;
			case 'bottom-end':
				bottomEndToasts = [...bottomEndToasts, newToast];
				break;
			case 'bottom-center':
				bottomCenterToasts = [...bottomCenterToasts, newToast];
				break;
			case 'bottom-start':
				bottomStartToasts = [...bottomStartToasts, newToast];
				break;
		}
	}

	function removeToast(position: ToastPosition, id: number) {
		switch (position) {
			case 'top-end':
				topEndToasts = topEndToasts.filter(t => t.id !== id);
				break;
			case 'top-center':
				topCenterToasts = topCenterToasts.filter(t => t.id !== id);
				break;
			case 'top-start':
				topStartToasts = topStartToasts.filter(t => t.id !== id);
				break;
			case 'bottom-end':
				bottomEndToasts = bottomEndToasts.filter(t => t.id !== id);
				break;
			case 'bottom-center':
				bottomCenterToasts = bottomCenterToasts.filter(t => t.id !== id);
				break;
			case 'bottom-start':
				bottomStartToasts = bottomStartToasts.filter(t => t.id !== id);
				break;
		}
	}

	// Action toast state (need dedicated state since snippets can't be stored in arrays)
	let showUndoToast = $state(false);
	let showRetryToast = $state(false);
	let showUpdateToast = $state(false);
	let showFilledActionToast = $state(false);

	function showMultipleToasts() {
		addToast('top-end', 'success', { title: 'First Toast', message: 'This is the first notification' });
		setTimeout(() => {
			addToast('top-end', 'warning', { title: 'Second Toast', message: 'This is the second notification' });
		}, 300);
		setTimeout(() => {
			addToast('top-end', 'info', { title: 'Third Toast', message: 'This is the third notification' });
		}, 600);
	}
</script>

<Paragraph>Temporary notification messages that auto-dismiss with smooth animations.</Paragraph>

<!-- Toast Container Positions -->
<ToastContainer position="top-end">
	{#each topEndToasts as toast (toast.id)}
		<Toast
			variant={toast.variant}
			themeColor={toast.themeColor}
			isFilled={toast.isFilled}
			titleText={toast.title}
			messageText={toast.message}
			bind:show={toast.show}
			duration={toast.duration}
			shouldShowProgress={toast.shouldShowProgress}
			progressColor={toast.progressColor}
			onclose={() => removeToast('top-end', toast.id)}
		/>
	{/each}

	{#if showUndoToast}
		<Toast variant="danger" titleText="Item Deleted" messageText="3 items moved to trash." duration={0} bind:show={showUndoToast}>
			{#snippet actions()}
				<Button size="xs" variant="danger" onclick={() => { alert('Undo!'); showUndoToast = false; }}>Undo</Button>
				<Button size="xs" variant="secondary" onclick={() => { showUndoToast = false; }}>Dismiss</Button>
			{/snippet}
		</Toast>
	{/if}
	{#if showRetryToast}
		<Toast variant="warning" titleText="Upload Failed" messageText="Failed to upload report.pdf. Check your connection." duration={0} bind:show={showRetryToast}>
			{#snippet actions()}
				<Button size="xs" variant="warning" onclick={() => { alert('Retrying...'); showRetryToast = false; }}>Retry</Button>
				<Button size="xs" variant="secondary" onclick={() => { showRetryToast = false; }}>Cancel</Button>
			{/snippet}
		</Toast>
	{/if}
	{#if showUpdateToast}
		<Toast variant="info" titleText="Update Available" messageText="Version 2.4.0 is ready to install." duration={0} bind:show={showUpdateToast}>
			{#snippet actions()}
				<Button size="xs" variant="info" onclick={() => { alert('Installing...'); showUpdateToast = false; }}>Install Now</Button>
				<Button size="xs" variant="secondary" onclick={() => { showUpdateToast = false; }}>Later</Button>
			{/snippet}
		</Toast>
	{/if}
	{#if showFilledActionToast}
		<Toast variant="success" isFilled titleText="Feedback Sent" messageText="Thank you for your feedback!" duration={0} bind:show={showFilledActionToast}>
			{#snippet actions()}
				<Button size="xs" variant="success" onclick={() => { showFilledActionToast = false; }}>Great</Button>
				<Button size="xs" variant="secondary" onclick={() => { showFilledActionToast = false; }}>Close</Button>
			{/snippet}
		</Toast>
	{/if}
</ToastContainer>

<ToastContainer position="top-center">
	{#each topCenterToasts as toast (toast.id)}
		<Toast
			variant={toast.variant}
			titleText={toast.title}
			messageText={toast.message}
			bind:show={toast.show}
			duration={toast.duration}
			shouldShowProgress={toast.shouldShowProgress}
			onclose={() => removeToast('top-center', toast.id)}
		/>
	{/each}
</ToastContainer>

<ToastContainer position="top-start">
	{#each topStartToasts as toast (toast.id)}
		<Toast
			variant={toast.variant}
			titleText={toast.title}
			messageText={toast.message}
			bind:show={toast.show}
			duration={toast.duration}
			shouldShowProgress={toast.shouldShowProgress}
			onclose={() => removeToast('top-start', toast.id)}
		/>
	{/each}
</ToastContainer>

<ToastContainer position="bottom-end">
	{#each bottomEndToasts as toast (toast.id)}
		<Toast
			variant={toast.variant}
			titleText={toast.title}
			messageText={toast.message}
			bind:show={toast.show}
			duration={toast.duration}
			shouldShowProgress={toast.shouldShowProgress}
			onclose={() => removeToast('bottom-end', toast.id)}
		/>
	{/each}
</ToastContainer>

<ToastContainer position="bottom-center">
	{#each bottomCenterToasts as toast (toast.id)}
		<Toast
			variant={toast.variant}
			titleText={toast.title}
			messageText={toast.message}
			bind:show={toast.show}
			duration={toast.duration}
			shouldShowProgress={toast.shouldShowProgress}
			onclose={() => removeToast('bottom-center', toast.id)}
		/>
	{/each}
</ToastContainer>

<ToastContainer position="bottom-start">
	{#each bottomStartToasts as toast (toast.id)}
		<Toast
			variant={toast.variant}
			titleText={toast.title}
			messageText={toast.message}
			bind:show={toast.show}
			duration={toast.duration}
			shouldShowProgress={toast.shouldShowProgress}
			onclose={() => removeToast('bottom-start', toast.id)}
		/>
	{/each}
</ToastContainer>

<!-- 1. Toast Positions -->
<Card titleText="Toast Positions">
	<Grid>
		<Column size="100" md="1-3">
			<Button variant="primary" isBlock onclick={() => addToast('top-start', 'warning')}>
				Top Start
			</Button>
		</Column>
		<Column size="100" md="1-3">
			<Button variant="primary" isBlock onclick={() => addToast('top-center', 'info')}>
				Top Center
			</Button>
		</Column>
		<Column size="100" md="1-3">
			<Button variant="primary" isBlock onclick={() => addToast('top-end', 'success')}>
				Top End
			</Button>
		</Column>
	</Grid>
	<Grid class="mt-4">
		<Column size="100" md="1-3">
			<Button variant="secondary" isBlock onclick={() => addToast('bottom-start', 'success')}>
				Bottom Start
			</Button>
		</Column>
		<Column size="100" md="1-3">
			<Button variant="secondary" isBlock onclick={() => addToast('bottom-center', 'primary')}>
				Bottom Center
			</Button>
		</Column>
		<Column size="100" md="1-3">
			<Button variant="secondary" isBlock onclick={() => addToast('bottom-end', 'danger')}>
				Bottom End
			</Button>
		</Column>
	</Grid>
</Card>

<!-- 2. Toast Variants -->
<Card titleText="Toast Variants">
	<ButtonGroup>
		<Button variant="primary" onclick={() => addToast('top-end', 'primary')}>
			Primary
		</Button>
		<Button variant="success" onclick={() => addToast('top-end', 'success')}>
			Success
		</Button>
		<Button variant="danger" onclick={() => addToast('top-end', 'danger')}>
			Danger
		</Button>
		<Button variant="warning" onclick={() => addToast('top-end', 'warning')}>
			Warning
		</Button>
		<Button variant="info" onclick={() => addToast('top-end', 'info')}>
			Info
		</Button>
	</ButtonGroup>
</Card>

<!-- 3. Toast with Progress Bar -->
<Card titleText="Toast with Progress Bar">
	<Heading level={4}>Standard</Heading>
	<ButtonGroup>
		<Button variant="primary" onclick={() => addToast('top-end', 'primary', { shouldShowProgress: true })}>
			Primary
		</Button>
		<Button variant="success" onclick={() => addToast('top-end', 'success', { shouldShowProgress: true })}>
			Success
		</Button>
		<Button variant="danger" onclick={() => addToast('top-end', 'danger', { shouldShowProgress: true })}>
			Danger
		</Button>
		<Button variant="warning" onclick={() => addToast('top-end', 'warning', { shouldShowProgress: true })}>
			Warning
		</Button>
		<Button variant="info" onclick={() => addToast('top-end', 'info', { shouldShowProgress: true })}>
			Info
		</Button>
	</ButtonGroup>

	<Heading level={4} class="mt-4">Filled</Heading>
	<ButtonGroup>
		<Button variant="primary" onclick={() => addToast('top-end', 'primary', { shouldShowProgress: true, isFilled: true })}>
			Primary
		</Button>
		<Button variant="success" onclick={() => addToast('top-end', 'success', { shouldShowProgress: true, isFilled: true })}>
			Success
		</Button>
		<Button variant="danger" onclick={() => addToast('top-end', 'danger', { shouldShowProgress: true, isFilled: true })}>
			Danger
		</Button>
		<Button variant="warning" onclick={() => addToast('top-end', 'warning', { shouldShowProgress: true, isFilled: true })}>
			Warning
		</Button>
		<Button variant="info" onclick={() => addToast('top-end', 'info', { shouldShowProgress: true, isFilled: true })}>
			Info
		</Button>
	</ButtonGroup>

	<Heading level={4} class="mt-4">Custom progress color</Heading>
	<ButtonGroup>
		<Button variant="primary" onclick={() => addToast('top-end', 'primary', { shouldShowProgress: true, progressColor: '#e74c3c' })}>
			Red progress
		</Button>
		<Button variant="success" onclick={() => addToast('top-end', 'success', { shouldShowProgress: true, progressColor: '#8b5cf6' })}>
			Purple progress
		</Button>
		<Button variant="info" onclick={() => addToast('top-end', 'info', { shouldShowProgress: true, progressColor: '#14b8a6' })}>
			Teal progress
		</Button>
	</ButtonGroup>

	<Paragraph class="pa-text--secondary mt-4">
		Progress bar shows time remaining before auto-dismiss (5 seconds)
	</Paragraph>
</Card>

<!-- 4. Persistent Toasts -->
<Card titleText="Persistent Toasts (Manual Dismiss Only)">
	<Grid>
		<Column size="100" md="1-3">
			<Button variant="warning" isBlock onclick={() => addToast('top-end', 'warning', { duration: 0, title: 'Important Warning', message: 'This is an important warning that requires your attention. Click the close button to dismiss.' })}>
				Important Warning
			</Button>
		</Column>
		<Column size="100" md="1-3">
			<Button variant="danger" isBlock onclick={() => addToast('top-end', 'danger', { duration: 0, title: 'Critical Error', message: 'Critical error detected! This message will remain until you acknowledge it.' })}>
				Critical Error
			</Button>
		</Column>
		<Column size="100" md="1-3">
			<Button variant="info" isBlock onclick={() => addToast('top-end', 'info', { duration: 0, title: 'Important Info', message: 'Important information that you should read carefully before dismissing.' })}>
				Important Info
			</Button>
		</Column>
	</Grid>
	<Paragraph class="pa-text--secondary mt-4">
		These toasts stay visible until manually dismissed by clicking the close button
	</Paragraph>
</Card>

<!-- 5. Action Toasts -->
<Card titleText="Action Toasts" subtitleText="Toasts with action buttons separated by a horizontal rule. Clicking an action dismisses the toast.">
	<ButtonGroup>
		<Button variant="danger" onclick={() => showUndoToast = true}>
			Undo Delete
		</Button>
		<Button variant="warning" onclick={() => showRetryToast = true}>
			Retry Failed
		</Button>
		<Button variant="info" onclick={() => showUpdateToast = true}>
			Update Available
		</Button>
		<Button variant="success" onclick={() => showFilledActionToast = true}>
			Filled + Actions
		</Button>
	</ButtonGroup>
</Card>

<!-- 6. Multiple Toasts -->
<Card titleText="Multiple Toasts (Stacking)">
	<Button variant="primary" onclick={showMultipleToasts}>
		Show 3 Toasts
	</Button>
	<Paragraph class="pa-text--secondary mt-4">
		Toasts automatically stack vertically in the container
	</Paragraph>
</Card>

<!-- 7. Filled Toast Variants -->
<Card titleText="Filled Toast Variants">
	<ButtonGroup>
		<Button variant="primary" onclick={() => addToast('top-end', 'primary', { isFilled: true, title: 'Filled Primary', message: 'Full-color primary toast.' })}>
			Filled Primary
		</Button>
		<Button variant="success" onclick={() => addToast('top-end', 'success', { isFilled: true, title: 'Filled Success', message: 'Full-color success toast.' })}>
			Filled Success
		</Button>
		<Button variant="danger" onclick={() => addToast('top-end', 'danger', { isFilled: true, title: 'Filled Danger', message: 'Full-color danger toast.' })}>
			Filled Danger
		</Button>
		<Button variant="warning" onclick={() => addToast('top-end', 'warning', { isFilled: true, title: 'Filled Warning', message: 'Full-color warning toast.' })}>
			Filled Warning
		</Button>
		<Button variant="info" onclick={() => addToast('top-end', 'info', { isFilled: true, title: 'Filled Info', message: 'Full-color info toast.' })}>
			Filled Info
		</Button>
	</ButtonGroup>
</Card>

<!-- 8. Theme Color Toasts -->
<Card titleText="Theme Color Toasts" subtitleText="Toasts using custom theme color slots (1-9). Colors are defined by the active theme.">
	<ButtonGroup>
		<Button themeColor={1} onclick={() => addToast('top-end', 'primary', { themeColor: 1, title: 'Color 1', message: 'Theme color slot 1 toast.' })}>Color 1</Button>
		<Button themeColor={2} onclick={() => addToast('top-end', 'primary', { themeColor: 2, title: 'Color 2', message: 'Theme color slot 2 toast.' })}>Color 2</Button>
		<Button themeColor={3} onclick={() => addToast('top-end', 'primary', { themeColor: 3, title: 'Color 3', message: 'Theme color slot 3 toast.' })}>Color 3</Button>
		<Button themeColor={4} onclick={() => addToast('top-end', 'primary', { themeColor: 4, title: 'Color 4', message: 'Theme color slot 4 toast.' })}>Color 4</Button>
		<Button themeColor={5} onclick={() => addToast('top-end', 'primary', { themeColor: 5, title: 'Color 5', message: 'Theme color slot 5 toast.' })}>Color 5</Button>
		<Button themeColor={6} onclick={() => addToast('top-end', 'primary', { themeColor: 6, title: 'Color 6', message: 'Theme color slot 6 toast.' })}>Color 6</Button>
		<Button themeColor={7} onclick={() => addToast('top-end', 'primary', { themeColor: 7, title: 'Color 7', message: 'Theme color slot 7 toast.' })}>Color 7</Button>
		<Button themeColor={8} onclick={() => addToast('top-end', 'primary', { themeColor: 8, title: 'Color 8', message: 'Theme color slot 8 toast.' })}>Color 8</Button>
		<Button themeColor={9} onclick={() => addToast('top-end', 'primary', { themeColor: 9, title: 'Color 9', message: 'Theme color slot 9 toast.' })}>Color 9</Button>
	</ButtonGroup>

	<Heading level={4} class="mt-4">Filled</Heading>
	<ButtonGroup>
		<Button themeColor={1} onclick={() => addToast('top-end', 'primary', { themeColor: 1, isFilled: true, title: 'Filled Color 1', message: 'Filled theme color slot 1 toast.' })}>Color 1</Button>
		<Button themeColor={2} onclick={() => addToast('top-end', 'primary', { themeColor: 2, isFilled: true, title: 'Filled Color 2', message: 'Filled theme color slot 2 toast.' })}>Color 2</Button>
		<Button themeColor={3} onclick={() => addToast('top-end', 'primary', { themeColor: 3, isFilled: true, title: 'Filled Color 3', message: 'Filled theme color slot 3 toast.' })}>Color 3</Button>
		<Button themeColor={4} onclick={() => addToast('top-end', 'primary', { themeColor: 4, isFilled: true, title: 'Filled Color 4', message: 'Filled theme color slot 4 toast.' })}>Color 4</Button>
		<Button themeColor={5} onclick={() => addToast('top-end', 'primary', { themeColor: 5, isFilled: true, title: 'Filled Color 5', message: 'Filled theme color slot 5 toast.' })}>Color 5</Button>
		<Button themeColor={6} onclick={() => addToast('top-end', 'primary', { themeColor: 6, isFilled: true, title: 'Filled Color 6', message: 'Filled theme color slot 6 toast.' })}>Color 6</Button>
		<Button themeColor={7} onclick={() => addToast('top-end', 'primary', { themeColor: 7, isFilled: true, title: 'Filled Color 7', message: 'Filled theme color slot 7 toast.' })}>Color 7</Button>
		<Button themeColor={8} onclick={() => addToast('top-end', 'primary', { themeColor: 8, isFilled: true, title: 'Filled Color 8', message: 'Filled theme color slot 8 toast.' })}>Color 8</Button>
		<Button themeColor={9} onclick={() => addToast('top-end', 'primary', { themeColor: 9, isFilled: true, title: 'Filled Color 9', message: 'Filled theme color slot 9 toast.' })}>Color 9</Button>
	</ButtonGroup>
</Card>

<!-- 9. CSS Classes Reference -->
<Card titleText="CSS Classes Reference">
	<Heading level={4}>Toast Container</Heading>
	<CodeBlock>{`pa-toast-container              — Fixed-position wrapper
pa-toast-container--top-end     — Top end (default)
pa-toast-container--top-center  — Top center
pa-toast-container--top-start   — Top start
pa-toast-container--bottom-end  — Bottom end
pa-toast-container--bottom-center — Bottom center
pa-toast-container--bottom-start  — Bottom start`}</CodeBlock>

	<Heading level={4} class="mt-4">Toast Item</Heading>
	<CodeBlock>{`pa-toast                — Base toast element
pa-toast--show          — Visible state
pa-toast--hide          — Dismissing state
pa-toast__icon          — Icon container
pa-toast__content       — Content wrapper
pa-toast__title         — Title text
pa-toast__message       — Message text
pa-toast__actions       — Action buttons container
pa-toast__close         — Close button
pa-toast__progress      — Progress bar`}</CodeBlock>

	<Heading level={4} class="mt-4">Toast Variants</Heading>
	<CodeBlock>{`pa-toast--primary / --success / --danger / --warning / --info
pa-toast--filled-primary / --filled-success / --filled-danger / --filled-warning / --filled-info
pa-toast--color-1 through --color-9
pa-toast--filled-color-1 through --filled-color-9`}</CodeBlock>
</Card>
