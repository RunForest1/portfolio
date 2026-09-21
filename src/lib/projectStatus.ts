import type { ProjectStatus } from '@/types/project'

/** Подписи статуса проекта — используются в карточке и на странице кейса. */
export const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: 'Живой',
  wip: 'В разработке',
  archived: 'В архиве',
}
