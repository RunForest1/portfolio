interface LogoProps {
  className?: string
}

/**
 * Фирменный знак: дерево из тех же узлов и линий, что и параллакс-решётка
 * фона (CLAUDE.md, раздел 6) — тот же визуальный язык, что и в 3D-сцене.
 * Совпадает по форме с public/favicon.svg; менять оба файла вместе.
 */
export default function Logo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <circle cx="16" cy="27" r="1.8" fill="var(--color-haze)" />
      <path
        d="M16 27V17M16 17 8 8M16 17V5M16 17l8-9"
        stroke="var(--color-haze)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="8" cy="8" r="2.4" fill="var(--color-signal)" />
      <circle cx="16" cy="5" r="2.4" fill="var(--color-signal)" />
      <circle cx="24" cy="8" r="2.4" fill="var(--color-signal)" />
    </svg>
  )
}
