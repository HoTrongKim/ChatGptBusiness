<template>
  <label class="search-box">
    <UiIcon name="search" :size="18" />
    <input
      :value="modelValue"
      type="search"
      :placeholder="placeholder"
      @input="onInput"
      @keyup.enter="$emit('submit')"
    />
  </label>
</template>

<script setup>
import UiIcon from './UiIcon.vue'
import { debounce } from '@/utils/format.js'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Tìm kiếm sản phẩm' }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const trigger = debounce((value) => emit('update:modelValue', value), 300)

function onInput(event) {
  trigger(event.target.value)
}
</script>

<style scoped>
.search-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
}
.search-box input {
  border: none;
  width: 100%;
}
</style>
