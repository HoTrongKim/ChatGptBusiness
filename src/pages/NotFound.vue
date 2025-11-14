<template>
  <section class="card not-found">
    <h1>404</h1>
    <p>Không tìm thấy trang bạn yêu cầu.</p>
    <UiButton as="RouterLink" to="/">Quay lại trang chủ</UiButton>
  </section>
</template>

<script setup>
import UiButton from '@/components/UiButton.vue'
import { useHeadMeta } from '@/composables/useHeadMeta.js'
useHeadMeta({ title: 'Trang không tồn tại' })
</script>

<style scoped>
.not-found {
  text-align: center;
  gap: 1rem;
}
.not-found h1 {
  font-size: clamp(3rem, 10vw, 6rem);
}
</style>
