import { describe, expect, it } from 'vitest'
import { filterProjectsByTech, getAvailableStack, parseTechParam } from './projectFilter'
import type { Project } from '@/types/project'
import type { Tech } from '@/types/tech'

const stack: Tech[] = [
  { id: 'react', label: 'React', category: 'frontend' },
  { id: 'docker', label: 'Docker', category: 'infra' },
  { id: 'nestjs', label: 'NestJS', category: 'backend' },
]

function makeProject(overrides: Partial<Project>): Project {
  return {
    slug: 'test',
    title: 'Test',
    tagline: 'Tagline',
    year: 2026,
    role: 'фронтенд',
    status: 'wip',
    stack: [],
    highlights: [],
    links: {},
    cover: { src: '', alt: '', width: 1, height: 1 },
    ...overrides,
  }
}

const projects: Project[] = [
  makeProject({ slug: 'a', stack: ['react'] }),
  makeProject({ slug: 'b', stack: ['react', 'docker'] }),
  makeProject({ slug: 'c', stack: [] }),
]

describe('getAvailableStack', () => {
  it('возвращает только технологии, использованные в проектах, отсортированные по label', () => {
    expect(getAvailableStack(projects, stack).map((tech) => tech.id)).toEqual(['docker', 'react'])
  })

  it('не включает технологию, если ни один проект её не использует', () => {
    expect(getAvailableStack(projects, stack).some((tech) => tech.id === 'nestjs')).toBe(false)
  })
})

describe('filterProjectsByTech', () => {
  it('возвращает все проекты, если фильтр не задан', () => {
    expect(filterProjectsByTech(projects, null)).toHaveLength(3)
  })

  it('возвращает только проекты с указанной технологией в стеке', () => {
    expect(filterProjectsByTech(projects, 'docker').map((p) => p.slug)).toEqual(['b'])
  })

  it('возвращает пустой список, если ни один проект не подходит', () => {
    expect(filterProjectsByTech(projects, 'nestjs')).toEqual([])
  })
})

describe('parseTechParam', () => {
  it('возвращает null для отсутствующего параметра', () => {
    expect(parseTechParam(null, stack)).toBeNull()
  })

  it('возвращает null для неизвестного значения, а не падает', () => {
    expect(parseTechParam('unknown-tech', stack)).toBeNull()
  })

  it('возвращает TechId для валидного значения', () => {
    expect(parseTechParam('react', stack)).toBe('react')
  })
})
