<script lang="ts">
  import IconBrandDiscord from "~icons/tabler/brand-discord";
  import IconBrandGithub from "~icons/tabler/brand-github";
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
  let themeTransitionActive = false;

  let shareText = $state("Share");
  let editPath = $derived(page.url.pathname === "/" ? "" : page.url.pathname.replace(/\/$/, ""));
  let editHref = $derived(`https://github.com/Datapack-Hub/wiki/blob/main/src/routes${editPath}/%2Bpage.svx`);
  let editNoticeOpen = $state(false);
  let editNoticePath = $state<string | null>(null);

  const editNoticeStorageKey = "datapack-wiki-edit-notice";

  function hasSeenEditNotice() {
    try {
      return sessionStorage.getItem(editNoticeStorageKey) === page.url.pathname;
    } catch {
      return false;
    }
  }

  function rememberEditNotice() {
    try {
      sessionStorage.setItem(editNoticeStorageKey, page.url.pathname);
    } catch {}
  }

  function handleEditClick(event: MouseEvent) {
    if (hasSeenEditNotice()) return;

    event.preventDefault();
    editNoticePath = page.url.pathname;
    editNoticeOpen = true;
  }

  function closeEditNotice() {
    rememberEditNotice();
    editNoticeOpen = false;
  }

  function applyTheme(theme: Theme) {
    currentTheme = theme;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document
      .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#ebece6" : "#0c0908");
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

  function persistTheme(theme: Theme) {
    try {
      localStorage.setItem(themeStorageKey, theme);
    } catch {}
  }

  function getThemeTransitionOrigin(event: MouseEvent) {
    const button = event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
    const bounds = button?.getBoundingClientRect();
    const width = document.documentElement.clientWidth || window.innerWidth;
    const height = document.documentElement.clientHeight || window.innerHeight;
    const fallbackX = bounds ? bounds.left + bounds.width / 2 : width / 2;
    const fallbackY = bounds ? bounds.top + bounds.height / 2 : height / 2;
    const x = event.detail === 0 ? fallbackX : event.clientX;
    const y = event.detail === 0 ? fallbackY : event.clientY;

    return {
      x: Math.min(Math.max(x, 0), width),
      y: Math.min(Math.max(y, 0), height),
      width,
      height,
    };
  }

  function toggleTheme(event: MouseEvent) {
    const theme: Theme = currentTheme === "light" ? "dark" : "light";
    const updateTheme = () => {
      applyTheme(theme);
      persistTheme(theme);
    };

    // @ts-ignore
    if (!document.startViewTransition) {
      updateTheme();
      return;
    }

    if (themeTransitionActive) return;
    themeTransitionActive = true;

    let transition;
    try {
      // @ts-ignore
      transition = document.startViewTransition(updateTheme);
    } catch {
      themeTransitionActive = false;
      updateTheme();
      return;
    }

    const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const origin = getThemeTransitionOrigin(event);

    transition.ready
      .then(() => {
        if (isTouchDevice) {
          document.documentElement.animate(
            { opacity: [0, 1] },
            {
              duration: 500,
              easing: "ease-in-out",
              pseudoElement: "::view-transition-new(root)",
            }
          );
          return;
        }

        const endRadius = Math.hypot(
          Math.max(origin.x, origin.width - origin.x),
          Math.max(origin.y, origin.height - origin.y)
        );
        const clipPath = [
          `circle(0px at ${origin.x}px ${origin.y}px)`,
          `circle(${endRadius}px at ${origin.x}px ${origin.y}px)`,
        ];
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
      })
      .catch(() => {});

    transition.finished.then(
      () => (themeTransitionActive = false),
      () => (themeTransitionActive = false)
    );
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
        href={editHref}
        class="icon-button"
        aria-label="Edit this page on GitHub"
        title="Edit this page"
        onclick={handleEditClick}>
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

{#if editNoticeOpen && editNoticePath === page.url.pathname}
  <div class="edit-notice-backdrop" role="presentation" onclick={closeEditNotice}></div>
  <dialog
    open
    class="edit-notice"
    aria-modal="true"
    aria-labelledby="edit-notice-title"
    aria-describedby="edit-notice-description">
    <div class="edit-notice__header">
      <div>
        <p class="edit-notice__eyebrow">Before you contribute</p>
        <h2 id="edit-notice-title">Ready to edit this page?</h2>
      </div>
      <button class="icon-button edit-notice__close" type="button" aria-label="Close" onclick={closeEditNotice}
        >×</button>
    </div>
    <p id="edit-notice-description">
      These two short guides explain the page structure and the Git workflow used by the wiki.
    </p>
    <div class="edit-notice__links">
      <a href="/contribute/formatting" onclick={closeEditNotice}>Page Formatting <span aria-hidden="true">→</span></a>
      <a href="/contribute/git-practices" onclick={closeEditNotice}>Git Practices <span aria-hidden="true">→</span></a>
    </div>
    <a class="edit-notice__continue" href={editHref} onclick={closeEditNotice}>
      Continue to edit on <IconBrandGithub aria-hidden="true" /> GitHub
    </a>
  </dialog>
{/if}
