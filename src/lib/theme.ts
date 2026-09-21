/**
 * Единственная точка чтения CSS-токенов темы из JS/three.js-кода, где
 * хардкод hex запрещён (CLAUDE.md, раздел 5). Значение берётся из
 * фактического `@theme` в global.css, а не дублируется руками.
 */
export function readCssVar(name: string, fallback: string): string {
  if (typeof document === 'undefined') return fallback
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value || fallback
}
