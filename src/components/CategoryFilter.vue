<template>
  <div class="category-filter" role="group" aria-label="Lọc theo danh mục">
    <button
      v-for="cat in categories"
      :key="cat"
      :class="['pill', { active: value === cat }]"
      type="button"
      @click="$emit('update:value', cat)"
    >
      {{ cat }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  categories: { type: Array, default: () => [] },
  value: { type: String, default: 'all' }
})

defineEmits(['update:value'])
</script>

<style scoped>
.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.pill {
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 0.35rem 0.85rem;
  background: transparent;
}
.pill.active {
  background: var(--color-primary);
  color: #fff;
}
</style>
