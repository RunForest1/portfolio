/**
 * Императивное управление <head> без сторонних зависимостей вроде react-helmet
 * (CLAUDE.md, раздел 2: новые зависимости не добавлять без явного запроса).
 * upsert-функции переиспользуют существующий тег, если он уже есть — иначе
 * создают новый, чтобы навигация между страницами не плодила дубликаты.
 */

export function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function removeMeta(attr: 'name' | 'property', key: string): void {
  document.head.querySelector(`meta[${attr}="${key}"]`)?.remove()
}

export function upsertLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}
