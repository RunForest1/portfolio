const SHORT_DATE_FORMAT = new Intl.DateTimeFormat('ru', { day: 'numeric', month: 'short', year: 'numeric' })

/** Короткая дата для машинных данных (дата коммита и т.п.) — см. CLAUDE.md, раздел 5. */
export function formatShortDate(iso: string): string {
  return SHORT_DATE_FORMAT.format(new Date(iso))
}
