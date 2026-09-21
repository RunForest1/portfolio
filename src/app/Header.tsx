import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { Menu, X } from 'lucide-react'
import Logo from '@/components/Logo'
import GithubMark from '@/components/GithubMark'
import { GITHUB_URL } from '@/data/contact'
import { useUIStore } from './store'

const NAV_LINKS = [
  { href: '#work', label: 'Проекты' },
  { href: '#stack', label: 'Стек' },
  { href: '#contact', label: 'Контакты' },
]

const NAV_LINK_CLASSES =
  'text-sm text-haze underline-offset-4 transition-colors duration-150 ease-out hover:text-ice hover:underline'

/**
 * Навигация — вертикальный виджет у правого края экрана, а не привычный
 * верхний бар (по решению владельца). На мобильном сворачивается в кнопку
 * с выпадающей панелью — те же ссылки, чтобы не дублировать разметку.
 */
export default function Header() {
  const menuOpen = useUIStore((state) => state.menuOpen)
  const setMenuOpen = useUIStore((state) => state.setMenuOpen)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)

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

  return (
    <header>
      <nav
        aria-label="Основная навигация"
        className="fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 flex-col items-end gap-5 border-r border-steel pr-5 md:right-10 md:flex"
      >
        <Link to="/" aria-label="RunForest1 — на главную" className="mb-2">
          <Logo className="size-7" />
        </Link>
        {NAV_LINKS.map((item) => (
          <a key={item.href} href={item.href} className={NAV_LINK_CLASSES}>
            {item.label}
          </a>
        ))}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="mt-2 text-haze transition-colors duration-150 ease-out hover:text-signal"
        >
          <GithubMark className="size-5" />
        </a>
      </nav>

      <div className="fixed top-4 right-4 z-40 md:hidden">
        <button
          ref={toggleButtonRef}
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-panel"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          className="flex size-10 items-center justify-center border border-steel bg-void text-ice transition-colors duration-150 ease-out hover:border-signal"
        >
          {menuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        </button>

        {menuOpen && (
          <nav
            id="mobile-nav-panel"
            aria-label="Основная навигация"
            className="mt-3 flex flex-col items-end gap-4 border border-steel bg-hull px-5 py-4"
          >
            {NAV_LINKS.map((item) => (
              <a key={item.href} href={item.href} className={NAV_LINK_CLASSES} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-2 text-sm text-haze transition-colors duration-150 ease-out hover:text-signal"
            >
              <GithubMark className="size-4" />
              GitHub
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
