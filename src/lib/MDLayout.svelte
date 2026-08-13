<script module lang="ts">
  export { default as img } from "./reusables/ArticleImage.svelte";
</script>

<script lang="ts">
  import { page } from "$app/state";
  import Seo from "sk-seo";
  import type { Snippet } from "svelte";
  import Version from "./reusables/Version.svelte";

  type Props = {
    title: string;
    description: string;
    tags: string;
    version: string;
    children: Snippet;
  };

  const { children, title, description, version, tags = "" }: Props = $props();

  let tagsArr = $derived(
    tags
      .split(",")
      .map(el => el.trim())
      .filter(String)
  );
</script>

<Seo
  title="{title ? title + ' - ' : ''} Datapack Wiki"
  {description}
  author="Datapack Wiki"
  siteName="Datapack Wiki"
  keywords="datapacks, datapack wiki, datapack docs, minecraft datapacks, datapack help, datapack creation, dph"
  name="Datapack Wiki"
  schemaOrg={true}
  canonical="https://datapack.wiki{page.url.pathname}"
  socials={[
    "https://discord.datapackhub.net",
    "https://planetminecraft.com/group/datapack_hub/",
    "https://github.com/Datapack-Hub",
    "https://x.com/DatapackHub",
    "https://instagram.com/datapackhub",
  ]} />

<main class="md article-shell" class:home-page={page.url.pathname === "/"} id="main_content">
  {#if version}
    <Version {version} />
  {/if}
  {@render children()}
  {#if tags}
    <div class="article-tags not-prose">
      <span class="article-tags__label">Tags</span>
      {#each tagsArr as tag}
        <span class="article-tag">{tag}</span>
      {/each}
    </div>
  {/if}
</main>
