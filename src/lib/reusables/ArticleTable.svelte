<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLTableAttributes } from "svelte/elements";

  type Props = HTMLTableAttributes & {
    children: Snippet;
  };

  let { children, ...attributes }: Props = $props();
</script>

<div class="article-table-scroll">
  <table {...attributes}>
    {@render children()}
  </table>
</div>

<style>
  .article-table-scroll {
    width: 100%;
    margin-block: 1.5rem;
    overflow-x: auto;
  }

  .article-table-scroll > table {
    display: table;
    width: 100%;
    margin: 0;
    border: 1px solid var(--border);
    border-radius: 0;
    border-collapse: separate;
    border-spacing: 0;
    font-size: 0.92rem;
  }
</style>
