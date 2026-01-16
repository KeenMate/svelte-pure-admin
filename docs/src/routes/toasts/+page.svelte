<script lang="ts">
	import { Heading, Paragraph, Card, Grid, Column, Button, Toast, ToastContainer, CodeBlock } from '@keenmate/svelte-pure-admin';

	// Toast state management
	type ToastVariant = 'primary' | 'success' | 'danger' | 'warning' | 'info';
	type ToastPosition = 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';

	interface ToastData {
		id: number;
		title: string;
		message: string;
		variant: ToastVariant;
		show: boolean;
		duration?: number;
		showProgress?: boolean;
	}

	// Separate toast arrays for each position
	let topRightToasts = $state<ToastData[]>([]);
	let topCenterToasts = $state<ToastData[]>([]);
	let topLeftToasts = $state<ToastData[]>([]);
	let bottomRightToasts = $state<ToastData[]>([]);
	let bottomCenterToasts = $state<ToastData[]>([]);
	let bottomLeftToasts = $state<ToastData[]>([]);

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
			case 'top-right': return topRightToasts;
			case 'top-center': return topCenterToasts;
			case 'top-left': return topLeftToasts;
			case 'bottom-right': return bottomRightToasts;
			case 'bottom-center': return bottomCenterToasts;
			case 'bottom-left': return bottomLeftToasts;
		}
	}

	function addToast(position: ToastPosition, variant: ToastVariant, options: { duration?: number; showProgress?: boolean; title?: string; message?: string } = {}) {
		const id = toastId++;
		const msg = toastMessages[variant];
		const newToast: ToastData = {
			id,
			title: options.title || msg.title,
			message: options.message || msg.message,
			variant,
			show: true,
			duration: options.duration ?? 5000,
			showProgress: options.showProgress ?? false
		};

		switch (position) {
			case 'top-right':
				topRightToasts = [...topRightToasts, newToast];
				break;
			case 'top-center':
				topCenterToasts = [...topCenterToasts, newToast];
				break;
			case 'top-left':
				topLeftToasts = [...topLeftToasts, newToast];
				break;
			case 'bottom-right':
				bottomRightToasts = [...bottomRightToasts, newToast];
				break;
			case 'bottom-center':
				bottomCenterToasts = [...bottomCenterToasts, newToast];
				break;
			case 'bottom-left':
				bottomLeftToasts = [...bottomLeftToasts, newToast];
				break;
		}
	}

	function removeToast(position: ToastPosition, id: number) {
		switch (position) {
			case 'top-right':
				topRightToasts = topRightToasts.filter(t => t.id !== id);
				break;
			case 'top-center':
				topCenterToasts = topCenterToasts.filter(t => t.id !== id);
				break;
			case 'top-left':
				topLeftToasts = topLeftToasts.filter(t => t.id !== id);
				break;
			case 'bottom-right':
				bottomRightToasts = bottomRightToasts.filter(t => t.id !== id);
				break;
			case 'bottom-center':
				bottomCenterToasts = bottomCenterToasts.filter(t => t.id !== id);
				break;
			case 'bottom-left':
				bottomLeftToasts = bottomLeftToasts.filter(t => t.id !== id);
				break;
		}
	}

	function showMultipleToasts() {
		addToast('top-right', 'success', { title: 'First Toast', message: 'This is the first notification' });
		setTimeout(() => {
			addToast('top-right', 'warning', { title: 'Second Toast', message: 'This is the second notification' });
		}, 300);
		setTimeout(() => {
			addToast('top-right', 'info', { title: 'Third Toast', message: 'This is the third notification' });
		}, 600);
	}
</script>

