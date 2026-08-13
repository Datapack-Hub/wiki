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
      Last reviewed for Minecraft {version}. Newer releases may include changes that are not covered on this page.
    </span>
  {/if}
</div>
