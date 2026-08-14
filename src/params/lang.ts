import { isLang } from "$lib/i18n/langs";
import type { ParamMatcher } from "@sveltejs/kit";

export const match = ((param: string): boolean => {
  return isLang(param);
}) satisfies ParamMatcher;
