/**
 * Сайт деплоится на GitHub Pages как project-сайт (https://runforest1.github.io/portfolio/,
 * см. .github/workflows/deploy-pages.yml и GITHUB_PAGES_BASE в vite.config.ts).
 * Значение используется в canonical, Open Graph, JSON-LD и при генерации
 * sitemap.xml/robots.txt (scripts/generate-seo-files.mjs) — единственное
 * место, где его нужно поменять, если позже появится свой домен (заодно
 * поправить base в vite.config.ts на '/' и продублированные теги в index.html).
 */
export const SITE_URL = 'https://runforest1.github.io/portfolio'
export const SITE_NAME = 'RunForest1'
export const SITE_DESCRIPTION = 'Фронтенд-разработчик: React, TypeScript, three.js. Портфолио с разбором проектов.'
