export type TechCategory = 'frontend' | 'backend' | 'infra' | 'tooling'

/** Идентификаторы технологий — только они используются в `Project.stack`, свободный текст запрещён. */
export type TechId =
  | 'react'
  | 'typescript'
  | 'tailwindcss'
  | 'mui'
  | 'threejs'
  | 'zustand'
  | 'react-router'
  | 'nodejs'
  | 'nestjs'
  | 'python'
  | 'socketio'
  | 'postgresql'
  | 'docker'
  | 'vite'
  | 'vitest'

export interface Tech {
  id: TechId
  label: string
  category: TechCategory
}
