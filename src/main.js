import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import './assets/styles/main.css'
import { routes, attachGuards } from './router/index.js'
import { createPinia } from 'pinia'
import { useProductsStore } from './stores/products.js'
import { useUiStore } from './stores/ui.js'
import { registerSW } from './pwa-register.js'

export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
    scrollBehavior: () => ({ top: 0 })
  },
  ({ app, router, isClient }) => {
    const pinia = createPinia()
    app.use(pinia)
    attachGuards(router)

    if (isClient) {
      const products = useProductsStore(pinia)
      products.prefetch()
      const ui = useUiStore(pinia)
      ui.bootstrapTheme()
      registerSW({
        onNeedRefresh: () =>
          ui.showToast({
            title: 'Cập nhật',
            message: 'Ứng dụng có bản mới, hãy tải lại.',
            actionLabel: 'Tải lại',
            action: () => window.location.reload()
          })
      })
    }
  }
)
