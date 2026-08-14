export const SUPPORTED_LANGS = ["en", "fr"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

export const DEFAULT_LANG: Lang = "en";

export const LANG_LABELS: Record<Lang, string> = {
  en: "English",
  fr: "Français",
};

export const LANG_COOKIE = "datapack-wiki-lang";

export function isLang(value: string | undefined | null): value is Lang {
  return SUPPORTED_LANGS.includes(value as Lang);
}

/** Negotiate the best supported language from an Accept-Language header. */
export function negotiateLang(acceptLanguage: string | null | undefined): Lang {
  if (!acceptLanguage) return DEFAULT_LANG;

  const candidates = acceptLanguage
    .split(",")
    .map(part => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find(p => p.trim().startsWith("q="));
      const q = qParam ? Number(qParam.trim().slice(2)) : 1;
      return { tag: tag.trim().toLowerCase(), q: Number.isFinite(q) ? q : 0 };
    })
    .filter(c => c.tag && c.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of candidates) {
    const exact = SUPPORTED_LANGS.find(lang => lang === tag);
    if (exact) return exact;

    const base = tag.split("-")[0];
    const baseMatch = SUPPORTED_LANGS.find(lang => lang === base);
    if (baseMatch) return baseMatch;
  }

  return DEFAULT_LANG;
}

/** Prefix a lang-agnostic path (`/wiki/foo`) with a language code. */
export function localizeHref(path: string, lang: Lang): string {
  if (!path.startsWith("/")) path = "/" + path;
  if (path === "/") return `/${lang}`;

  const stripped = stripLangPrefix(path);
  return `/${lang}${stripped === "/" ? "" : stripped}`;
}

/** Remove a leading `/{lang}` segment if present. */
export function stripLangPrefix(pathname: string): string {
  const segments = pathname.split("/");
  // pathname like /en/wiki/foo -> ["", "en", "wiki", "foo"]
  if (segments.length >= 2 && isLang(segments[1])) {
    const rest = "/" + segments.slice(2).join("/");
    return rest === "/" ? "/" : rest.replace(/\/$/, "") || "/";
  }
  return pathname || "/";
}

/** True when the first path segment is a supported language. */
export function hasLangPrefix(pathname: string): boolean {
  const first = pathname.split("/")[1];
  return isLang(first);
}
