<template>
  <label class="sort-select">
    <span>Sắp xếp</span>
    <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
      <option value="newest">Mới nhất</option>
      <option value="price-asc">Giá tăng dần</option>
      <option value="price-desc">Giá giảm dần</option>
      <option value="popular">Phổ biến</option>
    </select>
  </label>
</template>

<script setup>
defineProps({ modelValue: { type: String, default: 'newest' } })

defineEmits(['update:modelValue'])
</script>

<style scoped>
.sort-select {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
select {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 0.35rem 0.5rem;
}
</style>
