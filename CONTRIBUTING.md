# Contributing Guide

Contributing to the Datapack Wiki is designed to be very easy. We use MDSveX to integrate
markdown pages with the SvelteKit backend, so to add or edit pages you only need
to know how to write Markdown, and very limited HTML knowledge.

To contribute, please fork this repo and then submit a pull request with your
added changes.

> [!TIP]
> If you don't understand markdown or HTML, or if you require additional
> support, please [join our Discord](https://discord.datapackhub.net) and we'd
> be happy to help!

## (Optional, but recommended) Setting up the development environment

Before you begin developing the site, it's a good idea to set up a local dev
server so you can view your changes on the site in real-time. You only need a
few requirements:

- [Node](https://nodejs.org/en)
- A package manager (`npm`, the default with node.js, is more than enough)
- [Bun (optional)](https://bun.sh) - we use this to generate our search indexes faster and for package management,
  but it can also be used to run the project

### Installing

To install the project, first install the requirements, then, run the install
command in your package manager, for this example, we will use NPM.

`$ npm install`

### Running the dev server

To run the dev server, run the `dev` script with your package manager, then open
the URL. When you then make changes to files, they will automatically update on
the dev URL.

`$ npm run dev`

### Checking for errors

It's recommended before you make your pull request that you run the `build` and
`check` commands with your preferred script runner (e.g. `npm run ...`). These will check for common issues
you may run into. In addition, check that there are no spelling or grammatical mistakes you can see

## Languages

The site uses URL language prefixes such as `/en/wiki/...` and `/fr/guide/...`.

- English content lives in `src/pages/en/`
- Other languages use the same relative path under `src/pages/{lang}/`
- If a translation is missing, the English page is shown while keeping the
  selected language in the URL (UI chrome stays localized)
- Unprefixed URLs (e.g. `/wiki/...`) redirect based on the `datapack-wiki-lang`
  cookie, then the browser `Accept-Language` header, then English

### Adding a language

1. Add the language code to `SUPPORTED_LANGS` in `src/lib/i18n/langs.ts`
2. Add UI strings in `src/lib/i18n/messages/{lang}.ts` and register them in
   `src/lib/i18n/index.ts`
3. Optionally add translated pages under `src/pages/{lang}/...`

## Adding a page

1. Create your page .svx file under `src/pages/{lang}/`. If I want to make an
   English page at `/en/wiki/command/say`, I would create the file at
   `/src/pages/en/wiki/command/say/+page.svx`. **All pages should be in either
   the `wiki` or `guide` folder** (within a language directory). To translate an
   existing page, copy the English file into `src/pages/{lang}/` with the same
   path and translate the content.

2. Add the page metadata by putting the following at the top of the .svx file:

   ```yml
   ---
   title: <page title>
   description: "Here is a short description!"
   version: <minecraft version> (optional, only needed if you have a version component)
   ---
   ```

3. Import the reusable components that you want to use in your page. 
   We recommend the version component for guide and wiki pages if they are subject to change.
   Put the following after the metadata:

   ```html
   <script lang="ts">
     import { Version } from "$lib/reusables";
   </script>
   ```

4. Use the rest of the file to write the page content as markdown:

   ```md
   # /function command

   This command runs any `.mcfunction` file when called. You can also pass in a NBT
   compound or NBT source path.

   ...
   ```

> [!TIP]
> You can create info, warning, or tip boxes using the following syntax:
>
> ```md
> :::info
>
> This is an info box!
>
> :::
>
> :::warning
>
> This is a warning box!
>
> :::
>
> :::tip
> 
> This is a tip box!
>
> :::
> ```

## Adding a page to the sidebar

> [!NOTE]
> If you don't know where to put a page on the sidebar, then mention
> that in your PR, and someone else will add it for you. The sidebar pages are
> stored in `/src/lib/sidebar/tabs/WikiPages.svelte` (for Wiki pages) and `/src/lib/sidebar/tabs/Guides.svelte` (for Guide pages).

### Sidebar Categories

You can add categories using the `<SidebarCategory>` tag:

```svelte
<SidebarCategory name="Basics" icon={IconBox}>
  <SidebarPage label="Commands" icon={IconCommand} page="/commands" />
  <SidebarPage label="Functions" icon={IconPennant} page="/functions" />
  <SidebarPage label="Advancements" icon={IconStar} page="/advancements" />
  <SidebarPage label="Recipes" icon={IconGrid} page="/recipes" />
</SidebarCategory>
```

### Sidebar Pages

Sidebar categories contain pages, but the pages don't have to be within a
category.

```svelte
<SidebarPage label="Page Name" icon={IconName} page="/path/to/page" />
```

### Icons

Pages and categories can have icons. We use
[tabler icons](https://tabler-icons.io) to source our icons. To add an icon,
import it in the `<script>` tag at the top:

```ts
import IconHome from "~icons/tabler/home";
```

You can then use these icons within a SidebarCategory or SidebarPage, like so

```svelte
<SidebarPage label="Commands" icon={IconCommand} page="/commands" />
```
