<template>
  <details class="cart-mini" ref="details">
    <summary>
      <UiIcon name="cart" :size="22" />
      <span class="cart-mini__count" aria-live="polite">{{ itemCount }}</span>
      <span class="sr-only">Mở giỏ hàng mini</span>
    </summary>
    <div class="cart-mini__panel">
      <p v-if="!items.length" class="muted">Giỏ hàng trống.</p>
      <ul v-else>
        <li v-for="item in items" :key="item.key">
          <img :src="item.thumbnail" :alt="item.title" loading="lazy" decoding="async" />
          <div>
            <p>{{ item.title }}</p>
            <small>x{{ item.qty }} · {{ item.priceText || formatCurrency(item.price) }}</small>
          </div>
        </li>
      </ul>
      <RouterLink class="btn" to="/cart">Xem giỏ hàng</RouterLink>
    </div>
  </details>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart.js'
import UiIcon from './UiIcon.vue'
import { formatCurrency } from '@/utils/format.js'

const cart = useCartStore()
const { items, itemCount } = storeToRefs(cart)
const details = ref(null)

function onClickOutside(event) {
  if (details.value && !details.value.contains(event.target)) {
    details.value.open = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside))
</script>

<style scoped>
.cart-mini {
  position: relative;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 0.25rem 0.75rem;
}
.cart-mini summary {
  list-style: none;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}
.cart-mini__count {
  min-width: 1.5rem;
  text-align: center;
  background: var(--color-accent);
  border-radius: 999px;
  color: white;
  font-size: 0.8rem;
  padding: 0.1rem 0.4rem;
}
.cart-mini__panel {
  position: absolute;
  right: 0;
  top: calc(100% + 0.5rem);
  width: min(320px, 80vw);
  background: var(--color-surface);
  border-radius: var(--radius);
  padding: 1rem;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  z-index: 30;
}
.cart-mini[open] .cart-mini__panel {
  animation: fade-in 0.2s ease;
}
.cart-mini ul {
  display: grid;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}
.cart-mini li {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 0.5rem;
  align-items: center;
}
.cart-mini img {
  width: 48px;
  height: 48px;
  border-radius: calc(var(--radius) / 2);
}
.btn {
  display: inline-flex;
  justify-content: center;
  width: 100%;
  background: var(--color-primary);
  color: #fff;
  padding: 0.5rem;
  border-radius: var(--radius);
}
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
