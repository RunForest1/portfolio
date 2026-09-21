import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { useUIStore } from '@/app/store'
import Button from '@/components/Button'
import Tag from '@/components/Tag'
import Section from '@/components/Section'
import PageMeta from '@/components/PageMeta'
import JsonLd from '@/components/JsonLd'
import { projects } from '@/data/projects'
import { techLabelById } from '@/data/stack'
import { STATUS_LABEL } from '@/lib/projectStatus'
import { SITE_NAME, SITE_URL } from '@/data/site'
import NotFound from '@/pages/NotFound'
import type { Project } from '@/types/project'
import Gallery from './Gallery'

const CASE_PROJECTS = projects.filter((project) => project.case)

/** Кнопки на репозиторий и демо — переиспользуются в шапке страницы и в конце (CLAUDE.md, итерация 3). */
function ProjectLinks({ project }: { project: Project }) {
  const { repo, demo } = project.links
  if (!repo && !demo) return null

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      {demo && (
        <Button href={demo} target="_blank" rel="noopener noreferrer" variant="primary">
          Демо
          <ExternalLink aria-hidden="true" className="ml-2 size-4" />
        </Button>
      )}
      {repo && (
        <Button
          href={`https://github.com/${repo}`}
          target="_blank"
          rel="noopener noreferrer"
          variant={demo ? 'secondary' : 'primary'}
        >
          Репозиторий
          <ExternalLink aria-hidden="true" className="ml-2 size-4" />
        </Button>
      )}
    </div>
  )
}

/**
 * Страница кейса: разбор по problem/solution/outcome/lessons и галерея.
 * 3D-фон здесь приглушается через sceneIntensity — читают, а не любуются
 * (CLAUDE.md, разделы 5 и 9, итерация 3).
 */
export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const setSceneIntensity = useUIStore((state) => state.setSceneIntensity)
  const project = projects.find((item) => item.slug === slug)

  useEffect(() => {
    setSceneIntensity('muted')
    return () => setSceneIntensity('full')
  }, [setSceneIntensity])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const caseLd = useMemo(() => {
    if (!project || !project.case) return null
    return {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: project.tagline,
      url: `${SITE_URL}/work/${project.slug}`,
      image: `${SITE_URL}${project.cover.src}`,
      dateCreated: String(project.year),
      keywords: project.stack.map((id) => techLabelById.get(id) ?? id).join(', '),
      author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
    }
  }, [project])

  if (!project || !project.case) return <NotFound />

  const { case: projectCase } = project
  const currentIndex = CASE_PROJECTS.findIndex((item) => item.slug === project.slug)
  const hasNeighbours = CASE_PROJECTS.length > 1
  const prevProject = hasNeighbours ? CASE_PROJECTS[(currentIndex - 1 + CASE_PROJECTS.length) % CASE_PROJECTS.length] : undefined
  const nextProject = hasNeighbours ? CASE_PROJECTS[(currentIndex + 1) % CASE_PROJECTS.length] : undefined

  return (
    <article>
      <PageMeta
        title={`${project.title} — ${SITE_NAME}`}
        description={project.tagline}
        path={`/work/${project.slug}`}
        image={`${SITE_URL}${project.cover.src}`}
      />
      {caseLd && <JsonLd data={caseLd} />}
      <div className="mx-auto max-w-[1200px] px-6 pb-16 pt-24 md:px-16">
        <h1 className="text-4xl">{project.title}</h1>
        <div className="mono mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-haze">
          <span>{project.year}</span>
          <span>{project.role}</span>
          <Tag className={project.status === 'live' ? 'border-signal text-signal' : undefined}>
            {STATUS_LABEL[project.status]}
          </Tag>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Стек проекта">
          {project.stack.map((techId) => (
            <li key={techId}>
              <Tag>{techLabelById.get(techId) ?? techId}</Tag>
            </li>
          ))}
        </ul>
        <ProjectLinks project={project} />
      </div>

      <Section id="problem" title="Задача">
        <p className="mt-4 max-w-[72ch] text-ice">{projectCase.problem}</p>
      </Section>

      <Section id="solution" title="Решение">
        <p className="mt-4 max-w-[72ch] text-ice">{projectCase.solution}</p>
      </Section>

      <Section id="outcome" title="Результат">
        <p className="mt-4 max-w-[72ch] text-ice">{projectCase.outcome}</p>
      </Section>

      {projectCase.lessons && (
        <Section id="lessons" title="Что не получилось">
          <p className="mt-4 max-w-[72ch] text-ice">{projectCase.lessons}</p>
        </Section>
      )}

      <Section id="gallery" title="Галерея">
        <Gallery images={projectCase.gallery} />
      </Section>

      {(prevProject || nextProject) && (
        <nav
          aria-label="Другие проекты"
          className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-6 border-t border-steel px-6 py-16 md:px-16"
        >
          {prevProject ? (
            <Link to={`/work/${prevProject.slug}`} className="group flex flex-col gap-1">
              <span className="mono text-xs text-haze">Предыдущий проект</span>
              <span className="inline-flex items-center gap-2 text-ice transition-colors duration-150 ease-out group-hover:text-signal">
                <ArrowLeft aria-hidden="true" className="size-4" />
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {nextProject && (
            <Link to={`/work/${nextProject.slug}`} className="group flex flex-col items-end gap-1 text-right">
              <span className="mono text-xs text-haze">Следующий проект</span>
              <span className="inline-flex items-center gap-2 text-ice transition-colors duration-150 ease-out group-hover:text-signal">
                {nextProject.title}
                <ArrowRight aria-hidden="true" className="size-4" />
              </span>
            </Link>
          )}
        </nav>
      )}

      <div className="mx-auto max-w-[1200px] px-6 py-16 md:px-16">
        <ProjectLinks project={project} />
      </div>
    </article>
  )
}
