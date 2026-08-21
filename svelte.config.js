import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { escapeSvelte, mdsvex } from "mdsvex";
import { createHighlighter } from "shiki";
import mcfunction from "./src/lib/highlighting/mcfunction/mcfunction.js";
import { theme } from "./src/lib/highlighting/kanagawa-wave.js"; // required btw
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkCodeTitles from "remark-code-titles";
import rehypeSlug from "rehype-slug";
// rehype used because mdsvex uses horrifically outdated versions of remark-parse apparently
import { rehypeGithubAlerts } from "rehype-github-alerts";

const highlighter = await createHighlighter({
  langs: [mcfunction, "json", "md", "javascript", "yml"],
  themes: [theme],
});

// TODO: make alerts use tabler icons instead

/** @type {import("rehype-autolink-headings").Options} */
const autoLinkOptions = {
  behavior: "append",
  properties: {
    tabIndex: -1,
    title: "Copy Link",
    onclick: "{() => navigator.clipboard.writeText(this.href)}",
    class: "ml-2 z-0",
  },
  content: {
    type: "text",
    value: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="inline-block stroke-stone-700 focus:stroke-stone-400 hover:stroke-stone-400 motion-safe:transition-colors"><path stroke="none" d="M0 0h24v24H0z"/><path d="m9 15 6-6m-4-3 .46-.54a5 5 0 0 1 7.07 7.08L18 13m-5 5-.4.53a5.07 5.07 0 0 1-7.12 0 4.97 4.97 0 0 1 0-7.07L6 11"/></svg>`,
  },
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: [".svx"],
      remarkPlugins: [[remarkCodeTitles]],
      rehypePlugins: [[rehypeGithubAlerts], [rehypeSlug], [rehypeAutolinkHeadings, autoLinkOptions]],
      layout: import.meta.dirname + "/src/lib/MDLayout.svelte",
      highlight: {
        highlighter: (code, lang) => {
          const generated = escapeSvelte(highlighter.codeToHtml(code, { lang, theme }));
          return `{@html \`${generated}\` }`;
        },
      },
    }),
  ],

  kit: {
    adapter: adapter(),
  },

  extensions: [".svelte", ".svx"],
};

export default config;
