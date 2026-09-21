import { Link } from 'react-router'
import PageMeta from '@/components/PageMeta'
import { useT } from '@/lib/i18n'

export default function NotFound() {
  const t = useT()

  return (
    <section
      aria-labelledby="not-found-heading"
      className="mx-auto flex min-h-[60dvh] max-w-[1200px] flex-col justify-center px-6 md:px-16"
    >
      <PageMeta title={`${t.notFound.title} — RunForest1`} description={t.notFound.body} path="/404" noindex />
      <h1 id="not-found-heading" className="text-3xl">
        {t.notFound.title}
      </h1>
      <p className="mt-4 text-haze">{t.notFound.body}</p>
      <Link
        to="/"
        className="mt-8 inline-flex w-fit text-signal underline-offset-4 transition-colors duration-150 ease-out hover:underline"
      >
        {t.notFound.backHome}
      </Link>
    </section>
  )
}
