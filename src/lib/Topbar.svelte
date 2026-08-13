<script lang="ts">
  import IconDiscord from "~icons/tabler/brand-discord";
  import IconShare from "~icons/tabler/share";
  import IconMenu from "~icons/tabler/menu-2";
  import IconEdit from "~icons/tabler/pencil";

  import { windowInfo } from "$lib/stores.svelte";
  import { page } from "$app/state";

  let shareText = $state("Share");

  function copyUrl() {
    // the windows share menu looks ugly, so only show it on mobile which looks nice
    if (navigator.maxTouchPoints > 0 && navigator.share) {
      // checks for mobile
      navigator.share({ url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      shareText = "Copied!";
      setTimeout(() => {
        shareText = "Share";
      }, 2000);
    }
  }

  // silly easter egg
  let lastFewInputs: string[] = [];
  let logoFlipped = $state(false);
  let logoBonked = $state(false);

  export async function handleKeyInput(
    e: KeyboardEvent & {
      currentTarget: EventTarget & Window;
    }
  ) {
    const doc = e.currentTarget.document;
    const notAnInput =
      !(doc.activeElement instanceof HTMLInputElement) && !(doc.activeElement instanceof HTMLTextAreaElement);

    if (!notAnInput) return;

    lastFewInputs.push(e.key);
    if (lastFewInputs.length > 8) {
      lastFewInputs.shift();
    }

    if (lastFewInputs.join("").includes("dataflip")) {
      logoFlipped = !logoFlipped;
    }

    if (lastFewInputs.join("").includes("databonk")) {
      logoBonked = !logoBonked;
    }
  }
</script>

<svelte:window onkeydown={e => handleKeyInput(e)} />

<div class="bg-stone-800 flex w-full items-center justify-between p-2 h-12 sticky top-0 border-b border-stone-700 z-20">
  <a
    class="absolute -translate-y-30 -translate-x-1/2 left-1/2 focus-visible:outline-2 outline-blue-500 focus-visible:translate-y-0"
    href="#nav_side">Go To Nav</a>
  <a
    class="absolute -translate-y-30 -translate-x-1/2 left-1/2 focus-visible:outline-2 outline-blue-500 focus-visible:translate-y-0"
    href="#main_content">Go To Content</a>
  <div class="flex items-center grow">
    <button
      class="px-2 pr-3 sm:hidden focus-visible:outline-2 focus-visible:outline-dph-orange"
      aria-label="{windowInfo.isNavOpen ? 'Collapse' : 'Expand'} Sidebar"
      onclick={() => (windowInfo.isNavOpen = !windowInfo.isNavOpen)}><IconMenu /></button>
    <a class="flex items-center hover:text-white p-1 focus-visible:outline-2 focus-visible:outline-dph-orange" href="/">
      <img
        alt="Datapack Hub Logo"
        src="/logos/dph.svg"
        class="h-8 mr-2 {logoFlipped ? 'rotate-180' : ''} {logoBonked ? 'scale-y-50' : ''} transition-transform"
        width="32"
        height="32" />
      <h1 class="font-bold hidden text-lg lg:text-xl sm:block">Datapack Wiki</h1>
    </a>
  </div>

  <div class="flex items-center gap-2">
    <a
      href="https://github.com/Datapack-Hub/wiki/blob/main/src/routes{page.url.pathname}/%2Bpage.svx"
      class="p-2 rounded-lg py-1 flex items-center gap-2 hover:bg-stone-700 hover:text-white hover:font-medium aspect-square sm:aspect-auto focus-visible:outline-2 focus-visible:outline-dph-orange"
      aria-label="Edit">
      <IconEdit />
      <span class="hidden sm:block">Edit</span>
    </a>
    <button
      class="p-2 rounded-lg py-1 flex items-center gap-2 hover:bg-stone-700 hover:text-white hover:font-medium aspect-square sm:aspect-auto focus-visible:outline-2 focus-visible:outline-dph-orange cursor-pointer"
      aria-label="Copy URL"
      onclick={copyUrl}>
      <IconShare />
      <span class="hidden sm:block">{shareText}</span>
    </button>
    <a
      href="https://discord.gg/xHTHbZqXr6"
      class="p-2 rounded-lg py-1 flex items-center gap-2 hover:bg-stone-700 hover:text-white hover:font-medium aspect-square sm:aspect-auto focus-visible:outline-2 focus-visible:outline-dph-orange"
      aria-label="Discord">
      <IconDiscord />
      <span class="hidden sm:block">Discord</span>
    </a>
  </div>
</div>
