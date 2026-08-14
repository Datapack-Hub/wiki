<script lang="ts">
  import IconDiscord from "~icons/tabler/brand-discord";
  import IconShare from "~icons/tabler/share";
  import IconMenu from "~icons/tabler/menu-2";
  import IconEdit from "~icons/tabler/pencil";

  import { windowInfo } from "$lib/stores.svelte";
  import { page } from "$app/state";
  import LanguagePicker from "$lib/LanguagePicker.svelte";
  import {
    DEFAULT_LANG,
    isLang,
    stripLangPrefix,
    t,
  } from "$lib/i18n";

  let shareText = $state(t(DEFAULT_LANG, "topbar.share"));

  const lang = $derived(isLang(page.params.locale) ? page.params.locale : DEFAULT_LANG);

  $effect(() => {
    shareText = t(lang, "topbar.share");
  });

  const editPath = $derived.by(() => {
    const contentPath = page.data.contentPath as string | undefined;
    if (contentPath?.startsWith("/src/")) {
      return contentPath.slice(1); // src/pages/...
    }
    const rest = stripLangPrefix(page.url.pathname);
    const slug = rest === "/" ? "" : rest;
    return `src/pages/${DEFAULT_LANG}${slug}/+page.svx`;
  });

  function copyUrl() {
    if (navigator.maxTouchPoints > 0 && navigator.share) {
      navigator.share({ url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      shareText = t(lang, "topbar.copied");
      setTimeout(() => {
        shareText = t(lang, "topbar.share");
      }, 2000);
    }
  }

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
    href="#nav_side">{t(lang, "nav.goToNav")}</a>
  <a
    class="absolute -translate-y-30 -translate-x-1/2 left-1/2 focus-visible:outline-2 outline-blue-500 focus-visible:translate-y-0"
    href="#main_content">{t(lang, "nav.goToContent")}</a>
  <div class="flex items-center grow">
    <button
      class="px-2 pr-3 sm:hidden focus-visible:outline-2 focus-visible:outline-dph-orange"
      aria-label="{windowInfo.isNavOpen ? t(lang, 'nav.collapseSidebar') : t(lang, 'nav.expandSidebar')}"
      onclick={() => (windowInfo.isNavOpen = !windowInfo.isNavOpen)}><IconMenu /></button>
    <a
      class="flex items-center hover:text-white p-1 focus-visible:outline-2 focus-visible:outline-dph-orange"
      href="/{lang}">
      <img
        alt="Datapack Hub Logo"
        src="/logos/dph.svg"
        class="h-8 mr-2 {logoFlipped ? 'rotate-180' : ''} {logoBonked ? 'scale-y-50' : ''} transition-transform"
        width="32"
        height="32" />
      <h1 class="font-bold hidden text-lg lg:text-xl sm:block">{t(lang, "brand.name")}</h1>
    </a>
  </div>

  <div class="flex items-center gap-2">
    <LanguagePicker />
    <a
      href="https://github.com/Datapack-Hub/wiki/blob/main/{editPath}"
      class="p-2 rounded-lg py-1 flex items-center gap-2 hover:bg-stone-700 hover:text-white hover:font-medium aspect-square sm:aspect-auto focus-visible:outline-2 focus-visible:outline-dph-orange"
      aria-label={t(lang, "topbar.edit")}>
      <IconEdit />
      <span class="hidden sm:block">{t(lang, "topbar.edit")}</span>
    </a>
    <button
      class="p-2 rounded-lg py-1 flex items-center gap-2 hover:bg-stone-700 hover:text-white hover:font-medium aspect-square sm:aspect-auto focus-visible:outline-2 focus-visible:outline-dph-orange cursor-pointer"
      aria-label={t(lang, "topbar.share")}
      onclick={copyUrl}>
      <IconShare />
      <span class="hidden sm:block">{shareText}</span>
    </button>
    <a
      href="https://discord.gg/xHTHbZqXr6"
      class="p-2 rounded-lg py-1 flex items-center gap-2 hover:bg-stone-700 hover:text-white hover:font-medium aspect-square sm:aspect-auto focus-visible:outline-2 focus-visible:outline-dph-orange"
      aria-label={t(lang, "topbar.discord")}>
      <IconDiscord />
      <span class="hidden sm:block">{t(lang, "topbar.discord")}</span>
    </a>
  </div>
</div>
