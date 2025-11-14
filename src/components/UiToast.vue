<template>
  <section class="toast-stack" role="status" aria-live="polite">
    <TransitionGroup name="toast" tag="div">
      <article v-for="toast in items" :key="toast.id" class="toast" tabindex="0">
        <header>
          <strong>{{ toast.title }}</strong>
          <button class="icon" @click="$emit('close', toast.id)">
            <UiIcon name="close" :size="16" />
            <span class="sr-only">Đóng</span>
          </button>
        </header>
        <p>{{ toast.message }}</p>
        <button v-if="toast.action" class="toast__action" @click="toast.action">
          {{ toast.actionLabel || 'Thực hiện' }}
        </button>
      </article>
    </TransitionGroup>
  </section>
</template>

<script setup>
import UiIcon from './UiIcon.vue'

defineProps({
  items: { type: Array, default: () => [] }
})

defineEmits(['close'])
</script>

<style scoped>
.toast-stack {
  position: fixed;
  right: clamp(1rem, 3vw, 2rem);
  bottom: clamp(1rem, 3vw, 2rem);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 80;
}
.toast {
  background: var(--color-surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  padding: 1rem 1.25rem;
  min-width: min(340px, 80vw);
  border: 1px solid var(--color-border);
}
.toast header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
}
.toast__action {
  margin-top: 0.75rem;
  font-weight: 600;
  color: var(--color-primary);
}
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(0.5rem);
}
.icon {
  color: inherit;
}
</style>
