<script lang="ts">
  /**
   * Global Popover Container (Svelte 5)
   * Renders popovers at the root level using portal pattern
   *
   * Place this component at the root of your app (e.g., in +layout.svelte)
   */

  import { onMount } from "svelte";
  import { popoverManager } from "./popover-manager.svelte";

  let wrapperElement: HTMLDivElement | null = null;
  let contentElement: HTMLDivElement | null = null;
  let cleanupAutoUpdate: (() => void) | null = null;
  let isPositioned = $state(false);
  let currentPopoverId: string | null = null;

  const popover = $derived(popoverManager.current);

  // Build wrapper class string (for size modifiers)
  const wrapperClasses = $derived(() => {
    if (!popover) return "pa-popover";
    const base = ["pa-popover"];
    if (popover.size) base.push(`pa-popover--${popover.size}`);
    return base.join(" ");
  });

  async function updatePosition() {
    if (
      !popover ||
      !popover.triggerElement ||
      !wrapperElement ||
      !contentElement ||
      typeof window === "undefined"
    ) {
      return;
    }

    // Check if Floating UI is available
    if (!window.FloatingUIDOM) {
      console.warn(
        "Floating UI not loaded. Popover positioning may be incorrect."
      );
      return;
    }

    const { computePosition, flip, shift, offset } = window.FloatingUIDOM;

    // Get content dimensions for validation
    const contentRect = contentElement.getBoundingClientRect();

    // Check if elements have valid dimensions
    if (contentRect.width === 0 || contentRect.height === 0) {
      console.warn('Popover content has zero dimensions, skipping position calculation');
      return;
    }

    // Position based on the CONTENT element (which has actual dimensions)
    const { x, y } = await computePosition(
      popover.triggerElement,
      contentElement,
      {
        placement: popover.placement,
        middleware: [offset(8), flip(), shift({ padding: 8 })],
      }
    );

    // Validate coordinates before applying
    if (x === 0 && y === 0) {
      console.warn('Computed popover position is 0,0 - skipping invalid position');
      return;
    }

    // Apply position to WRAPPER element
    Object.assign(wrapperElement.style, {
      left: `${x}px`,
      top: `${y}px`,
    });

    // Mark as positioned to show the popover
    isPositioned = true;
  }

  function handleClickOutside(event: MouseEvent) {
    if (!popover) return;

    const target = event.target as Node;
    if (
      popover.triggerElement &&
      !popover.triggerElement.contains(target) &&
      wrapperElement &&
      !wrapperElement.contains(target)
    ) {
      popoverManager.close();
    }
  }

  // Watch for popover changes and update position
  $effect(() => {
    if (popover && wrapperElement && contentElement) {
      // Check if this is a different popover (different trigger)
      const isNewPopover = currentPopoverId !== popover.id;
      currentPopoverId = popover.id;

      // Only reset position if switching to a different popover
      if (isNewPopover) {
        isPositioned = false;
        Object.assign(wrapperElement.style, {
          left: '0px',
          top: '0px',
        });
      }

      // Position after DOM update
      requestAnimationFrame(() => {
        updatePosition();

        // Setup auto-update only once per popover
        if (isNewPopover && window.FloatingUIDOM && popover.triggerElement && contentElement) {
          // Cleanup previous auto-update first
          if (cleanupAutoUpdate) {
            cleanupAutoUpdate();
          }

          const { autoUpdate } = window.FloatingUIDOM;
          cleanupAutoUpdate = autoUpdate(
            popover.triggerElement,
            contentElement,
            updatePosition
          );
        }
      });
    } else {
      // Cleanup auto-update when popover closes
      if (cleanupAutoUpdate) {
        cleanupAutoUpdate();
        cleanupAutoUpdate = null;
      }
      isPositioned = false;
      currentPopoverId = null;
    }
  });

  onMount(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      if (cleanupAutoUpdate) {
        cleanupAutoUpdate();
      }
    };
  });
</script>

{#if popover}
  <div
    bind:this={wrapperElement}
    class={wrapperClasses()}
    data-placement={popover.placement}
    style="position: absolute; top: 0; left: 0; visibility: {isPositioned ? 'visible' : 'hidden'};"
  >
    <div bind:this={contentElement} class="pa-popover__content" data-show="">
      {#if popover.header}
        {@render popover.header()}
      {:else}
        <div class="pa-popover__header">
          <h4>{popover.title}</h4>
          <button
            class="pa-popover__close"
            onclick={() => popoverManager.close()}>×</button
          >
        </div>
      {/if}
      <div class="pa-popover__body">
        {@render popover.content()}
      </div>
    </div>
  </div>
{/if}
