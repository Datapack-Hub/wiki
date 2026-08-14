import { DEFAULT_LANG, type Lang } from "./langs";
import { en, type MessageKey } from "./messages/en";
import { fr } from "./messages/fr";

const catalogs: Record<Lang, Record<MessageKey, string>> = {
  en,
  fr,
};

export function t(lang: Lang, key: MessageKey): string {
  return catalogs[lang]?.[key] ?? catalogs[DEFAULT_LANG][key] ?? key;
}

export type { MessageKey, Lang };
export {
  SUPPORTED_LANGS,
  DEFAULT_LANG,
  LANG_LABELS,
  LANG_COOKIE,
  isLang,
  negotiateLang,
  localizeHref,
  stripLangPrefix,
  hasLangPrefix,
} from "./langs";
