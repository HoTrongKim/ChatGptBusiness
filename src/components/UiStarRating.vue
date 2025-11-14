<template>
  <div class="star-rating" :aria-label="`Đánh giá ${rating}`">
    <span v-for="index in 5" :key="index" class="star" :data-filled="index <= Math.round(rating)">
      <UiIcon name="star" :size="16" :fill="index <= rating" />
    </span>
    <span class="star-rating__value">{{ rating.toFixed(1) }}</span>
    <span class="muted" v-if="reviews">({{ reviews }} đánh giá)</span>
  </div>
</template>

<script setup>
import UiIcon from './UiIcon.vue'

defineProps({
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 }
})
</script>

<style scoped>
.star-rating {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.85rem;
}
.star-rating .star {
  color: color-mix(in srgb, var(--color-accent) 80%, #fff);
}
.star-rating__value {
  font-weight: 600;
}
</style>
