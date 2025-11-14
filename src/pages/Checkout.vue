<template>
  <div class="checkout">
    <Breadcrumbs />
    <div class="grid two">
      <form class="card" @submit.prevent="nextStep">
        <h1>Thanh toán</h1>
        <p v-if="step <= 3">Bước {{ step }} / 3</p>
        <section v-if="step === 1">
          <label>
            Họ tên
            <input v-model="form.name" required autocomplete="name" />
          </label>
          <label>
            Email
            <input v-model="form.email" type="email" required autocomplete="email" />
          </label>
          <label>
            Số điện thoại
            <input v-model="form.phone" required autocomplete="tel" />
          </label>
        </section>
        <section v-else-if="step === 2">
          <label>
            Địa chỉ
            <input v-model="form.address" required autocomplete="street-address" />
          </label>
          <label>
            Thành phố
            <input v-model="form.city" required autocomplete="address-level2" />
          </label>
          <label>
            Ghi chú
            <textarea v-model="form.note" rows="3"></textarea>
          </label>
        </section>
        <section v-else-if="step === 3">
          <label>
            Phương thức
            <select v-model="form.payment" required>
              <option value="cod">Thanh toán khi nhận</option>
              <option value="card">Thẻ nội địa</option>
            </select>
          </label>
          <label class="agree">
            <input type="checkbox" v-model="form.agree" required />
            <span>Đồng ý điều khoản</span>
          </label>
        </section>
        <section v-else class="thank-you">
          <p>Cảm ơn {{ form.name }}!</p>
          <p>Mã đơn: <strong>{{ orderCode }}</strong></p>
          <p>Chúng tôi đã gửi email xác nhận tới {{ form.email }}.</p>
        </section>
        <div class="actions">
          <UiButton variant="ghost" type="button" v-if="step > 1 && step <= 3" @click="step--">Quay lại</UiButton>
          <UiButton v-if="step <= 3" type="submit">{{ step === 3 ? 'Đặt hàng' : 'Tiếp tục' }}</UiButton>
          <UiButton v-else as="RouterLink" to="/products">Tiếp tục mua sắm</UiButton>
        </div>
      </form>
      <aside class="card summary">
        <h2>Tóm tắt đơn</h2>
        <ul>
          <li v-for="item in cart.items" :key="item.key">
            {{ item.title }} × {{ item.qty }}
            <span>{{ formatCurrency(item.price * item.qty) }}</span>
          </li>
        </ul>
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
            <dt>VAT</dt>
            <dd>{{ formatCurrency(cart.vat) }}</dd>
          </div>
          <div>
            <dt>Ship</dt>
            <dd>{{ cart.shipping ? formatCurrency(cart.shipping) : '0đ' }}</dd>
          </div>
          <div class="total">
            <dt>Tổng</dt>
            <dd>{{ formatCurrency(cart.total) }}</dd>
          </div>
        </dl>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import UiButton from '@/components/UiButton.vue'
import { useCartStore } from '@/stores/cart.js'
import { useHeadMeta } from '@/composables/useHeadMeta.js'
import { formatCurrency } from '@/utils/format.js'

const cart = useCartStore()
const step = ref(1)
const orderCode = ref('')
const form = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  note: '',
  payment: 'cod',
  agree: false
})

useHeadMeta({ title: 'Thanh toán | NovaShop' })

function nextStep() {
  if (step.value < 3) {
    step.value += 1
    return
  }
  orderCode.value = createOrderCode()
  cart.clear()
  step.value = 4
}

function createOrderCode() {
  const now = new Date()
  const date = now.toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `ORD-${date}-${rand}`
}
</script>

<style scoped>
.checkout {
  display: grid;
  gap: 1.5rem;
}
form label,
form section {
  display: grid;
  gap: 0.35rem;
  margin-bottom: 1rem;
}
input,
textarea,
select {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 0.5rem;
}
.agree {
  grid-template-columns: auto 1fr;
  align-items: center;
}
.summary ul {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}
.summary li {
  display: flex;
  justify-content: space-between;
}
.summary dl {
  display: grid;
  gap: 0.35rem;
}
.summary .total {
  font-size: 1.2rem;
  font-weight: 700;
}
.actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.thank-you {
  display: grid;
  gap: 0.5rem;
}
</style>
