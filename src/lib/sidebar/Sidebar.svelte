<script lang="ts">
  import SearchBox from "./SearchBox.svelte";

  // ! IMPORTANT: If you want to add pages or categories, this is not the place to do it!
  import { windowInfo } from "$lib/stores.svelte";

  import IconCredits from "~icons/tabler/address-book";
  import IconResources from "~icons/tabler/book";
  import IconGuides from "~icons/tabler/book-2";
  import IconCollapse from "~icons/tabler/chevron-left";
  import IconWiki from "~icons/tabler/globe";
  import IconMarkdown from "~icons/tabler/markdown";
  import IconBranch from "~icons/tabler/git-branch";

  import SidebarPage from "./navigation/SidebarPage.svelte";
  import SidebarCategory from "./navigation/SidebarCategory.svelte";
  import VersionPicker from "./tabs/VersionPicker.svelte";

  let page: "wiki" | "guides" = $state("wiki");

  $effect(() => {
    page = (sessionStorage.getItem("page") as "wiki" | "guides") || "wiki";
  });

  export async function handleKeyInput(
    e: KeyboardEvent & {
      currentTarget: EventTarget & Window;
    }
  ) {
    const isInteractive =
      e.target instanceof Element &&
      Boolean(e.target.closest("button, input, textarea, select, [contenteditable='true'], [data-keyboard-scope]"));

    if (e.defaultPrevented || isInteractive) return;

    if (e.key === "ArrowLeft" && windowInfo.isNavOpen) windowInfo.isNavOpen = false;
    if (e.key === "ArrowRight" && !windowInfo.isNavOpen) windowInfo.isNavOpen = true;
  }

  function choosePage(nextPage: ContentPage) {
    page = nextPage;
    sessionStorage.setItem("page", nextPage);
  }
</script>

<svelte:window on:keydown={handleKeyInput} />

<aside
  aria-label="Documentation navigation"
  inert={!windowInfo.isNavOpen && windowInfo.width < 768}
  class="sidebar {windowInfo.isNavOpen ? 'sidebar--open' : 'sidebar--collapsed'} {mounted ? 'sidebar--ready' : ''}">
  <div class="sidebar__scroll">
    <nav class="sidebar__nav" id="nav_side" aria-label="Wiki sections">
      {#if windowInfo.isNavOpen}
        <SearchBox keyActivated />
        <div class="sidebar-switcher" aria-label="Content type">
          <button aria-pressed={page === "wiki"} onclick={() => choosePage("wiki")}>
            <IconWiki /><span>Wiki</span>
          </button>
          <button aria-pressed={page === "guides"} onclick={() => choosePage("guides")}>
            <IconGuides /><span>Guides</span>
          </button>
        </div>
      {/if}

      <div class="sidebar__primary sidebar-nav-list">
        <VersionPicker {page} />
      </div>

      <div class="sidebar__secondary sidebar-nav-list">
        <SidebarCategory name="Contribution" icon={IconWiki} activePath="/contribute">
          <SidebarPage label="Writing Pages" icon={IconMarkdown} page="/contribute/formatting" />
          <SidebarPage label="Git Practices" icon={IconBranch} page="/contribute/git-practices" />
        </SidebarCategory>
        <SidebarPage label="Resources" icon={IconResources} page="/resources" />
        <SidebarPage label="Credits" icon={IconCredits} page="/credits" />
      </div>
    </nav>
  </div>

  <div class="sidebar__footer">
    <div class="sidebar__status">
      {#if windowInfo.isNavOpen}
        <span class="sidebar__status-text">
          <span>Data Pack Format: {appPage.data.packFormat}</span>
          <span>Resource Pack Format: {appPage.data.resourcePackFormat}</span>
          <span>Minecraft Java {appPage.data.gameVersion}</span>
        </span>
      {/if}
      <button
        aria-label="{windowInfo.isNavOpen ? 'Collapse' : 'Expand'} sidebar"
        class="icon-button sidebar__collapse hidden md:inline-flex"
        onclick={() => (windowInfo.isNavOpen = !windowInfo.isNavOpen)}>
        <IconCollapse />
      </button>
    </div>
  </div>
  <div class="flex text-sm text-stone-400 p-3 items-center w-full">
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
    <span class="text-xs px-3 pb-3 text-stone-400">DATAPACK WIKI IS NOT AFFILIATED OR ENDORSED BY MOJANG STUDIOS</span>
  {/if}
</aside>
