<template>
  <section class="gallery" tabindex="0" @keydown="onKey">
    <figure>
      <img :src="current" :alt="`Ảnh ${index + 1}`" loading="lazy" decoding="async" />
      <button class="nav prev" @click="prev" aria-label="Ảnh trước">
        <UiIcon name="chevron-left" />
      </button>
      <button class="nav next" @click="next" aria-label="Ảnh sau">
        <UiIcon name="chevron-right" />
      </button>
    </figure>
    <div class="thumbs">
      <button
        v-for="(image, idx) in images"
        :key="image"
        :class="{ active: idx === index }"
        @click="index = idx"
        :aria-current="idx === index"
      >
        <img :src="image" :alt="`Thumbnail ${idx + 1}`" loading="lazy" decoding="async" />
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import UiIcon from './UiIcon.vue'

const props = defineProps({ images: { type: Array, default: () => [] } })
const index = ref(0)
const current = computed(() => props.images[index.value] || props.images[0])

function prev() {
  index.value = (index.value - 1 + props.images.length) % props.images.length
}
function next() {
  index.value = (index.value + 1) % props.images.length
}
function onKey(event) {
  if (event.key === 'ArrowRight') next()
  if (event.key === 'ArrowLeft') prev()
}

watch(
  () => props.images,
  () => (index.value = 0)
)
</script>

<style scoped>
.gallery {
  display: grid;
  gap: 0.5rem;
}
figure {
  position: relative;
}
figure img {
  width: 100%;
  border-radius: var(--radius);
}
.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(15, 23, 42, 0.4);
  color: white;
  border-radius: 999px;
  padding: 0.35rem;
}
.nav.prev {
  left: 0.5rem;
}
.nav.next {
  right: 0.5rem;
}
.thumbs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  gap: 0.35rem;
}
.thumbs button {
  border: 2px solid transparent;
  border-radius: calc(var(--radius) / 2);
}
.thumbs button.active {
  border-color: var(--color-primary);
}
.thumbs img {
  width: 100%;
  border-radius: inherit;
}
</style>
