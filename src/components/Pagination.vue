<template>
  <nav class="pagination" aria-label="Phân trang">
    <button type="button" :disabled="page <= 1" @click="setPage(page - 1)">
      <UiIcon name="chevron-left" :size="16" />
      <span>Trước</span>
    </button>
    <button
      v-for="n in total"
      :key="n"
      type="button"
      :class="{ active: page === n }"
      @click="setPage(n)"
      :aria-current="page === n ? 'page' : undefined"
    >
      {{ n }}
    </button>
    <button type="button" :disabled="page >= total" @click="setPage(page + 1)">
      <span>Sau</span>
      <UiIcon name="chevron-right" :size="16" />
    </button>
  </nav>
</template>

<script setup>
import UiIcon from './UiIcon.vue'

const props = defineProps({
  page: { type: Number, default: 1 },
  total: { type: Number, default: 1 }
})

const emit = defineEmits(['update:page'])

function setPage(value) {
  if (value < 1 || value > props.total) return
  emit('update:page', value)
}
</script>

<style scoped>
.pagination {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
}
button {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 0.35rem 0.75rem;
  background: transparent;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}
button.active {
  background: var(--color-primary);
  color: #fff;
}
</style>
