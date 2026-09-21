import { useMemo, useRef, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { generateGridPoints } from './generateGridPoints'
import {
  BREATH_AMPLITUDE,
  BREATH_SPEED,
  GRID_JITTER,
  GRID_SPREAD,
  POINT_OPACITY,
  POINT_SIZE,
  POINTER_PARALLAX_STRENGTH,
  SCROLL_PARALLAX_STRENGTH,
} from '@/scene/config'
import type { PointerPosition } from '@/scene/hooks/usePointerParallax'

interface ParallaxLayerProps {
  count: number
  depth: number
  parallax: number
  seed: number
  color: string
  pointerRef: RefObject<PointerPosition>
  scrollRef: RefObject<number>
  /** Выключается вместе с prefers-reduced-motion: сцена рендерит один статичный кадр. */
  breathe: boolean
  breathPhase: number
}

/** Один слой параллакс-решётки — один draw call (points). */
export default function ParallaxLayer({
  count,
  depth,
  parallax,
  seed,
  color,
  pointerRef,
  scrollRef,
  breathe,
  breathPhase,
}: ParallaxLayerProps) {
  const groupRef = useRef<Group>(null)
  const positions = useMemo(() => generateGridPoints(count, GRID_SPREAD, GRID_JITTER, seed), [count, seed])

  useFrame((state) => {
    const group = groupRef.current
    if (!group) return

    const pointer = pointerRef.current
    const scroll = scrollRef.current

    group.position.x = pointer.x * POINTER_PARALLAX_STRENGTH * parallax
    group.position.y =
      -pointer.y * POINTER_PARALLAX_STRENGTH * parallax * 0.5 + scroll * SCROLL_PARALLAX_STRENGTH * parallax

    if (breathe) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * BREATH_SPEED + breathPhase) * BREATH_AMPLITUDE
      group.scale.setScalar(scale)
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, depth]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={color}
          size={POINT_SIZE}
          sizeAttenuation
          transparent
          opacity={POINT_OPACITY}
          depthWrite={false}
        />
      </points>
    </group>
  )
}
