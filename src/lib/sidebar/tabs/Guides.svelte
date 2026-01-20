<script lang="ts">
  // Page imports
  import SidebarPage from "$lib/sidebar/navigation/SidebarPage.svelte";
  import SidebarCategory from "$lib/sidebar/navigation/SidebarCategory.svelte";
  import SidebarHeading from "$lib/sidebar/navigation/SidebarHeading.svelte";

  // Icon imports
  // https://tabler-icons.io
  // import Icon<whatever name> from "~icons/tabler/<icon ID>"
  import IconHome from "~icons/tabler/home";
  import IconPennant from "~icons/tabler/pennant";
  import IconNew from "~icons/tabler/flask-2";
  import IconMusic from "~icons/tabler/music";
  import IconBug from "~icons/tabler/bug";
  import IconDownload from "~icons/tabler/download";
  import IconArrow from "~icons/tabler/arrow-down-left-circle";
  import IconBrackets from "~icons/tabler/code";
  import IconMouse from "~icons/tabler/mouse";
  import IconCarrot from "~icons/tabler/carrot";
  import IconEye from "~icons/tabler/eye";
  import IconApple from "~icons/tabler/apple";
  import IconSelection from "~icons/tabler/new-section";
  import IconDice from "~icons/tabler/dice-5";
  import IconID from "~icons/tabler/id-badge-2";
  import IconGrid from "~icons/tabler/grid-3x3";
  import IconItem from "~icons/tabler/icons";
  import IconServer from "~icons/tabler/server";
  import IconDifference from "~icons/tabler/layers-difference";
  import IconZip from "~icons/tabler/file-zip";
  import IconScoreboard from "~icons/tabler/table";
  import IconDivide from "~icons/tabler/divide";
  import IconList from "~icons/tabler/list";
  import IconPainting from "~icons/tabler/photo-plus";
  import IconDiamond from "~icons/tabler/diamond";
  import IconCoffee from "~icons/tabler/coffee";
  import IconVersus from "~icons/tabler/vs";
  import IconBuilding from "~icons/tabler/building-factory-2";
  import IconCottage from "~icons/tabler/building-cottage";
  import IconTrees from "~icons/tabler/trees";
  import IconPhotoPlus from "~icons/tabler/photo-plus";
  import IconBrandSpeedtest from "~icons/tabler/brand-speedtest";
  import IconRuler2 from "~icons/tabler/ruler-2";
  import IconMathMaxMin from "~icons/tabler/math-max-min";
  import IconCat from "~icons/tabler/cat";
  import IconClock from "~icons/tabler/clock";
  import IconStar from "~icons/tabler/star";
  import IconHourglass from "~icons/tabler/hourglass-empty";
  import SidebarPlaceholder from "../navigation/SidebarPlaceholder.svelte";
</script>

<!-- ADD PAGES AND CATEGORIES BELOW -->

<SidebarPage label="Home" icon={IconHome} page="/" />
<SidebarPage label="Getting Started" icon={IconPennant} page="/guide/getting-started" />

<SidebarCategory name="Datapack Meta" icon={IconZip}>
  <SidebarPage label="Installing Datapacks" icon={IconDownload} page="/guide/installing-a-datapack" />
  <SidebarPage label="Choosing a Server" icon={IconServer} page="/guide/choosing-a-server" />
  <SidebarPage label="MCFunction vs Code" icon={IconDifference} page="/guide/mcf-vs-code" />
</SidebarCategory>

<SidebarCategory name="Adding new features" icon={IconNew}>
  <SidebarPage label="Jukebox Songs" icon={IconMusic} page="/guide/adding-new-features/jukebox-songs" />
  <SidebarPage label="Painting Variants" icon={IconPainting} page="/guide/adding-new-features/painting-variants" />
  <SidebarPage label="Smithing Trims" icon={IconDiamond} page="/guide/adding-new-features/smithing-trims" />
  <SidebarPage label="Mob Variants" icon={IconCat} page="/guide/adding-new-features/mob-variants" />

  <SidebarHeading label="Custom Items" />
  <SidebarPage label="Introduction" icon={IconItem} page="/guide/adding-new-features/custom-items/intro" />
  <SidebarPage label="Custom Item Recipes" icon={IconGrid} page="/guide/adding-new-features/custom-items/crafting" />
  <SidebarPage
    label="Custom Item Models and Textures"
    icon={IconPhotoPlus}
    page="/guide/adding-new-features/custom-items/models" />
</SidebarCategory>

<SidebarCategory name="Cooldown Checks" icon={IconHourglass}>
  <SidebarPage label="Summary" icon={IconPennant} page="/guide/cooldown" />

  <SidebarHeading label="Techniques" />
  <SidebarPage label="Scoreboard" icon={IconScoreboard} page="/guide/cooldown/scoreboard" />
  <SidebarPage label="Advancement" icon={IconStar} page="/guide/cooldown/advancement" />
  <SidebarPage label="Gametime" icon={IconClock} page="/guide/cooldown/gametime" />
</SidebarCategory>

<SidebarCategory name="Right Click Detection" icon={IconMouse}>
  <SidebarPage label="Summary" icon={IconPennant} page="/guide/right-click" />

  <SidebarHeading label="Techniques" />
  <SidebarPage label="Carrot on a Stick" icon={IconCarrot} page="/guide/right-click/coas" />
  <SidebarPage label="Eye of Ender" icon={IconEye} page="/guide/right-click/eoe" />
  <SidebarPage label="Consumable Component" icon={IconApple} page="/guide/right-click/consumable_component" />
  <SidebarPage label="Interaction Entity" icon={IconSelection} page="/guide/right-click/interaction" />
</SidebarCategory>

<SidebarCategory name="NBT and Scores" icon={IconScoreboard}>
  <SidebarPage label="Random Numbers" icon={IconDice} page="/guide/nbt-and-scores/random-numbers" />
  <SidebarPage label="Player ID System" icon={IconID} page="/guide/nbt-and-scores/player-id-system" />
  <SidebarPage label="Floating Point Division" icon={IconDivide} page="/guide/nbt-and-scores/division" />
  <SidebarPage label="Array Iteration" icon={IconList} page="/guide/nbt-and-scores/array-iteration" />
</SidebarCategory>

<SidebarCategory name="Performance" icon={IconBrandSpeedtest}>
  <SidebarPage label="Measure Performance" icon={IconRuler2} page="/guide/performance/how-to-measure" />
  <SidebarPage label="Write Optimized Code" icon={IconMathMaxMin} page="/guide/performance/write-optimized-code" />
</SidebarCategory>

<SidebarCategory name="Datapacks for Mods" icon={IconCoffee}>
  <SidebarPage label="Mods vs Datapacks" icon={IconVersus} page="/guide/datapacks-for-mods/mods-vs-datapacks" />
  <SidebarPlaceholder label="Create" icon={IconBuilding} />
  <SidebarPlaceholder label="Farmer's Delight" icon={IconCottage} />
  <SidebarPlaceholder label="Twilight Forest" icon={IconTrees} />
</SidebarCategory>

<SidebarCategory name="Misc" icon={IconBrackets}>
  <SidebarPage label="Debugging" icon={IconBug} page="/guide/misc/debugging" />
  <SidebarPage label="Raycasts" icon={IconArrow} page="/guide/misc/raycasts" />
  <SidebarPage label="Slowcasts" icon={IconArrow} page="/guide/misc/slowcasts" />
</SidebarCategory>
