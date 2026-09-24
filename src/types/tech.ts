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
  | 'express'
  | 'websocket'
  | 'grammy'
  | 'postgresql'
  | 'docker'
  | 'jenkins'
  | 'grafana'
  | 'prometheus'
  | 'linux'
  | 'vite'
  | 'vitest'
  | 'claude'
  | 'codex'
  | 'zed'

export interface Tech {
  id: TechId
  label: string
  category: TechCategory
}
