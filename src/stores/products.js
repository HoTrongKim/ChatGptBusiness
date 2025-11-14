import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import rawProducts from '@/data/products.json'
import { removeAccents, slugify } from '@/utils/format.js'

const PER_PAGE = 12

export const useProductsStore = defineStore('products', () => {
  const items = ref(rawProducts)
  const fetched = ref(false)
  const filters = ref({
    search: '',
    category: 'all',
    minPrice: 0,
    maxPrice: 0,
    rating: 0,
    inStockOnly: false,
    sort: 'newest',
    page: 1,
    perPage: PER_PAGE
  })

  async function prefetch() {
    if (fetched.value || import.meta.env.SSR) return
    try {
      const response = await fetch('/data/products.json', { cache: 'reload' })
      if (response.ok) {
        items.value = await response.json()
        fetched.value = true
      }
    } catch (error) {
      console.warn('Không tải được dữ liệu mới', error)
    }
  }

  function setFilters(partial) {
    filters.value = { ...filters.value, ...partial }
  }

  function resetFilters() {
    filters.value = {
      ...filters.value,
      search: '',
      category: 'all',
      minPrice: 0,
      maxPrice: 0,
      rating: 0,
      inStockOnly: false,
      sort: 'newest',
      page: 1
    }
  }

  const categories = computed(() => ['all', ...new Set(items.value.map((item) => item.category))])
  const priceRange = computed(() => {
    const prices = items.value.map((item) => item.price)
    return { min: Math.min(...prices), max: Math.max(...prices) }
  })

  const normalizedSearch = computed(() => removeAccents(filters.value.search).toLowerCase())

  const filtered = computed(() => {
    return items.value
      .filter((item) => {
        const matchesSearch = normalizedSearch.value
          ? removeAccents(item.title).toLowerCase().includes(normalizedSearch.value)
          : true
        const matchesCategory = filters.value.category === 'all' || item.category === filters.value.category
        const matchesRating = filters.value.rating ? item.rating >= Number(filters.value.rating) : true
        const matchesStock = !filters.value.inStockOnly || item.stock > 0
        const min = filters.value.minPrice || 0
        const max = filters.value.maxPrice || Infinity
        const matchesPrice = item.price >= min && item.price <= max
        return matchesSearch && matchesCategory && matchesRating && matchesStock && matchesPrice
      })
      .sort((a, b) => {
        switch (filters.value.sort) {
          case 'price-asc':
            return a.price - b.price
          case 'price-desc':
            return b.price - a.price
          case 'popular':
            return b.popularity - a.popularity
          default:
            return new Date(b.createdAt) - new Date(a.createdAt)
        }
      })
  })

  const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / filters.value.perPage)))

  const paginated = computed(() => {
    const start = (filters.value.page - 1) * filters.value.perPage
    return filtered.value.slice(start, start + filters.value.perPage)
  })

  const findBySlug = (slug) => items.value.find((item) => item.slug === slug)
  const relatedByCategory = (category, id) =>
    items.value.filter((item) => item.category === category && item.id !== id).slice(0, 4)

  return {
    items,
    filters,
    categories,
    priceRange,
    filtered,
    paginated,
    totalPages,
    setFilters,
    resetFilters,
    prefetch,
    findBySlug,
    relatedByCategory,
    slugify
  }
})
