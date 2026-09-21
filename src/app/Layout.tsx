import { Outlet } from 'react-router'
import Backdrop from '@/scene/Backdrop'
import Header from './Header'
import Footer from './Footer'

/** Корневой лэйаут: фон общий для всех страниц, приглушается на страницах кейсов через sceneIntensity (итерация 3). */
export default function Layout() {
  return (
    <>
      <Backdrop />
      {/* pr-* резервирует место под навигацию-виджет (Header) у правого края,
          чтобы контент секций её не перекрывал на десктопе. */}
      <div className="relative flex min-h-dvh flex-col md:pr-32 lg:pr-40">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}
