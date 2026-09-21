import type { Tech } from '@/types/tech'

/**
 * Справочник технологий. Пополняется по мере того, как реальные проекты
 * попадают в data/projects.ts — здесь только то, что уже где-то использовано,
 * без запаса "на будущее" (см. CLAUDE.md, раздел 9, итерация 2).
 */
export const stack: Tech[] = [
  { id: 'react', label: 'React', category: 'frontend' },
  { id: 'typescript', label: 'TypeScript', category: 'frontend' },
  { id: 'tailwindcss', label: 'Tailwind CSS', category: 'frontend' },
  { id: 'mui', label: 'MUI', category: 'frontend' },
  { id: 'threejs', label: 'three.js', category: 'frontend' },
  { id: 'zustand', label: 'Zustand', category: 'frontend' },
  { id: 'react-router', label: 'React Router', category: 'frontend' },
  { id: 'nodejs', label: 'Node.js', category: 'backend' },
  { id: 'nestjs', label: 'NestJS', category: 'backend' },
  { id: 'python', label: 'Python', category: 'backend' },
  { id: 'socketio', label: 'Socket.io', category: 'backend' },
  { id: 'postgresql', label: 'PostgreSQL', category: 'infra' },
  { id: 'docker', label: 'Docker', category: 'infra' },
  { id: 'vite', label: 'Vite', category: 'tooling' },
  { id: 'vitest', label: 'Vitest', category: 'tooling' },
]

/** Быстрый поиск лейбла по id — переиспользуется в карточке проекта и на странице кейса. */
export const techLabelById = new Map(stack.map((tech) => [tech.id, tech.label]))
