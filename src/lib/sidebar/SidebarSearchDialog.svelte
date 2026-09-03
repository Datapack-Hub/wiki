<script lang="ts">
  import { tick } from "svelte";
  import { windowInfo } from "$lib/stores.svelte";
  import { createSearchIndex, search } from "../search";
  import IconSearch from "~icons/tabler/search";

  type Props = {
    results: any[];
    keyActivated?: boolean;
  };

  let { results = $bindable([]), keyActivated }: Props = $props();
  let dialog: HTMLDialogElement = $state()!;
  let diagInput: HTMLInputElement = $state()!;

  let searchTerm = $state("");
  let searchState: "waiting" | "loading" | "done" | "error" = $state("waiting");

  async function focusSearchInput() {
    await tick();

    if (!diagInput.disabled) {
      diagInput.focus();
      diagInput.select();
    }
  }

  export async function showModalWithEvent(e: KeyboardEvent) {
    if (!keyActivated) return;

    e.preventDefault();
    await showModal();
  }

  export async function showModal() {
    if (!dialog.open) dialog.showModal();
    await focusSearchInput();

    if (searchState === "waiting") {
      searchState = "loading";
      try {
        const posts = await fetch("/search.json").then(r => {
          if (!r.ok) throw new Error("Search index failed to load");
          return r.json();
        });
        createSearchIndex(posts);
        searchState = "done";
      } catch {
        searchState = "error";
      }
    }

    await focusSearchInput();
  }

  $effect(() => {
    if (searchState === "done") {
      results = searchTerm.trim() ? search(searchTerm) : [];
    }
  });
</script>

<svelte:window
  onkeydown={e => (e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey) ? showModalWithEvent(e) : null)}
  onclick={e => {
    e.target === dialog ? dialog.close() : null;
  }} />

<dialog bind:this={dialog} class="search-dialog not-prose" aria-label="Search the Datapack Wiki">
  <div class="search-dialog__form">
    <IconSearch />
    <input
      class="search-dialog__input"
      disabled={searchState === "loading"}
      name="search-box"
      aria-label="Search pages"
      autocomplete="off"
      spellcheck="false"
      placeholder="Search for a page..."
      bind:this={diagInput}
      bind:value={searchTerm} />
    <button type="button" class="search-dialog__escape" aria-label="Close search" onclick={() => dialog.close()}
      >ESC</button>
  </div>

  <div class="search-dialog__results">
    {#if searchState === "loading"}
      <div class="search-dialog__empty">Preparing search...</div>
    {:else if searchState === "error"}
      <div class="search-dialog__empty">Search could not be loaded. Please try again.</div>
    {:else if searchTerm.trim() === ""}
      <div class="search-dialog__empty">Search guides, concepts, commands, and datapack files.</div>
    {:else if results.length === 0}
      <div class="search-dialog__empty">No pages found for “{searchTerm}”.</div>
    {:else}
      {#each results as result}
        <a
          class="search-result"
          onclick={() => {
            dialog.close();
            if (windowInfo.width < 768) windowInfo.isNavOpen = false;
          }}
          href={result.url}>
          <div class="search-result__topline">
            <span class="search-result__title">{@html result.title}</span>
            <span class="search-result__url">{result.url}</span>
          </div>
          {#if result.content?.[0]}
            <span class="search-result__snippet">{@html result.content[0]}</span>
          {/if}
        </a>
      {/each}
    {/if}
  </div>

  <div class="search-dialog__footer">
    <span aria-live="polite">
      {searchTerm.trim() && searchState === "done"
        ? `${results.length} ${results.length === 1 ? "result" : "results"}`
        : "Search guides, concepts, commands, and datapack files."}
    </span>
    <button class="search-dialog__close" onclick={() => dialog.close()}>Close</button>
  </div>
</dialog>
