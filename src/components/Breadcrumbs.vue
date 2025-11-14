<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol>
      <li v-for="crumb in crumbs" :key="crumb.to || crumb.label">
        <RouterLink v-if="crumb.to" :to="crumb.to">{{ crumb.label }}</RouterLink>
        <span v-else aria-current="page">{{ crumb.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products.js'

const route = useRoute()
const products = useProductsStore()

const crumbs = computed(() => {
  const list = [{ label: 'Trang chủ', to: '/' }]
  if (route.name === 'products') {
    list.push({ label: 'Sản phẩm' })
  } else if (route.name === 'product-detail') {
    list.push({ label: 'Sản phẩm', to: '/products' })
    const item = products.findBySlug(route.params.slug)
    if (item) list.push({ label: item.title })
  } else if (route.meta?.title) {
    list.push({ label: route.meta.title })
  }
  return list
})
</script>

<style scoped>
.breadcrumbs {
  font-size: 0.85rem;
  color: var(--color-muted);
  margin-bottom: 1rem;
}
.breadcrumbs ol {
  list-style: none;
  display: flex;
  gap: 0.35rem;
}
.breadcrumbs li + li::before {
  content: '/';
  margin-right: 0.35rem;
}
</style>
