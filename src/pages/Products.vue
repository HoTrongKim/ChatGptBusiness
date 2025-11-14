<template>
  <div class="products">
    <Breadcrumbs />
    <div class="filters card">
      <SearchBox :model-value="store.filters.search" @update:model-value="updateSearch" />
      <CategoryFilter :categories="store.categories" :value="store.filters.category" @update:value="setCategory" />
      <div class="grid two">
        <PriceFilter
          :range="store.priceRange"
          :min="store.filters.minPrice"
          :max="store.filters.maxPrice"
          @update:min="setMinPrice"
          @update:max="setMaxPrice"
        />
        <label class="rating-filter">
          Đánh giá tối thiểu
          <input type="range" min="0" max="5" step="0.5" :value="store.filters.rating" @input="setRating($event.target.value)" />
          <span>{{ store.filters.rating }} ★</span>
        </label>
        <label class="stock-filter">
          <input type="checkbox" :checked="store.filters.inStockOnly" @change="setStock($event.target.checked)" />
          <span>Còn hàng</span>
        </label>
      </div>
      <div class="flex between">
        <SortSelect :model-value="store.filters.sort" @update:model-value="setSort" />
        <UiButton variant="ghost" @click="store.resetFilters()">Đặt lại</UiButton>
      </div>
    </div>
    <ProductGrid :products="store.paginated" />
    <Pagination :page="store.filters.page" :total="store.totalPages" @update:page="setPage" />
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products.js'
import ProductGrid from '@/components/ProductGrid.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'
import PriceFilter from '@/components/PriceFilter.vue'
import SortSelect from '@/components/SortSelect.vue'
import Pagination from '@/components/Pagination.vue'
import UiButton from '@/components/UiButton.vue'
import SearchBox from '@/components/SearchBox.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { useHeadMeta } from '@/composables/useHeadMeta.js'

const store = useProductsStore()
const route = useRoute()
const router = useRouter()
const { setMeta } = useHeadMeta()

watch(
  () => route.query,
  (query) => {
    store.setFilters({
      search: query.search || '',
      category: query.category || 'all',
      minPrice: Number(query.minPrice) || 0,
      maxPrice: Number(query.maxPrice) || 0,
      rating: Number(query.rating) || 0,
      inStockOnly: query.stock === 'true',
      sort: query.sort || 'newest',
      page: Number(query.page) || 1
    })
  },
  { immediate: true }
)

watch(
  () => ({ ...store.filters }),
  (filters) => {
    const query = {
      ...(filters.search && { search: filters.search }),
      ...(filters.category !== 'all' && { category: filters.category }),
      ...(filters.minPrice && { minPrice: filters.minPrice }),
      ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
      ...(filters.rating && { rating: filters.rating }),
      ...(filters.inStockOnly && { stock: 'true' }),
      ...(filters.sort !== 'newest' && { sort: filters.sort }),
      ...(filters.page > 1 && { page: filters.page })
    }
    router.replace({ query })
    setMeta({
      jsonld: {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: store.paginated.map((product, index) => ({
          '@type': 'Product',
          name: product.title,
          offers: {
            price: product.price,
            priceCurrency: 'VND',
            availability: product.stock > 0 ? 'InStock' : 'OutOfStock'
          },
          position: index + 1
        }))
      }
    })
  },
  { deep: true }
)

watch(
  () => store.totalPages,
  (total) => {
    if (store.filters.page > total) {
      store.setFilters({ page: total })
    }
  }
)

const updateSearch = (value) => store.setFilters({ search: value, page: 1 })
const setCategory = (value) => store.setFilters({ category: value, page: 1 })
const setMinPrice = (value) => store.setFilters({ minPrice: value, page: 1 })
const setMaxPrice = (value) => store.setFilters({ maxPrice: value, page: 1 })
const setRating = (value) => store.setFilters({ rating: Number(value), page: 1 })
const setStock = (value) => store.setFilters({ inStockOnly: value, page: 1 })
const setSort = (value) => store.setFilters({ sort: value, page: 1 })
const setPage = (value) => store.setFilters({ page: value })
</script>

<style scoped>
.filters {
  display: grid;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.rating-filter,
.stock-filter {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
</style>
