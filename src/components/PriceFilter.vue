<template>
  <div class="price-filter">
    <label>
      Tối thiểu
      <input type="number" :min="range.min" :max="range.max" :value="min" @input="emitMin($event.target.value)" />
    </label>
    <label>
      Tối đa
      <input type="number" :min="range.min" :max="range.max" :value="max" @input="emitMax($event.target.value)" />
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 0 },
  range: { type: Object, default: () => ({ min: 0, max: 0 }) }
})

const emit = defineEmits(['update:min', 'update:max'])

const emitMin = (value) => emit('update:min', Number(value))
const emitMax = (value) => emit('update:max', Number(value))
</script>

<style scoped>
.price-filter {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
}
label {
  display: grid;
  gap: 0.35rem;
  font-size: 0.85rem;
}
input {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 0.35rem 0.5rem;
}
</style>
