import { useSearchParams } from 'react-router'
import clsx from 'clsx'
import Section from '@/components/Section'
import Button from '@/components/Button'
import { projects } from '@/data/projects'
import { stack } from '@/data/stack'
import { filterProjectsByTech, getAvailableStack, parseTechParam } from '@/lib/projectFilter'
import ProjectCard from './ProjectCard'

/**
 * Грид проектов: featured занимает оба столбца, остальные — один.
 * Состояние фильтра живёт в URL (?tech=react), чтобы ссылкой можно было
 * поделиться — см. CLAUDE.md, раздел 9, итерация 2.
 */
export default function Work() {
  const [searchParams, setSearchParams] = useSearchParams()
  const availableStack = getAvailableStack(projects, stack)
  const activeTech = parseTechParam(searchParams.get('tech'), stack)
  const filtered = filterProjectsByTech(projects, activeTech)

  function toggleTech(techId: string) {
    const next = new URLSearchParams(searchParams)
    if (activeTech === techId) {
      next.delete('tech')
    } else {
      next.set('tech', techId)
    }
    setSearchParams(next, { replace: true })
  }

  return (
    <Section id="work" title="Проекты">
      {availableStack.length > 0 && (
        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Фильтр по технологии">
          {availableStack.map((tech) => {
            const isActive = tech.id === activeTech
            return (
              <li key={tech.id}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => toggleTech(tech.id)}
                  className={clsx(
                    'rounded-[2px] border px-3 py-1.5 text-xs transition-colors duration-150 ease-out',
                    isActive
                      ? 'border-signal text-signal'
                      : 'border-steel text-haze hover:border-signal hover:text-ice',
                  )}
                >
                  {tech.label}
                </button>
              </li>
            )
          })}
        </ul>
      )}

      {filtered.length > 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filtered.map((project) => (
            <li key={project.slug} className={project.featured ? 'md:col-span-2' : undefined}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      ) : (
        activeTech && (
          <div className="mt-8 flex flex-wrap items-center gap-4 border border-steel px-6 py-8 text-sm text-haze">
            <p>По технологии «{stack.find((tech) => tech.id === activeTech)?.label}» проектов пока нет.</p>
            <Button variant="secondary" onClick={() => toggleTech(activeTech)}>
              Сбросить фильтр
            </Button>
          </div>
        )
      )}
    </Section>
  )
}
