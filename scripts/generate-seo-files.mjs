// Генерирует public/sitemap.xml и public/robots.txt из data/projects.ts перед
// сборкой — единственный источник правды для списка слагов (CLAUDE.md,
// раздел 9, итерация 4). Требует Node >= 22.6 (нативная поддержка TS-импорта
// без транспиляции, см. package.json → engines) — новую зависимость вроде
// ts-node/tsx подключать не стали.
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { projects } from '../src/data/projects.ts'
import { SITE_URL } from '../src/data/site.ts'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(rootDir, '..', 'public')

const paths = ['/', ...projects.filter((project) => project.case).map((project) => `/work/${project.slug}`)]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((url) => `  <url><loc>${SITE_URL}${url}</loc></url>`).join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)
writeFileSync(path.join(publicDir, 'robots.txt'), robots)

console.log(`generate-seo-files: sitemap.xml (${paths.length} URL), robots.txt`)
