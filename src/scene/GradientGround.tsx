// Чистый CSS/DOM, three.js не импортируется — можно грузить синхронно,
// не дожидаясь ленивого <BackdropScene />, поэтому вспышки при подгрузке нет.

const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"

/**
 * Медленный радиальный градиент hull → void + едва заметное зерно.
 * Даёт глубину под 3D-слоем и служит fallback'ом на время его подгрузки
 * (CLAUDE.md, раздел 6).
 */
export default function GradientGround() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, var(--color-hull) 0%, var(--color-void) 75%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE}")` }}
      />
    </div>
  )
}
