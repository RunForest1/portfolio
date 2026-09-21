import { useEffect, useState, type RefObject } from 'react'

/** Останавливает рендер сцены, когда canvas уходит из вьюпорта (CLAUDE.md, раздел 6). */
export function useInViewport(ref: RefObject<Element | null>): boolean {
  const [inViewport, setInViewport] = useState(true)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(([entry]) => {
      setInViewport(entry.isIntersecting)
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref])

  return inViewport
}
