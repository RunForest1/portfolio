import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

/**
 * Если WebGL недоступен, <Canvas> бросает ошибку при создании контекста.
 * Без этой границы всё приложение падает в белый экран. Здесь достаточно
 * тихо погасить сцену — GradientGround в Backdrop.tsx уже отрисован рядом
 * и держит страницу целостной (CLAUDE.md, раздел 12, пункт 6).
 */
export default class SceneErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.warn('3D-фон отключён: WebGL недоступен или контекст не создался.', error)
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}
