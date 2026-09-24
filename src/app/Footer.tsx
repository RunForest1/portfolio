import clsx from 'clsx'
import { useT } from '@/lib/i18n'
import { useUIStore } from './store'

export default function Footer() {
  const liteMode = useUIStore((state) => state.liteMode)
  const toggleLiteMode = useUIStore((state) => state.toggleLiteMode)
  const t = useT()
  const year = new Date().getFullYear()

  return (
    <footer className="mx-auto max-w-[1200px] border-t border-steel px-6 py-12 md:px-16">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <button
          type="button"
          role="switch"
          aria-checked={liteMode}
          onClick={toggleLiteMode}
          className="inline-flex items-center gap-3 rounded-[2px] border border-steel px-4 py-2 text-sm text-haze transition-colors duration-150 ease-out hover:border-signal hover:text-ice"
        >
          <span
            aria-hidden="true"
            className={clsx(
              'flex h-4 w-8 items-center rounded-full border border-steel px-0.5 transition-colors duration-150 ease-out',
              liteMode ? 'justify-end' : 'justify-start',
            )}
          >
            <span
              className={clsx(
                'h-2.5 w-2.5 rounded-full transition-colors duration-150 ease-out',
                liteMode ? 'bg-signal' : 'bg-haze',
              )}
            />
          </span>
          {t.footer.liteMode}
        </button>
        <p className="mono text-xs text-haze">
          © <time dateTime={String(year)}>{year}</time> RunForest1
        </p>
      </div>
    </footer>
  )
}
