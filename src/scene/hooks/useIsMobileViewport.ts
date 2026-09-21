import { useEffect, useState } from 'react'
import { MOBILE_VIEWPORT_QUERY } from '@/scene/config'

/** Плотность решётки зависит от ширины вьюпорта, не от user-agent (CLAUDE.md, раздел 6). */
export function useIsMobileViewport(): boolean {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_VIEWPORT_QUERY).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_VIEWPORT_QUERY)
    const onChange = () => setIsMobile(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isMobile
}
