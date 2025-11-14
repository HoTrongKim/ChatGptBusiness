import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '@/stores/cart.js'
const product = {
  id: 'p-test',
  slug: 'p-test',
  title: 'S?n ph?m test',
  price: 600000,
  thumbnail: '/images/apparel-01.svg'
}
describe('cart store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
if (typeof window !== 'undefined') {
      window.localStorage.clear()
    }
  })
  it('calculates totals with coupon', () => {
    
const cart = useCartStore()
    cart.add(product, 1, {})
    cart.applyCoupon('XINCHAO10')
    expect(cart.subtotal).toBe(600000)
    expect(cart.discount).toBe(50000)
    expect(cart.shipping).toBe(0)
    expect(cart.vat).toBe(Math.round((600000 - 50000) * 0.1))
    expect(cart.total).toBe(cart.subtotal - cart.discount + cart.vat + cart.shipping)
  })
  it('applies freeship coupon', () => {
    
const cart = useCartStore()
    cart.add({ ...product, price: 200000 }, 1, {})
    cart.add({ ...product, id: 'p-2', price: 120000 }, 1, {})
    cart.applyCoupon('FREESHIP')
    expect(cart.shipping).toBe(0)
  })
})
