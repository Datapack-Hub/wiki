<script lang="ts">
  import IconLoader from "~icons/tabler/loader2";
  import SidebarPlaceholder from "../navigation/SidebarPlaceholder.svelte";
  import { windowInfo } from "$lib/stores.svelte";
  import { page } from "$app/state";
  import { DEFAULT_LANG, isLang, t } from "$lib/i18n";

  type Versions = "pre-1_21_11" | "latest";

  interface Props {
    page: "wiki" | "guides";
  }

  const { page: tab }: Props = $props();

  let version: Versions = $state("latest");
  const lang = $derived(isLang(page.params.locale) ? page.params.locale : DEFAULT_LANG);
</script>

<select
  name="version"
  id="version"
  aria-label={t(lang, "version.selector")}
  bind:value={version}
  class="bg-stone-900 hover:bg-stone-950 hover:border-stone-950 p-2 w-full rounded-lg focus-visible:outline-2 accent-dph-orange focus-visible:outline-dph-orange mt-1 mb-2 border-r-8 border-stone-900 {windowInfo.isNavOpen
    ? ''
    : 'hidden'}">
  <option value="latest">Latest</option>
  <option value="pre-1_21_11">1.21.10</option>
</select>

{#if tab == "wiki"}
  {#await import(`./${version}/WikiPages.svelte`)}
    <div class="cursor-not-allowed py-1 rounded-lg flex gap-2 pl-1 items-center text-stone-500">
      <IconLoader class="animate-spin" />

      {#if windowInfo.isNavOpen}
        <span>{t(lang, "version.loadingWiki")}</span>
      {/if}
    </div>
  {:then WPage}
    <WPage.default />
  {:catch}
    <SidebarPlaceholder label={t(lang, "version.failed")} icon={IconLoader} />
  {/await}
{:else if tab == "guides"}
  {#await import(`./${version}/Guides.svelte`)}
    <div class="cursor-not-allowed py-1 rounded-lg flex gap-2 pl-1 items-center text-stone-500">
      <IconLoader class="animate-spin" />

      {#if windowInfo.isNavOpen}
        <span>{t(lang, "version.loadingGuides")}</span>
      {/if}
    </div>
  {:then GPage}
    <GPage.default />
  {:catch}
    <SidebarPlaceholder label={t(lang, "version.failed")} icon={IconLoader} />
  {/await}
{/if}
