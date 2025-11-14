<template>
  <header class="site-header">
    <div class="shell flex between">
      <RouterLink class="brand" to="/">
        <img :src="logo" alt="NovaShop" width="140" height="40" />
      </RouterLink>
      <button class="nav-toggle" @click="menuOpen = !menuOpen" aria-label="Mở menu">
        <UiIcon :name="menuOpen ? 'close' : 'menu'" />
      </button>
      <nav :class="['site-nav', { 'is-open': menuOpen }]">
        <RouterLink
          v-for="item in items"
          :key="item.to"
          class="nav-link"
          :to="item.to"
          active-class="is-active"
          @click="menuOpen = false"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
      <div class="header-actions">
        <ThemeToggle />
        <RouterLink to="/wishlist" class="wishlist-link" aria-label="Danh sách yêu thích">
          <UiIcon name="heart" :size="20" />
        </RouterLink>
        <CartMini />
      </div>
    </div>
  </header>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import UiIcon from './UiIcon.vue'
import CartMini from './CartMini.vue'
import ThemeToggle from './ThemeToggle.vue'
import logo from '@/assets/logo.svg'

const items = [
  { label: 'Trang chủ', to: '/' },
  { label: 'Sản phẩm', to: '/products' },
  { label: 'Giới thiệu', to: '/about' },
  { label: 'Liên hệ', to: '/contact' }
]

const menuOpen = ref(false)
const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  }
)
</script>

<style scoped>
.site-header {
  padding: 0.75rem 0;
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 60%, transparent);
  background: color-mix(in srgb, var(--color-surface) 90%, transparent);
}
.brand img {
  max-width: clamp(120px, 18vw, 160px);
}
.site-nav {
  display: flex;
  gap: 1rem;
}
.nav-link {
  font-weight: 600;
  color: var(--color-muted);
}
.nav-link.is-active {
  color: var(--color-primary);
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.nav-toggle {
  display: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 0.35rem;
}
@media (max-width: 768px) {
  .site-nav {
    position: absolute;
    top: 100%;
    right: 1.5rem;
    flex-direction: column;
    background: var(--color-surface);
    padding: 1rem;
    border-radius: var(--radius);
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-md);
    display: none;
  }
  .site-nav.is-open {
    display: flex;
  }
  .nav-toggle {
    display: inline-flex;
  }
}
</style>
