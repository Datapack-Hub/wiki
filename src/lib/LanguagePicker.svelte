<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import {
    DEFAULT_LANG,
    LANG_COOKIE,
  LANG_LABELS,
  SUPPORTED_LANGS,
  isLang,
  localizeHref,
  stripLangPrefix,
  t,
  type Lang,
} from "$lib/i18n";

  const lang = $derived(isLang(page.params.locale) ? page.params.locale : DEFAULT_LANG);

  function onChange(event: Event) {
    const next = (event.currentTarget as HTMLSelectElement).value as Lang;
    if (!isLang(next) || next === lang) return;

    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; SameSite=Lax`;

    const rest = stripLangPrefix(page.url.pathname);
    goto(localizeHref(rest, next));
  }
</script>

<select
  name="language"
  id="language"
  aria-label={t(lang, "topbar.language")}
  value={lang}
  onchange={onChange}
  class="bg-stone-900 hover:bg-stone-950 hover:border-stone-950 px-2 py-1 rounded-lg focus-visible:outline-2 accent-dph-orange focus-visible:outline-dph-orange border-r-8 border-stone-900 text-sm cursor-pointer">
  {#each SUPPORTED_LANGS as code}
    <option value={code}>{LANG_LABELS[code]}</option>
  {/each}
</select>
