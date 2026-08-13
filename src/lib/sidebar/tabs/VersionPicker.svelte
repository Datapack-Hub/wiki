<script lang="ts">
  import IconChevronDown from "~icons/tabler/chevron-down";
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

<div class="version-picker-frame {windowInfo.isNavOpen ? '' : 'hidden'}">
  <select name="version" id="version" aria-label="Version Selector" bind:value={version} class="version-picker">
    <option value="latest">Latest</option>
    <option value="pre-1_21_11">1.21.10</option>
  </select>
  <IconChevronDown class="version-picker__chevron" aria-hidden="true" />
</div>

{#if page == "wiki"}
  {#await import(`./${version}/WikiPages.svelte`)}
    <div class="nav-item nav-item--placeholder">
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
    <div class="nav-item nav-item--placeholder">
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
