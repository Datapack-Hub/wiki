import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { escapeSvelte, mdsvex } from "mdsvex";
import { createHighlighter } from "shiki";
import mcfunction from "./src/lib/highlighting/mcfunction/mcfunction.js";
import { theme } from "./src/lib/highlighting/kanagawa-wave.js"; // required btw
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkAdmonitions from "remark-admonitions";
import remarkCodeTitles from "remark-code-titles";
import rehypeSlug from "rehype-slug";

const highlighter = await createHighlighter({
  langs: [mcfunction, "json", "md", "javascript"],
  themes: [theme],
});

const admonitionsOptions = {
  useDefaultTypes: false,
  customTypes: {
    note: {
      ifmClass: "secondary",
      keyword: "note",
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-info-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>',
    },
    tip: {
      ifmClass: "success",
      keyword: "tip",
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bulb"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" /><path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" /><path d="M9.7 17l4.6 0" /></svg>',
    },
    warning: {
      ifmClass: "danger",
      keyword: "warning",
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-alert-triangle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 9v4" /><path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z" /><path d="M12 16h.01" /></svg>',
    },
    info: {
      ifmClass: "info",
      keyword: "info",
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-info-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>',
    },
  },
};

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
      remarkPlugins: [[remarkAdmonitions, admonitionsOptions], [remarkCodeTitles]],
      rehypePlugins: [[rehypeSlug], [rehypeAutolinkHeadings, autoLinkOptions]],
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
