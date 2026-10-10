import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, Moon, Sun, X } from 'lucide-react'
import Logo from '@/components/Logo'
import Button from '@/components/Button'
import GithubMark from '@/components/GithubMark'
import { GITHUB_URL } from '@/data/contact'
import { useLocale, useT } from '@/lib/i18n'
import { useUIStore } from './store'

/**
 * Навигация — вертикальный виджет у правого края экрана, а не привычный
 * верхний бар (по решению владельца). На мобильном сворачивается в кнопку
 * с выпадающей панелью — те же ссылки, чтобы не дублировать разметку.
 */
export default function Header() {
  const menuOpen = useUIStore((state) => state.menuOpen)
  const setMenuOpen = useUIStore((state) => state.setMenuOpen)
  const locale = useLocale()
  const toggleLocale = useUIStore((state) => state.toggleLocale)
  const theme = useUIStore((state) => state.theme)
  const toggleTheme = useUIStore((state) => state.toggleTheme)
  const t = useT()
  const { pathname } = useLocation()
  const toggleButtonRef = useRef<HTMLButtonElement>(null)

  const navLinks = [
    { href: '#work', label: t.nav.projects },
    { href: '#stack', label: t.nav.stack },
    { href: '#contact', label: t.nav.contact },
  ]

  // Клик по лого: если уже на главной, Link на тот же "/" не пересоздаёт
  // страницу и не сбрасывает скролл сам — прокручиваем наверх вручную,
  // чтобы кнопка вела не просто "на главную", а именно к её началу.
  function handleLogoClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    if (!menuOpen) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      toggleButtonRef.current?.focus()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen, setMenuOpen])

  // На странице кейса секций #work/#stack/#contact нет, поэтому якорные
  // ссылки вести некуда — виджет-навигация скрывается целиком.
  if (pathname.startsWith('/work/')) return null

  return (
    <header>
      <nav
        aria-label={t.header.mainNav}
        className="fixed top-1/2 right-6 z-40 hidden w-36 -translate-y-1/2 flex-col items-stretch gap-4 border-r border-steel pr-6 md:right-10 md:flex"
      >
        <Link to="/" aria-label={t.header.homeLabel} onClick={handleLogoClick} className="mb-2 self-end">
          <Logo className="size-10" />
        </Link>
        {navLinks.map((item) => (
          <Button key={item.href} href={item.href} variant="secondary" className="w-full justify-center">
            {item.label}
          </Button>
        ))}
        <div className="mt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.header.switchToLight : t.header.switchToDark}
            className="flex size-10 items-center justify-center border border-steel text-haze transition-colors duration-150 ease-out hover:border-signal hover:text-ice"
          >
            {theme === 'dark' ? (
              <Sun aria-hidden="true" className="size-4" />
            ) : (
              <Moon aria-hidden="true" className="size-4" />
            )}
          </button>
          <button
            type="button"
            onClick={toggleLocale}
            aria-label={t.header.switchLanguage}
            className="mono flex size-10 items-center justify-center border border-steel text-sm text-haze transition-colors duration-150 ease-out hover:border-signal hover:text-ice"
          >
            {locale === 'ru' ? 'EN' : 'RU'}
          </button>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex size-10 items-center justify-center border border-steel text-haze transition-colors duration-150 ease-out hover:border-signal hover:text-signal"
          >
            <GithubMark className="size-5" />
          </a>
        </div>
      </nav>

      <div className="fixed top-4 right-4 z-40 md:hidden">
        <button
          ref={toggleButtonRef}
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-panel"
          aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
          className="flex size-10 items-center justify-center border border-steel bg-void text-ice transition-colors duration-150 ease-out hover:border-signal"
        >
          {menuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        </button>

        {menuOpen && (
          <nav
            id="mobile-nav-panel"
            aria-label={t.header.mainNav}
            className="mt-3 flex flex-col items-stretch gap-3 border border-steel bg-hull px-5 py-4"
          >
            {navLinks.map((item) => (
              <Button
                key={item.href}
                href={item.href}
                variant="secondary"
                className="w-full justify-center"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Button>
            ))}
            <div className="mt-1 flex w-full items-center justify-end gap-3">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? t.header.switchToLight : t.header.switchToDark}
                className="flex size-10 items-center justify-center border border-steel text-haze transition-colors duration-150 ease-out hover:border-signal hover:text-ice"
              >
                {theme === 'dark' ? (
                  <Sun aria-hidden="true" className="size-4" />
                ) : (
                  <Moon aria-hidden="true" className="size-4" />
                )}
              </button>
              <button
                type="button"
                onClick={toggleLocale}
                aria-label={t.header.switchLanguage}
                className="mono flex size-10 items-center justify-center border border-steel text-sm text-haze transition-colors duration-150 ease-out hover:border-signal hover:text-ice"
              >
                {locale === 'ru' ? 'EN' : 'RU'}
              </button>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                onClick={() => setMenuOpen(false)}
                className="flex size-10 items-center justify-center border border-steel text-haze transition-colors duration-150 ease-out hover:border-signal hover:text-signal"
              >
                <GithubMark className="size-5" />
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
