import type { LocalizedText } from './i18n'
import type { TechId } from './tech'

export type ProjectStatus = 'live' | 'wip' | 'archived'

export interface Project {
  slug: string // url страницы кейса
  title: LocalizedText
  tagline: LocalizedText // одна строка, ≤ 90 символов
  year: number
  role: LocalizedText // "Full-stack", "Frontend", "Plugin"
  status: ProjectStatus
  stack: TechId[] // ссылки на справочник, не свободный текст
  highlights: LocalizedText[] // 2-4 пункта: что решено, а не что использовано
  links: {
    repo?: string // формат "owner/repo", отсюда же тянутся живые данные
    demo?: string
  }
  cover: Image // обложка в гриде и в OG
  featured?: boolean // крупная карточка в гриде
  case?: ProjectCase // если есть — карточка ведёт на /work/:slug
}

export interface Image {
  src: string
  alt: LocalizedText // пустая строка на обоих языках — если картинка декоративная
  width: number // обязательно, иначе поедет CLS
  height: number
}

/** Содержимое внутренней страницы проекта */
export interface ProjectCase {
  problem: LocalizedText // что требовалось решить и почему это было нетривиально
  solution: LocalizedText // как решено, какие развилки были
  outcome: LocalizedText // результат: что работает, чем измеряется
  lessons?: LocalizedText // что не получилось или что переделал бы
  gallery: Image[] // 2-6 изображений: экраны, схема, до/после
}
