<template>
  <component
    :is="resolvedComponent"
    class="ui-button"
    :class="[`ui-button--${variant}`, { 'is-block': block, 'is-ghost': ghost }]"
    :type="resolvedComponent === 'button' ? type : undefined"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  variant: { type: String, default: 'primary' },
  block: Boolean,
  ghost: Boolean,
  as: { type: [String, Object], default: 'button' },
  type: { type: String, default: 'button' }
})

const resolvedComponent = computed(() => (props.as === 'RouterLink' ? RouterLink : props.as))
</script>

<style scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  border-radius: var(--radius);
  border: 1px solid transparent;
  font-weight: 600;
  padding: 0.75rem 1.35rem;
  transition: background 150ms ease, box-shadow 150ms ease, color 150ms ease;
  text-align: center;
}
.ui-button--primary {
  background: var(--color-primary);
  color: #fff;
  box-shadow: var(--shadow-sm);
}
.ui-button--secondary {
  background: color-mix(in srgb, var(--color-primary) 8%, #fff);
  color: var(--color-primary);
  border-color: color-mix(in srgb, var(--color-primary) 40%, transparent);
}
.ui-button--ghost {
  background: transparent;
  color: var(--color-primary);
}
.ui-button:is(:hover, :focus-visible) {
  box-shadow: var(--shadow-md);
}
.ui-button.is-block {
  width: 100%;
}
</style>
