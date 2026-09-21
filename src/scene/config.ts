/**
 * Магические числа 3D-сцены — единственное место их определения
 * (см. CLAUDE.md, раздел 10).
 */

export const DPR_RANGE: [number, number] = [1, 1.75]

/** Порог по ширине вьюпорта, не по user-agent (CLAUDE.md, раздел 6). */
export const MOBILE_VIEWPORT_QUERY = '(max-width: 767px)'
export const POINTS_DESKTOP = 4000
export const POINTS_MOBILE = 1200

/** Доля общего бюджета точек, уходящая на каждый из трёх слоёв решётки. */
export const LAYER_SHARE = { far: 0.5, mid: 0.3, near: 0.2 } as const

/** Глубина (Z, мировые единицы) и коэффициент параллакса на слой. */
export const LAYERS = [
  { key: 'far', depth: -6, parallax: 0.2, share: LAYER_SHARE.far },
  { key: 'mid', depth: -3.5, parallax: 0.5, share: LAYER_SHARE.mid },
  { key: 'near', depth: -1.5, parallax: 1.0, share: LAYER_SHARE.near },
] as const

/** Разброс решётки по X/Y в мировых единицах. */
export const GRID_SPREAD = 14
/** Случайное дрожание узла решётки, доля от шага сетки — лёгкое, чтобы решётка
 * читалась как решётка, а не как звёздное поле. */
export const GRID_JITTER = 0.12

/** Сила смещения слоя от курсора и скролла, мировые единицы на полный ход. */
export const POINTER_PARALLAX_STRENGTH = 1.1
export const SCROLL_PARALLAX_STRENGTH = 2.2

/** Медленное дыхание решётки по синусоиде. */
export const BREATH_SPEED = 0.25
export const BREATH_AMPLITUDE = 0.12

export const POINT_SIZE = 0.045
export const POINT_COLOR = '#7d8fa3' // --color-haze
export const POINT_OPACITY = 0.55
