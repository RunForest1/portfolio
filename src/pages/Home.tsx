import { useMemo } from 'react'
import Hero from '@/sections/Hero'
import Work from '@/sections/Work'
import Stack from '@/sections/Stack'
import Contact from '@/sections/Contact'
import PageMeta from '@/components/PageMeta'
import JsonLd from '@/components/JsonLd'
import { EMAIL, SOCIAL_LINKS } from '@/data/contact'
import { JOB_TITLE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/data/site'
import { pick, useLocale } from '@/lib/i18n'

export default function Home() {
  const locale = useLocale()

  const personLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
      jobTitle: pick(locale, JOB_TITLE),
      email: `mailto:${EMAIL}`,
      sameAs: SOCIAL_LINKS.map((link) => link.href),
    }),
    [locale],
  )

  return (
    <>
      <PageMeta title={`${SITE_NAME} — ${pick(locale, JOB_TITLE)}`} description={pick(locale, SITE_DESCRIPTION)} path="/" />
      <JsonLd data={personLd} />
      <Hero />
      <Work />
      <Stack />
      <Contact />
    </>
  )
}
