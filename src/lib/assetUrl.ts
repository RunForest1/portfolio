/**
 * Данные проектов хранят пути к изображениям как корневые строки ('/covers/x.svg'),
 * а не через import — Vite не переписывает такие строки под `base` сам (в отличие
 * от атрибутов в index.html), поэтому на GitHub Pages (base='/portfolio/') без
 * этой обёртки обложки и галерея запрашивались бы с домена, а не с подпути.
 */
export function withBase(path: string): string {
  return import.meta.env.BASE_URL.replace(/\/$/, '') + path
}
