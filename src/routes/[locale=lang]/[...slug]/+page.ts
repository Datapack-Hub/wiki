import { error } from "@sveltejs/kit";
import type { Component } from "svelte";
import { DEFAULT_LANG, isLang, type Lang } from "$lib/i18n";
import type { PageLoad } from "./$types";

const modules = import.meta.glob("/src/pages/**/+page.svx");

function pagePath(lang: string, slug: string | undefined): string {
  if (!slug) return `/src/pages/${lang}/+page.svx`;
  return `/src/pages/${lang}/${slug}/+page.svx`;
}

export const load = (async ({ params }) => {
  const lang: Lang = isLang(params.locale) ? params.locale : DEFAULT_LANG;
  const slug = params.slug;

  const translatedKey = pagePath(lang, slug);
  const englishKey = pagePath(DEFAULT_LANG, slug);

  const loader = modules[translatedKey] ?? modules[englishKey];
  if (!loader) error(404, "Not found");

  const mod = (await loader()) as {
    default: Component;
    metadata?: Record<string, unknown>;
  };

  return {
    lang,
    usedFallback: !modules[translatedKey] && lang !== DEFAULT_LANG,
    contentPath: modules[translatedKey] ? translatedKey : englishKey,
    component: mod.default,
    metadata: mod.metadata ?? {},
  };
}) satisfies PageLoad;
