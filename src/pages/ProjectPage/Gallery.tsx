import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Image } from '@/types/project'

interface GalleryProps {
  images: Image[]
}

const ICON_BUTTON_CLASSES =
  'border border-steel p-2 text-haze transition-colors duration-150 ease-out hover:border-signal hover:text-ice'

/**
 * Галерея с лайтбоксом: клик открывает изображение крупно, закрытие по Esc и
 * клику вне, фокус возвращается на миниатюру, стрелки переключают кадры
 * (CLAUDE.md, раздел 9, итерация 3).
 */
export default function Gallery({ images }: GalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])
  const dialogRef = useRef<HTMLDivElement>(null)

  function close() {
    const index = openIndex
    setOpenIndex(null)
    if (index !== null) triggerRefs.current[index]?.focus()
  }

  function step(delta: number) {
    setOpenIndex((current) => (current === null ? current : (current + delta + images.length) % images.length))
  }

  useEffect(() => {
    if (openIndex === null) return

    dialogRef.current?.focus()
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Логика продублирована с close()/step() намеренно: эффект должен зависеть
    // только от openIndex и images.length, иначе он пересоздавал бы слушателя
    // на каждый рендер (close/step — новые функции каждый раз).
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenIndex((current) => {
          if (current !== null) triggerRefs.current[current]?.focus()
          return null
        })
      } else if (event.key === 'ArrowRight') {
        setOpenIndex((current) => (current === null ? current : (current + 1) % images.length))
      } else if (event.key === 'ArrowLeft') {
        setOpenIndex((current) => (current === null ? current : (current - 1 + images.length) % images.length))
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [openIndex, images.length])

  if (images.length === 0) return null

  const openImage = openIndex !== null ? images[openIndex] : null

  return (
    <>
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3" aria-label="Галерея проекта">
        {images.map((image, index) => (
          <li key={image.src}>
            <button
              type="button"
              ref={(el) => {
                triggerRefs.current[index] = el
              }}
              onClick={() => setOpenIndex(index)}
              className="block w-full border border-steel transition-colors duration-150 ease-out hover:border-signal"
            >
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                className="aspect-[8/5] w-full object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      {openImage && (
        // Клик по фону (не по картинке) закрывает лайтбокс — клавиатурный эквивалент
        // (Esc) уже обрабатывается глобальным слушателем в useEffect выше.
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр изображения"
          tabIndex={-1}
          onClick={(event) => {
            if (event.target === event.currentTarget) close()
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 p-6 outline-none"
        >
          <button type="button" onClick={close} aria-label="Закрыть" className={`${ICON_BUTTON_CLASSES} absolute right-6 top-6`}>
            <X aria-hidden="true" className="size-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Предыдущее изображение"
                className={`${ICON_BUTTON_CLASSES} absolute left-6 top-1/2 -translate-y-1/2`}
              >
                <ChevronLeft aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Следующее изображение"
                className={`${ICON_BUTTON_CLASSES} absolute right-6 top-1/2 -translate-y-1/2`}
              >
                <ChevronRight aria-hidden="true" className="size-5" />
              </button>
            </>
          )}

          <img
            src={openImage.src}
            alt={openImage.alt}
            width={openImage.width}
            height={openImage.height}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
    </>
  )
}
