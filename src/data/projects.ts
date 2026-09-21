import type { Project } from '@/types/project'

/**
 * ЧЕРНОВИК: первая реальная запись, добавлена по описанию из README проекта
 * pandemia (владелец попросил накидать черновик сейчас и поправить позже).
 * Перед показом проверить: обложку и галерею заменить на настоящие
 * скриншоты (сейчас — та же плейсхолдер-заглушка, что и обложка), убедиться
 * что links.demo совпадает с реальным URL после включения GitHub Pages
 * (Settings → Pages → Source → GitHub Actions в репозитории pandemia),
 * и перепроверить формулировки case/highlights.
 */
export const projects: Project[] = [
  {
    slug: 'pandemia',
    title: 'Pandemia — магазин DayZ-серверов',
    tagline: 'Магазин DayZ-серверов на React: вход, баланс и корзина работают без бэкенда, на localStorage.',
    year: 2026,
    role: 'фулстек',
    status: 'wip',
    stack: ['react', 'typescript', 'tailwindcss', 'mui', 'vite'],
    highlights: [
      'Полностью статическое SPA: авторизация, баланс, корзина и заявки в поддержку работают на localStorage — задеплоено на GitHub Pages без единого сервера',
      'SPA-роутинг адаптирован под ограничения GitHub Pages: 404-редирект перекодирует путь в query-строку и восстанавливает его в index.html до чтения React Router',
      'Рядом лежит рабочий Express-бэкенд с настоящей Steam OpenID-авторизацией — не подключён к фронтенду намеренно, задел на будущее без переписывания клиента',
      'Тема (светлая/тёмная) и язык (RU/EN) переключаются в шапке и сохраняются в localStorage, с уважением к prefers-color-scheme при первом визите',
    ],
    links: {
      repo: 'RunForest1/pandemia',
      demo: 'https://runforest1.github.io/pandemia/',
    },
    cover: {
      src: '/covers/pandemia.svg',
      alt: '',
      width: 800,
      height: 500,
    },
    featured: true,
    case: {
      problem:
        'Нужен был витринный магазин DayZ-серверов с полноценным UX (вход, баланс, корзина, поддержка), но без бюджета на постоянно работающий бэкенд и хостинг под него.',
      solution:
        'Вся клиентская логика перенесена на localStorage: авторизация, баланс и заявки эмулируются в браузере без обращений к серверу. Настоящий Express-бэкенд с Steam OpenID и балансом на SQLite написан отдельно в server/ и не удалён — просто не подключён, чтобы сайт оставался чистой статикой для GitHub Pages. SPA-роутинг работает на Pages через redirect-трюк (rafgraph/spa-github-pages): 404.html кодирует путь в query-строку, index.html декодирует его до инициализации React Router.',
      outcome:
        'Сайт разворачивается автодеплоем на GitHub Pages при каждом пуше в main (GitHub Actions) и полностью функционален без сервера: вход, баланс, магазин, корзина и профиль работают вживую в браузере.',
      lessons:
        'Если понадобится реальный платёжный провайдер и Steam-авторизация — бэкенд уже готов в server/, останется переключить фронтенд на него.',
      gallery: [
        {
          src: '/covers/pandemia.svg',
          alt: '',
          width: 800,
          height: 500,
        },
      ],
    },
  },
]
