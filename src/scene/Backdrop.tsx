import { lazy, Suspense } from 'react'
import { useUIStore } from '@/app/store'
import GradientGround from './GradientGround'
import SceneErrorBoundary from './SceneErrorBoundary'

const BackdropScene = lazy(() => import('./BackdropScene'))

/**
 * Единственная точка, через которую секции знают о сцене (CLAUDE.md, раздел 4).
 * <Canvas> грузится только через React.lazy: GradientGround рендерится сразу
 * и синхронно, поэтому во время подгрузки и в lite-режиме нет вспышки —
 * фон визуально идентичен в обоих состояниях.
 */
export default function Backdrop() {
  const liteMode = useUIStore((state) => state.liteMode)
  const sceneIntensity = useUIStore((state) => state.sceneIntensity)
  const sceneOff = liteMode || sceneIntensity === 'off'

  return (
    <>
      <GradientGround />
      {!sceneOff && (
        <SceneErrorBoundary>
          <Suspense fallback={null}>
            <BackdropScene muted={sceneIntensity === 'muted'} />
          </Suspense>
        </SceneErrorBoundary>
      )}
    </>
  )
}
