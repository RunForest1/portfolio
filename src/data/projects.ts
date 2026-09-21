// Относительный путь, а не алиас `@/` — этот файл выполняет напрямую Node
// в scripts/generate-seo-files.mjs (см. там), а Node не умеет резолвить
// алиасы из tsconfig, только сам TypeScript/Vite.
import { galleryImage } from '../lib/gallery.ts'
import type { Project } from '@/types/project'

export const projects: Project[] = [
  {
    slug: 'pandemia',
    title: { ru: 'Pandemia — магазин DayZ-серверов', en: 'Pandemia — DayZ server shop' },
    tagline: {
      ru: 'Магазин DayZ-серверов на React: вход, баланс и корзина работают без бэкенда, на localStorage.',
      en: 'A DayZ server shop built with React: sign-in, balance and cart all work without a backend, on localStorage.',
    },
    year: 2026,
    role: { ru: 'фулстек', en: 'Full-stack' },
    status: 'live',
    stack: ['react', 'typescript', 'tailwindcss', 'mui', 'vite'],
    highlights: [
      {
        ru: 'Полноценный UX витрины: авторизация, баланс, корзина и заявки в поддержку — все ключевые сценарии магазина работают уже сейчас',
        en: 'Full storefront UX: sign-in, balance, cart and support tickets — every key shop flow already works',
      },
      {
        ru: 'Данные пока эмулируются в localStorage — заложен переход на реальный бэкенд без переписывания интерфейса',
        en: "Data is currently emulated in localStorage — built so switching to a real backend won't require rewriting the UI",
      },
      {
        ru: 'Рядом лежит рабочий Express-бэкенд с настоящей Steam OpenID-авторизацией — задел на будущее, когда понадобится реальный сервер',
        en: 'A working Express backend with real Steam OpenID auth already sits alongside it — ready for whenever a real server is needed',
      },
      {
        ru: 'Тема (светлая/тёмная) и язык (RU/EN) переключаются в шапке и сохраняются в localStorage',
        en: 'Theme (light/dark) and language (RU/EN) are switchable from the header and persisted in localStorage',
      },
    ],
    links: {
      repo: 'RunForest1/pandemia',
      demo: 'https://runforest1.github.io/pandemia/',
    },
    cover: {
      src: '/covers/pandemia.webp',
      alt: { ru: '', en: '' },
      width: 1200,
      height: 695,
    },
    featured: true,
    case: {
      problem: {
        ru: 'Нужен был витринный магазин DayZ-серверов с полноценным UX — вход, баланс, корзина, список серверов, поддержка — а не разовый макет: с заделом под будущий бэкенд и хостинг, чтобы проект можно было спокойно развивать дальше.',
        en: 'The goal was a real storefront for DayZ servers with full UX — sign-in, balance, cart, server list, support — not a throwaway mockup: built with room for a future backend and hosting, so the project could keep growing.',
      },
      solution: {
        ru: 'Интерфейс собран на React, TypeScript, Tailwind CSS и MUI — этого стека достаточно, чтобы быстро построить консистентный UX без лишних абстракций и самодельных компонентов там, где они не нужны. Авторизация, баланс, корзина и заявки в поддержку сейчас эмулируются в localStorage: осознанное решение на этом этапе — оно даёт полноценно пройти и показать весь пользовательский путь, не проектируя интеграцию с сервером вслепую. Тема (светлая/тёмная) и язык интерфейса переключаются в шапке и тоже сохраняются на клиенте.',
        en: 'The UI is built with React, TypeScript, Tailwind CSS and MUI — that stack is enough to ship a consistent UX quickly, without extra abstractions or hand-rolled components where none are needed. Sign-in, balance, cart and support tickets are currently emulated in localStorage: a deliberate choice at this stage — it lets the whole user journey be walked through and demoed without designing a server integration blind. Theme (light/dark) and interface language switch from the header and are saved on the client too.',
      },
      outcome: {
        ru: 'Сайт на React, деплой автоматизирован через GitHub Actions — заходишь и всё работает прямо в браузере: вход, баланс, магазин, корзина, профиль. UI и источник данных разделены, поэтому подключение реального бэкенда позже — это замена слоя данных, а не переписывание интерфейса.',
        en: 'A React site with deployment automated through GitHub Actions — everything just works in the browser: sign-in, balance, shop, cart, profile. The UI and the data source are decoupled, so wiring up a real backend later means swapping the data layer, not rewriting the interface.',
      },
      lessons: {
        ru: 'Не успел подключить мониторинг серверов в реальном времени — сейчас статус и онлайн в списке серверов заданы вручную. Это следующий шаг, когда будет куда его подключать на бэкенде.',
        en: "Didn't get to wire up real-time server monitoring — the status and player counts in the server list are currently set by hand. That's the next step, once there's a backend to hook it up to.",
      },
      gallery: [
        galleryImage('pandemia', 'pandemia-01.png', 1864, 4161, {
          ru: 'Главная страница: серверы, новости и магазин',
          en: 'Homepage: servers, news and shop',
        }),
        galleryImage('pandemia', 'pandemia-02.png', 1864, 1080, {
          ru: 'Список серверов с онлайном и статусом',
          en: 'Server list with player counts and status',
        }),
        galleryImage('pandemia', 'pandemia-03.png', 1864, 1080, {
          ru: 'Магазин: покупка предметов для DayZ-серверов',
          en: 'Shop: buying items for DayZ servers',
        }),
        galleryImage('pandemia', 'pandemia-04.png', 1864, 1080, {
          ru: 'Профиль: баланс и наигранные часы по серверам',
          en: 'Profile: balance and hours played per server',
        }),
        galleryImage('pandemia', 'pandemia-05.png', 1864, 1080, {
          ru: 'Настройки: тема, язык интерфейса, уведомления',
          en: 'Settings: theme, interface language, notifications',
        }),
        galleryImage('pandemia', 'pandemia-06.png', 1864, 1080, {
          ru: 'Тикеты поддержки: обращение и переписка',
          en: 'Support tickets: submitting a ticket and replies',
        }),
      ],
    },
  },
]
