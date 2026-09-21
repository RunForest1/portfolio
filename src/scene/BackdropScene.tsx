import { Canvas } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import ParallaxLayer from './layers/ParallaxLayer'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useInViewport } from './hooks/useInViewport'
import { usePointerParallax } from './hooks/usePointerParallax'
import { useScrollProgress } from './hooks/useScrollProgress'
import { useIsMobileViewport } from './hooks/useIsMobileViewport'
import { readCssVar } from '@/lib/theme'
import { DPR_RANGE, LAYERS, POINT_COLOR, POINTS_DESKTOP, POINTS_MOBILE } from './config'

function useDocumentHidden(): boolean {
  const [hidden, setHidden] = useState(() => typeof document !== 'undefined' && document.hidden)

  useEffect(() => {
    const onChange = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])

  return hidden
}

interface BackdropSceneProps {
  /** Приглушённая сцена для страниц кейсов: без параллакса от курсора, ниже непрозрачность (CLAUDE.md, итерация 3). */
  muted?: boolean
}

/**
 * Тяжёлая часть сцены — импортируется через React.lazy из Backdrop.tsx,
 * поэтому three.js не попадает в основной чанк.
 */
export default function BackdropScene({ muted = false }: BackdropSceneProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const inViewport = useInViewport(wrapperRef)
  const documentHidden = useDocumentHidden()
  const isMobile = useIsMobileViewport()
  const pointerRef = usePointerParallax(!reducedMotion && !muted)
  const scrollRef = useScrollProgress(!reducedMotion)

  const totalPoints = isMobile ? POINTS_MOBILE : POINTS_DESKTOP
  const pointColor = readCssVar('--color-haze', POINT_COLOR)

  // reduced-motion: рендерим один кадр через frameloop="demand" и больше не
  // трогаем invalidate() — этим и достигается «статичный кадр и остановка».
  const frameloop: 'always' | 'demand' | 'never' = reducedMotion
    ? 'demand'
    : documentHidden || !inViewport
      ? 'never'
      : 'always'

  return (
    <div ref={wrapperRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className={clsx('h-full w-full', muted && 'opacity-35')}>
        <Canvas
          dpr={DPR_RANGE}
          gl={{ antialias: false, powerPreference: 'high-performance' }}
          frameloop={frameloop}
          camera={{ position: [0, 0, 5], fov: 50 }}
        >
          {LAYERS.map((layer, index) => (
            <ParallaxLayer
              key={layer.key}
              count={Math.round(totalPoints * layer.share)}
              depth={layer.depth}
              parallax={layer.parallax}
              seed={index + 1}
              color={pointColor}
              pointerRef={pointerRef}
              scrollRef={scrollRef}
              breathe={!reducedMotion}
              breathPhase={index * 1.7}
            />
          ))}
        </Canvas>
      </div>
      {/* Вертикальный градиент поверх сцены — текст всегда лежит на контрастном фоне. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--color-void) 55%, transparent) 0%, transparent 22%, transparent 78%, color-mix(in srgb, var(--color-void) 65%, transparent) 100%)',
        }}
      />
    </div>
  )
}
