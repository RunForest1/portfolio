# RunForest1 — Developer Portfolio

A portfolio for the developer's projects. Single scrolling homepage plus dedicated
case-study pages for individual projects.

## Tech stack

Vite, TypeScript, Tailwind CSS, three.js, Zustand, React, React Router, Ant Design,
ESLint, Prettier, Vitest, Node.js, Express.

## What's on the site

- **Hero** — name, one-line specialization, and calls to action.
- **Work** — a curated grid of projects (not an auto-pulled GitHub feed). Each entry
  is hand-picked in `src/data/projects.ts`; live GitHub data (last commit, stars,
  primary language) is optionally layered on top via `links.repo`, but never decides
  which projects appear.
- **Project case pages** (`/work/:slug`) — problem / solution / outcome / lessons
  breakdown with a gallery, for projects worth a deeper look.
- **Stack** — technologies grouped by category, without fake proficiency percentages.
- **Contact** — email with one-click copy, GitHub/Telegram links, an availability
  badge.
- **Navigation** — anchor links (Projects / Stack / Contacts) plus a GitHub link and
  a language switch, docked as a widget on the right edge of the screen; collapses
  into a menu button on mobile (`src/app/Header.tsx`).
- **Language and theme** — the whole UI and all project content ship in Russian and
  English (toggle in the header); dark is the default theme, with a light
  alternative (toggle in the footer). Both persist in `localStorage`.

## Getting started

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

## Project structure

```
src/
  app/                    # router, providers, global styles
  pages/                  # Home, ProjectPage (/work/:slug), NotFound
  sections/               # one folder per homepage section (Hero, Work, Stack, Contact)
  components/             # shared UI: Button, Tag, Section, ...
  scene/                  # everything that imports three.js — isolated on purpose
    Backdrop.tsx          # entry point, lazy-loaded so three.js never hits the main chunk
    layers/                # parallax point-grid layers
    hooks/                 # pointer parallax, reduced-motion, viewport detection
  data/
    projects.ts           # curated project list
    stack.ts              # technology reference used by project cards and the filter
  lib/                    # framework-free utilities
  types/
```

`three` is only ever imported inside `src/scene/`; the rest of the app talks to it
through a single lazily-loaded `<Backdrop />` component.

## Design direction

**Engineering telemetry**, not neon cyberpunk: cold metal surfaces, thin precise
lines, a single accent color used sparingly for anything interactive, generous
whitespace. No glitch effects, scanlines, or purple-blue gradient fills.

The 3D background is three depth layers of points forming a sparse grid, parallaxing
against the cursor and scroll, breathing slowly. It is decorative and stays out of the
way: `aria-hidden`, `pointer-events: none`, never part of the focus order.

## Performance & accessibility budgets

| Metric | Target |
|---|---|
| LCP (mobile, 4G) | < 2.5 s |
| Initial JS (gzip, excluding the 3D scene chunk) | < 120 kB |
| Scene chunk (gzip) | < 250 kB |
| CLS | < 0.05 |
| Lighthouse Performance (mobile) | ≥ 90 |
| Lighthouse Accessibility | 100 |

Accessibility is checked every iteration, not treated as a final pass: real focus
outlines, semantic landmarks, full keyboard operability, and a manual **lite mode**
(footer toggle, persisted in `localStorage`) that fully unmounts the 3D scene and
disposes its geometries/materials. `prefers-reduced-motion: reduce` renders a single
static frame instead of animating.

## Contributing

See [`CLAUDE.MD`](./CLAUDE.MD) for the full project brief: content model, design
tokens, the 3D scene spec, data model, iteration plan, and coding conventions. Read it
before making non-trivial changes.

## Adding a project's gallery

1. Drop the screenshots into `public/gallery/<slug>/` — one folder per project, named
   after the project's `slug`.
2. In `src/data/projects.ts`, describe each image with the `galleryImage()` helper
   from `src/lib/gallery.ts`:

   ```ts
   gallery: [
     galleryImage('pandemia', 'shop.png', 1600, 1000, { ru: 'Страница магазина', en: 'Shop page' }),
   ]
   ```

   Width and height are the real pixel dimensions of the file (check the image's
   properties, or any image viewer) — they're required to reserve layout space and
   avoid layout shift (CLS), and nothing in this project auto-detects them at build
   time. The project's single cover image (used on the grid card and for Open Graph)
   stays a flat file at `public/covers/<slug>.svg|png|webp` — it doesn't need its own
   folder since there's only one per project.

## Localization

Every piece of user-facing text ships in both Russian and English — there's no
"translate later." Static UI strings (nav labels, section titles, button text, aria
labels) live in one dictionary, `src/lib/i18n.ts`, read via `useT()`. Anything
specific to a project (title, tagline, highlights, case study text, image alt text)
is stored as `LocalizedText` (`{ ru: string; en: string }`) directly in
`src/data/projects.ts` and read via `pick(locale, text)`. The language toggle lives
in the header; the chosen locale persists in `localStorage` and also drives
`<html lang>` and date formatting (`src/lib/date.ts`).

## Deployment

The site deploys to **GitHub Pages** as a project site
(`https://runforest1.github.io/portfolio/`) via
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
case-study page with a `case` block is included automatically.
