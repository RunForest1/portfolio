import Button from '@/components/Button'

/**
 * Первый экран: 3D-фон уже виден к моменту монтирования (Backdrop живёт в Layout
 * и рендерится раньше), поэтому здесь проявляется только заголовок —
 * это и есть вторая часть оркестрованной сцены загрузки (CLAUDE.md, раздел 5).
 * Переход — на чистом CSS (.animate-hero-in), чтобы не тянуть анимационную
 * библиотеку в критический чанк ради одного разового появления.
 */
export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="flex min-h-dvh flex-col justify-center px-6 py-24 md:px-16"
    >
      <div className="animate-hero-in mx-auto w-full max-w-[1200px]">
        <h1 id="hero-heading" className="text-4xl">
          RunForest1
        </h1>
        <p className="mt-4 max-w-[36ch] text-lg text-haze">
          Frontend-разработчик: React, TypeScript, three.js
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="#work" variant="primary">
            Проекты
          </Button>
          <Button href="#contact" variant="secondary">
            Связаться
          </Button>
        </div>
      </div>
    </section>
  )
}
