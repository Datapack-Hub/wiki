<script lang="ts">
  import { onMount } from "svelte";
  import { page as appPage } from "$app/state";
  import SearchBox from "./SearchBox.svelte";

  // ! IMPORTANT: If you want to add pages or categories, this is not the place to do it!
  import { latestMCData, windowInfo } from "$lib/stores.svelte";

  import IconCredits from "~icons/tabler/address-book";
  import IconResources from "~icons/tabler/book";
  import IconGuides from "~icons/tabler/book-2";
  import IconCollapse from "~icons/tabler/chevron-left";
  import IconWiki from "~icons/tabler/globe";
  import IconMarkdown from "~icons/tabler/markdown";
  import IconBranch from "~icons/tabler/git-branch";
  import IconX from "~icons/tabler/x";

  import SidebarPage from "./navigation/SidebarPage.svelte";
  import SidebarCategory from "./navigation/SidebarCategory.svelte";
  import VersionPicker from "./tabs/VersionPicker.svelte";

  type ContentPage = "wiki" | "guides";

  function contentPageFromPath(pathname: string): ContentPage | null {
    if (pathname === "/guide" || pathname.startsWith("/guide/")) return "guides";
    if (pathname === "/wiki" || pathname.startsWith("/wiki/")) return "wiki";
    return null;
  }

  let page: ContentPage = $state(contentPageFromPath(appPage.url.pathname) || "wiki");
  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  });

  $effect(() => {
    const routePage = contentPageFromPath(appPage.url.pathname);

    if (routePage) {
      page = routePage;
      sessionStorage.setItem("page", routePage);
    } else {
      page = (sessionStorage.getItem("page") as ContentPage) || "wiki";
    }
  });

  $effect(() => {
    const shouldLock = windowInfo.width < 768 && windowInfo.isNavOpen;
    document.body.classList.toggle("nav-open", shouldLock);

    return () => document.body.classList.remove("nav-open");
  });

  export function handleKeyInput(
    e: KeyboardEvent & {
      currentTarget: EventTarget & Window;
    }
  ) {
    const doc = e.currentTarget.document;
    const notAnInput =
      !(doc.activeElement instanceof HTMLInputElement) && !(doc.activeElement instanceof HTMLTextAreaElement);

    if (e.key === "ArrowLeft" && windowInfo.isNavOpen && notAnInput) windowInfo.isNavOpen = false;
    if (e.key === "ArrowRight" && !windowInfo.isNavOpen && notAnInput) windowInfo.isNavOpen = true;
  }

  function choosePage(nextPage: ContentPage) {
    page = nextPage;
    sessionStorage.setItem("page", nextPage);
  }
</script>

<svelte:window onkeydown={handleKeyInput} />

{#if windowInfo.isNavOpen}
  <button
    class="sidebar-backdrop md:hidden"
    aria-label="Close navigation"
    onclick={() => (windowInfo.isNavOpen = false)}></button>
{/if}

<aside
  aria-label="Documentation navigation"
  inert={!windowInfo.isNavOpen && windowInfo.width < 768}
  class="sidebar {windowInfo.isNavOpen ? 'sidebar--open' : 'sidebar--collapsed'} {mounted ? 'sidebar--ready' : ''}">
  <div class="sidebar__mobile-header">
    <span>Browse documentation</span>
    <button class="icon-button" aria-label="Close navigation" onclick={() => (windowInfo.isNavOpen = false)}>
      <IconX />
    </button>
  </div>

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
        <SidebarCategory name="Contribution" icon={IconWiki}>
          <SidebarPage label="Formatting" icon={IconMarkdown} page="/contribute/formatting" />
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
          <span>pack_format: {latestMCData.packFormat}</span>
          <span>Minecraft Java {latestMCData.gameVersion}</span>
        </span>
      {/if}
      <button
        aria-label="{windowInfo.isNavOpen ? 'Collapse' : 'Expand'} sidebar"
        class="icon-button sidebar__collapse hidden md:inline-flex"
        onclick={() => (windowInfo.isNavOpen = !windowInfo.isNavOpen)}>
        <IconCollapse />
      </button>
    </div>
    {#if windowInfo.isNavOpen}
      <p class="sidebar__legal">Not affiliated with or endorsed by Mojang Studios.</p>
    {/if}
  </div>
</aside>
