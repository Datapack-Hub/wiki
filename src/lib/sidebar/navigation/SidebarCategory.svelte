<script lang="ts">
  import { windowInfo } from "$lib/stores.svelte";
  import type { Snippet } from "svelte";
  import IconExpand from "~icons/tabler/chevron-right";

  type Props = {
    name: string;
    icon: any;
    children: Snippet;
  };

  const { children, name, icon }: Props = $props();

  const Icon = $derived(icon);
</script>

<details
  ontoggle={event => {
    if (event.currentTarget.open) windowInfo.isNavOpen = true;
  }}
  class="nav-category">
  <summary class="nav-item" title={windowInfo.isNavOpen ? undefined : name}>
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
