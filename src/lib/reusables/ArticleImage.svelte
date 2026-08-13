<script lang="ts">
  import type { HTMLImgAttributes } from "svelte/elements";

  let { alt = "", ...attributes }: HTMLImgAttributes = $props();
</script>

<span class="article-image-frame">
  <img {alt} {...attributes} />
</span>

<style>
  .article-image-frame {
    --pixel-frame-color: var(--border);

    position: relative;
    display: block;
    width: fit-content;
    max-width: 100%;
    margin-block: 1.5rem;
    border: 1px solid transparent;
    line-height: 0;
    clip-path: var(--pixel-corners);
  }

  .article-image-frame::after {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: var(--pixel-frame-outline);
    color: var(--pixel-frame-color);
    content: "";
    pointer-events: none;
  }

  .article-image-frame > img {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 0;
    border: 0;
    border-radius: 0;
  }
</style>
