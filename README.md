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
- **Contact** — email with one-click copy, GitHub/Telegram/LinkedIn links, an
  availability badge.

## Getting started

```bash
pnpm install
pnpm dev          # dev server
pnpm build        # production build (fails on type errors)
pnpm preview      # preview the production build locally
pnpm typecheck    # tsc --noEmit
pnpm lint         # eslint --max-warnings=0
pnpm test         # vitest run
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

## Deployment

`pnpm build` also regenerates `sitemap.xml` and `robots.txt` from the curated project
list (`scripts/generate-seo-files.mjs`) before compiling, so every case-study page
with a `case` block is included automatically.
