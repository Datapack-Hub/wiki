<script lang="ts">
  // Page imports
  import SidebarPage from "$lib/sidebar/navigation/SidebarPage.svelte";
  import SidebarCategory from "$lib/sidebar/navigation/SidebarCategory.svelte";
  import SidebarHeading from "$lib/sidebar/navigation/SidebarHeading.svelte";
  import SidebarPlaceholder from "$lib/sidebar/navigation/SidebarPlaceholder.svelte";

  // Icon imports
  // https://tabler-icons.io
  // import Icon<whatever name> from "~icons/tabler/<icon ID>"

  import IconHome from "~icons/tabler/home";
  import IconAt from "~icons/tabler/at";
  import IconZip from "~icons/tabler/file-zip";
  import IconPennant from "~icons/tabler/pennant";
  import IconCommand from "~icons/tabler/slash";
  import IconCommands from "~icons/tabler/terminal";
  import IconBraces from "~icons/tabler/braces";
  import IconStar from "~icons/tabler/star";
  import IconGrid from "~icons/tabler/grid-3x3";
  import IconPredicate from "~icons/tabler/bleach";
  import IconChest from "~icons/tabler/brand-minecraft";
  import IconWorldgen from "~icons/tabler/mountain";
  import IconFilters from "~icons/tabler/filters";
  import IconList from "~icons/tabler/list-details";
  import IconComponents from "~icons/tabler/brackets-contain";
  import IconTilde from "~icons/tabler/tilde";
  import IconInfo from "~icons/tabler/info-circle";
  import IconBreak from "~icons/tabler/egg-cracked";
  import IconNumbers from "~icons/tabler/123";
  import IconResourceLocation from "~icons/tabler/abc";
  import IconScoreboard from "~icons/tabler/Table";
  import IconRange from "~icons/tabler/math-lower";
  import IconConcepts from "~icons/tabler/blocks";
</script>

<!-- ADD PAGES AND CATEGORIES BELOW -->

<SidebarPage label="Home" icon={IconHome} page="/" />

<SidebarCategory name="Info" icon={IconInfo}>
  <SidebarPage label="Breaking Changes" icon={IconBreak} page="/wiki/info/breaking-changes" />
  <SidebarPage label="JSON format" icon={IconBraces} page="/wiki/info/json" />
</SidebarCategory>

<SidebarCategory name="Concepts" icon={IconConcepts}>
  <SidebarPage label="Commands" icon={IconCommand} page="/wiki/concepts/commands" />
  <SidebarPage label="Target Selectors" icon={IconAt} page="/wiki/concepts/target-selectors" />
  <SidebarPage label="Coordinates" icon={IconTilde} page="/wiki/concepts/coordinates" />
  <SidebarPage label="Item Components" icon={IconComponents} page="/wiki/concepts/item-components" />
  <SidebarPage label="JSON Text" icon={IconBraces} page="/wiki/concepts/text" />
  <SidebarPage label="Resource Locations" icon={IconResourceLocation} page="/wiki/concepts/resource-locations" />
  <SidebarPage label="Ranges" icon={IconRange} page="/wiki/concepts/ranges" />
</SidebarCategory>

<SidebarCategory name="Datapack Files" icon={IconZip}>
  <SidebarPage label="Functions" icon={IconPennant} page="/wiki/files/functions" />
  <SidebarPage label="Predicates" icon={IconPredicate} page="/wiki/files/predicates" />
  <SidebarPage label="Advancements" icon={IconStar} page="/wiki/files/advancements" />
  <SidebarPlaceholder label="Loot Tables" icon={IconChest} />
  <SidebarPage label="Recipes" icon={IconGrid} page="/wiki/files/recipes" />
  <SidebarPage label="Tags" icon={IconFilters} page="/wiki/files/tags" />
</SidebarCategory>

<SidebarCategory name="Command Reference" icon={IconCommands}>
  <SidebarPage label="Commands List" icon={IconList} page="/wiki/command/all" />

  <SidebarHeading label="Commonly Used" />
  <SidebarPage label="function" icon={IconCommand} page="/wiki/command/function" />
  <SidebarPage label="execute" icon={IconCommand} page="/wiki/command/execute" />
  <SidebarPage label="summon" icon={IconCommand} page="/wiki/command/summon" />
  <SidebarPage label="data" icon={IconCommand} page="/wiki/command/data" />
</SidebarCategory>

<SidebarCategory name="NBT and Scoreboards" icon={IconBraces}>
  <SidebarPage label="NBT data" icon={IconBraces} page="/wiki/nbt-scoreboards/nbt" />
  <SidebarPage label="Scoreboards" icon={IconScoreboard} page="/wiki/nbt-scoreboards/scoreboards" />
</SidebarCategory>

<SidebarPlaceholder label="Worldgen" icon={IconWorldgen} />
