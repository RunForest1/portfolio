import { useEffect, useState } from 'react'
import { fetchRepoInfo, type GithubRepoInfo } from '@/lib/github'

/** Живые данные GitHub поверх карточки проекта — см. CLAUDE.md, разделы 1 и 9 (итерация 5). */
export function useGithubRepoInfo(repo: string | undefined): GithubRepoInfo | null {
  const [info, setInfo] = useState<GithubRepoInfo | null>(null)

  useEffect(() => {
    if (!repo) return

    let cancelled = false
    fetchRepoInfo(repo).then((data) => {
      if (!cancelled && data) setInfo(data)
    })

    return () => {
      cancelled = true
    }
  }, [repo])

  return info
}
