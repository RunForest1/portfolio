interface LogoProps {
  className?: string
}

/**
 * Фирменный знак: круглый бейдж с сосной, внутри кроны — дорожки печатной
 * платы с узлами (лес + разработка). Совпадает по форме с public/favicon.svg;
 * менять оба файла вместе.
 */
export default function Logo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 240 240" fill="none" aria-hidden="true" className={className}>
      <circle cx="120" cy="120" r="104" fill="var(--color-void)" stroke="var(--color-ice)" strokeWidth="6" />
      <path
        d="M120 32 L152 78 L134 78 L166 122 L142 122 L176 168 L146 168 L146 200 L94 200 L94 168 L64 168 L98 122 L74 122 L106 78 L88 78 Z"
        fill="none"
        stroke="var(--color-ice)"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path
        d="M120 60 L120 90 L142 90 L142 108"
        fill="none"
        stroke="var(--color-signal)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M120 100 L98 100 L98 130 L108 130"
        fill="none"
        stroke="var(--color-signal)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M132 140 L152 140 L152 158"
        fill="none"
        stroke="var(--color-signal)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="142" cy="108" r="4" fill="var(--color-signal)" />
      <circle cx="108" cy="130" r="4" fill="var(--color-signal)" />
      <circle cx="152" cy="158" r="4" fill="var(--color-signal)" />
      <circle cx="120" cy="60" r="4" fill="var(--color-signal)" />
    </svg>
  )
}
