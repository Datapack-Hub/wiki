<script lang="ts">
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const Component = $derived(data.component);
</script>

<Component />
