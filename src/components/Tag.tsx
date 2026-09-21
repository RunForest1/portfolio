import type { ReactNode } from 'react'
import clsx from 'clsx'

interface TagProps {
  children: ReactNode
  className?: string
}

/** Пилюля для меток стека и статуса — переиспользуется в карточках проекта и в секции Stack. */
export default function Tag({ children, className }: TagProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-[2px] border border-steel px-2 py-1 text-xs text-haze',
        className,
      )}
    >
      {children}
    </span>
  )
}
