import type { Locale } from '@/types/i18n'

const FORMATTERS: Record<Locale, Intl.DateTimeFormat> = {
  ru: new Intl.DateTimeFormat('ru', { day: 'numeric', month: 'short', year: 'numeric' }),
  en: new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }),
}

/** Короткая дата для машинных данных (дата коммита и т.п.) — см. CLAUDE.md, раздел 5. */
export function formatShortDate(iso: string, locale: Locale): string {
  return FORMATTERS[locale].format(new Date(iso))
}
