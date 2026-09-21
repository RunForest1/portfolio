import { useMemo } from 'react'
import Hero from '@/sections/Hero'
import Work from '@/sections/Work'
import Stack from '@/sections/Stack'
import Contact from '@/sections/Contact'
import PageMeta from '@/components/PageMeta'
import JsonLd from '@/components/JsonLd'
import { EMAIL, SOCIAL_LINKS } from '@/data/contact'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/data/site'

export default function Home() {
  const personLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
      jobTitle: 'Frontend-разработчик',
      email: `mailto:${EMAIL}`,
      sameAs: SOCIAL_LINKS.map((link) => link.href),
    }),
    [],
  )

  return (
    <>
      <PageMeta title={`${SITE_NAME} — фронтенд-разработчик`} description={SITE_DESCRIPTION} path="/" />
      <JsonLd data={personLd} />
      <Hero />
      <Work />
      <Stack />
      <Contact />
    </>
  )
}
