/** Два языка интерфейса — переключаются в шапке, состояние живёт в Zustand + localStorage. */
export type Locale = 'ru' | 'en'

/** Текст, у которого обязаны быть обе языковые версии — без "текст на будущее" на одном языке. */
export interface LocalizedText {
  ru: string
  en: string
}
