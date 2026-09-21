import { useEffect, useRef } from 'react'

export interface PointerPosition {
  /** -1..1, 0 — центр вьюпорта */
  x: number
  y: number
}

/**
 * Отдаёт mutable-ref, а не state: позиция курсора читается внутри useFrame
 * без ре-рендеров React и без аллокаций на каждый кадр (CLAUDE.md, раздел 6).
 */
export function usePointerParallax(enabled: boolean): React.RefObject<PointerPosition> {
  const position = useRef<PointerPosition>({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled) {
      position.current.x = 0
      position.current.y = 0
      return
    }

    const onPointerMove = (event: PointerEvent) => {
      position.current.x = (event.clientX / window.innerWidth) * 2 - 1
      position.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [enabled])

  return position
}
