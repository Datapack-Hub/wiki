<script lang="ts">
  import IconBrandDiscord from "~icons/tabler/brand-discord";
  import IconMoon from "~icons/tabler/moon";
  import IconShare from "~icons/tabler/share";
  import IconSun from "~icons/tabler/sun";
  import IconMenu from "~icons/tabler/menu-2";
  import IconEdit from "~icons/tabler/pencil";

  import { windowInfo } from "$lib/stores.svelte";
  import { page } from "$app/state";
  import { onMount } from "svelte";

  type Theme = "light" | "dark";

  const themeStorageKey = "datapack-wiki-theme";
  let currentTheme = $state<Theme>("dark");

  let shareText = $state("Share");
  let editPath = $derived(page.url.pathname === "/" ? "" : page.url.pathname.replace(/\/$/, ""));

  function applyTheme(theme: Theme) {
    currentTheme = theme;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document
      .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#e9e1da" : "#0c0908");
  }

  onMount(() => {
    applyTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== themeStorageKey) return;
      if (event.newValue === "light" || event.newValue === "dark") {
        applyTheme(event.newValue);
      } else {
        applyTheme("dark");
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  });

  function toggleTheme(event: MouseEvent) {
    const theme: Theme = currentTheme === "light" ? "dark" : "light";

    // @ts-ignore
    if (!document.startViewTransition) {
      applyTheme(theme);
      try {
        localStorage.setItem(themeStorageKey, theme);
      } catch {}
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    // @ts-ignore
    const transition = document.startViewTransition(() => {
      applyTheme(theme);
      try {
        localStorage.setItem(themeStorageKey, theme);
      } catch {}
    });

    transition.ready.then(() => {
      const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
      document.documentElement.animate(
        {
          clipPath,
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  }

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
        <IconBrandDiscord />
        <span class="icon-button__label">Discord</span>
      </a>
      <button
        type="button"
        class="icon-button theme-toggle"
        aria-label="Light theme"
        aria-pressed={currentTheme === "light"}
        title={currentTheme === "light" ? "Switch to dark theme" : "Switch to light theme"}
        onclick={toggleTheme}>
        <span class="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true"><IconSun /></span>
        <span class="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true"><IconMoon /></span>
        <span class="icon-button__label">Theme</span>
      </button>
    </div>
  </div>
</header>
