import { useUIStore } from '@/app/store'
import type { LocalizedText, Locale } from '@/types/i18n'

/** Достаёт нужный язык из локализованного текста — единая точка для этого на весь проект. */
export function pick(locale: Locale, text: LocalizedText): string {
  return text[locale]
}

/**
 * Статичные строки интерфейса (не данные проектов — те лежат рядом со своими
 * полями в data/projects.ts как LocalizedText). Один плоский объект по
 * разделам сайта, а не десятки отдельных экспортов.
 */
const STRINGS = {
  ru: {
    header: {
      mainNav: 'Основная навигация',
      homeLabel: 'RunForest1 — на главную',
      openMenu: 'Открыть меню',
      closeMenu: 'Закрыть меню',
      switchLanguage: 'Переключить язык интерфейса на английский',
      switchToLight: 'Переключить на светлую тему',
      switchToDark: 'Переключить на тёмную тему',
    },
    nav: {
      projects: 'Проекты',
      stack: 'Стек',
      contact: 'Контакты',
    },
    hero: {
      tagline: 'Фронтенд-разработчик: React, TypeScript, Tailwind CSS, three.js',
      contactCta: 'Связаться',
    },
    work: {
      title: 'Проекты',
      filterAriaLabel: 'Фильтр по технологии',
      emptyPrefix: 'По технологии',
      emptySuffix: 'проектов пока нет.',
      resetFilter: 'Сбросить фильтр',
      stackAriaLabel: 'Стек проекта',
    },
    stack: {
      title: 'Стек',
      categories: {
        frontend: 'Фронтенд',
        backend: 'Бэкенд',
        infra: 'Инфраструктура',
        tooling: 'Инструменты',
      },
    },
    contact: {
      copyEmail: 'Скопировать email',
      emailCopied: 'Email скопирован',
    },
    footer: {
      liteMode: 'Лёгкий режим',
    },
    project: {
      demo: 'Демо',
      repo: 'Репозиторий',
      backHome: 'На главную',
      problem: 'Задача',
      solution: 'Решение',
      outcome: 'Результат',
      lessons: 'Что не получилось',
      gallery: 'Галерея',
      galleryAriaLabel: 'Галерея проекта',
      lightboxAriaLabel: 'Просмотр изображения',
      close: 'Закрыть',
      prevImage: 'Предыдущее изображение',
      nextImage: 'Следующее изображение',
      prevProject: 'Предыдущий проект',
      nextProject: 'Следующий проект',
      otherProjectsAriaLabel: 'Другие проекты',
    },
    status: {
      live: 'Завершён',
      wip: 'В разработке',
      archived: 'В архиве',
    },
    notFound: {
      title: 'Страница не найдена',
      body: 'Такого адреса нет на сайте.',
      backHome: 'На главную',
    },
  },
  en: {
    header: {
      mainNav: 'Main navigation',
      homeLabel: 'RunForest1 — home',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      switchLanguage: 'Switch interface language to Russian',
      switchToLight: 'Switch to light theme',
      switchToDark: 'Switch to dark theme',
    },
    nav: {
      projects: 'Projects',
      stack: 'Stack',
      contact: 'Contact',
    },
    hero: {
      tagline: 'Frontend developer: React, TypeScript, Tailwind CSS, three.js',
      contactCta: 'Get in touch',
    },
    work: {
      title: 'Projects',
      filterAriaLabel: 'Filter by technology',
      emptyPrefix: 'No projects with',
      emptySuffix: 'yet.',
      resetFilter: 'Reset filter',
      stackAriaLabel: 'Project stack',
    },
    stack: {
      title: 'Stack',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend',
        infra: 'Infrastructure',
        tooling: 'Tools',
      },
    },
    contact: {
      copyEmail: 'Copy email',
      emailCopied: 'Email copied',
    },
    footer: {
      liteMode: 'Lite mode',
    },
    project: {
      demo: 'Demo',
      repo: 'Repository',
      backHome: 'Back to home',
      problem: 'Problem',
      solution: 'Solution',
      outcome: 'Outcome',
      lessons: "What didn't work out",
      gallery: 'Gallery',
      galleryAriaLabel: 'Project gallery',
      lightboxAriaLabel: 'Image viewer',
      close: 'Close',
      prevImage: 'Previous image',
      nextImage: 'Next image',
      prevProject: 'Previous project',
      nextProject: 'Next project',
      otherProjectsAriaLabel: 'Other projects',
    },
    status: {
      live: 'Completed',
      wip: 'In progress',
      archived: 'Archived',
    },
    notFound: {
      title: 'Page not found',
      body: "This page doesn't exist.",
      backHome: 'Back to home',
    },
  },
} as const satisfies Record<Locale, unknown>

export function useLocale(): Locale {
  return useUIStore((state) => state.locale)
}

/** Строки интерфейса для текущего языка — `const t = useT(); t.nav.projects`. */
export function useT() {
  return STRINGS[useLocale()]
}
