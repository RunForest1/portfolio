import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchRepoInfo } from './github'
import { setSessionItem } from './storage'

function mockFetchOnce(response: Partial<Response> & { ok: boolean }) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      json: async () => ({}),
      ...response,
    }),
  )
}

describe('fetchRepoInfo', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('возвращает данные и кладёт их в кэш при успешном ответе', async () => {
    mockFetchOnce({
      ok: true,
      json: async () => ({ pushed_at: '2026-01-01T00:00:00Z', stargazers_count: 42, language: 'TypeScript' }),
    })

    const info = await fetchRepoInfo('octocat/Hello-World')

    expect(info).toEqual({ pushedAt: '2026-01-01T00:00:00Z', stars: 42, language: 'TypeScript' })
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('не бьёт сеть повторно, пока кэш не устарел (TTL)', async () => {
    setSessionItem('github:octocat/Hello-World', {
      data: { pushedAt: '2026-01-01T00:00:00Z', stars: 1, language: 'JS' },
      fetchedAt: Date.now(),
    })
    mockFetchOnce({ ok: true, json: async () => ({ pushed_at: 'x', stargazers_count: 0, language: null }) })

    const info = await fetchRepoInfo('octocat/Hello-World')

    expect(info).toEqual({ pushedAt: '2026-01-01T00:00:00Z', stars: 1, language: 'JS' })
    expect(fetch).not.toHaveBeenCalled()
  })

  it('возвращает null без кэша, если API ответил ошибкой', async () => {
    mockFetchOnce({ ok: false })

    expect(await fetchRepoInfo('octocat/Hello-World')).toBeNull()
  })

  it('при ошибке/лимите API откатывается на протухший кэш, а не роняет карточку', async () => {
    setSessionItem('github:octocat/Hello-World', {
      data: { pushedAt: '2020-01-01T00:00:00Z', stars: 5, language: 'Go' },
      fetchedAt: Date.now() - 24 * 60 * 60 * 1000,
    })
    mockFetchOnce({ ok: false })

    expect(await fetchRepoInfo('octocat/Hello-World')).toEqual({
      pushedAt: '2020-01-01T00:00:00Z',
      stars: 5,
      language: 'Go',
    })
  })

  it('возвращает null, если сеть недоступна и кэша нет', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('network down')),
    )

    expect(await fetchRepoInfo('octocat/Hello-World')).toBeNull()
  })
})
