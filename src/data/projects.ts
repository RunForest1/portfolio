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
    role: { ru: 'Full-stack', en: 'Full-stack' },
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
  {
    slug: 'nursery',
    title: { ru: 'Nursery — платформа для учёбы', en: 'Nursery — a study platform' },
    tagline: {
      ru: 'Уроки с конспектами и упражнениями, код проверяется в изолированном Docker-контейнере.',
      en: 'Lessons with notes and exercises; your code is checked in an isolated Docker container.',
    },
    year: 2026,
    role: { ru: 'Full-stack, пет-проект', en: 'Full-stack, personal project' },
    status: 'live',
    stack: ['typescript', 'react', 'tailwindcss', 'vite', 'zustand', 'react-router', 'nestjs', 'drizzle', 'postgresql', 'docker', 'bun'],
    highlights: [
      {
        ru: 'Решение пишется в браузере и запускается в контейнере без сети (10 с, 256 МБ, 1 CPU); результаты тестов приходят потоком по мере выполнения',
        en: 'The solution is written in the browser and runs in a container with no network (10 s, 256 MB, 1 CPU); test results stream back as they finish',
      },
      {
        ru: 'Контент — markdown-файлы в git, а не строки в админке: импорт по принципу «всё или ничего», правка файла обновляет урок на месте',
        en: 'Content is markdown files in git, not rows in an admin panel: all-or-nothing import, and editing a file updates the lesson in place',
      },
      {
        ru: '13 треков, 117 уроков и 350 упражнений; скрытые тесты не покидают сервер — наружу уходит только «прошёл / не прошёл»',
        en: '13 tracks, 117 lessons and 350 exercises; hidden tests never leave the server — only "passed / failed" does',
      },
      {
        ru: 'Прогресс не хранится отдельно: упражнение решено, если есть попытка со статусом passed',
        en: "Progress isn't stored separately: an exercise is solved if it has a submission with status passed",
      },
    ],
    links: {
      repo: 'RunForest1/nursery',
    },
    cover: {
      src: '/gallery/nursery/nursery-01.png',
      alt: { ru: 'Страница упражнения: редактор кода, примеры и результаты тестов', en: 'Exercise page: code editor, examples and test results' },
      width: 1825,
      height: 956,
    },
    case: {
      problem: {
        ru: 'Я готовлюсь к вступительному экзамену в вуз и к собеседованиям на фронтенд-разработчика. Конспекты без практики не запоминаются, а задачи без теории превращаются в угадывание ответа. Нужно было одно место, где после каждой темы сразу идёт проверка понимания, а сам материал — обычные файлы, которые удобно писать и хранить в git.',
        en: "I'm preparing for a university entrance exam and for frontend developer interviews. Notes without practice don't stick, and problem sets without theory turn into guessing. I wanted one place where every topic is immediately followed by a check of understanding, and where the material is plain files that are easy to write and keep in git.",
      },
      solution: {
        ru: 'Источник правды — markdown-файлы в content/: импортёр раскладывает их по базе (PostgreSQL, Drizzle), а правка файла обновляет урок на месте, не стирая мои попытки. Решение пишется в CodeMirror, бэкенд (NestJS) склеивает его с обвязкой в один файл, чтобы номера строк в ошибках совпадали с редактором, и запускает в отдельном контейнере через sandbox-executor — мой отдельный пакет «образ + команда + лимиты → результат». Результаты тестов уходят в браузер потоком NDJSON, ответы сравниваются через isDeepStrictEqual. Темы, которые не ложатся на TypeScript напрямую (Unix, английский, CSS), смоделированы как поведение с единственным верным ответом: посчитать права после chmod, раскрыть glob, выбрать артикль, вычислить специфичность селектора.',
        en: 'The source of truth is markdown files in content/: the importer lays them out in the database (PostgreSQL, Drizzle), and editing a file updates the lesson in place without wiping my attempts. The solution is written in CodeMirror; the NestJS backend concatenates it with a harness into a single file, so line numbers in errors match the editor, and runs it in a separate container via sandbox-executor — my own standalone package, "image + command + limits → result". Test results stream to the browser as NDJSON, and answers are compared with isDeepStrictEqual. Topics that don\'t map to TypeScript directly (Unix, English, CSS) are modeled as behaviour with one correct answer: compute permissions after chmod, expand a glob, pick the article, calculate selector specificity.',
      },
      outcome: {
        ru: '13 треков, 117 уроков, 350 упражнений. Каждое упражнение прошло самопроверку: эталонное решение проходит все тесты, заведомо наивное — хотя бы часть проваливает. Живого демо нет: платформа работает локально (Postgres в Docker, бэкенд и фронтенд на хосте), содержимое уроков на русском.',
        en: '13 tracks, 117 lessons, 350 exercises. Every exercise went through a self-check: a reference solution passes all tests, and a deliberately naive one fails at least some. There is no live demo: the platform runs locally (Postgres in Docker, backend and frontend on the host), and the lesson content is in Russian.',
      },
      gallery: [
        galleryImage('nursery', 'nursery-01.png', 1825, 956, {
          ru: 'Упражнение: редактор TypeScript, примеры и скрытые тесты',
          en: 'Exercise: TypeScript editor, examples and hidden tests',
        }),
        galleryImage('nursery', 'nursery-02.png', 1825, 956, {
          ru: 'Урок: конспект с формулами и примерами кода, упражнения сбоку',
          en: 'Lesson: notes with formulas and code samples, exercises on the side',
        }),
        galleryImage('nursery', 'nursery-03.png', 1825, 956, {
          ru: 'Список треков с поиском, фильтром и прогрессом',
          en: 'Track list with search, filters and progress',
        }),
        galleryImage('nursery', 'nursery-04.png', 1825, 956, {
          ru: 'Трек «Алгоритмы»: модули, уроки и сложность упражнений',
          en: 'The Algorithms track: modules, lessons and exercise difficulty',
        }),
        galleryImage('nursery', 'nursery-05.png', 1825, 956, {
          ru: 'Форма «Новый урок»: свой урок в формате markdown',
          en: '"New lesson" form: a custom lesson in markdown',
        }),
      ],
    },
  },
  {
    slug: 'ranger',
    title: { ru: 'Ranger — CI/CD-хаб для одного сервера', en: 'Ranger — a CI/CD hub for a single server' },
    tagline: {
      ru: 'Сборка, деплой в Docker, логи и метрики в одной вкладке: лёгкая замена Jenkins + Portainer.',
      en: 'Builds, Docker deploys, logs and metrics in one tab: a lightweight Jenkins + Portainer replacement.',
    },
    year: 2026,
    role: { ru: 'Full-stack, пет-проект', en: 'Full-stack, personal project' },
    status: 'live',
    stack: ['typescript', 'react', 'tailwindcss', 'vite', 'zustand', 'nestjs', 'prisma', 'postgresql', 'docker', 'websocket', 'bun'],
    highlights: [
      {
        ru: 'Репозиторий по SSH-ссылке, три команды (install, test, build) и кнопка «Собрать» — вместо YAML-пайплайнов и плагинов',
        en: 'A repository by SSH URL, three commands (install, test, build) and a "Build" button — instead of YAML pipelines and plugins',
      },
      {
        ru: 'Деплой в Docker-контейнер с health-check и автоматическим откатом на предыдущий образ, плюс ручной откат к любой успешной сборке',
        en: 'Deploy to a Docker container with a health check and automatic rollback to the previous image, plus manual rollback to any successful build',
      },
      {
        ru: 'Живой лог сборки по WebSocket, метрики хоста и контейнеров с часовым графиком, терминал только для админа с повторным вводом пароля',
        en: 'Live build log over WebSocket, host and container metrics with a one-hour chart, and an admin-only terminal with a password re-prompt',
      },
      {
        ru: 'Безопасность в каждой итерации: сборки в изолированных контейнерах с лимитами, секреты в зашифрованном виде и маскируются в логе',
        en: 'Security in every iteration: builds in isolated containers with limits, secrets stored encrypted and masked in the log',
      },
    ],
    links: {
      repo: 'RunForest1/ranger',
    },
    cover: {
      src: '/gallery/ranger/ranger-02.png',
      alt: { ru: 'Метрики хоста и список Docker-контейнеров', en: 'Host metrics and the Docker container list' },
      width: 1825,
      height: 956,
    },
    case: {
      problem: {
        ru: 'У меня один домашний сервер и несколько своих проектов. Держать для них три отдельных сервиса — CI, панель контейнеров и мониторинг — избыточно, а деплоить руками через ssh + git pull + docker build надоело. Нужен был один инструмент на весь путь от коммита до работающего контейнера для сервера и 2–5 доверенных пользователей.',
        en: 'I have one home server and a few projects of my own on it. Running three separate services for them — CI, a container panel and monitoring — is overkill, and deploying by hand with ssh + git pull + docker build got old. I needed one tool for the whole path from commit to running container, for a single server and 2–5 trusted users.',
      },
      solution: {
        ru: 'Бэкенд на NestJS и Prisma, очередь сборок на pg-boss в той же PostgreSQL, Docker управляется через dockerode. Шаги сборки идут в изолированных контейнерах без привилегий (512 МБ, 1 CPU, лимит процессов, 15 минут на шаг); сама изоляция вынесена в отдельный пакет sandbox-executor, который ничего не знает о Ranger. Деплой: сборка образа → остановка старого контейнера → запуск нового → health-check → откат при неудаче; для сложных случаев есть деплой через Docker Compose, доступный только админу. Фронтенд — React-SPA с темами, RU/EN и командной палитрой на Ctrl+K; логи и терминал идут по WebSocket. Роли admin / operator / viewer, журнал аудита и публичная страница статуса только для выбранных проектов.',
        en: 'The backend is NestJS and Prisma, the build queue is pg-boss in the same PostgreSQL, and Docker is driven through dockerode. Build steps run in unprivileged, isolated containers (512 MB, 1 CPU, a process cap, 15 minutes per step); the isolation itself lives in a separate package, sandbox-executor, which knows nothing about Ranger. Deploy: image build → stop the old container → start the new one → health check → rollback on failure; for harder cases there is a Docker Compose deploy that only an admin can enable. The frontend is a React SPA with themes, RU/EN and a Ctrl+K command palette; logs and the terminal run over WebSocket. Roles admin / operator / viewer, an audit log, and a public status page for explicitly chosen projects only.',
      },
      outcome: {
        ru: 'Весь функционал пяти итераций готов и работает: проекты и сборки, деплой с откатом, контейнеры, метрики, роли, аудит, терминал, выбор ветки, страница статуса. Запускается одной командой docker compose up и закрывает путь от коммита до работающего контейнера на моём сервере.',
        en: 'All five iterations of functionality are done and working: projects and builds, deploy with rollback, containers, metrics, roles, audit, terminal, branch selection, status page. It starts with a single docker compose up and covers the whole path from commit to running container on my server.',
      },
      gallery: [
        galleryImage('ranger', 'ranger-01.png', 1825, 956, {
          ru: 'Страница проекта: команды сборки, деплой и его история',
          en: 'Project page: build commands, deploy and its history',
        }),
        galleryImage('ranger', 'ranger-02.png', 1825, 956, {
          ru: 'Метрики хоста (CPU, память, диск) и контейнеры',
          en: 'Host metrics (CPU, memory, disk) and containers',
        }),
        galleryImage('ranger', 'ranger-03.png', 1825, 956, {
          ru: 'Новый проект: SSH-ссылка, deploy-key, ветка и команды сборки',
          en: 'New project: SSH URL, deploy key, branch and build commands',
        }),
        galleryImage('ranger', 'ranger-04.png', 1825, 956, {
          ru: 'Встроенная документация',
          en: 'Built-in documentation',
        }),
      ],
    },
  },
  {
    slug: 'forest-ui',
    title: { ru: 'Forest UI — дизайн-система', en: 'Forest UI — a design system' },
    tagline: {
      ru: 'Токены, четыре темы и доступные React-компоненты для проектов на Tailwind 4.',
      en: 'Design tokens, four themes and accessible React primitives for Tailwind 4 projects.',
    },
    year: 2026,
    role: { ru: 'Frontend, пет-проект', en: 'Frontend, personal project' },
    status: 'live',
    stack: ['react', 'typescript', 'tailwindcss', 'vite', 'vitest'],
    highlights: [
      {
        ru: 'Один акцентный цвет и нейтральная шкала: названия токенов не меняются, меняются значения — тема и палитра переключаются двумя атрибутами на <html>',
        en: "One accent color and a neutral scale: token names stay, values change — theme and palette switch with two attributes on <html>",
      },
      {
        ru: 'Компоненты не знают о роутере, сторе и i18n: тексты, ссылки и состояние приходят через props',
        en: 'Components know nothing about the router, store or i18n: texts, links and state come in through props',
      },
      {
        ru: 'Доступность по умолчанию: видимый фокус, обязательные подписи, статус цветом и текстом, нативный <dialog>',
        en: 'Accessible by default: visible focus, required labels, status by color and text, native <dialog>',
      },
      {
        ru: 'Живое демо с кодом и props каждого компонента, сборка пакета и релизы через GitHub Actions',
        en: 'A live demo with code and props for every component, plus package builds and releases through GitHub Actions',
      },
    ],
    links: {
      repo: 'RunForest1/forest-ui',
      demo: 'https://runforest1.github.io/forest-ui/',
    },
    cover: {
      src: '/gallery/forest-ui/forest-ui-01.png',
      alt: { ru: 'Демо Forest UI: тёмная тема, холодная палитра', en: 'Forest UI demo: dark theme, cold palette' },
      width: 1280,
      height: 760,
    },
    case: {
      problem: {
        ru: 'Одни и те же Button, ThemeToggle и Badge были скопированы в пять моих проектов и успели разойтись между собой. Нужен был единый визуальный язык, из которого стартуют новые проекты, и который не тащит за собой чужой роутер, стор или систему переводов.',
        en: 'The same Button, ThemeToggle and Badge had been copy-pasted into five of my projects and had drifted apart. I needed one design language that new projects start from, without dragging along anyone\'s router, store or translation system.',
      },
      solution: {
        ru: 'Пакет @forest/ui: дизайн-токены в CSS (bg-void, border-steel, text-haze), четыре готовых набора значений — тема dark/light и палитра cold/warm — и React-примитивы: кнопки, формы, карточки, меню, модальные окна, хлебные крошки. Варианты описаны через class-variance-authority, а переданные className сливаются через tailwind-merge, так что конфликтующая утилита действительно побеждает. Всё, что содержит текст, берёт его из props; для роутера хлебные крошки принимают собственный компонент ссылки. Модальные окна построены на нативном <dialog>, а типы заставляют указывать aria-label у иконочных кнопок. Пакет собирается в dist и ставится из tarball релиза на GitHub, чтобы установка работала и в Docker-сборке.',
        en: 'The @forest/ui package: design tokens in CSS (bg-void, border-steel, text-haze), four ready-made value sets — dark/light theme and cold/warm palette — and React primitives: buttons, forms, cards, menus, modals, breadcrumbs. Variants are defined with class-variance-authority, and passed classNames are merged through tailwind-merge, so a conflicting utility really wins. Anything with text takes it from props; for routing, breadcrumbs accept your own link component. Modals are built on the native <dialog>, and the types force an aria-label on icon buttons. The package ships compiled in dist and installs from a GitHub Release tarball, so installation works in a Docker build too.',
      },
      outcome: {
        ru: 'Готовая библиотека с живым демо на GitHub Pages, тестами на Vitest и Testing Library, CI и автоматическим релизом tarball. Новые проекты начинаются с установки пакета, а не с копирования компонентов.',
        en: 'A finished library with a live demo on GitHub Pages, Vitest and Testing Library tests, CI and automated tarball releases. New projects now start by installing the package, not by copying components.',
      },
      gallery: [
        galleryImage('forest-ui', 'forest-ui-01.png', 1280, 760, {
          ru: 'Демо: тёмная тема, холодная палитра',
          en: 'Demo: dark theme, cold palette',
        }),
        galleryImage('forest-ui', 'forest-ui-02.png', 1280, 760, {
          ru: 'Демо: светлая тема, тёплая палитра',
          en: 'Demo: light theme, warm palette',
        }),
      ],
    },
  },
]
