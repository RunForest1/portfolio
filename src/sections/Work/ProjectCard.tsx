import { Link } from 'react-router'
import { ExternalLink, Star } from 'lucide-react'
import Tag from '@/components/Tag'
import { techLabelById } from '@/data/stack'
import { STATUS_LABEL } from '@/lib/projectStatus'
import { formatShortDate } from '@/lib/date'
import { withBase } from '@/lib/assetUrl'
import type { Project } from '@/types/project'
import { useGithubRepoInfo } from './useGithubRepoInfo'

/** Репозиторий приоритетнее демо для внешней ссылки карточки без кейса — демо получит свою кнопку на странице кейса (итерация 3). */
function externalHref(project: Project): string | undefined {
  if (project.links.repo) return `https://github.com/${project.links.repo}`
  return project.links.demo
}

const CARD_CLASSES =
  'group block h-full border border-steel p-4 transition-colors duration-150 ease-out hover:border-signal'

interface ProjectCardProps {
  project: Project
}

/**
 * Вся карточка — одна ссылка: на /work/:slug, если есть кейс, иначе на репозиторий
 * во внешней вкладке (видно по иконке) — см. CLAUDE.md, раздел 9, итерация 2.
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  if (project.case) {
    return (
      <Link to={`/work/${project.slug}`} className={CARD_CLASSES}>
        <CardBody project={project} external={false} />
      </Link>
    )
  }

  // Данные без case обязаны нести repo или demo (модель данных, раздел 8);
  // '#' — недостижимый фолбэк на случай нарушения этого контракта.
  const href = externalHref(project) ?? '#'
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={CARD_CLASSES}>
      <CardBody project={project} external />
    </a>
  )
}

function CardBody({ project, external }: { project: Project; external: boolean }) {
  const githubInfo = useGithubRepoInfo(project.links.repo)

  return (
    <>
      <img
        src={withBase(project.cover.src)}
        alt={project.cover.alt}
        width={project.cover.width}
        height={project.cover.height}
        loading="lazy"
        className="aspect-[8/5] w-full border border-steel object-cover"
      />
      <div className="mt-4 flex items-start justify-between gap-4">
        <h3 className="text-lg text-ice">{project.title}</h3>
        {external && (
          <ExternalLink aria-hidden="true" className="mt-1 size-4 shrink-0 text-haze group-hover:text-signal" />
        )}
      </div>
      <p className="mt-2 text-sm text-haze">{project.tagline}</p>
      <div className="mono mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-haze">
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
      {/* Живые данные GitHub — обогащают карточку, но не формируют список (раздел 1, итерация 5). Фолбэк: просто не рендерится. */}
      {githubInfo && (
        <div className="mono mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-haze">
          <span className="inline-flex items-center gap-1">
            <Star aria-hidden="true" className="size-3" />
            {githubInfo.stars}
          </span>
          {githubInfo.language && <span>{githubInfo.language}</span>}
          <span>{formatShortDate(githubInfo.pushedAt)}</span>
        </div>
      )}
    </>
  )
}
