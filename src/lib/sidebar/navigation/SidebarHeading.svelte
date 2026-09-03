<script lang="ts">
  import { windowInfo } from "$lib/stores.svelte";

  const { label } = $props();
</script>

<span class="nav-heading {windowInfo.isNavOpen ? 'block' : 'hidden'}">{label}</span>
