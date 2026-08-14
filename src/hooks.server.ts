import { redirect, type Handle } from "@sveltejs/kit";
import {
  DEFAULT_LANG,
  LANG_COOKIE,
  hasLangPrefix,
  isLang,
  negotiateLang,
  type Lang,
} from "$lib/i18n";

const PASSTHROUGH_PREFIXES = ["/search.json", "/sitemap.xml", "/robots.txt", "/_app", "/logos", "/banner"];

function resolveLang(event: Parameters<Handle>[0]["event"]): Lang {
  const cookieLang = event.cookies.get(LANG_COOKIE);
  if (isLang(cookieLang)) return cookieLang;
  return negotiateLang(event.request.headers.get("accept-language"));
}

export const handle: Handle = async ({ event, resolve }) => {
  const pathname = event.url.pathname;

  if (pathname !== "/" && PASSTHROUGH_PREFIXES.some(p => pathname === p || pathname.startsWith(p + "/"))) {
    return resolve(event);
  }

  // Static files in /static are served before hooks in most setups, but skip common extensions
  if (/\.[a-zA-Z0-9]+$/.test(pathname) && !pathname.endsWith(".json")) {
    return resolve(event);
  }

  if (!hasLangPrefix(pathname)) {
    const lang = resolveLang(event) || DEFAULT_LANG;
    // Avoid reading url.search during prerender unless redirecting
    const search = event.url.search;

    // Legacy /guides/* → /{lang}/guide/*
    if (pathname === "/guides" || pathname.startsWith("/guides/")) {
      const rest = pathname.slice("/guides".length);
      redirect(302, `/${lang}/guide${rest}${search}`);
    }

    const target = pathname === "/" ? `/${lang}` : `/${lang}${pathname}`;
    redirect(302, `${target}${search}`);
  }

  return resolve(event);
};
