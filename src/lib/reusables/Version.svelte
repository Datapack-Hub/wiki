<script lang="ts">
  import { page } from "$app/state";
  import IconTick from "~icons/tabler/rosette-discount-check";
  import IconPencil from "~icons/tabler/pencil";
  interface Props {
    version: string;
  }

  let { version }: Props = $props();
</script>

<div
  class="version-callout {version == page.data.gameVersion
    ? 'version-callout--current'
    : 'version-callout--outdated'} not-prose">
  {#if version == page.data.gameVersion}
    <IconTick />
    <span>Validated for Minecraft Java {version}</span>
  {:else}
    <IconPencil />
    <span>
      {#if version == latestMCData.gameVersion}
        This page is validated and up to date with Minecraft Java: {version}
      {:else}
        This page was last updated with information for Minecraft {version}, and may be missing new features and
        changes. There is a chance it still works, but try it at your own risk!
      {/if}
    </span>
  </div>
</div>
