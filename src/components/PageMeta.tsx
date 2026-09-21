import { useEffect } from 'react'
import { removeMeta, upsertLink, upsertMeta } from '@/lib/documentHead'
import { SITE_URL } from '@/data/site'

interface PageMetaProps {
  title: string
  description: string
  /** Путь без домена, начинается с "/" (или "" для главной) — идёт в canonical и og:url. */
  path: string
  /** Абсолютный URL картинки; по умолчанию — общая OG-картинка сайта. */
  image?: string
  /** Страницы вроде 404 не должны попадать в индекс. */
  noindex?: boolean
}

/**
 * Заголовок вкладки, description, canonical и Open Graph — на страницу.
 * Соцсети (Facebook/Telegram/LinkedIn-превью) не выполняют JS и увидят только
 * статичные теги из index.html — здесь мы обновляем то, что важно для
 * реального посетителя (title) и для JS-краулеров вроде Googlebot.
 */
export default function PageMeta({ title, description, path, image, noindex = false }: PageMetaProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`
    const ogImage = image ?? `${SITE_URL}/og-image.png`

    document.title = title
    upsertMeta('name', 'description', description)
    upsertLink('canonical', url)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', ogImage)
    upsertMeta('property', 'og:type', path === '/' ? 'website' : 'article')
    upsertMeta('name', 'twitter:card', 'summary_large_image')

    if (noindex) {
      upsertMeta('name', 'robots', 'noindex, nofollow')
    } else {
      removeMeta('name', 'robots')
    }
  }, [title, description, path, image, noindex])

  return null
}
