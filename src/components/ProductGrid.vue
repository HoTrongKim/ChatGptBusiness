<template>
  <section class="product-grid">
    <article
      v-for="product in products"
      :key="product.id"
      :class="['grid-item', { 'is-visible': visibleIds.has(product.id) }]"
      ref="setObserverTarget"
      :data-id="product.id"
    >
      <ProductCard :product="product" />
    </article>
  </section>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import ProductCard from './ProductCard.vue'

const props = defineProps({
  products: { type: Array, default: () => [] }
})

const visibleIds = ref(new Set())
let observer

function ensureObserver() {
  if (observer || typeof IntersectionObserver === 'undefined') return
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.dataset.id
        const next = new Set(visibleIds.value)
        next.add(id)
        visibleIds.value = next
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })
}

const setObserverTarget = (el) => {
  if (!el) return
  ensureObserver()
  observer?.observe(el)
}

onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.product-grid {
  display: grid;
  gap: clamp(1rem, 1.5vw, 2rem);
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  content-visibility: auto;
}
.grid-item {
  opacity: 0;
  transform: translateY(1rem);
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.grid-item.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
