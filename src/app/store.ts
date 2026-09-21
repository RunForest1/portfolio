import { create } from 'zustand'
import { getStorageItem, setStorageItem } from '@/lib/storage'
import type { SceneIntensity } from '@/types/scene'

const LITE_MODE_KEY = 'lite-mode'

interface UIState {
  /** Ручной lite-режим: полностью гасит 3D-сцену, состояние переживает перезагрузку. */
  liteMode: boolean
  setLiteMode: (value: boolean) => void
  toggleLiteMode: () => void
  /** Страница кейса приглушает фон поверх lite-режима — см. итерация 3. */
  sceneIntensity: SceneIntensity
  setSceneIntensity: (value: SceneIntensity) => void
  /** Мобильная панель навигации (Header) — не переживает перезагрузку, обычное UI-состояние. */
  menuOpen: boolean
  setMenuOpen: (value: boolean) => void
  toggleMenu: () => void
}

export const useUIStore = create<UIState>((set) => ({
  liteMode: getStorageItem(LITE_MODE_KEY, false),
  setLiteMode: (value) => {
    setStorageItem(LITE_MODE_KEY, value)
    set({ liteMode: value })
  },
  toggleLiteMode: () =>
    set((state) => {
      const next = !state.liteMode
      setStorageItem(LITE_MODE_KEY, next)
      return { liteMode: next }
    }),
  sceneIntensity: 'full',
  setSceneIntensity: (value) => set({ sceneIntensity: value }),
  menuOpen: false,
  setMenuOpen: (value) => set({ menuOpen: value }),
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
}))
