import type { ProjectStatus } from '@/types/project'
import type { LocalizedText } from '@/types/i18n'

/** Подписи статуса проекта — используются в карточке и на странице кейса. */
export const STATUS_LABEL: Record<ProjectStatus, LocalizedText> = {
  live: { ru: 'Завершён', en: 'Completed' },
  wip: { ru: 'В разработке', en: 'In progress' },
  archived: { ru: 'В архиве', en: 'Archived' },
}
