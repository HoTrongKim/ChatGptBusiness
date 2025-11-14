import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'

const DEFAULT_TITLE = 'NovaShop — Mua sắm thông minh'
const DEFAULT_DESC = 'Cửa hàng trực tuyến với giá tốt, giao nhanh.'

function ensureMeta(attr, key, value) {
  if (import.meta.env.SSR || !value) return
  let meta = document.querySelector(`meta[${attr}="${key}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attr, key)
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', value)
}

function ensureJsonLd(payload) {
  if (import.meta.env.SSR || !payload) return
  let node = document.querySelector('script[data-meta="jsonld"]')
  if (!node) {
    node = document.createElement('script')
    node.type = 'application/ld+json'
    node.dataset.meta = 'jsonld'
    document.head.appendChild(node)
  }
  node.textContent = JSON.stringify(payload)
}

function ensureCanonical(url) {
  if (import.meta.env.SSR || !url) return
  let link = document.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)
}

export function useHeadMeta(initial = {}) {
  const route = useRoute()
  const metaRef = ref(initial)

  const apply = (payload = {}) => {
    if (import.meta.env.SSR) return
    const title = payload.title || DEFAULT_TITLE
    document.title = title
    const description = payload.description || DEFAULT_DESC
    ensureMeta('name', 'description', description)
    ensureMeta('property', 'og:title', title)
    ensureMeta('property', 'og:description', description)
    ensureMeta('property', 'og:type', payload.ogType || 'website')
    ensureMeta('name', 'twitter:card', 'summary_large_image')
    ensureMeta('name', 'twitter:title', title)
    ensureMeta('name', 'twitter:description', description)
    if (payload.canonical) ensureCanonical(payload.canonical)
    if (payload.jsonld) ensureJsonLd(payload.jsonld)
  }

  onMounted(() => apply(metaRef.value))
  watch(() => metaRef.value, (value) => apply(value), { deep: true })
  watch(
    () => route.fullPath,
    () => {
      if (typeof window === 'undefined') return
      apply({ ...metaRef.value, canonical: `${window.location.origin}${route.fullPath}` })
    },
    { immediate: true }
  )

  return {
    setMeta: (next) => {
      metaRef.value = { ...metaRef.value, ...next }
    }
  }
}
