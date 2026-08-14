<script lang="ts">
  import { windowInfo } from "$lib/stores.svelte";
  import { createSearchIndex, search } from "../search";
  import { page } from "$app/state";
  import { DEFAULT_LANG, isLang, localizeHref, stripLangPrefix, t } from "$lib/i18n";

  type Props = {
    results: any[];
    keyActivated?: boolean;
  };

  let { results = $bindable([]), keyActivated }: Props = $props();
  let dialog: HTMLDialogElement = $state()!;
  let diagInput: HTMLInputElement = $state()!;

  let searchTerm = $state("");
  let searchState: "waiting" | "done" = $state("waiting");

  const lang = $derived(isLang(page.params.locale) ? page.params.locale : DEFAULT_LANG);

  export async function showModalWithEvent(e: KeyboardEvent) {
    if (!keyActivated) {
      return;
    }
    e.preventDefault();
    await showModal();
  }

  export async function showModal() {
    dialog.showModal();
    if (searchState === "waiting") {
      const posts = await fetch("/search.json").then(r => r.json());
      createSearchIndex(posts);
    }
    searchState = "done";
    diagInput.focus();
    diagInput.select();
  }

  $effect(() => {
    if (searchState === "done") {
      results = search(searchTerm);
    }
  });

  function resultHref(url: string) {
    return localizeHref(stripLangPrefix(url), lang);
  }
</script>

<svelte:window
  onkeydown={e => (e.key == "k" && e.ctrlKey ? showModalWithEvent(e) : null)}
  onclick={e => {
    e.target === dialog ? dialog.close() : null;
  }} />

<dialog
  bind:this={dialog}
  class="w-[90%] md:w-3/4 lg:w-1/2 xl:w-1/3 bg-transparent backdrop:bg-black/50 backdrop:backdrop-blur-sm mx-auto top-1/3 not-prose">
  <div class="bg-stone-800 w-full p-4 gap-1 rounded-md">
    <input
      class="bg-stone-900 w-full rounded-sm focus:outline-0 text-white p-2 placeholder:text-stone-500 disabled:cursor-not-allowed disabled:bg-stone-900/50"
      disabled={searchState === "waiting"}
      name="search-box"
      autocomplete="off"
      spellcheck="false"
      placeholder={t(lang, "search.placeholder")}
      bind:this={diagInput}
      bind:value={searchTerm} />
    <div class="overflow-y-auto max-h-[50vh]">
      {#each results as result}
        <a
          onclick={() => {
            dialog.close();
            if (windowInfo.width < 640) {
              windowInfo.isNavOpen = false;
            }
          }}
          href={resultHref(result.url)}>
          <div class="p-2 my-2 rounded-sm hover:bg-black/20 motion-safe:transition-all">
            <p class="text-stone-200 text-lg">
              {@html result.title}
              <span class="text-stone-400 text-xs">{resultHref(result.url)}</span>
            </p>
            <p class="text-stone-400 line-clamp-2">{@html result.content}</p>
          </div>
        </a>
      {/each}
    </div>
    <p class="text-stone-400 mt-2">
      {searchTerm === ""
        ? ""
        : searchState === "waiting"
          ? "Loading data..."
          : results.length === 0
            ? "No results"
            : results.length + " result(s) found!"}
    </p>

    <button class="bg-stone-700 w-full rounded-sm p-2 mt-2 text-white cursor-pointer" onclick={() => dialog.close()}
      >Close</button>
  </div>
</dialog>
