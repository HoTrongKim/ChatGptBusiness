<template>
  <div class="cart-page">
    <Breadcrumbs />
    <div v-if="items.length" class="grid two">
      <section class="card">
        <h1>Đặt slot ChatGPT Business</h1>
        <ul class="cart-list">
          <li v-for="item in items" :key="item.key">
            <img :src="item.thumbnail" :alt="item.title" loading="lazy" decoding="async" />
            <div>
              <RouterLink :to="`/products/${item.slug}`">{{ item.title }}</RouterLink>
              <p class="muted">{{ item.priceText || formatCurrency(item.price) }} · {{ item.options?.slot }} {{ item.options?.billing }}</p>
              <div class="qty">
                <label>
                  Số slot
                  <input type="number" min="1" :value="item.qty" @input="updateQty(item.key, Number($event.target.value))" />
                </label>
                <button class="link" @click.prevent="remove(item.key)">Xóa</button>
              </div>
            </div>
          </li>
        </ul>
        <form class="coupon" @submit.prevent="apply">
          <label>Mã ưu đãi (nếu có)</label>
          <input v-model="couponInput" placeholder="Ví dụ: XINCHAO10" />
          <UiButton type="submit">Áp dụng</UiButton>
          <p v-if="cart.couponError" class="error">{{ cart.couponError }}</p>
        </form>
      </section>
      <aside class="card summary">
        <h2>Tóm tắt chi phí</h2>
        <dl>
          <div>
            <dt>Tạm tính</dt>
            <dd>{{ formatCurrency(cart.subtotal) }}</dd>
          </div>
          <div>
            <dt>Giảm giá</dt>
            <dd>-{{ formatCurrency(cart.discount) }}</dd>
          </div>
          <div>
            <dt>VAT (10%)</dt>
            <dd>{{ formatCurrency(cart.vat) }}</dd>
          </div>
          <div>
            <dt>Phí xử lý</dt>
            <dd>{{ cart.shipping ? formatCurrency(cart.shipping) : 'Miễn phí' }}</dd>
          </div>
          <div class="total">
            <dt>Tổng cộng</dt>
            <dd>{{ formatCurrency(cart.total) }}</dd>
          </div>
        </dl>
        <UiButton as="RouterLink" to="/checkout" class="w-full">Tiếp tục thanh toán</UiButton>
      </aside>
    </div>
    <div v-else class="card empty">
      <p>Chưa có slot nào trong giỏ. Bắt đầu đăng ký ChatGPT Business nhé!</p>
      <UiButton as="RouterLink" to="/products">Quay lại</UiButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import UiButton from '@/components/UiButton.vue'
import { useCartStore } from '@/stores/cart.js'
import { formatCurrency } from '@/utils/format.js'
import { useHeadMeta } from '@/composables/useHeadMeta.js'

const cart = useCartStore()
const couponInput = ref('')
const items = cart.items

useHeadMeta({ title: 'Giỏ hàng ChatGPT Business' })

function updateQty(key, value) {
  cart.updateQty(key, value)
}

function remove(key) {
  cart.remove(key)
}

function apply() {
  cart.applyCoupon(couponInput.value)
}
</script>

<style scoped>
.cart-list {
  display: grid;
  gap: 1rem;
}
.cart-list li {
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 1rem;
}
.cart-list img {
  width: 96px;
  height: 96px;
  border-radius: var(--radius);
}
.qty {
  display: flex;
  align-items: center;
  gap: 1rem;
}
input[type='number'],
.coupon input {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 0.35rem 0.5rem;
}
.summary dl {
  display: grid;
  gap: 0.5rem;
}
.summary div {
  display: flex;
  justify-content: space-between;
}
.summary .total {
  font-size: 1.2rem;
  font-weight: 700;
}
.error {
  color: var(--color-accent);
}
</style>
