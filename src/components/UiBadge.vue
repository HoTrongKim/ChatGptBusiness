<template>
  <span class="ui-badge" :class="[`ui-badge--${tone}`]">
    <slot />
  </span>
</template>

<script setup>
defineProps({
  tone: { type: String, default: 'brand' }
})
</script>

<style scoped>
.ui-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  border-radius: 999px;
  padding: 0.1rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
}
.ui-badge--brand {
  background: color-mix(in srgb, var(--color-primary) 20%, transparent);
  color: var(--color-primary);
}
.ui-badge--accent {
  background: color-mix(in srgb, var(--color-accent) 20%, transparent);
  color: var(--color-accent);
}
</style>