<!-- Toast Container Positions -->
<ToastContainer position="top-right">
	{#each topRightToasts as toast (toast.id)}
		<Toast
			variant={toast.variant}
			title={toast.title}
			message={toast.message}
			bind:show={toast.show}
			duration={toast.duration}
			showProgress={toast.showProgress}
			onClose={() => removeToast('top-right', toast.id)}
		/>
	{/each}
</ToastContainer>

<ToastContainer position="top-center">
	{#each topCenterToasts as toast (toast.id)}
		<Toast
			variant={toast.variant}
			title={toast.title}
			message={toast.message}
			bind:show={toast.show}
			duration={toast.duration}
			showProgress={toast.showProgress}
			onClose={() => removeToast('top-center', toast.id)}
		/>
	{/each}
</ToastContainer>

<ToastContainer position="top-left">
	{#each topLeftToasts as toast (toast.id)}
		<Toast
			variant={toast.variant}
			title={toast.title}
			message={toast.message}
			bind:show={toast.show}
			duration={toast.duration}
			showProgress={toast.showProgress}
			onClose={() => removeToast('top-left', toast.id)}
		/>
	{/each}
</ToastContainer>

<ToastContainer position="bottom-right">
	{#each bottomRightToasts as toast (toast.id)}
		<Toast
			variant={toast.variant}
			title={toast.title}
			message={toast.message}
			bind:show={toast.show}
			duration={toast.duration}
			showProgress={toast.showProgress}
			onClose={() => removeToast('bottom-right', toast.id)}
		/>
	{/each}
</ToastContainer>

<ToastContainer position="bottom-center">
	{#each bottomCenterToasts as toast (toast.id)}
		<Toast
			variant={toast.variant}
			title={toast.title}
			message={toast.message}
			bind:show={toast.show}
			duration={toast.duration}
			showProgress={toast.showProgress}
			onClose={() => removeToast('bottom-center', toast.id)}
		/>
	{/each}
</ToastContainer>

<ToastContainer position="bottom-left">
	{#each bottomLeftToasts as toast (toast.id)}
		<Toast
			variant={toast.variant}
			title={toast.title}
			message={toast.message}
			bind:show={toast.show}
			duration={toast.duration}
			showProgress={toast.showProgress}
			onClose={() => removeToast('bottom-left', toast.id)}
		/>
	{/each}
</ToastContainer>

<!-- Toast Positions -->
<Card title="Toast Positions">
	<Grid>
		<Column size="100" md="1-3">
			<Button variant="primary" block onclick={() => addToast('top-right', 'success')}>
				Top Right
			</Button>
		</Column>
		<Column size="100" md="1-3">
			<Button variant="primary" block onclick={() => addToast('top-center', 'info')}>
				Top Center
			</Button>
		</Column>
		<Column size="100" md="1-3">
			<Button variant="primary" block onclick={() => addToast('top-left', 'warning')}>
				Top Left
			</Button>
		</Column>
	</Grid>
	<Grid class="mt-4">
		<Column size="100" md="1-3">
			<Button variant="secondary" block onclick={() => addToast('bottom-right', 'danger')}>
				Bottom Right
			</Button>
		</Column>
		<Column size="100" md="1-3">
			<Button variant="secondary" block onclick={() => addToast('bottom-center', 'primary')}>
				Bottom Center
			</Button>
		</Column>
		<Column size="100" md="1-3">
			<Button variant="secondary" block onclick={() => addToast('bottom-left', 'success')}>
				Bottom Left
			</Button>
		</Column>
	</Grid>
</Card>

<!-- Toast Variants -->
<Card title="Toast Variants">
	<Grid>
		<Column size="100" md="50" lg="20">
			<Button variant="primary" block onclick={() => addToast('top-right', 'primary')}>
				Primary
			</Button>
		</Column>
		<Column size="100" md="50" lg="20">
			<Button variant="success" block onclick={() => addToast('top-right', 'success')}>
				Success
			</Button>
		</Column>
		<Column size="100" md="50" lg="20">
			<Button variant="danger" block onclick={() => addToast('top-right', 'danger')}>
				Danger
			</Button>
		</Column>
		<Column size="100" md="50" lg="20">
			<Button variant="warning" block onclick={() => addToast('top-right', 'warning')}>
				Warning
			</Button>
		</Column>
		<Column size="100" md="50" lg="20">
			<Button variant="info" block onclick={() => addToast('top-right', 'info')}>
				Info
			</Button>
		</Column>
	</Grid>
</Card>

<!-- Toast with Progress Bar -->
<Card title="Toast with Progress Bar">
	<Button variant="primary" onclick={() => addToast('top-right', 'primary', { showProgress: true, title: 'Processing', message: 'Your request is being processed...' })}>
		Show Toast with Progress
	</Button>
	<Paragraph class="pa-text--secondary mt-4">
		Progress bar shows time remaining before auto-dismiss (5 seconds)
	</Paragraph>
</Card>

<!-- Persistent Toasts -->
<Card title="Persistent Toasts (Manual Dismiss Only)">
	<Grid>
		<Column size="100" md="1-3">
			<Button variant="warning" block onclick={() => addToast('top-right', 'warning', { duration: 0, title: 'Important Warning', message: 'This is an important warning that requires your attention. Click the close button to dismiss.' })}>
				Important Warning
			</Button>
		</Column>
		<Column size="100" md="1-3">
			<Button variant="danger" block onclick={() => addToast('top-right', 'danger', { duration: 0, title: 'Critical Error', message: 'Critical error detected! This message will remain until you acknowledge it.' })}>
				Critical Error
			</Button>
		</Column>
		<Column size="100" md="1-3">
			<Button variant="info" block onclick={() => addToast('top-right', 'info', { duration: 0, title: 'Important Info', message: 'Important information that you should read carefully before dismissing.' })}>
				Important Info
			</Button>
		</Column>
	</Grid>
	<Paragraph class="pa-text--secondary mt-4">
		These toasts stay visible until manually dismissed by clicking the close button
	</Paragraph>
</Card>

<!-- Action Toasts -->
<Card title="Action Toasts">
	<Grid>
		<Column size="100" md="50">
			<Button variant="success" onclick={() => addToast('top-right', 'success', { title: 'Upload Complete', message: 'File uploaded successfully!' })}>
				Upload Success
			</Button>
		</Column>
		<Column size="100" md="50">
			<Button variant="danger" onclick={() => addToast('top-right', 'danger', { title: 'Save Failed', message: 'Failed to save changes. Please try again.' })}>
				Save Error
			</Button>
		</Column>
	</Grid>
</Card>

<!-- Multiple Toasts -->
<Card title="Multiple Toasts (Stacking)">
	<Button variant="primary" onclick={showMultipleToasts}>
		Show 3 Toasts
	</Button>
	<Paragraph class="pa-text--secondary mt-4">
		Toasts automatically stack vertically in the container
	</Paragraph>
</Card>

<!-- Code Examples -->
<Card title="Code Examples">
	<Grid>
		<Column size="100" md="50">
			<h4 class="mb-2">Basic Setup</h4>
			<CodeBlock>{`<script>
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
</script>

<!-- Container positions toasts in viewport -->
<ToastContainer position="top-right">
  {#each toasts as toast (toast.id)}
    <Toast
      variant={toast.variant}
      title={toast.title}
      message={toast.message}
      bind:show={toast.show}
      onClose={() => removeToast(toast.id)}
    />
  {/each}
</ToastContainer>`}</CodeBlock>
		</Column>
		<Column size="100" md="50">
			<h4 class="mb-2">Toast Props</h4>
			<CodeBlock>{`<Toast
  variant="success"     // primary|success|danger|warning|info
  title="Success!"      // Header text
  message="It worked!"  // Body text
  duration={5000}       // Auto-dismiss (0 = manual)
  showProgress          // Show countdown bar
  bind:show={visible}   // Control visibility
  onClose={handleClose} // Called when dismissed
/>

<!-- Container Positions -->
<ToastContainer position="top-right" />
<ToastContainer position="top-center" />
<ToastContainer position="top-left" />
<ToastContainer position="bottom-right" />
<ToastContainer position="bottom-center" />
<ToastContainer position="bottom-left" />`}</CodeBlock>
		</Column>
	</Grid>

	<h4 class="mb-2 mt-4">Common Patterns</h4>
	<CodeBlock>{`// Success notification
addToast('success', 'Changes saved successfully!');

// Error with no auto-dismiss
addToast('danger', 'Save failed!', { duration: 0 });

// Info with progress bar
addToast('info', 'Processing...', { showProgress: true });`}</CodeBlock>
</Card>
