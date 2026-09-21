import { create } from 'zustand'
import { getStorageItem, setStorageItem } from '@/lib/storage'
import type { SceneIntensity } from '@/types/scene'
import type { Locale } from '@/types/i18n'

const LITE_MODE_KEY = 'lite-mode'
const LOCALE_KEY = 'locale'
const THEME_KEY = 'theme'

export type Theme = 'dark' | 'light'

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
  /** Язык интерфейса — переключатель в шапке, состояние переживает перезагрузку. */
  locale: Locale
  setLocale: (value: Locale) => void
  toggleLocale: () => void
  /** Тема — переключатель в футере, состояние переживает перезагрузку. */
  theme: Theme
  setTheme: (value: Theme) => void
  toggleTheme: () => void
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
  locale: getStorageItem<Locale>(LOCALE_KEY, 'ru'),
  setLocale: (value) => {
    setStorageItem(LOCALE_KEY, value)
    set({ locale: value })
  },
  toggleLocale: () =>
    set((state) => {
      const next: Locale = state.locale === 'ru' ? 'en' : 'ru'
      setStorageItem(LOCALE_KEY, next)
      return { locale: next }
    }),
  theme: getStorageItem<Theme>(THEME_KEY, 'dark'),
  setTheme: (value) => {
    setStorageItem(THEME_KEY, value)
    set({ theme: value })
  },
  toggleTheme: () =>
    set((state) => {
      const next: Theme = state.theme === 'dark' ? 'light' : 'dark'
      setStorageItem(THEME_KEY, next)
      return { theme: next }
    }),
}))
