import { response } from "super-sitemap/sveltekit";
import type { RequestHandler } from "@sveltejs/kit";
import { DEFAULT_LANG, SUPPORTED_LANGS } from "$lib/i18n";

export const prerender = true;

const pageModules = import.meta.glob("/src/pages/en/**/+page.svx", { eager: true });

function collectEnSlugs(): string[] {
  const slugs: string[] = [];

  for (const key of Object.keys(pageModules)) {
    // /src/pages/en/wiki/foo/+page.svx → wiki/foo
    const match = key.match(/^\/src\/pages\/en\/(.+)\/\+page\.svx$/);
    if (match) slugs.push(match[1]);
  }

  return slugs;
}

export const GET: RequestHandler = async () => {
  const enSlugs = collectEnSlugs();
  const alternates = SUPPORTED_LANGS.filter(lang => lang !== DEFAULT_LANG);

  return await response({
    origin: "https://datapack.wiki",
    excludeRoutePatterns: [/^\/sitemap.xml/, /^\/meta.json/, /^\/robots.txt/, /^\/search.json/, /^\/guides/],
    defaultChangefreq: "weekly",
    locales: {
      default: DEFAULT_LANG,
      alternates,
    },
    // Locale values come from `locales`; only provide the rest slug here.
    // Include "" for the language home pages (/{locale}).
    paramValues: {
      "/[locale=lang]/[...slug]": ["", ...enSlugs],
    },
  });
};
