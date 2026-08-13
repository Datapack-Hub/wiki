<script lang="ts">
  import { windowInfo } from "$lib/stores.svelte";

  const { label } = $props();
</script>

<span class="uppercase text-sm mt-4 text-stone-400 {windowInfo.isNavOpen ? 'block' : 'hidden'}">{label}</span>
