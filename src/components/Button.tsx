import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

// Ховер меняет цвет границы, не трансформирует блок; переходы 120-200мс ease-out
// (CLAUDE.md, раздел 5).
const button = cva(
  'inline-flex items-center justify-center rounded-[2px] border px-6 py-3 text-sm font-medium transition-colors duration-150 ease-out',
  {
    variants: {
      variant: {
        primary: 'border-signal bg-signal text-void hover:bg-transparent hover:text-signal',
        secondary: 'border-steel text-ice hover:border-signal',
      },
    },
    defaultVariants: { variant: 'primary' },
  },
)

interface CommonProps extends VariantProps<typeof button> {
  className?: string
  children: ReactNode
}

type ButtonProps =
  | (CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  | (CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })

/** Кнопка-ссылка (если задан href) или обычная кнопка — единый набор стилей на оба случая. */
export default function Button({ variant, className, children, ...props }: ButtonProps) {
  const classes = clsx(button({ variant }), className)

  if (props.href !== undefined) {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    )
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  )
}
