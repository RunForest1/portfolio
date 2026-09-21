import type { TechId } from './tech'

export type ProjectStatus = 'live' | 'wip' | 'archived'

export interface Project {
  slug: string // url страницы кейса
  title: string
  tagline: string // одна строка, ≤ 90 символов
  year: number
  role: string // "фулстек", "фронтенд", "пет-проект"
  status: ProjectStatus
  stack: TechId[] // ссылки на справочник, не свободный текст
  highlights: string[] // 2-4 пункта: что решено, а не что использовано
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
  alt: string
  width: number // обязательно, иначе поедет CLS
  height: number
}

/** Содержимое внутренней страницы проекта */
export interface ProjectCase {
  problem: string // что требовалось решить и почему это было нетривиально
  solution: string // как решено, какие развилки были
  outcome: string // результат: что работает, чем измеряется
  lessons?: string // что не получилось или что переделал бы
  gallery: Image[] // 2-6 изображений: экраны, схема, до/после
}
