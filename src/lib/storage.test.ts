import { describe, expect, it, beforeEach } from 'vitest'
import { getStorageItem, setStorageItem } from './storage'

describe('storage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('возвращает fallback, если ключа ещё нет', () => {
    expect(getStorageItem('missing', 'default')).toBe('default')
  })

  it('сохраняет и читает значение обратно', () => {
    setStorageItem('lite-mode', true)
    expect(getStorageItem('lite-mode', false)).toBe(true)
  })

  it('возвращает fallback на битом JSON вместо падения', () => {
    window.localStorage.setItem('portfolio:broken', '{not json')
    expect(getStorageItem('broken', 'default')).toBe('default')
  })
})
