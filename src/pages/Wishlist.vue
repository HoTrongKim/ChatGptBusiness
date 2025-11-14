<template>
  <div class="wishlist-page card">
    <h1>Danh sách yêu thích</h1>
    <ul v-if="items.length" class="wishlist-list">
      <li v-for="item in items" :key="item.id">
        <img :src="item.thumbnail" :alt="item.title" loading="lazy" decoding="async" />
        <div>
          <RouterLink :to="`/products/${item.slug}`">{{ item.title }}</RouterLink>
          <p class="muted">{{ item.priceText || formatCurrency(item.price) }}</p>
        </div>
        <div class="actions">
          <UiButton variant="secondary" @click="moveToCart(item)">Thêm vào giỏ</UiButton>
          <button class="link" @click="wishlist.remove(item.id)">Xóa</button>
        </div>
      </li>
    </ul>
    <p v-else>Chưa có sản phẩm yêu thích.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useWishlistStore } from '@/stores/wishlist.js'
import { useProductsStore } from '@/stores/products.js'
import { useCartStore } from '@/stores/cart.js'
import UiButton from '@/components/UiButton.vue'
import { formatCurrency } from '@/utils/format.js'
import { useHeadMeta } from '@/composables/useHeadMeta.js'

const wishlist = useWishlistStore()
const products = useProductsStore()
const cart = useCartStore()
const items = computed(() => products.items.filter((product) => wishlist.ids.includes(product.id)))

useHeadMeta({ title: 'Yêu thích | NovaShop' })

function moveToCart(item) {
  cart.add(item, 1, { slot: item.options?.slot?.[0] || '10 slot', billing: item.options?.billing?.[0] || 'Hàng năm' })
  wishlist.remove(item.id)
}
</script>

<style scoped>
.wishlist-list {
  display: grid;
  gap: 1rem;
}
.wishlist-list li {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 1rem;
  align-items: center;
}
.wishlist-list img {
  width: 80px;
  border-radius: var(--radius);
}
.actions {
  display: flex;
  gap: 0.5rem;
}
</style>
