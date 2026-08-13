<script lang="ts">
  // NEVER MOVE THIS INTO APP.CSS IT WILL BREAK
  // - cbble_
  import "../styles/app.css";
  import "../styles/fonts.css";

  import Sidebar from "$lib/sidebar/Sidebar.svelte";
  import Topbar from "../lib/Topbar.svelte";

  import { windowInfo } from "$lib/stores.svelte";
  import type { Snippet } from "svelte";
  import { innerWidth } from "svelte/reactivity/window";
  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();

  let initialized = false;

  $effect(() => {
    const width = innerWidth.current || 1920;
    const wasDesktop = windowInfo.width >= 768;
    const isDesktop = width >= 768;

    windowInfo.width = width;
    if (!initialized || wasDesktop !== isDesktop) {
      windowInfo.isNavOpen = isDesktop;
      initialized = true;
    }
  });

  $effect(() => {
    console.log("%c📦 Datapack Wiki", `color: oklch(69.27% 0.2042 40.82); font-size: 24pt; font-weight: 600;`);
    console.log("If you know what you're doing here, and you want to help develop the wiki, contact a DPH admin.");
    console.log("Or just chill here, I'm a website, I can't stop you.");
  });
</script>

<div class="app-shell">
  <Topbar />
  <div class="app-frame">
    <Sidebar />
    <div id="content" class="content-shell">
      {@render children()}
    </div>
  </div>
</div>
