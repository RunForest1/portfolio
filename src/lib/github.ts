import { getSessionItem, setSessionItem } from './storage'

export interface GithubRepoInfo {
  pushedAt: string
  stars: number
  language: string | null
}

interface CachedRepoInfo {
  data: GithubRepoInfo
  fetchedAt: number
}

/** Не на каждый рендер — кэш в sessionStorage с TTL (CLAUDE.md, раздел 9, итерация 5). */
const CACHE_TTL_MS = 60 * 60 * 1000

/**
 * Живые данные GitHub поверх курируемой карточки: дата последнего пуша,
 * звёзды, основной язык. Список проектов они не формируют (раздел 1) — при
 * ошибке или лимите API просто возвращается null, карточка остаётся целой.
 */
export async function fetchRepoInfo(repo: string): Promise<GithubRepoInfo | null> {
  const cacheKey = `github:${repo}`
  const cached = getSessionItem<CachedRepoInfo | null>(cacheKey, null)
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.data
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!response.ok) return cached?.data ?? null

    const json = (await response.json()) as {
      pushed_at: string
      stargazers_count: number
      language: string | null
    }
    const data: GithubRepoInfo = {
      pushedAt: json.pushed_at,
      stars: json.stargazers_count,
      language: json.language,
    }
    setSessionItem(cacheKey, { data, fetchedAt: Date.now() })
    return data
  } catch {
    return cached?.data ?? null
  }
}
