import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/** Живо следит за prefers-reduced-motion, а не читает его один раз при монтировании. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const onChange = () => setReduced(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return reduced
}
