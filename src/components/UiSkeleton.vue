<template>
  <div 
class="ui-skeleton" :style="{ height }" aria-hidden="true"></div>
</template>
<script setup>
defineProps({ height: { type: String, 
default: '1.5rem' } })
</script>
<style scoped>
.ui-skeleton {
  width: 100%;
  border-radius: calc(var(--radius) / 2);
  background: linear-gradient(90deg, rgba(148, 163, 184, 0.2), rgba(148, 163, 184, 0.35), rgba(148, 163, 184, 0.2));
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
}
</style>
