<template>
  <div 
class="app-shell">
    <a 
class="skip-link" href="#main">Bỏ qua nội dung</a>
    <HeaderNav />
    <main id="main" 
class="shell" tabindex="-1">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </Transition>
      </RouterView>
    </main>
    <FooterBar />
    <UiToast :items="toasts" @close="ui.dismissToast" />
  </div>
</template>
<script setup>
import { RouterView, useRoute } from 'vue-router'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import HeaderNav from '@/components/HeaderNav.vue'
import FooterBar from '@/components/FooterBar.vue'
import UiToast from '@/components/UiToast.vue'
import { useUiStore } from '@/stores/ui.js'
import { useHeadMeta } from '@/composables/useHeadMeta.js'
const ui = useUiStore()
const route = useRoute()
const { toasts } = storeToRefs(ui)
const { setMeta } = useHeadMeta({ title: 'NovaShop — Mua sắm thông minh' })
watch(
  () => route.meta,
  (meta) => {
    setMeta({
      title: meta?.title,
      description: meta?.description,
      canonical: typeof window !== 'undefined' ? `${window.location.origin}${route.fullPath}` : undefined
    })
  },
  { immediate: true, deep: true }
)
</script>
<style scoped>
.app-shell {
  min-height: 100vh;
  background: radial-gradient(circle at top, rgba(37, 99, 235, 0.05), transparent 70%);
}
.page-enter-active,
.page-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(0.5rem);
}
</style>


