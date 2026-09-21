import type { Project } from '@/types/project'
import type { Tech, TechId } from '@/types/tech'

/** Технологии, реально встречающиеся хотя бы в одном проекте — источник чипов фильтра. */
export function getAvailableStack(projects: Project[], stack: Tech[]): Tech[] {
  const usedIds = new Set(projects.flatMap((project) => project.stack))
  return stack
    .filter((tech) => usedIds.has(tech.id))
    .sort((a, b) => a.label.localeCompare(b.label, 'ru'))
}

export function filterProjectsByTech(projects: Project[], techId: TechId | null): Project[] {
  if (!techId) return projects
  return projects.filter((project) => project.stack.includes(techId))
}

/** Валидирует ?tech= из URL: неизвестное или пустое значение не должно ломать фильтр. */
export function parseTechParam(value: string | null, stack: Tech[]): TechId | null {
  if (!value) return null
  const match = stack.find((tech) => tech.id === value)
  return match ? match.id : null
}
