<script lang="ts">
  import IconArrowUpRight from "~icons/tabler/arrow-up-right";

  type Props = {
    href: string;
    title: string;
    type: string;
    color: string;
    description?: string;
  };

  const { href, title, type, color, description = "" }: Props = $props();
</script>

<a class="resource-card" {href} style="--resource-color: {color};">
  <span class="resource-card__type">{type}</span>
  <h3>{title}</h3>
  {#if description}
    <p>{description}</p>
  {/if}
  <IconArrowUpRight class="resource-card__arrow" aria-hidden="true" />
</a>
