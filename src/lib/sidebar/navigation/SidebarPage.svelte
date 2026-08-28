<script lang="ts">
  import { windowInfo } from "$lib/stores.svelte";
  import { page } from "$app/state";
  import type { RouteId } from "$app/types";

  type Props = {
    icon: any;
    page: RouteId;
    label: string;
  };

  const { icon, page: wikiPage, label }: Props = $props();

  const Icon = $derived(icon);
</script>

<a
  href={wikiPage}
  onclick={() => (windowInfo.width < 768 ? (windowInfo.isNavOpen = !windowInfo.isNavOpen) : null)}
  aria-current={wikiPage === page.route.id ? "page" : undefined}
  title={windowInfo.isNavOpen ? undefined : label}
  class="nav-item {wikiPage === page.route.id ? 'nav-item--active' : ''}">
  <Icon />
  <span>{label}</span>
</a>
