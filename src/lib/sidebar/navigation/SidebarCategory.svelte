<script lang="ts">
  import { page } from "$app/state";
  import { windowInfo } from "$lib/stores.svelte";
  import type { Snippet } from "svelte";
  import IconExpand from "~icons/tabler/chevron-right";

  type Props = {
    name: string;
    icon: any;
    children: Snippet;
    activePath?: string;
  };

  const { children, name, icon, activePath }: Props = $props();

  const Icon = $derived(icon);

  function matchesActivePath(pathname: string) {
    return activePath !== undefined && (pathname === activePath || pathname.startsWith(`${activePath}/`));
  }

  let isOpen = $state(matchesActivePath(page.url.pathname));

  $effect(() => {
    if (matchesActivePath(page.url.pathname)) isOpen = true;
  });

  function handleSummaryClick(event: MouseEvent) {
    if (!windowInfo.isNavOpen) {
      event.preventDefault();
      windowInfo.isNavOpen = true;
      isOpen = true;
    }
  }
</script>

<details bind:open={isOpen} class="nav-category">
  <summary class="nav-item" title={windowInfo.isNavOpen ? undefined : name} onclick={handleSummaryClick}>
    <Icon />
    {#if windowInfo.isNavOpen}
      <span class="nav-category__label">{name}</span>
      <IconExpand class="nav-category__chevron" />
    {/if}
  </summary>
  {#if windowInfo.isNavOpen}
    <div class="nav-category__children">
      {@render children()}
    </div>
  {/if}
</details>
