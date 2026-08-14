import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { DEFAULT_LANG, LANG_COOKIE, isLang, negotiateLang } from "$lib/i18n";

export const GET: RequestHandler = ({ url, cookies, request }) => {
  const cookieLang = cookies.get(LANG_COOKIE);
  const lang = isLang(cookieLang) ? cookieLang : negotiateLang(request.headers.get("accept-language"));
  const slug = url.pathname.substring("/guides".length);
  return redirect(308, `/${lang || DEFAULT_LANG}/guide${slug}`);
};
