import { isLang, DEFAULT_LANG, type Lang } from "$lib/i18n";
import type { LayoutServerLoad } from "./$types";

export const load = (({ params }) => {
  const lang: Lang = isLang(params.locale) ? params.locale : DEFAULT_LANG;
  return { lang };
}) satisfies LayoutServerLoad;
