import type { Tech } from '@/types/tech'

/**
 * Справочник технологий для секции «Стек» и для фильтра в «Проектах».
 * Раздел «Проекты» показывает чипом фильтра только то, что реально
 * встречается в чьём-то `Project.stack` (см. lib/projectFilter.ts) — так что
 * инструменты вроде Zed или Jenkins, которые ни к одному проекту не
 * привязаны, в фильтре не появятся, а в секции «Стек» будут видны всегда.
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
  { id: 'express', label: 'Express', category: 'backend' },
  { id: 'websocket', label: 'WebSocket', category: 'backend' },
  { id: 'postgresql', label: 'PostgreSQL', category: 'infra' },
  { id: 'docker', label: 'Docker', category: 'infra' },
  { id: 'jenkins', label: 'Jenkins', category: 'infra' },
  { id: 'grafana', label: 'Grafana', category: 'infra' },
  { id: 'prometheus', label: 'Prometheus', category: 'infra' },
  { id: 'linux', label: 'Linux (Ubuntu)', category: 'infra' },
  { id: 'vite', label: 'Vite', category: 'tooling' },
  { id: 'vitest', label: 'Vitest', category: 'tooling' },
  { id: 'grammy', label: 'grammY (Telegram-боты)', category: 'tooling' },
  { id: 'claude', label: 'Claude Code', category: 'tooling' },
  { id: 'codex', label: 'Codex', category: 'tooling' },
  { id: 'zed', label: 'Zed', category: 'tooling' },
]

/** Быстрый поиск лейбла по id — переиспользуется в карточке проекта и на странице кейса. */
export const techLabelById = new Map(stack.map((tech) => [tech.id, tech.label]))
