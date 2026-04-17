<script lang="ts">
  import IconLoader from "~icons/tabler/loader2";
  import SidebarPlaceholder from "../navigation/SidebarPlaceholder.svelte";
  import { windowInfo } from "$lib/stores.svelte";

  type Versions = "pre-1_21_11" | "latest";

  interface Props {
    page: "wiki" | "guides";
  }

  const { page }: Props = $props();

  let version: Versions = $state("latest");
</script>

<select
  name="version"
  id="version"
  aria-label="Version Selector"
  bind:value={version}
  class="bg-stone-900 p-2 w-full rounded-lg focus-visible:outline-2 accent-dph-orange focus-visible:outline-dph-orange mt-1 mb-2 border-r-8 border-stone-900 {windowInfo.isNavOpen
    ? ''
    : 'hidden'}">
  <option value="latest">Latest</option>
  <option value="pre-1_21_11">1.21.10</option>
</select>

{#if page == "wiki"}
  {#await import(`./${version}/WikiPages.svelte`)}
    <div class="cursor-not-allowed py-1 rounded-lg flex gap-2 pl-1 items-center text-stone-500">
      <IconLoader class="animate-spin" />

      {#if windowInfo.isNavOpen}
        <span>Loading Wiki Pages...</span>
      {/if}
    </div>
  {:then WPage}
    <WPage.default />
  {:catch}
    <SidebarPlaceholder label="Failed to load pages." icon={IconLoader} />
  {/await}
{:else if page == "guides"}
  {#await import(`./${version}/Guides.svelte`)}
    <div class="cursor-not-allowed py-1 rounded-lg flex gap-2 pl-1 items-center text-stone-500">
      <IconLoader class="animate-spin" />

      {#if windowInfo.isNavOpen}
        <span>Loading Guide Pages...</span>
      {/if}
    </div>
  {:then GPage}
    <GPage.default />
  {:catch}
    <SidebarPlaceholder label="Failed to load pages." icon={IconLoader} />
  {/await}
{/if}
