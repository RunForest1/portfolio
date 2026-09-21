/**
 * ПЛЕЙСХОЛДЕР: адрес и профили ниже — лучшее приближение из доступных в
 * репозитории данных (email — из аккаунта, за которым ведётся эта сессия;
 * хендл `RunForest1` уже используется в подписи футера). Проверить и
 * поправить перед деплоем — см. CLAUDE.md, раздел 1: контакты курируются
 * владельцем вручную, а не генерируются.
 */
export const EMAIL = 'nktleonenko@gmail.com'

export interface SocialLink {
  id: 'github' | 'telegram' | 'linkedin'
  label: string
  href: string
}

export const SOCIAL_LINKS: SocialLink[] = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/RunForest1' },
  { id: 'telegram', label: 'Telegram', href: 'https://t.me/RunForest1' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/RunForest1' },
]

export const AVAILABILITY_LABEL = 'Открыт для предложений'
