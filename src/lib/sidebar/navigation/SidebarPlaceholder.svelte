<script lang="ts">
  import { windowInfo } from "$lib/stores.svelte";

  type Props = {
    label: string;
    icon: any;
  };

  const { label, icon }: Props = $props();

  const Icon = $derived(icon);
</script>

<div class="nav-item nav-item--placeholder" title={windowInfo.isNavOpen ? undefined : label}>
  <Icon />

  {#if windowInfo.isNavOpen}
    <span>{label}</span>
  {/if}
</div>
