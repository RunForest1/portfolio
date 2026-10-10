# portfolio

*[Читать на русском](./README.ru.md)*

This is my personal portfolio: a place to show the projects I build, each with its
own case study that walks through the problem, the solution and what I'd do
differently. It's one scrolling homepage plus a dedicated page per project.

The site is also a demo of my frontend work in its own right, so I hold it to the
same standard as anything I'd ship for a client: content comes first, effects never
get in the way, and the 3D background is decorative, lazy-loaded and can be switched
off completely.

Live: <https://runforest1.github.io/portfolio/>

## Why I built it

I wrote this for technical recruiters, team leads and potential clients — people who
mostly open it on a phone and spend about 40 seconds. In that time I want the first
screen to show how I work on the frontend, the next 30 seconds to answer "what has
this person built, with what, and where's the code", and the end to give an easy way
to reach me.

That gave me two hard rules:

1. **The site is a showcase of skill.** Janky animation, choppy scrolling or four
   seconds to first paint hurt more than having no 3D at all.
2. **Content beats effect.** The background must never get in the way of reading,
   clicking, or keyboard navigation.

## What's on the site

- **Hero** — my name, a one-line specialization, and calls to action.
- **Work** — a grid of projects that I curate by hand in `src/data/projects.ts`, not
  an auto-pulled GitHub feed: an auto-feed drags in forks, coursework and unfinished
  repos, and takes away my control over the cover and description, which is exactly
  what sells a project. Live GitHub data (last push, stars, primary language) is
  layered on top via `links.repo`, but never decides which projects appear. You can
  filter by technology, and the state lives in the URL (`?tech=react`) so a filtered
  view can be shared.
- **Case pages** (`/work/:slug`) — for projects worth a closer look: problem /
  solution / outcome / lessons, a gallery, and previous/next navigation.
- **Stack** — the technologies I use, grouped by category, with no fake proficiency
  percentages.
- **Contact** — email with one-click copy, GitHub/Telegram links, and an availability
  badge.
- **Navigation** — anchor links plus a GitHub link, docked as a widget on the right
  edge of the screen; collapses into a menu button on mobile
  (`src/app/Header.tsx`).
- **Language and theme** — the whole UI and all project content are in Russian and
  English (toggle in the header); dark is the default theme, with a light
  alternative (toggle in the header widget). Both persist in `localStorage`.

## Tech stack

| Layer | Choice |
|---|---|
| Build | Vite |
| Language | TypeScript (`strict`) |
| UI | React 19, React Router |
| Styles | Tailwind CSS v4 (tokens via `@theme` in CSS) |
| 3D | three.js, `@react-three/fiber`, `@react-three/drei` |
| Animation | `motion` (UI only; inside the canvas everything runs in `useFrame`) |
| State | Zustand |
| Icons | lucide-react |
| Quality | ESLint (+ `jsx-a11y`), Prettier, Vitest, Testing Library |
| Hosting | GitHub Pages (static, no backend) |

## Running it locally

Requires Node.js ≥ 22.6 and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev            # dev server
pnpm build          # production build, base path "/" (fails on type errors)
pnpm build:pages    # production build, base path "/portfolio/" — for GitHub Pages
pnpm preview        # preview the "/" build locally
pnpm preview:pages  # preview the GitHub Pages build locally, at /portfolio/
pnpm typecheck      # tsc --noEmit
pnpm lint           # eslint --max-warnings=0
pnpm test           # vitest run
```

Before I call a change done, I run `pnpm typecheck && pnpm lint && pnpm build`.

## Project structure

```
src/
  app/                    # router, layout, header/footer, UI store, global styles
  pages/                  # Home, ProjectPage (/work/:slug), NotFound
  sections/               # one folder per homepage section (Hero, Work, Stack, Contact)
  components/             # shared UI: Button, Tag, Section, Logo, ...
  scene/                  # everything that imports three.js — isolated on purpose
    Backdrop.tsx          # entry point, lazy-loaded so three.js never hits the main chunk
    layers/               # parallax point-grid layers
    hooks/                # pointer parallax, reduced-motion, viewport detection
    config.ts             # every magic number of the scene in one place
  data/
    projects.ts           # curated project list
    stack.ts              # technology reference used by project cards and the filter
    site.ts, contact.ts   # site-wide metadata and contact details
  lib/                    # framework-free utilities (i18n, storage, github, ...)
  types/
