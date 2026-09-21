import { Outlet } from 'react-router'
import Backdrop from '@/scene/Backdrop'
import Header from './Header'
import Footer from './Footer'

/** Корневой лэйаут: фон общий для всех страниц, приглушается на страницах кейсов через sceneIntensity (итерация 3). */
export default function Layout() {
  return (
    <>
      <Backdrop />
      <div className="relative flex min-h-dvh flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}
