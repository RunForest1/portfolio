import type { ReactNode } from 'react'
import clsx from 'clsx'

interface SectionProps {
  id: string
  title: string
  children?: ReactNode
  className?: string
}

/**
 * Секция с корректной семантикой: `aria-labelledby` на заголовок, линия-разделитель
 * шириной в колонку контента, а не на весь экран (CLAUDE.md, разделы 5 и 7).
 */
export default function Section({ id, title, children, className }: SectionProps) {
  const headingId = `${id}-heading`

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={clsx('mx-auto max-w-[1200px] border-t border-steel px-6 py-24 md:px-16 md:py-32', className)}
    >
      <h2 id={headingId} className="text-lg">
        {title}
      </h2>
      {children}
    </section>
  )
}