public/                   # covers, galleries, og-image, favicon, 404.html
scripts/                  # sitemap.xml / robots.txt generator
```

`three` is only ever imported inside `src/scene/`; the rest of the app talks to it
through a single lazily-loaded `<Backdrop />` component. If three.js ever lands in
the main chunk, I treat that as a bug.

## Design direction

I went for **engineering telemetry**, not neon cyberpunk: cold metal surfaces, thin
precise lines, a single accent color (`--color-signal`) used sparingly for anything
interactive, generous whitespace. No glitch effects, scanlines, or purple-blue
gradient fills. Colors are tokens defined in `global.css`; hex values are never
hard-coded in JSX.

The 3D background is three depth layers of points forming a sparse grid,
parallaxing against the cursor and scroll, breathing slowly. It's meant to be seen
with peripheral vision and stay out of the way: `aria-hidden`,
`pointer-events: none`, never part of the focus order.

## Performance & accessibility budgets

| Metric | Target |
|---|---|
| LCP (mobile, 4G) | < 2.5 s |
| Initial JS (gzip, excluding the 3D scene chunk) | < 120 kB |
| Scene chunk (gzip) | < 250 kB |
| CLS | < 0.05 |
| Lighthouse Performance (mobile) | ≥ 90 |
| Lighthouse Accessibility | 100 |

I check accessibility every iteration rather than leaving it for a final pass: real
focus outlines, semantic landmarks, full keyboard operability, and a manual **lite
mode** (footer toggle, persisted in `localStorage`) that fully unmounts the 3D scene
and disposes its geometries/materials. `prefers-reduced-motion: reduce` renders a
single static frame instead of animating. If an effect doesn't fit the budget, I
simplify the effect — I don't raise the threshold.

## Adding a project

Projects are curated by hand in `src/data/projects.ts`. Every visible string is a
`LocalizedText` (`{ ru, en }`), and a project's stack is a list of `TechId`s from
`src/data/stack.ts`, not free text.

### Gallery

1. Drop the screenshots into `public/gallery/<slug>/` — one folder per project,
   named after the project's `slug`.
2. Describe each image with the `galleryImage()` helper from `src/lib/gallery.ts`:

   ```ts
   gallery: [
     galleryImage('my-project', 'shop.png', 1600, 1000, { ru: 'Страница магазина', en: 'Shop page' }),
   ]
   ```

   Width and height are the real pixel dimensions of the file — they're required to
   reserve layout space and avoid layout shift (CLS), and nothing here auto-detects
   them at build time. The project's single cover image (used on the grid card and
   for Open Graph) stays a flat file at `public/covers/<slug>.svg|png|webp`.

## Localization

Every piece of user-facing text exists in both Russian and English from the start —
no "translate later." Static UI strings (nav labels, section titles, button text,
aria labels) live in one dictionary, `src/lib/i18n.ts`, read via `useT()`. Anything
specific to a project (title, tagline, highlights, case study text, image alt text)
is stored as `LocalizedText` directly in `src/data/projects.ts` and read via
`pick(locale, text)`. The chosen locale persists in `localStorage` and also drives
`<html lang>` and date formatting (`src/lib/date.ts`).

## Deployment

The site deploys to **GitHub Pages** as a project site via
`.github/workflows/deploy-pages.yml`: every push to `main` runs typecheck, lint,
tests, `pnpm build:pages`, and publishes `dist/`. The one manual step is enabling it
once in the repository: **Settings → Pages → Source → GitHub Actions**.

Because the site lives under a `/portfolio/` sub-path rather than a domain root:

- `vite.config.ts` sets `base` to `/portfolio/` only when `GITHUB_PAGES=true` (set by
  the workflow); locally it stays `/`.
- The router's `basename` mirrors `import.meta.env.BASE_URL` (`src/app/routes.tsx`),
  so links resolve correctly under the sub-path.
- Any image path referenced as a plain string in code (not an `import`) goes through
  `withBase()` (`src/lib/assetUrl.ts`) — Vite only rewrites paths inside `index.html`
  automatically, not string literals in `.tsx` files.
- `public/404.html` redirects unknown paths back to `index.html` (GitHub Pages has no
  server-side SPA fallback) using the
  [rafgraph/spa-github-pages](https://github.com/rafgraph/spa-github-pages) trick;
  `index.html` decodes it back before React Router reads the URL.

`pnpm build` (and `build:pages`) also regenerate `sitemap.xml` and `robots.txt` from
the curated project list (`scripts/generate-seo-files.mjs`) before compiling, so every
case-study page with a `case` block is included automatically. If the site later
moves to its own domain, change `SITE_URL` in `src/data/site.ts`, set `base` in
`vite.config.ts` back to `/`, and update the duplicated tags in `index.html`.

## Notes for contributors

This is a personal project, but if you're poking around or sending a fix, the full
project brief is in [`CLAUDE.MD`](./CLAUDE.MD): content model, design tokens, the 3D
scene spec, data model, iteration plan, and coding conventions. Please read it
before making non-trivial changes.
