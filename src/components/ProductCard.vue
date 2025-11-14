<template>
  <article class="product-card" :data-id="product.id">
    <figure>
      <img
        :src="product.thumbnail"
        :alt="product.title"
        loading="lazy"
        decoding="async"
        sizes="(max-width: 600px) 100vw, 33vw"
      />
      <UiBadge v-if="discountPercent" tone="accent">-{{ discountPercent }}%</UiBadge>
      <button class="wishlist" @click.prevent="toggleWishlist" :aria-pressed="isWishlisted">
        <UiIcon :name="isWishlisted ? 'heart-solid' : 'heart'" :fill="isWishlisted" />
        <span class="sr-only">Yêu thích</span>
      </button>
    </figure>
    <div class="product-card__body">
      <div>
        <RouterLink class="product-card__title" :to="`/products/${product.slug}`">{{ product.title }}</RouterLink>
        <p class="muted">{{ product.brand }} · {{ product.category }}</p>
        <UiStarRating :rating="product.rating" :reviews="product.reviewsCount" />
      </div>
      <div class="product-card__price">
        <p class="price">{{ priceLabel }}</p>
        <small v-if="product.oldPrice">{{ formatCurrency(product.oldPrice) }}</small>
        <UiButton class="mt" @click="addToCart">Đặt slot</UiButton>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import UiBadge from './UiBadge.vue'
import UiButton from './UiButton.vue'
import UiStarRating from './UiStarRating.vue'
import UiIcon from './UiIcon.vue'
import { formatCurrency } from '@/utils/format.js'
import { useCartStore } from '@/stores/cart.js'
import { useWishlistStore } from '@/stores/wishlist.js'

const props = defineProps({
  product: { type: Object, required: true }
})

const cart = useCartStore()
const wishlist = useWishlistStore()

const priceLabel = computed(() => props.product.priceText || formatCurrency(props.product.price))
const discountPercent = computed(() => {
  if (!props.product.oldPrice) return 0
  return Math.round(((props.product.oldPrice - props.product.price) / props.product.oldPrice) * 100)
})

const isWishlisted = computed(() => wishlist.has(props.product.id))

function addToCart() {
  cart.add(props.product, 1, {
    slot: props.product.options?.slot?.[0] || '10 slot',
    billing: props.product.options?.billing?.[0] || 'Hàng năm'
  })
}

function toggleWishlist() {
  wishlist.toggle(props.product.id)
}
</script>

<style scoped>
.product-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1rem;
  background: var(--color-surface);
  display: grid;
  gap: 1rem;
}
figure {
  position: relative;
}
figure img {
  border-radius: calc(var(--radius) - 0.5rem);
}
.wishlist {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.45);
  color: white;
  border-radius: 999px;
  padding: 0.25rem;
}
.product-card__body {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.product-card__price {
  text-align: right;
}
.price {
  font-size: 1.2rem;
  font-weight: 700;
}
small {
  display: block;
  color: var(--color-muted);
}
.mt {
  margin-top: 0.5rem;
}
</style>
