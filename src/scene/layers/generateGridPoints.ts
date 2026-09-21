/** Детерминированный PRNG (mulberry32), чтобы решётка не перескакивала между монтированиями. */
function mulberry32(seed: number): () => number {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Разреженная решётка точек в плоскости XY: не «звёздное поле», а сетка
 * с лёгким дрожанием узла (CLAUDE.md, раздел 6). Позиции считаются один раз
 * и переиспользуются — внутри useFrame новых аллокаций быть не должно.
 */
export function generateGridPoints(count: number, spread: number, jitter: number, seed: number): Float32Array {
  const positions = new Float32Array(count * 3)
  const side = Math.ceil(Math.sqrt(count))
  const step = spread / side
  const random = mulberry32(seed)

  for (let i = 0; i < count; i++) {
    const col = i % side
    const row = Math.floor(i / side)
    const jitterX = (random() - 0.5) * step * jitter
    const jitterY = (random() - 0.5) * step * jitter

    positions[i * 3] = (col - side / 2) * step + jitterX
    positions[i * 3 + 1] = (row - side / 2) * step + jitterY
    positions[i * 3 + 2] = 0
  }

  return positions
}
