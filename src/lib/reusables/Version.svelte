<script lang="ts">
  import { latestMCData } from "$lib/stores.svelte";
  import IconTick from "~icons/tabler/rosette-discount-check";
  import IconPencil from "~icons/tabler/pencil";

  interface Props {
    version: string;
  }

  let { version }: Props = $props();
</script>

<div
  class="version-callout {version == latestMCData.gameVersion
    ? 'version-callout--current'
    : 'version-callout--outdated'} not-prose">
  {#if version == latestMCData.gameVersion}
    <IconTick />
    <span>Validated for Minecraft Java {version}</span>
  {:else}
    <IconPencil />
    <span>
      Last reviewed for Minecraft {version}. Newer releases may include changes that are not covered on this page.
    </span>
  {/if}
</div>
