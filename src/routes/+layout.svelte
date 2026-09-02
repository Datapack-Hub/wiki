<script lang="ts">
  // NEVER MOVE THIS INTO APP.CSS IT WILL BREAK
  // - cbble_
  import "../styles/app.css";
  import "../styles/fonts.css";

  import Sidebar from "$lib/sidebar/Sidebar.svelte";
  import Navbar from "../lib/Topbar.svelte";

  import { windowInfo } from "$lib/stores.svelte";
  import type { Snippet } from "svelte";
  import { innerWidth } from "svelte/reactivity/window";
  import { onMount } from "svelte";
  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();

  let initialized = false;

  onMount(() => {
    const openLinksInNewTabs = (root: ParentNode) => {
      const links = [
        ...(root instanceof HTMLAnchorElement ? [root] : []),
        ...root.querySelectorAll<HTMLAnchorElement>("a[href]"),
      ];

      links.forEach((link) => {
        const url = new URL(link.href, window.location.href);
        const isExternal =
          (url.protocol === "http:" || url.protocol === "https:") &&
          url.origin !== window.location.origin;

        if (isExternal) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        } else if (link.target === "_blank") {
          link.removeAttribute("target");
          link.removeAttribute("rel");
        }
      });
    };

    openLinksInNewTabs(document);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) openLinksInNewTabs(node);
        });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  });

  $effect(() => {
    const width = innerWidth.current || 1920;
    const wasDesktop = windowInfo.width >= 768;
    const isDesktop = width >= 768;

    windowInfo.width = width;
    if (!initialized || wasDesktop !== isDesktop) {
      windowInfo.isNavOpen = isDesktop;
      initialized = true;
    }
  });

  $effect(() => {
    console.log("%c📦 Datapack Wiki", `color: oklch(69.27% 0.2042 40.82); font-size: 24pt; font-weight: 600;`);
    console.log("If you know what you're doing here, and you want to help develop the wiki, contact a DPH admin.");
    console.log("Or just chill here, I'm a website, I can't stop you.");
  });
</script>

<div class="font-lexend h-full min-h-dvh flex flex-col text-stone-200">
  <Navbar />
  <div class="flex w-full h-[93%]">
    <Sidebar />
    <div id="content" class="py-12 w-full min-h-dvh text-stone-200 bg-stone-900">
      {@render children()}
    </div>
  </div>
</div>
