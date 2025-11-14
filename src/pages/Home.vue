<template>
  <div class="home">
    <section class="hero card">
      <div>
        <UiBadge>ChatGPT Business</UiBadge>
        <h1>Tăng tốc đội nhóm với ChatGPT Business</h1>
        <p>Dịch vụ cho doanh nghiệp với bảo mật nâng cao, tạo tác vụ AI mạnh mẽ và chi phí chỉ 100/slot/tháng.</p>
        <div class="flex">
          <UiButton
            as="a"
            href="https://zalo.me/0392864769"
            target="_blank"
            rel="noreferrer"
          >
            Đặt slot ngay
          </UiButton>
          <UiButton
            variant="secondary"
            as="a"
            href="https://zalo.me/0392864769"
            target="_blank"
            rel="noreferrer"
          >
            Nhận tư vấn
          </UiButton>
        </div>
      </div>
      <img src="/images/gear-01.svg" alt="ChatGPT Business" loading="lazy" decoding="async" />
    </section>

    <section class="card feature-stack">
      <h2>Tính năng nổi bật</h2>
      <ul>
        <li v-for="feature in features" :key="feature">
          <UiIcon name="star" :size="18" />
          <span>{{ feature }}</span>
        </li>
      </ul>
    </section>

    <section class="featured">
      <div class="flex between">
        <h2>Gói duy nhất</h2>
        <RouterLink to="/products">Chi tiết gói</RouterLink>
      </div>
      <ProductGrid :products="featured" />
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useProductsStore } from '@/stores/products.js'
import ProductGrid from '@/components/ProductGrid.vue'
import UiBadge from '@/components/UiBadge.vue'
import UiButton from '@/components/UiButton.vue'
import UiIcon from '@/components/UiIcon.vue'
import { useHeadMeta } from '@/composables/useHeadMeta.js'

const store = useProductsStore()
const featured = computed(() => [...store.filtered])
const features = computed(() => featured.value[0]?.features || [])

useHeadMeta({
  title: 'ChatGPT Business — Nền tảng AI cho doanh nghiệp',
  description: 'Tất cả tính năng Plus được nâng cấp với bảo mật doanh nghiệp, chỉ 100/slot.',
  jsonld: {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'ChatGPT Business',
    description: 'Gói AI doanh nghiệp với bảo mật nâng cao và cộng tác đội nhóm.',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: '100',
      availability: 'https://schema.org/InStock'
    }
  }
})
</script>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  align-items: center;
}
.hero h1 {
  font-size: clamp(2rem, 3vw, 3rem);
}
.hero img {
  width: 100%;
}
.feature-stack {
  margin-top: 2rem;
}
.feature-stack ul {
  list-style: none;
  display: grid;
  gap: 0.5rem;
}
.feature-stack li {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.featured {
  margin-top: 2rem;
}
</style>

