import { Link } from 'react-router'

export default function Header() {
  return (
    <header className="mx-auto max-w-[1200px] px-6 py-6 md:px-16">
      <Link
        to="/"
        aria-label="RunForest1 — на главную"
        className="mono inline-flex text-sm tracking-wide text-ice transition-colors duration-150 ease-out hover:text-signal"
      >
        RF/
      </Link>
    </header>
  )
}
