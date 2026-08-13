<script lang="ts">
  import IconDiscord from "~icons/tabler/brand-discord";
  import IconShare from "~icons/tabler/share";
  import IconMenu from "~icons/tabler/menu-2";
  import IconEdit from "~icons/tabler/pencil";

  import { windowInfo } from "$lib/stores.svelte";
  import { page } from "$app/state";

  let shareText = $state("Share");
  let editPath = $derived(page.url.pathname === "/" ? "" : page.url.pathname.replace(/\/$/, ""));

  async function copyUrl() {
    // the windows share menu looks ugly, so only show it on mobile which looks nice
    if (navigator.maxTouchPoints > 0 && navigator.share) {
      // checks for mobile
      await navigator.share({ url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
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

<header class="topbar">
  <a class="skip-link" href="#main_content">Skip to content</a>
  <a class="skip-link" href="#nav_side" onclick={() => (windowInfo.isNavOpen = true)}>Skip to navigation</a>

  <div class="topbar__inner">
    <button
      class="icon-button topbar__menu"
      aria-label="{windowInfo.isNavOpen ? 'Collapse' : 'Expand'} Sidebar"
      onclick={() => (windowInfo.isNavOpen = !windowInfo.isNavOpen)}><IconMenu /></button>
    <a class="brand-link" href="/">
      <img
        alt="Datapack Hub Logo"
        src="/logos/dph.svg"
        class="brand-link__logo {logoFlipped ? 'rotate-180' : ''} {logoBonked ? 'scale-y-50' : ''}"
        width="32"
        height="32" />
      <span class="brand-link__name">Datapack Wiki</span>
    </a>

    <div class="topbar__actions">
      <a
        href="https://github.com/Datapack-Hub/wiki/blob/main/src/routes{editPath}/%2Bpage.svx"
        class="icon-button"
        aria-label="Edit this page on GitHub"
        title="Edit this page">
        <IconEdit />
        <span class="icon-button__label">Edit</span>
      </a>
      <button
        class="icon-button"
        aria-label={shareText === "Copied!" ? "Page URL copied" : "Share this page"}
        title="Share this page"
        onclick={copyUrl}>
        <IconShare />
        <span class="icon-button__label" aria-live="polite">{shareText}</span>
      </button>
      <a
        href="https://discord.gg/xHTHbZqXr6"
        class="icon-button"
        aria-label="Join the Datapack Hub Discord"
        title="Join Discord">
        <IconDiscord />
        <span class="icon-button__label">Discord</span>
      </a>
    </div>
  </div>
</header>
