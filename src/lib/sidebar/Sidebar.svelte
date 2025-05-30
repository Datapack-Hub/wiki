<script lang="ts">
  import SearchBox from "./SearchBox.svelte";

  // ! IMPORTANT: If you want to add pages or categories, this is not the place to do it!

  import GuidePages from "$lib/sidebar/tabs/Guides.svelte";
  import WikiPages from "$lib/sidebar/tabs/WikiPages.svelte";
  import { latestMCData, windowInfo } from "$lib/stores.svelte";

  import IconCredits from "~icons/tabler/address-book";
  import IconResources from "~icons/tabler/book";
  import IconGuides from "~icons/tabler/book-2";
  import IconCollapse from "~icons/tabler/chevron-left";
  import IconWiki from "~icons/tabler/globe";
  import IconMarkdown from "~icons/tabler/markdown";
  import IconBranch from "~icons/tabler/git-branch";

  import SidebarPage from "./navigation/SidebarPage.svelte";
  import SidebarCategory from "./navigation/SidebarCategory.svelte";

  let page = $state("wiki");

  $effect(() => {
    page = sessionStorage.getItem("page") || "wiki";
  });

  export async function handleKeyInput(e: KeyboardEvent) {
    if (e.key == "ArrowLeft" && windowInfo.isNavOpen) {
      windowInfo.isNavOpen = false;
    }

    if (e.key == "ArrowRight" && !windowInfo.isNavOpen) {
      windowInfo.isNavOpen = true;
    }
  }
</script>

<svelte:window on:keydown={handleKeyInput} />

<aside
  class="{windowInfo.isNavOpen
    ? 'fixed w-full sm:w-80'
    : 'w-fit hidden sm:flex'} flex flex-col bg-stone-800 items-center h-[calc(100dvh-3rem)] sm:sticky top-12 z-50 border-r border-stone-700">
  <div class="flex flex-col p-2 pt-1 grow overflow-y-auto w-full" id="nav_side">
    {#if windowInfo.isNavOpen}
      <SearchBox keyActivated />
      <div class="flex items-center mb-2 gap-1">
        <button
          class="{page == 'wiki'
            ? 'bg-stone-700'
            : 'bg-stone-800'} hover:text-stone-400 px-2 py-1 rounded-md flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-dph-orange"
          onclick={() => {
            page = "wiki";
            sessionStorage.setItem("page", "wiki");
          }}>
          <IconWiki /><span>Wiki</span>
        </button>
        <button
          class="{page == 'guides'
            ? 'bg-stone-700'
            : 'bg-stone-800'} hover:text-stone-400 px-2 py-1 rounded-md flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-dph-orange"
          onclick={() => {
            page = "guides";
            sessionStorage.setItem("page", "guides");
          }}>
          <IconGuides /><span>Guides</span>
        </button>
      </div>
    {/if}
    <div class="flex flex-col h-full">
      <div class="grow">
        {#if page == "wiki"}
          <WikiPages />
        {:else}
          <GuidePages />
        {/if}
      </div>
      <div class="mt-5">
        <SidebarCategory name="Contribution" icon={IconWiki}>
          <SidebarPage label="Formatting" icon={IconMarkdown} page="/contribute/formatting" />
          <SidebarPage label="Git Practices" icon={IconBranch} page="/contribute/git-practices" />
        </SidebarCategory>
        <SidebarPage label="Resources" icon={IconResources} page="/resources" />
        <SidebarPage label="Credits" icon={IconCredits} page="/credits" />
      </div>
    </div>
  </div>
  <div class="flex text-sm text-stone-600 p-3 items-center w-full">
    {#if windowInfo.isNavOpen}
      <span class="grow flex flex-col">pack_format: {latestMCData.packFormat} ({latestMCData.gameVersion})</span>
    {/if}
    <button
      aria-label="{windowInfo.isNavOpen ? 'Collapse' : 'Expand'} Sidebar"
      class="hidden sm:block rounded-lg cursor-pointer text-stone-200 text-lg hover:bg-stone-700 hover:text-white motion-safe:transition-all focus-visible:outline-2 focus-visible:outline-dph-orange {windowInfo.isNavOpen
        ? 'rotate-0'
        : 'rotate-180'}"
      onclick={() => (windowInfo.isNavOpen = !windowInfo.isNavOpen)}>
      <IconCollapse />
    </button>
  </div>
  {#if windowInfo.isNavOpen}
    <span class="text-xs px-3 pb-3 text-stone-600">DATAPACK WIKI IS NOT AFFILIATED OR ENDORSED BY MOJANG STUDIOS</span>
  {/if}
</aside>
