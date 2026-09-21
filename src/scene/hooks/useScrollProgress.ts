import { useEffect, useRef } from 'react'

/**
 * Mutable-ref с нормализованной прокруткой (0 у верха страницы, растёт вниз),
 * читается внутри useFrame — см. usePointerParallax.
 */
export function useScrollProgress(enabled: boolean): React.RefObject<number> {
  const progress = useRef(0)

  useEffect(() => {
    if (!enabled) {
      progress.current = 0
      return
    }

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      progress.current = max > 0 ? window.scrollY / max : 0
    }
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [enabled])

  return progress
}
