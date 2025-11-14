<template>
  <button class="theme-toggle" type="button" @click="cycleTheme" :aria-label="`Chuyển chủ đề (hiện ${theme})`">
    <UiIcon :name="icon" :size="18" />
    <span>{{ label }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import UiIcon from './UiIcon.vue'
import { useUiStore } from '@/stores/ui.js'
import { storeToRefs } from 'pinia'

const ui = useUiStore()
const { theme } = storeToRefs(ui)

const icon = computed(() => {
  if (theme.value === 'dark') return 'moon'
  if (theme.value === 'light') return 'sun'
  return 'sun'
})

const label = computed(() => (theme.value === 'auto' ? 'Auto' : theme.value === 'light' ? 'Sáng' : 'Tối'))

function cycleTheme() {
  const order = ['auto', 'light', 'dark']
  const index = order.indexOf(theme.value)
  const next = order[(index + 1) % order.length]
  ui.toggleTheme(next)
}
</script>

<style scoped>
.theme-toggle {
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 0.35rem 0.85rem;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}
</style>
