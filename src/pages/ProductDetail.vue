<template>
  <div v-if="product" class="product-detail">
    <Breadcrumbs />
    <div class="grid two">
      <ImageGallery :images="product.images" />
      <section class="card">
        <UiBadge>{{ product.brand }}</UiBadge>
        <h1>{{ product.title }}</h1>
        <UiStarRating :rating="product.rating" :reviews="product.reviewsCount" />
        <p class="price">{{ priceLabel }}</p>
        <p v-if="product.oldPrice" class="muted">Giá gốc {{ formatCurrency(product.oldPrice) }}</p>
        <div class="options">
          <label v-if="product.options?.slot">
            Gói slot
            <select v-model="selected.slot">
              <option v-for="slot in product.options.slot" :key="slot">{{ slot }}</option>
            </select>
          </label>
          <label v-if="product.options?.billing">
            Chu kỳ thanh toán
            <select v-model="selected.billing">
              <option v-for="billing in product.options.billing" :key="billing">{{ billing }}</option>
            </select>
          </label>
        </div>
        <div class="actions">
          <UiButton class="w-full" @click="addToCart">Đặt slot</UiButton>
          <UiButton variant="secondary" class="w-full" @click="toggleWishlist">
            {{ isWishlisted ? 'Bỏ yêu thích' : 'Yêu thích' }}
          </UiButton>
        </div>
        <p>{{ product.description }}</p>
        <ul v-if="product.features?.length" class="features">
          <li v-for="feature in product.features" :key="feature">{{ feature }}</li>
        </ul>
        <ul class="specs">
          <li v-for="(value, key) in product.specs" :key="key">
            <strong>{{ key }}:</strong> {{ value }}
          </li>
        </ul>
      </section>
    </div>
    <section class="related" v-if="related.length">
      <h2>Thông tin thêm</h2>
      <ProductGrid :products="related" />
    </section>
  </div>
  <div v-else class="card">
    <p>Không tìm thấy sản phẩm.</p>
    <UiButton as="RouterLink" to="/products">Quay lại</UiButton>
  </div>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products.js'
import { useCartStore } from '@/stores/cart.js'
import { useWishlistStore } from '@/stores/wishlist.js'
import { formatCurrency } from '@/utils/format.js'
import UiButton from '@/components/UiButton.vue'
import UiBadge from '@/components/UiBadge.vue'
import UiStarRating from '@/components/UiStarRating.vue'
import ImageGallery from '@/components/ImageGallery.vue'
import ProductGrid from '@/components/ProductGrid.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { useHeadMeta } from '@/composables/useHeadMeta.js'

const route = useRoute()
const store = useProductsStore()
const cart = useCartStore()
const wishlist = useWishlistStore()
const product = computed(() => store.findBySlug(route.params.slug))
const related = computed(() => [])
const selected = reactive({ slot: '', billing: '' })
const { setMeta } = useHeadMeta()
const priceLabel = computed(() => {
  if (!product.value) return ''
  return product.value.priceText || formatCurrency(product.value.price)
})

watch(
  product,
  (value) => {
    if (!value) return
    selected.slot = value.options?.slot?.[0] || ''
    selected.billing = value.options?.billing?.[0] || ''
    setMeta({
      title: `${value.title} | NovaShop`,
      description: value.description
    })
  },
  { immediate: true }
)

const isWishlisted = computed(() => product.value && wishlist.has(product.value.id))

function addToCart() {
  if (!product.value) return
  cart.add(product.value, 1, { ...selected })
}

function toggleWishlist() {
  if (!product.value) return
  wishlist.toggle(product.value.id)
}
</script>

<style scoped>
.product-detail {
  display: grid;
  gap: 1.5rem;
}
.options {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
}
.actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
  margin-block: 1rem;
}
select {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 0.35rem 0.5rem;
}
.features {
  list-style: disc inside;
  margin: 1rem 0;
  color: var(--color-muted);
}
.specs {
  list-style: none;
  display: grid;
  gap: 0.25rem;
}
</style>
