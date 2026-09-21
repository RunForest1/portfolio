import { Link } from 'react-router'
import PageMeta from '@/components/PageMeta'

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="mx-auto flex min-h-[60dvh] max-w-[1200px] flex-col justify-center px-6 md:px-16"
    >
      <PageMeta
        title="Страница не найдена — RunForest1"
        description="Такого адреса нет на сайте."
        path="/404"
        noindex
      />
      <h1 id="not-found-heading" className="text-3xl">
        Страница не найдена
      </h1>
      <p className="mt-4 text-haze">Такого адреса нет на сайте.</p>
      <Link
        to="/"
        className="mt-8 inline-flex w-fit text-signal underline-offset-4 transition-colors duration-150 ease-out hover:underline"
      >
        На главную
      </Link>
    </section>
  )
}
