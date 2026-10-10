// Относительный путь, а не алиас `@/` — этот файл выполняет напрямую Node
// в scripts/generate-seo-files.mjs (см. там), а Node не умеет резолвить
// алиасы из tsconfig, только сам TypeScript/Vite.
import { galleryImage } from '../lib/gallery.ts'
import type { Project } from '@/types/project'

export const projects: Project[] = [
  {
    slug: 'nursery',
    title: { ru: 'Nursery — платформа для учёбы', en: 'Nursery — a study platform' },
    tagline: {
      ru: 'Уроки с конспектами и упражнениями, код проверяется в изолированном Docker-контейнере.',
      en: 'Lessons with notes and exercises; your code is checked in an isolated Docker container.',
    },
    year: 2026,
    role: { ru: 'Full-stack', en: 'Full-stack' },
    status: 'live',
    stack: ['typescript', 'react', 'tailwindcss', 'vite', 'zustand', 'react-router', 'nestjs', 'drizzle', 'postgresql', 'docker', 'bun', 'claude'],
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
        ru: 'Я готовлюсь к вступительному экзамену в вуз и к собеседованиям на фронтенд-разработчика. Конспекты без практики не запоминаются, а задачи без теории превращаются в угадывание ответа. Нужно было одно место, где после каждой темы сразу идёт проверка понимания, а сам материал — обычные файлы, которые удобно писать и хранить в git. Ещё одной целью проекта было получить опыт разработки с помощью агента Claude Code и изучить его внутренний инструментарий.',
        en: "I'm preparing for a university entrance exam and for frontend developer interviews. Notes without practice don't stick, and problem sets without theory turn into guessing. I wanted one place where every topic is immediately followed by a check of understanding, and where the material is plain files that are easy to write and keep in git. Another goal of the project was to gain experience developing with the Claude Code agent and to study its internal tooling.",
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
    role: { ru: 'Full-stack', en: 'Full-stack' },
    status: 'live',
    stack: ['typescript', 'react', 'tailwindcss', 'vite', 'zustand', 'nestjs', 'prisma', 'postgresql', 'docker', 'websocket', 'bun', 'claude'],
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
        ru: 'У меня один домашний сервер и несколько своих проектов. Держать для них три отдельных сервиса — CI, панель контейнеров и мониторинг — избыточно, а деплоить руками через ssh + git pull + docker build надоело. Нужен был один инструмент на весь путь от коммита до работающего контейнера для сервера и 2–5 доверенных пользователей. Ещё одной целью проекта было получить опыт разработки с помощью агента Claude Code и изучить его внутренний инструментарий.',
        en: 'I have one home server and a few projects of my own on it. Running three separate services for them — CI, a container panel and monitoring — is overkill, and deploying by hand with ssh + git pull + docker build got old. I needed one tool for the whole path from commit to running container, for a single server and 2–5 trusted users. Another goal of the project was to gain experience developing with the Claude Code agent and to study its internal tooling.',
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
    role: { ru: 'Frontend', en: 'Frontend' },
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
  {
    slug: 'reflecsion',
    title: { ru: 'Reflecsion — локальная транскрипция в Obsidian', en: 'Reflecsion — local transcription in Obsidian' },
    tagline: {
      ru: 'Плагин Obsidian, который превращает голосовые заметки в текст локально, на GigaAM v3.',
      en: 'A desktop Obsidian plugin that transcribes voice notes locally, on GigaAM v3 — no cloud.',
    },
    year: 2026,
    role: { ru: 'Плагин', en: 'Plugin' },
    status: 'live',
    stack: ['typescript', 'nodejs', 'bun'],
    highlights: [
      {
        ru: 'Полностью локально: аудио не покидает машину, облачных API и телеметрии нет — после первой загрузки движка и модели плагин работает офлайн',
        en: 'Fully local: audio never leaves the machine, with no cloud APIs or telemetry — once the engine and model are downloaded, the plugin runs offline',
      },
      {
        ru: 'Русскую речь распознаёт GigaAM v3 от Сбера — качество заметно выше Whisper large-v3',
        en: 'Russian speech is recognized by Sber\'s GigaAM v3 — noticeably above Whisper large-v3 in quality',
      },
      {
        ru: 'Самодостаточная установка: при первом запуске плагин сам скачивает рантайм Bun (~90 МБ) и модель (~320 МБ) в свою папку, пользователю остаётся включить плагин',
        en: 'Self-provisioning: on first launch the plugin downloads the Bun runtime (~90 MB) and the model (~320 MB) into its own folder — the user just enables it',
      },
      {
        ru: 'Новую запись плагин находит сам и кладёт рядом с аудио Markdown-транскрипцию, вставляя ссылку на неё в заметку, где встроена запись',
        en: 'New recordings are picked up automatically: a Markdown transcription is written next to the audio, with a link inserted into the note that embeds the recording',
      },
    ],
    links: {
      repo: 'RunForest1/reflecsion',
    },
    cover: {
      src: '/covers/reflecsion.svg',
      alt: { ru: 'Голосовая дорожка превращается в строки текста', en: 'A waveform turning into lines of text' },
      width: 1600,
      height: 1000,
    },
    case: {
      problem: {
        ru: 'Встроенный диктофон Obsidian пишет голосовые заметки, но не расшифровывает их, а держать расшифровку в облаке не хотелось: это приватный контент, и облачные сервисы часто плохо справляются с русским. Нужен был плагин, который делает транскрипцию прямо на машине, работает без интернета после установки и складывает результат в vault рядом с записью.',
        en: 'The built-in Obsidian recorder captures voice notes but does not transcribe them, and keeping transcription in the cloud was not an option: it is private content, and cloud services are often weak at Russian. I wanted a plugin that transcribes on the machine itself, works without the internet after setup, and drops the result into the vault next to the recording.',
      },
      solution: {
        ru: 'Плагин на TypeScript для десктопного Obsidian: каждая расшифровка идёт в отдельном дочернем процессе Bun, а не в процессе самого Obsidian. Внутри — sherpa-onnx с моделью GigaAM v3 (int8 CTC); тяжёлый нативный рантайм изолирован от редактора, поэтому зависший или упавший распознаватель не роняет Obsidian. Bun и модель скачиваются один раз через requestUrl (в обход CORS) в папку плагина и переиспользуются. Аудио уходит распознавателю временным файлом во временной папке ОС, результат возвращается JSON-ом в stdout. Транскрипция сохраняется как .md рядом с аудио (frontmatter с длительностью и датой), а ссылка на неё вставляется в заметку, где встроена запись. Авто-транскрипция подписывается на события vault только после onLayoutReady и отсекает старые файлы по времени создания — иначе Obsidian при старте рассылает create для всего vault. Декодер понимает только контейнеры ISO BMFF, поэтому плагин принимает .m4a/.mp4/.mov/.m4v/.3gp, а на Linux-ошибку ETXTBSY (файл ещё занят после распаковки Bun) заложены повторные попытки.',
        en: 'A TypeScript plugin for desktop Obsidian: every transcription runs in a separate Bun child process rather than in Obsidian itself. Inside it is sherpa-onnx with the GigaAM v3 model (int8 CTC); the heavy native runtime is isolated from the editor, so a stuck or crashed recognizer cannot take Obsidian down. Bun and the model are downloaded once through requestUrl (bypassing CORS) into the plugin folder and reused. The audio reaches the recognizer as a temp file in the OS temp directory, and the result comes back as JSON on stdout. The transcription is saved as .md next to the audio (frontmatter with duration and date), and a link to it is inserted into the note where the recording is embedded. Auto-transcription subscribes to vault events only after onLayoutReady and filters out old files by creation time — otherwise Obsidian fires create for the whole vault on startup. The decoder only understands ISO BMFF containers, so the plugin accepts .m4a/.mp4/.mov/.m4v/.3gp, and it retries on the Linux ETXTBSY error (the file is still busy after Bun is unpacked).',
      },
      outcome: {
        ru: 'Плагин ставится из релиза, при включении сам скачивает движок и модель и дальше работает офлайн. Две команды — «Транскрибировать текущий аудиофайл» и «Транскрибировать все новые аудио» — закрывают и одиночную заметку, и разовую обработку всего vault; во всплывающем уведомлении видно время распознавания. Работает на Linux, macOS и Windows; на мобильных — нет, там нет нативного рантайма.',
        en: 'The plugin installs from a release, downloads the engine and model on first run and then works offline. Two commands — "Transcribe current audio" and "Transcribe all new audio" — cover both a single note and a one-off pass over the whole vault, and the notice shows how long recognition took. It runs on Linux, macOS and Windows; mobile is not supported, since there is no native runtime there.',
      },
      lessons: {
        ru: 'Поддержка «голых» .mp3/.wav/.ogg/.flac/.webm упирается в декодер — их пришлось бы перекодировать на лету, и я отложил это. Если бы делал заново, вынес бы выбор модели и списка форматов в настройки, а не зашивал GigaAM v3 и контейнеры в код.',
        en: 'Support for bare .mp3/.wav/.ogg/.flac/.webm ran into the decoder — they would have to be re-encoded on the fly, and I left that for later. If I did it again, I would move model and format choice into settings instead of hard-coding GigaAM v3 and the container list.',
      },
      gallery: [
        galleryImage('reflecsion', 'reflecsion-01.svg', 1600, 1000, {
          ru: 'Схема: плагин запускает дочерний процесс Bun с sherpa-onnx и GigaAM v3, результат возвращается JSON-ом',
          en: 'Architecture: the plugin spawns a Bun child process with sherpa-onnx and GigaAM v3, and the result comes back as JSON',
        }),
        galleryImage('reflecsion', 'reflecsion-02.svg', 1600, 1000, {
          ru: 'Готовая транскрипция: Markdown рядом с аудио, с frontmatter длительности и даты',
          en: 'The finished transcription: Markdown next to the audio, with duration and date frontmatter',
        }),
      ],
    },
  },
]
