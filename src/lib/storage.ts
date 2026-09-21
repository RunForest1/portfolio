/**
 * Единственная точка входа к localStorage/sessionStorage в проекте (см.
 * CLAUDE.md, раздел 11). Оборачивает доступ в try/catch: приватный режим
 * браузера и заполненная квота не должны ронять приложение.
 */

const PREFIX = 'portfolio:'

function safeGet<T>(storage: Storage, key: string, fallback: T): T {
  try {
    const raw = storage.getItem(PREFIX + key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function safeSet<T>(storage: Storage, key: string, value: T): void {
  try {
    storage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // Хранилище недоступно — приложение продолжает работать без персистентности/кэша
  }
}

export function getStorageItem<T>(key: string, fallback: T): T {
  return safeGet(window.localStorage, key, fallback)
}

export function setStorageItem<T>(key: string, value: T): void {
  safeSet(window.localStorage, key, value)
}

/** sessionStorage — для данных, которые не должны переживать закрытие вкладки (например, кэш GitHub API, итерация 5). */
export function getSessionItem<T>(key: string, fallback: T): T {
  return safeGet(window.sessionStorage, key, fallback)
}

export function setSessionItem<T>(key: string, value: T): void {
  safeSet(window.sessionStorage, key, value)
}
