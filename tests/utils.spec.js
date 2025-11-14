import { describe, expect, it } from 'vitest'
import { formatCurrency, slugify, removeAccents } from '@/utils/format.js'
describe('
format helpers', () => {
  it('
formats VND currency', () => {
    expect(formatCurrency(100000)).toContain('100.000')
  })
  it('slugifies with accents', () => {
    expect(slugify('\u00C1o Thun \u0110\u1EB9p')).toBe('ao-thun-dep')
  })
  it('removes accents', () => {
    expect(removeAccents('\u0110\u1EB7ng Th\u00E1i Son')).toBe('Dang Thai Son')
  })
})
