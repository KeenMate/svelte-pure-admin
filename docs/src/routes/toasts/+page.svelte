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

	function getToastsByPosition(position: ToastPosition): ToastData[] {
		switch (position) {
			case 'top-end': return topEndToasts;
			case 'top-center': return topCenterToasts;
			case 'top-start': return topStartToasts;
			case 'bottom-end': return bottomEndToasts;
			case 'bottom-center': return bottomCenterToasts;
			case 'bottom-start': return bottomStartToasts;
		}
	}

	function addToast(position: ToastPosition, variant: ToastVariant, options: { duration?: number; shouldShowProgress?: boolean; title?: string; message?: string } = {}) {
		const id = toastId++;
		const msg = toastMessages[variant];
		const newToast: ToastData = {
			id,
			title: options.title || msg.title,
			message: options.message || msg.message,
			variant,
			show: true,
			duration: options.duration ?? 5000,
			shouldShowProgress: options.shouldShowProgress ?? false
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
			titleText={toast.title}
			messageText={toast.message}
			bind:show={toast.show}
			duration={toast.duration}
			shouldShowProgress={toast.shouldShowProgress}
			onclose={() => removeToast('top-end', toast.id)}
		/>
	{/each}
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

<!-- Toast Positions -->
<Card titleText="Toast Positions">
	<Grid>
		<Column size="100" md="1-3">
			<Button variant="primary" isBlock onclick={() => addToast('top-end', 'success')}>
				Top End
			</Button>
		</Column>
		<Column size="100" md="1-3">
			<Button variant="primary" isBlock onclick={() => addToast('top-center', 'info')}>
				Top Center
			</Button>
		</Column>
		<Column size="100" md="1-3">
			<Button variant="primary" isBlock onclick={() => addToast('top-start', 'warning')}>
				Top Start
			</Button>
		</Column>
	</Grid>
	<Grid class="mt-4">
		<Column size="100" md="1-3">
			<Button variant="secondary" isBlock onclick={() => addToast('bottom-end', 'danger')}>
				Bottom End
			</Button>
		</Column>
		<Column size="100" md="1-3">
			<Button variant="secondary" isBlock onclick={() => addToast('bottom-center', 'primary')}>
				Bottom Center
			</Button>
		</Column>
		<Column size="100" md="1-3">
			<Button variant="secondary" isBlock onclick={() => addToast('bottom-start', 'success')}>
				Bottom Start
			</Button>
		</Column>
	</Grid>
</Card>

<!-- Toast Variants -->
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

<!-- Toast with Progress Bar -->
<Card titleText="Toast with Progress Bar">
	<Button variant="primary" onclick={() => addToast('top-end', 'primary', { shouldShowProgress: true, title: 'Processing', message: 'Your request is being processed...' })}>
		Show Toast with Progress
	</Button>
	<Paragraph class="pa-text--secondary mt-4">
		Progress bar shows time remaining before auto-dismiss (5 seconds)
	</Paragraph>
</Card>

<!-- Persistent Toasts -->
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

<!-- Action Toasts -->
<Card titleText="Action Toasts">
	<Grid>
		<Column size="100" md="50">
			<Button variant="success" onclick={() => addToast('top-end', 'success', { title: 'Upload Complete', message: 'File uploaded successfully!' })}>
				Upload Success
			</Button>
		</Column>
		<Column size="100" md="50">
			<Button variant="danger" onclick={() => addToast('top-end', 'danger', { title: 'Save Failed', message: 'Failed to save changes. Please try again.' })}>
				Save Error
			</Button>
		</Column>
	</Grid>
</Card>

<!-- Multiple Toasts -->
<Card titleText="Multiple Toasts (Stacking)">
	<Button variant="primary" onclick={showMultipleToasts}>
		Show 3 Toasts
	</Button>
	<Paragraph class="pa-text--secondary mt-4">
		Toasts automatically stack vertically in the container
	</Paragraph>
</Card>

<!-- Code Examples -->
<Card titleText="Code Examples">
	<Grid>
		<Column size="100" md="50">
			<h4 class="mb-2">Basic Setup</h4>
			<CodeBlock>{`${'<'}script>
  let toasts = $state([]);
  let id = 0;

  function addToast(variant, message) {
    toasts = [...toasts, {
      id: id++, variant, message, show: true
    }];
  }

  function removeToast(toastId) {
    toasts = toasts.filter(t => t.id !== toastId);
  }
${'<'}/script>

<!-- Container positions toasts in viewport -->
<ToastContainer position="top-end">
  {#each toasts as toast (toast.id)}
    <Toast
      variant={toast.variant}
      titleText={toast.title}
      messageText={toast.message}
      bind:show={toast.show}
      onclose={() => removeToast(toast.id)}
    />
  {/each}
</ToastContainer>`}</CodeBlock>
		</Column>
		<Column size="100" md="50">
			<h4 class="mb-2">Toast Props</h4>
			<CodeBlock>{`<Toast
  variant="success"     // primary|success|danger|warning|info
  titleText="Success!"      // Header text
  messageText="It worked!"  // Body text
  duration={5000}       // Auto-dismiss (0 = manual)
  shouldShowProgress          // Show countdown bar
  bind:show={visible}   // Control visibility
  onclose={handleClose} // Called when dismissed
/>

<!-- Container Positions -->
<ToastContainer position="top-end" />
<ToastContainer position="top-center" />
<ToastContainer position="top-start" />
<ToastContainer position="bottom-end" />
<ToastContainer position="bottom-center" />
<ToastContainer position="bottom-start" />`}</CodeBlock>
		</Column>
	</Grid>

	<h4 class="mb-2 mt-4">Common Patterns</h4>
	<CodeBlock>{`// Success notification
addToast('success', 'Changes saved successfully!');

// Error with no auto-dismiss
addToast('danger', 'Save failed!', { duration: 0 });

// Info with progress bar
addToast('info', 'Processing...', { shouldShowProgress: true });`}</CodeBlock>
</Card>
