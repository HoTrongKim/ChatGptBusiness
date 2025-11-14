<template>
  <article class="card about">
    <h1>Về NovaShop</h1>
    <p>NovaShop là thương hiệu thương mại điện tử tập trung vào trải nghiệm mua sắm thông minh, cá nhân hoá theo nhu cầu khách hàng Việt.</p>
    <ul>
      <li>Giao nhanh 2h nội thành.</li>
      <li>Bảo hành chính hãng tối thiểu 30 ngày.</li>
      <li>Đổi trả dễ dàng với quy trình tự động.</li>
    </ul>
  </article>
</template>

<script setup>
import { useHeadMeta } from '@/composables/useHeadMeta.js'
useHeadMeta({ title: 'Về NovaShop' })
</script>

<style scoped>
.about ul {
  list-style: disc inside;
  display: grid;
  gap: 0.5rem;
}
</style>
