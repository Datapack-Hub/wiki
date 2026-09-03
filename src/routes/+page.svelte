<script lang="ts">
  import { page } from "$app/state";
  import SearchBox from "$lib/sidebar/SearchBox.svelte";
  import IconArrowDown from "~icons/tabler/arrow-down";
  import IconArrowRight from "~icons/tabler/arrow-right";
  import IconBraces from "~icons/tabler/braces";
  import IconCode from "~icons/tabler/code";
  import IconFiles from "~icons/tabler/folders";
  import IconBrandDiscord from "~icons/tabler/brand-discord";
  import IconGithub from "~icons/tabler/brand-github";
  import IconSparkles from "~icons/tabler/sparkles";
  import Seo from "sk-seo";
</script>

<Seo
  title="Home - Datapack Wiki"
  description="Learn how to build Minecraft datapacks with practical guides, clear command references, and community-maintained documentation."
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

<div class="home-landing not-prose article-shell">
  <section class="home-hero" aria-labelledby="home-title">
    <header class="home-hero__heading">
      <p class="home-eyebrow">Minecraft Java · Community wiki</p>
      <h1 id="home-title">Datapacking Explained</h1>
    </header>

    <div class="home-hero__intro">
      <p class="home-hero__lede">
        Guides, examples, and references for Minecraft Java data packs. Find the information you need, troubleshoot
        problems, and get back to building.
      </p>

      <div class="home-hero__search">
        <SearchBox variant="hero" />
      </div>
    </div>

    <div class="home-code-card" aria-label="Example datapack function">
      <div class="home-code-card__bar">
        <span class="home-code-card__language">mcfunction</span>
        <span class="home-code-card__path">data/wiki/function/tick.mcfunction</span>
      </div>
      <pre><code
          ><span class="code-comment"># Run once every game tick</span>
<span class="code-command">execute</span> <span class="code-keyword">as</span> @a <span class="code-keyword"
            >run function</span> wiki:tick
<span class="code-command">scoreboard</span> players add @s play_time <span class="code-number">1</span></code></pre>
      <div class="home-code-card__status">
        <span>
          <i></i>
          <span class="code-keyword">Data Pack Format:</span>
          <span class="code-number">{page.data.packFormat}</span> <span aria-hidden="true"> · </span>
          <span class="code-keyword">Resource Pack Format:</span>
          <span class="code-number">{page.data.resourcePackFormat}</span>
        </span>
        <span class="home-code-card__version"> <span>Minecraft Java {page.data.gameVersion}</span> </span>
      </div>
    </div>
  </section>

  <a class="home-scroll-cue" href="#quick-links">
    <span>More to explore</span>
    <IconArrowDown aria-hidden="true" />
  </a>

  <section class="home-section home-explore" id="quick-links" aria-labelledby="explore-wiki">
    <div class="home-section__heading">
      <div>
        <p class="home-kicker">Quick links</p>
        <h2 id="explore-wiki">Explore the wiki</h2>
      </div>
    </div>

    <div class="home-topic-grid">
      <a class="home-topic" href="/wiki/concepts/commands">
        <span class="home-topic__icon"><IconCode /></span>
        <span><strong>Commands</strong><small>Syntax, execution, and context</small></span>
        <IconArrowRight />
      </a>
      <a class="home-topic" href="/wiki/files/functions">
        <span class="home-topic__icon"><IconFiles /></span>
        <span><strong>Datapack files</strong><small>Functions, recipes, tags, and more</small></span>
        <IconArrowRight />
      </a>
      <a class="home-topic" href="/wiki/nbt-scoreboards/nbt">
        <span class="home-topic__icon"><IconBraces /></span>
        <span><strong>NBT & scoreboards</strong><small>Store and manipulate game data</small></span>
        <IconArrowRight />
      </a>
      <a class="home-topic" href="/wiki/worldgen/custom-worldgen">
        <span class="home-topic__icon"><IconSparkles /></span>
        <span><strong>World generation</strong><small>Shape custom Minecraft worlds</small></span>
        <IconArrowRight />
      </a>
    </div>
  </section>

  <section class="home-community" aria-labelledby="community-heading">
    <div class="home-community__copy">
      <p class="home-kicker">Open source, always</p>
      <h2 id="community-heading">Built by the people who use it.</h2>
      <p>
        Every page is written and reviewed by datapackers. Ask a question on Discord, fix a mistake, or add the guide
        you wish you'd had.
      </p>
    </div>
    <div class="home-community__actions">
      <a class="home-button home-button--primary" href="https://discord.gg/xHTHbZqXr6">
        <IconBrandDiscord /> Join Discord
      </a>
      <a class="home-button home-button--secondary" href="https://github.com/Datapack-Hub/wiki/">
        <IconGithub /> Contribute on GitHub
      </a>
    </div>
  </section>
</div>
