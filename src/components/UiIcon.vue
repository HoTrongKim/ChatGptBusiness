<template>
  <svg
    v-if="icon.length"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="(d, index) in icon" :key="index" :d="d" :fill="fill ? 'currentColor' : 'none'" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
  fill: Boolean
})

const iconMap = {
  cart: ['M5 6h15l-1.6 8.4a2 2 0 0 1-2 1.6H9.4a2 2 0 0 1-2-1.5L6 3H3'],
  heart: ['M12 20s-6-3.6-8.4-8A4.5 4.5 0 0 1 8 3.6a4.5 4.5 0 0 1 4 2.4 4.5 4.5 0 0 1 4-2.4 4.5 4.5 0 0 1 4.4 8.4C18 16.4 12 20 12 20Z'],
  'heart-solid': ['M12 21.35l-1.45-1.32C6 15.36 2 12.28 2 8.5A4.5 4.5 0 0 1 6.5 4 4.7 4.7 0 0 1 12 5.09 4.7 4.7 0 0 1 17.5 4 4.5 4.5 0 0 1 22 8.5c0 3.78-4 6.86-8.55 11.54Z'],
  search: ['M11 19a8 8 0 1 1 5.293-2.293L21 21'],
  menu: ['M3 6h18M3 12h18M3 18h18'],
  close: ['M6 6l12 12M18 6l-12 12'],
  star: ['M12 3.5 14.4 9l6.1.3-4.8 3.9 1.7 5.8L12 15.9 6.6 19l1.7-5.8-4.8-3.9 6.1-.3Z'],
  sun: ['M12 4V2m0 20v-2m8-8h2M2 12h2m14.95 7.05 1.41 1.41M4.64 4.64 6.05 6.05m12.9-1.41 1.41-1.41M4.64 19.36l1.41-1.41M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z'],
  moon: ['M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z'],
  'chevron-down': ['M6 9l6 6 6-6'],
  'chevron-left': ['M15 18l-6-6 6-6'],
  'chevron-right': ['M9 6l6 6-6 6']
}

const icon = computed(() => iconMap[props.name] || [])
const size = computed(() => props.size)
const fill = computed(() => props.fill)
</script>
