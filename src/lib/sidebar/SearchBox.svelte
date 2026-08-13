<script lang="ts">
  // ! IMPORTANT: If you want to add pages or categories, this is not the place to do it!

  import IconSearch from "~icons/tabler/search";
  import SidebarSearchDialog from "./SidebarSearchDialog.svelte";

  let dialog: any;
  let results: Page[] = $state([]);

  type Props = {
    keyActivated?: boolean;
    variant?: "sidebar" | "hero";
  };

  let { keyActivated = false, variant = "sidebar" }: Props = $props();

  const prompt = $derived(variant === "hero" ? "Search guides, concepts, commands..." : "Search pages");
</script>

<button
  aria-haspopup="dialog"
  class="search-trigger search-trigger--{variant}"
  onclick={async () => await dialog.showModal()}>
  <span class="search-trigger__prompt">
    <IconSearch />
    <span class="search-trigger__label">{prompt}</span>
  </span>
  <kbd aria-hidden="true">⌘ / Ctrl K</kbd>
</button>

<SidebarSearchDialog {keyActivated} bind:results bind:this={dialog} />
