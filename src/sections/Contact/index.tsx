import Section from '@/components/Section'
import Button from '@/components/Button'
import { AVAILABILITY_LABEL, EMAIL, SOCIAL_LINKS } from '@/data/contact'
import EmailCopyButton from './EmailCopyButton'

/**
 * Email с копированием, ссылки на профили и плашка доступности — форму не
 * добавляем, пока нет обработчика (CLAUDE.md, раздел 9, итерация 4).
 */
export default function Contact() {
  return (
    <Section id="contact" title="Связаться">
      <div className="mt-4 inline-flex items-center gap-2 border border-signal px-3 py-1.5 text-xs text-signal">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-signal" />
        {AVAILABILITY_LABEL}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <EmailCopyButton email={EMAIL} />
        {SOCIAL_LINKS.map((link) => (
          <Button key={link.id} href={link.href} target="_blank" rel="noopener noreferrer" variant="secondary">
            {link.label}
          </Button>
        ))}
      </div>
    </Section>
  )
}
