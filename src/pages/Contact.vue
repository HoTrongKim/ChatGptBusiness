<template>
  <form class="card contact" @submit.prevent="submit">
    <h1>Liên hệ</h1>
    <label>
      Họ tên
      <input v-model="form.name" required />
    </label>
    <label>
      Email
      <input type="email" v-model="form.email" required />
    </label>
    <label>
      Nội dung
      <textarea v-model="form.message" rows="5" required></textarea>
    </label>
    <UiButton type="submit">Gửi</UiButton>
  </form>
</template>

<script setup>
import { reactive } from 'vue'
import { useUiStore } from '@/stores/ui.js'
import UiButton from '@/components/UiButton.vue'
import { useHeadMeta } from '@/composables/useHeadMeta.js'

const ui = useUiStore()
const form = reactive({ name: '', email: '', message: '' })
useHeadMeta({ title: 'Liên hệ NovaShop' })

function submit() {
  ui.showToast({ title: 'Đã gửi', message: 'Chúng tôi sẽ phản hồi sớm nhất.' })
  form.name = ''
  form.email = ''
  form.message = ''
}
</script>

<style scoped>
.contact label {
  display: grid;
  gap: 0.35rem;
  margin-bottom: 1rem;
}
input,
textarea {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 0.5rem;
}
</style>
