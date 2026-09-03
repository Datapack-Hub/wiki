<script lang="ts">
  import { tick } from "svelte";
  import { page as appPage } from "$app/state";
  import { windowInfo } from "$lib/stores.svelte";
  import IconChevronDown from "~icons/tabler/chevron-down";
  import IconCheck from "~icons/tabler/check";
  import IconLoader from "~icons/tabler/loader-2";
  import SidebarPlaceholder from "../navigation/SidebarPlaceholder.svelte";

  interface Props {
    page: "wiki" | "guides";
  }

  const versions = [
    { value: "latest", label: "Latest" },
    { value: "pre-1_21_11", label: "1.21.10" },
  ] as const;

  type Version = (typeof versions)[number]["value"];

  let { page }: Props = $props();

  let version: Version = $state("latest");
  let isOpen = $state(false);
  let root: HTMLDivElement = $state()!;
  let trigger: HTMLButtonElement = $state()!;
  let lastPath = appPage.url.pathname;
  let lastContentPage: Props["page"] | undefined;

  const selectedVersion = $derived(versions.find(option => option.value === version) ?? versions[0]);

  async function openMenu() {
    isOpen = true;
    await tick();
    root.querySelector<HTMLInputElement>('input[name="version"]:checked')?.focus();
  }

  async function closeMenu(returnFocus = false) {
    isOpen = false;

    if (returnFocus) {
      await tick();
      trigger.focus();
    }
  }

  function toggleMenu() {
    if (isOpen) void closeMenu();
    else void openMenu();
  }

  function handleTriggerKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      void openMenu();
    } else if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      void closeMenu(true);
    }
  }

  function handleOptionKeydown(event: KeyboardEvent, nextVersion: Version) {
    if (event.key === "Escape") {
      event.preventDefault();
      void closeMenu(true);
    } else if (event.key === "Enter") {
      event.preventDefault();
      version = nextVersion;
      void closeMenu(true);
    }
  }

  async function handleFocusOut(event: FocusEvent) {
    const currentRoot = event.currentTarget as HTMLDivElement;

    if (event.relatedTarget instanceof Node && currentRoot.contains(event.relatedTarget)) return;

    await tick();

    if (currentRoot.isConnected && !currentRoot.contains(document.activeElement)) {
      isOpen = false;
    }
  }

  function handleWindowPointerDown(event: PointerEvent) {
    if (isOpen && event.target instanceof Node && !root.contains(event.target)) {
      isOpen = false;
    }
  }

  $effect(() => {
    const pathname = appPage.url.pathname;
    const contentPage = page;
    const navOpen = windowInfo.isNavOpen;

    if (pathname !== lastPath || contentPage !== lastContentPage || !navOpen) {
      lastPath = pathname;
      lastContentPage = contentPage;
      isOpen = false;
    }
  });
</script>

<svelte:window onpointerdown={handleWindowPointerDown} />

<div
  class="version-picker {windowInfo.isNavOpen ? '' : 'hidden'}"
  class:version-picker--open={isOpen}
  bind:this={root}
  data-keyboard-scope
  onfocusout={handleFocusOut}>
  <button
    type="button"
    class="version-picker__trigger"
    aria-label="Minecraft version: {selectedVersion.label}"
    aria-expanded={isOpen}
    aria-controls="version-picker-options"
    bind:this={trigger}
    onclick={toggleMenu}
    onkeydown={handleTriggerKeydown}>
    <span>{selectedVersion.label}</span>
    <IconChevronDown class="version-picker__chevron" aria-hidden="true" />
  </button>

  {#if isOpen}
    <div class="version-picker__menu" id="version-picker-options">
      <fieldset>
        <legend class="version-picker__legend">Minecraft version</legend>

        {#each versions as option}
          <label
            class="version-picker__option"
            class:version-picker__option--selected={version === option.value}
            onpointerup={() => {
              version = option.value;
              void closeMenu(true);
            }}>
            <input
              class="version-picker__radio"
              type="radio"
              name="version"
              value={option.value}
              bind:group={version}
              onkeydown={event => handleOptionKeydown(event, option.value)} />
            <span>{option.label}</span>
            {#if version === option.value}
              <IconCheck aria-hidden="true" />
            {/if}
          </label>
        {/each}
      </fieldset>
    </div>
  {/if}
</div>

{#if page == "wiki"}
  {#await import(`./${version}/WikiPages.svelte`)}
    <div class="nav-item nav-item--placeholder">
      <IconLoader class="animate-spin" />

      {#if windowInfo.isNavOpen}
        <span>Loading Wiki Pages...</span>
      {/if}
    </div>
  {:then WPage}
    <WPage.default />
  {:catch}
    <SidebarPlaceholder label="Failed to load pages." icon={IconLoader} />
  {/await}
{:else if page == "guides"}
  {#await import(`./${version}/Guides.svelte`)}
    <div class="nav-item nav-item--placeholder">
      <IconLoader class="animate-spin" />

      {#if windowInfo.isNavOpen}
        <span>Loading Guide Pages...</span>
      {/if}
    </div>
  {:then GPage}
    <GPage.default />
  {:catch}
    <SidebarPlaceholder label="Failed to load pages." icon={IconLoader} />
  {/await}
{/if}
