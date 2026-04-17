<script lang="ts">
  import { windowInfo } from "$lib/stores.svelte";
  import { page } from "$app/state";
  import type { RouteId } from "$app/types";

  type Props = {
    icon: any;
    page: RouteId;
    label: string;
  };

  const { icon, page: wikiPage, label }: Props = $props();

  const Icon = $derived(icon);
</script>

<a
  href={wikiPage}
  onclick={() => (windowInfo.width < 768 ? (windowInfo.isNavOpen = !windowInfo.isNavOpen) : null)}
  class="hover:bg-stone-700 hover:text-white hover:font-medium py-1 rounded-lg flex gap-2 pl-1 items-center focus-visible:outline-2 focus-visible:outline-dph-orange {wikiPage === page.route.id ? 'bg-stone-900/70' : ''}">
  <Icon />

  {#if windowInfo.isNavOpen}
    <span>{label}</span>
  {/if}
</a>
