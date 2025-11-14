import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard.vue'
const product = {
  id: 'p001',
  slug: 'ao',
  title: 'Ao test',
  brand: 'Nova',
  category: 'Ao',
  price: 120000,
  oldPrice: 150000,
  rating: 4.5,
  reviewsCount: 10,
  thumbnail: '/images/apparel-01.svg',
  options: { size: ['S'], color: ['Den'] }
}
describe('ProductCard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
if (typeof window !== 'undefined') {
      window.localStorage.clear()
    }
  })
  it('matches snapshot', () => {
    
const wrapper = mount(ProductCard, {
      props: { product },
      global: {
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>'
          }
        }
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
