import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { validateCoupon } from '@/utils/coupons.js'

const STORAGE_KEY = 'novashop-cart'
const VAT_RATE = 0.1
const SHIPPING_FEE = 30000
const FREE_SHIP_THRESHOLD = 500000

function loadItems() {
  if (typeof window === 'undefined') return []
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.warn('Không thể đọc cart cache', error)
    return []
  }
}

export const useCartStore = defineStore('cart', () => {
  const items = ref(loadItems())
  const coupon = ref(null)
  const couponError = ref('')

  const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.qty, 0))
  const subtotal = computed(() => items.value.reduce((sum, item) => sum + item.price * item.qty, 0))

  const discount = computed(() => {
    if (!coupon.value) return 0
    return coupon.value.discount || 0
  })

  const vat = computed(() => Math.round((subtotal.value - discount.value) * VAT_RATE))

  const shipping = computed(() => {
    if (!items.value.length) return 0
    if (coupon.value?.freeship) return 0
    const net = Math.max(0, subtotal.value - discount.value)
    return net >= FREE_SHIP_THRESHOLD ? 0 : SHIPPING_FEE
  })

  const total = computed(() => subtotal.value - discount.value + vat.value + shipping.value)

  function persist() {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
  }

  function add(item, qty = 1, selectedOptions = {}) {
    const key = `${item.id}-${Object.values(selectedOptions).join('-') || 'default'}`
    const existing = items.value.find((cartItem) => cartItem.key === key)
    if (existing) {
      existing.qty += qty
    } else {
      items.value.push({
        key,
        id: item.id,
        slug: item.slug,
        title: item.title,
        price: item.price,
        priceText: item.priceText || null,
        thumbnail: item.thumbnail,
        options: selectedOptions,
        qty
      })
    }
    persist()
  }

  function remove(key) {
    items.value = items.value.filter((item) => item.key !== key)
    persist()
  }

  function updateQty(key, qty) {
    const target = items.value.find((item) => item.key === key)
    if (target) {
      target.qty = Math.max(1, qty)
      persist()
    }
  }

  function applyCoupon(code) {
    couponError.value = ''
    if (!code) {
      coupon.value = null
      return
    }
    const result = validateCoupon(code, subtotal.value)
    if (!result.valid) {
      couponError.value = result.message
      coupon.value = null
      return
    }
    coupon.value = result
  }

  function clear() {
    items.value = []
    coupon.value = null
    persist()
  }

  watch(items, persist, { deep: true })

  return {
    items,
    coupon,
    couponError,
    itemCount,
    subtotal,
    discount,
    vat,
    shipping,
    total,
    add,
    remove,
    updateQty,
    applyCoupon,
    clear
  }
})
