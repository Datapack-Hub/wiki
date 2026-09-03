# Contributing to the Datapack Wiki

Thank you for helping improve the Datapack Wiki. Contributions from first-time writers, experienced datapackers,
designers, and developers are all welcome.

You can contribute by:

- correcting inaccurate or outdated information;
- fixing spelling, grammar, links, or examples;
- improving an existing article;
- writing a new wiki page or guide;
- improving accessibility, design, search, or navigation;
- fixing a site bug or adding a well-scoped feature; or
- reporting a problem that you cannot fix yourself.

Small fixes can be submitted immediately. Before starting a major page, navigation reorganisation, redesign, or new
dependency, please discuss the idea in a [GitHub issue](https://github.com/Datapack-Hub/wiki/issues) or the
[Datapack Hub Discord](https://discord.datapackhub.net). This helps avoid duplicated work and makes it easier to agree
on the scope first.

## Quick Ways to Contribute

### Edit a Page on GitHub

For a small content change, you do not need to run the site locally:

1. Open the page on [datapack.wiki](https://datapack.wiki).
2. Select **Edit** in the header. This opens the page's source on GitHub.
3. Select the pencil button, make the change, and commit it to a new branch in your fork when GitHub prompts you.
4. Open a pull request against `Datapack-Hub/wiki:main`.

Use a local checkout for new pages, images, navigation changes, or site code so you can preview and validate the result.

### Ask for Help

If you are unsure where a page belongs, how to use Git, or whether an idea fits the wiki, ask in the
[Datapack Hub Discord](https://discord.datapackhub.net). You can also explain the uncertainty in your pull request; a
maintainer can help finish the placement or formatting.

## Requirements

For local development you need:

- a [GitHub account](https://github.com/signup);
- [Git](https://git-scm.com/downloads);
- Node.js `^20.19.0` or `>=22.12.0`; and
- npm, which is included with Node.js.

The Node.js range comes from the version of Vite used by the project. The repository enables strict engine checks, so
older Node.js versions can fail during installation.

[Bun](https://bun.sh) is optional for ordinary contributors. Maintainers use it to generate search metadata, but it is
not required to write pages or run the site.

No environment variables, API keys, or project secrets are required. Page loads fetch the latest Minecraft version and
pack-format data from GitHub, so a working internet connection is required for the full local site.

## Fork and Set Up the Repository

1. [Fork the repository](https://github.com/Datapack-Hub/wiki/fork).
2. Clone your fork and add the main repository as `upstream`:

   ```
   git clone https://github.com/YOUR-USERNAME/wiki.git
   cd wiki
   git remote add upstream https://github.com/Datapack-Hub/wiki.git
   ```

3. Bring your fork's `main` branch up to date:

   ```
   git fetch upstream
   git switch main
   git merge --ff-only upstream/main
   git push origin main
   ```

4. Install the exact dependencies from `package-lock.json`:

   ```
   npm ci
   ```

5. Create a focused branch with a lowercase, kebab-case name:

   ```
   git switch -c improve-getting-started
   ```

Do not work directly on the main Datapack Hub repository for normal contributions, even if you have write access.
Upstream branches are reserved for coordinated version work and large reworks.

## Run the Site

Start the development server:

```
npm run dev
```

Open the local URL printed in the terminal. Vite reloads the page as files change.

Available scripts are:

| Command               | Purpose                                           |
| --------------------- | ------------------------------------------------- |
| `npm run dev`         | Start the development server.                     |
| `npm run check`       | Run Svelte and TypeScript diagnostics.            |
| `npm run check:watch` | Run diagnostics continuously while editing.       |
| `npm run build`       | Create a production build.                        |

There is currently no separate unit-test, end-to-end-test, or lint script. `check`, `build`, and manual review are
therefore important before every pull request.

## Repository Structure

| Path                                | Purpose                                        |
| ----------------------------------- | ---------------------------------------------- |
| `src/routes/wiki/`                  | Wiki, reference, and concept pages.            |
| `src/routes/guide/`                 | Step-by-step guide pages.                      |
| `src/routes/contribute/`            | Contribution documentation shown on-site.      |
| `src/lib/reusables/`                | Components that article pages can reuse.       |
| `src/lib/sidebar/`                  | Sidebar components and navigation trees.       |
| `src/styles/`                       | Global, article, home, code, and UI styles.    |
| `static/images/`                    | Locally hosted article images.                 |
| `static/fonts/` and `static/logos/` | Site fonts and brand assets.                   |
| `src/routes/search.json/meta.json`  | Generated search metadata; do not edit.        |
| `svelte.config.js`                  | MDsveX, syntax highlighting, and Svelte setup. |
| `vite.config.ts`                    | Vite, SvelteKit, and Tailwind configuration.   |

The site uses SvelteKit 2, Svelte 5, MDsveX, Tailwind CSS 4, and TypeScript. Most article contributions require only
Markdown.

## Editing or Creating Article Pages

The rendered [Page Structure & Formatting guide](https://datapack.wiki/contribute/formatting) contains the same
conventions with live examples. The rules below are enough to create a complete page from the repository.

### Routes and Files

Every article is a `+page.svx` file. Its folders determine its public URL:

| Source file                                    | Public URL                 |
| ---------------------------------------------- | -------------------------- |
| `src/routes/wiki/<category>/<slug>/+page.svx`  | `/wiki/<category>/<slug>`  |
| `src/routes/guide/<category>/<slug>/+page.svx` | `/guide/<category>/<slug>` |

Use lowercase, descriptive, kebab-case folder names for new routes.

For example:

```
src/routes/guide/getting-started/+page.svx
```

is served at:

```
/guide/getting-started
```

### Page Template

Start a new page with:

```md
---
title: "Example Page"
description: "A short, plain-language summary of what readers will learn on this page."
tags: guide, beginner
version: "26.2"
---

# Example Page

Introduce the topic and explain what the reader will learn.

## First Section

Start the page content here.
```

Frontmatter rules:

- `title` is required and supplies page and search metadata.
- `description` is required and should summarise the page in one sentence.
- `tags` is optional and must be one comma-separated string, not a YAML array.
- `version` is optional. Quote it as a string and use the latest Minecraft Java version against which the content was
  checked.
- The frontmatter title, page `# Heading`, and sidebar label should closely agree.

Do not import or render the `Version` component. The shared article layout automatically displays a version notice
whenever the `version` field is present.

A `<script lang="ts">` block is only needed when the page imports a reusable component. Import only components that the
page actually uses.

### Page Organisation and Writing

- Use one `#` heading, `##` for main sections, and `###` for subsections.
- Introduce unfamiliar terms or link to a page that explains them.
- Use concrete, tested examples instead of relying only on abstract prose.
- Keep pages scannable with descriptive headings, short paragraphs, lists, and useful whitespace.
- Prefer active voice and explicitly name the subject being discussed.
- Avoid dismissive language such as _obvious_, _simple_, _basic_, _easy_, or _just_.
- Use inline code for commands, identifiers, paths, filenames, and short values.
- Use bold and italics sparingly, and use tables only for genuinely tabular information.
- Be clear and internally consistent. Do not rewrite a useful contribution solely to enforce one regional English
  dialect.
- Proofread spelling, grammar, links, and technical claims.

When documenting version-dependent behaviour, verify it in the stated Minecraft version and link an authoritative source
when one would help the reader confirm the claim.

### Links and Headings

Link to public, root-relative site URLs rather than source files:

```md
[Functions](/wiki/files/functions) [Macro functions](/wiki/files/functions#macro-functions)
[The images section](#images)
```

Headings receive lowercased, hyphenated IDs automatically. Use descriptive link text instead of phrases such as “click
here”. External resources should use their complete `https://` URL.

### Images

Article images must be stored locally under a page-oriented folder:

```
static/images/guides/<page-or-route>/<filename>.png
static/images/wiki/<page-or-route>/<filename>.png
```

Files in `static` are served from the site root, so omit `static` from the page URL:

```md
![The Data Packs screen with the pack enabled](/images/guides/installing-a-datapack/datapack-enabled.png)
```

Normal Markdown images automatically use the shared responsive, framed image component. Import `ArticleImage` directly
only when an image needs additional attributes such as a controlled width:

```md
<script lang="ts">
  import ArticleImage from "$lib/reusables/ArticleImage.svelte";
</script>

<ArticleImage
  src="/images/guides/smithing-trims/example-template.png"
  alt="Grayscale example texture for a humanoid smithing trim"
  width="300"
  style="image-rendering: pixelated; image-rendering: crisp-edges;"
/>
```

Image requirements:

- use descriptive, lowercase, kebab-case filenames;
- write alt text that communicates the useful information in context;
- use `alt=""` only for a genuinely decorative image;
- omit fixed heights and let the shared component preserve the aspect ratio;
- use pixelated rendering only for genuine pixel art;
- do not use a raw `<img>` element in normal article content;
- do not hotlink embedded images from Imgur, Postimages, or similar services; and
- only commit an image you own or have permission to redistribute. If its licence is unclear, link to the original
  source instead of copying it.

Remember to add every new image file to the same commit as the page that uses it. Production filesystems are
case-sensitive, even if your local filesystem is not.

### MDsveX Formatting

Supported highlighted code-block languages are `mcfunction`, `json`, `md`, and `javascript`. Add a filename after the
language to title a block:

````md
```json:pack.mcmeta
{
  "pack": {
    "pack_format": 107,
    "description": "Example datapack"
  }
}
```
````

Use an unlabelled code fence for unsupported languages.

Available admonition types are `note`, `tip`, `warning`, and `info`:

```md
> [!NOTE]
> Supporting information goes here.
```

Reusable article components are exported from `$lib/reusables`. Follow an existing page that uses the component and
avoid creating custom markup when a shared component already solves the problem.

### Add the Page to Navigation

Creating a route does not automatically add it to the sidebar. Wiki and guide navigation is versioned:

```
src/lib/sidebar/tabs/latest/WikiPages.svelte
src/lib/sidebar/tabs/latest/Guides.svelte
src/lib/sidebar/tabs/pre-1_21_11/WikiPages.svelte
src/lib/sidebar/tabs/pre-1_21_11/Guides.svelte
```

Add a page to both trees when it applies to both versions. Add it only to the latest tree when the content depends on a
newer feature. Do not edit the legacy `src/lib/sidebar/tabs/Guides.svelte` file.

Contribution pages are shared between versions and belong directly in:

```
src/lib/sidebar/Sidebar.svelte
```

Icons come from [Tabler Icons](https://tabler.io/icons):

```svelte
import IconExample from "~icons/tabler/file-description";

<SidebarCategory name="Concepts" icon={IconConcepts} activePath="/wiki/concepts">
  <SidebarPage label="Example Page" icon={IconExample} page="/wiki/concepts/example-page" />
</SidebarCategory>
```

Set an accurate `activePath` on each category. It keeps the matching category open, shows the selected page, and
highlights the category icon while the sidebar is collapsed. It can be a single prefix or an array of unrelated route
prefixes.

If you are unsure where a page belongs, mention that in the pull request rather than guessing.

## Contributing Site Code or Design

When changing Svelte, TypeScript, CSS, or site behaviour:

- follow the conventions in nearby files, including Svelte 5 runes;
- keep TypeScript types accurate and avoid `any` unless there is a documented reason;
- reuse existing components, CSS variables, spacing, colours, and pixel-frame treatments before adding a new pattern;
- preserve semantic HTML, keyboard access, visible focus states, meaningful labels, and reduced-motion behaviour;
- test narrow mobile, tablet/sidebar, and desktop layouts;
- ensure long text, code, tables, and images cannot create page-level overflow;
- avoid adding client-side JavaScript when CSS or existing Svelte state already handles the behaviour; and
- keep the change focused. Do not reformat or refactor unrelated files in the same pull request.

For a visual change, include before-and-after screenshots or a short recording in the pull request. Check both hover and
keyboard-focus states, and do not rely on colour alone to communicate meaning.

### Dependencies and Lockfiles

Discuss new production dependencies with maintainers before adding them. If a dependency change is approved:

1. explain why existing code or dependencies cannot solve the problem;
2. use `npm install` rather than `npm ci` to update the dependency;
3. run `bun install` as well so `package.json`, `package-lock.json`, and `bun.lock` remain in sync; and
4. do not include unrelated lockfile churn.

Ordinary content changes should not modify package files or lockfiles.

## Generated Search Metadata

`src/routes/search.json/meta.json` is generated data. Do not edit, delete, resolve conflicts in, or commit regenerated
changes to it unless a maintainer specifically asks you to.

After changes reach `main`, the repository workflow uses Bun to run:

```
bun ./gen_search_indexes.js
```

The indexer bot then commits the refreshed metadata. The Node compatibility generator is not part of the normal
contributor workflow.

## Format and Validate Your Changes

For Svelte, TypeScript, JavaScript, and CSS changes, format only the files you changed:

```
npx prettier --write path/to/changed-file.svelte path/to/changed-file.css
```

Use `npm run format` only when you intentionally want to format all supported source files, and always review the
resulting diff.

The project formatter intentionally ignores `.svx` article files. Format those manually to match surrounding pages: keep
prose readable, use consistent indentation, and avoid unnecessary whitespace-only changes.

Before every pull request, run:

```
git diff --check
npm run check
npm run build
```

The repository does not currently run these validation commands automatically on pull requests, so do not rely on CI to
catch an error for you.

The build needs network access because the site fetches current Minecraft version data. If it fails while fetching from
`raw.githubusercontent.com`, check your connection before treating it as a code failure.

Manually review every affected route and confirm that:

- the browser console has no new errors;
- headings, internal links, and section anchors work;
- images load from local paths and include useful alt text;
- code blocks, tables, and long strings do not overflow;
- the sidebar opens the correct category and shows the selected page;
- hover, focus, and keyboard interactions remain clear; and
- the page works at mobile and desktop widths.

Run `npm run preview` after `npm run build` when you want to inspect the production build locally.

## Keep Your Branch Current

Before starting work, update your fork's `main` branch:

```
git fetch upstream
git switch main
git merge --ff-only upstream/main
git push origin main
```

Create your contribution branch from the updated `main`. If the upstream branch changes while you work, merge or rebase
those changes using the workflow you are comfortable with, then resolve conflicts in source files. Do not resolve a
search-metadata conflict by hand; leave the generated file unchanged and tell a maintainer if needed.

## Commits

Keep commits focused and write a concise, imperative summary:

- `Add guide for custom jukebox songs`
- `Fix pack format in getting started guide`
- `Improve sidebar keyboard navigation`

Use the commit body when the reason for a change, a technical decision, or a Minecraft-version caveat is not obvious
from the diff. There is no required commit prefix and no sign-off requirement.

## Open a Pull Request

Open the pull request against the main repository's `main` branch. A useful pull request includes:

- a clear summary of what changed;
- why the change is useful or necessary;
- links to the affected site routes;
- the Minecraft version and sources used for technical content, where relevant;
- the validation commands you ran and their results;
- screenshots or recordings for visual and interaction changes; and
- a link to any related issue or discussion.

Before submitting, check that the diff does not contain:

- editor settings such as `.idea/`;
- `.svelte-kit/` or other build output;
- generated search metadata;
- unrelated formatting or refactors;
- package or lockfile changes for a content-only contribution; or
- missing image and asset files.

Maintainers will review the contribution for technical accuracy, clarity, scope, accessibility, and consistency with the
rest of the site. Review comments are part of the collaborative process; update the same branch and push again to revise
the pull request.

## Reporting Problems

For reproducible site bugs or incorrect content, either open a
[GitHub issue](https://github.com/Datapack-Hub/wiki/issues) or submit a focused pull request. Include the affected URL,
expected behaviour, actual behaviour, browser or Minecraft version where relevant, and screenshots or console output
that help reproduce the problem.

For questions and early ideas, use the [Datapack Hub Discord](https://discord.datapackhub.net).

Please communicate respectfully and assume good intent. The wiki is maintained by community members contributing their
time.

## Licensing and Attribution

Contributions accepted into this repository are distributed under the terms in the repository's [LICENSE](./LICENSE).
Only submit text, code, and assets that you created or have permission to redistribute. Preserve any required
attribution and licence notices, and cite sources for technical claims or adapted material when appropriate.
