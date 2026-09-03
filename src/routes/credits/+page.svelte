<script lang="ts">
  import { page } from "$app/state";
  import Seo from "sk-seo";
  import IconArrowRight from "~icons/tabler/arrow-right";
  import IconArrowUpRight from "~icons/tabler/arrow-up-right";
  import IconBrandGithub from "~icons/tabler/brand-github";
  import IconPencil from "~icons/tabler/pencil";
  import IconShieldCheck from "~icons/tabler/shield-check";
  import IconUsers from "~icons/tabler/users";

  const administrators = [
    { name: "Silabear", href: "https://silabear.carrd.co" },
    { name: "Cobblestone", href: "https://madefrom.rocks" },
    { name: "Aandeel", href: "https://x.com/aandeel_" },
  ];

  const editors = [{ name: "Gears", href: "https://gearsdatapacks.github.io/" }];

  const contributors = [
    { name: "Diamond" },
    { name: "HeDeAn" },
    { name: "SuperAnt_" },
    { name: "SwitchedCube" },
    { name: "Kraggle09" },
    { name: "Amandin" },
    { name: "Subzeroditto" },
    { name: "TheBlackSwitch" },
  ];
</script>

<Seo
  title="Credits - Datapack Wiki"
  description="Meet the maintainers, editors, and community members who make the Datapack Wiki possible."
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

<div class="credits-page not-prose article-shell">
  <header class="credits-hero" aria-labelledby="credits-title">
    <div class="credits-hero__copy">
      <p class="credits-kicker">Community credits</p>
      <h1 id="credits-title">Credits</h1>
      <p class="credits-hero__lede">
        Every guide, correction, and example exists because someone took the time to share what they know.
      </p>
      <p class="credits-hero__body">
        Datapack Hub maintains the wiki, which continues to grow through the knowledge shared by datapackers.
      </p>
    </div>

    <dl class="credits-attribution" aria-label="Project origins">
      <div class="credits-attribution__row">
        <dt>Managed by</dt>
        <dd>
          <a href="https://datapackhub.net">
            Datapack Hub <IconArrowUpRight aria-hidden="true" />
          </a>
        </dd>
      </div>
      <div class="credits-attribution__row">
        <dt>Original idea &amp; design</dt>
        <dd>
          <a href="https://x.com/aandeel_">
            Aandeel <IconArrowUpRight aria-hidden="true" />
          </a>
        </dd>
      </div>
    </dl>
  </header>

  <div class="credits-role-grid">
    <section class="credits-group credits-group--administrators" aria-labelledby="credits-administrators">
      <header class="credits-group__header">
        <span class="credits-group__icon">
          <IconShieldCheck aria-hidden="true" />
        </span>
        <div>
          <p class="credits-kicker">Project team</p>
          <h2 id="credits-administrators">Administrators</h2>
        </div>
      </header>
      <p class="credits-group__description">
        Maintain the site, guide the project, and keep its information accessible.
      </p>
      <ul class="credits-members">
        {#each administrators as member}
          <li>
            <a class="credits-member credits-member--link" href={member.href}>
              <span class="credits-member__name">{member.name}</span>
              <IconArrowUpRight aria-hidden="true" />
            </a>
          </li>
        {/each}
      </ul>
    </section>

    <section class="credits-group credits-group--editors" aria-labelledby="credits-editors">
      <header class="credits-group__header">
        <span class="credits-group__icon">
          <IconPencil aria-hidden="true" />
        </span>
        <div>
          <p class="credits-kicker">Editorial team</p>
          <h2 id="credits-editors">Editors</h2>
        </div>
      </header>
      <p class="credits-group__description">Reviews contributions and improves docs.</p>
      <ul class="credits-members">
        {#each editors as member}
          <li>
            <a class="credits-member credits-member--link" href={member.href}>
              <span class="credits-member__name">{member.name}</span>
              <IconArrowUpRight aria-hidden="true" />
            </a>
          </li>
        {/each}
      </ul>
    </section>

    <section class="credits-group credits-group--contributors" aria-labelledby="credits-contributors">
      <header class="credits-group__header">
        <span class="credits-group__icon">
          <IconUsers aria-hidden="true" />
        </span>
        <div>
          <p class="credits-kicker">Community acknowledgements</p>
          <h2 id="credits-contributors">Contributors</h2>
        </div>
      </header>
      <p class="credits-group__description">
        These community members have written or edited pages across the wiki and guides.
      </p>
      <ul class="credits-members credits-members--contributors">
        {#each contributors as member}
          <li>
            <span class="credits-member">
              <span class="credits-member__name">{member.name}</span>
            </span>
          </li>
        {/each}
      </ul>
    </section>
  </div>

  <section class="credits-contribute" aria-labelledby="credits-contribute-title">
    <div class="credits-contribute__copy">
      <p class="credits-kicker">Join the list</p>
      <h2 id="credits-contribute-title">Leave the next page better than you found it.</h2>
      <p>
        Fix a typo, improve an example, review a change, or write something new. Use the <strong>Edit</strong> button on any
        page to get started, and add your name here when you contribute.
      </p>
    </div>
    <div class="credits-contribute__actions">
      <a class="credits-action credits-action--primary" href="/contribute/formatting">
        Start contributing <IconArrowRight aria-hidden="true" />
      </a>
      <a
        class="credits-action credits-action--secondary"
        href="https://github.com/Datapack-Hub/wiki/graphs/contributors">
        <IconBrandGithub aria-hidden="true" /> View GitHub contributors
      </a>
    </div>
  </section>
</div>
