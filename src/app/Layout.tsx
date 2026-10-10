import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import clsx from 'clsx'
import Backdrop from '@/scene/Backdrop'
import { useLocale } from '@/lib/i18n'
import Header from './Header'
import Footer from './Footer'
import { useUIStore } from './store'

/** Корневой лэйаут: фон общий для всех страниц, приглушается на страницах кейсов через sceneIntensity (итерация 3). */
export default function Layout() {
  const locale = useLocale()
  const theme = useUIStore((state) => state.theme)

  // На странице кейса виджет-навигация скрыта (см. Header) — место справа
  // под неё не резервируем.
  const { pathname } = useLocation()
  const isCasePage = pathname.startsWith('/work/')

  // <html lang>/[data-theme] должны жить на корневом элементе документа, а не
  // внутри React-дерева — синхронизируем их со стором эффектом здесь, в
  // единственном месте, которое рендерится ровно один раз на всё приложение.
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <>
      <Backdrop />
      {/* pr-* резервирует место под навигацию-виджет (Header) у правого края,
          чтобы контент секций её не перекрывал на десктопе. */}
      <div className={clsx('relative flex min-h-dvh flex-col', !isCasePage && 'md:pr-40 lg:pr-48')}>
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}
