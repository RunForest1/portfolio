import type { Image } from '@/types/project'

/**
 * Скриншоты кейса лежат в `public/gallery/<slug>/<файл>` — одна папка на
 * проект, имя папки совпадает со `slug` (см. README, раздел «Как добавить
 * галерею проекта»). Ширину и высоту нельзя вычислить автоматически без
 * дополнительного пакета для сборки, а новые зависимости без явного запроса
 * не добавляем (CLAUDE.md, раздел 2) — поэтому их указывают руками, как у
 * настоящего файла (смотрите в свойствах файла на компьютере или в любом
 * просмотрщике изображений).
 */
export function galleryImage(slug: string, file: string, width: number, height: number, alt = ''): Image {
  return { src: `/gallery/${slug}/${file}`, width, height, alt }
}
