<script lang="ts">
  import { windowInfo } from "$lib/stores.svelte";
  import { page } from "$app/state";
  import {
    DEFAULT_LANG,
    isLang,
    localizeHref,
    stripLangPrefix,
  } from "$lib/i18n";

  type Props = {
    icon: any;
    page: string;
    label: string;
  };

  const { icon, page: wikiPage, label }: Props = $props();

  const Icon = $derived(icon);
  const lang = $derived(isLang(page.params.locale) ? page.params.locale : DEFAULT_LANG);
  const href = $derived(localizeHref(wikiPage, lang));
  const isActive = $derived(stripLangPrefix(page.url.pathname) === wikiPage);
</script>

<a
  {href}
  onclick={() => (windowInfo.width < 768 ? (windowInfo.isNavOpen = !windowInfo.isNavOpen) : null)}
  class="hover:bg-stone-700 hover:text-white hover:font-medium py-1 rounded-lg flex gap-2 pl-1 items-center focus-visible:outline-2 focus-visible:outline-dph-orange {isActive
    ? 'bg-stone-900/70'
    : ''}">
  <Icon />

  {#if windowInfo.isNavOpen}
    <span>{label}</span>
  {/if}
</a>
