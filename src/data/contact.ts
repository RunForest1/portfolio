import type { LocalizedText } from '@/types/i18n'

/** Контакты курируются владельцем вручную, не генерируются (CLAUDE.md, раздел 1). */
export const EMAIL = 'l-n-w@mail.ru'

export interface SocialLink {
  id: 'github' | 'telegram'
  label: string
  href: string
}

export const SOCIAL_LINKS: SocialLink[] = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/RunForest1' },
  { id: 'telegram', label: 'Telegram', href: 'https://t.me/RunForesterRun' },
]

/** Ссылка на GitHub отдельно — её используют вне Contact (Header). */
export const GITHUB_URL = SOCIAL_LINKS.find((link) => link.id === 'github')!.href

export const AVAILABILITY_LABEL: LocalizedText = {
  ru: 'Открыт для предложений',
  en: 'Open to offers',
}
