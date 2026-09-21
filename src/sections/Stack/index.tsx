import Section from '@/components/Section'
import Tag from '@/components/Tag'
import { stack } from '@/data/stack'
import { useT } from '@/lib/i18n'
import type { TechCategory } from '@/types/tech'

const CATEGORY_ORDER: TechCategory[] = ['frontend', 'backend', 'infra', 'tooling']

/** Технологии по категориям, без шкал владения — они ничего не значат (CLAUDE.md, раздел 9). */
export default function Stack() {
  const t = useT()
  const categoryLabel: Record<TechCategory, string> = t.stack.categories

  return (
    <Section id="stack" title={t.stack.title}>
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {CATEGORY_ORDER.map((category) => {
          const items = stack.filter((tech) => tech.category === category)
          if (items.length === 0) return null

          return (
            <div key={category}>
              <h3 className="text-sm text-haze">{categoryLabel[category]}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {items.map((tech) => (
                  <li key={tech.id}>
                    <Tag>{tech.label}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
