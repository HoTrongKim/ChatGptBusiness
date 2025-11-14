import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync, mkdirSync, copyFileSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataSrc = resolve(__dirname, 'src/data/products.json')
const dataDestDir = resolve(__dirname, 'public/data')
const dataDest = resolve(dataDestDir, 'products.json')
mkdirSync(dataDestDir, { recursive: true })
copyFileSync(dataSrc, dataDest)

const productData = JSON.parse(readFileSync(dataSrc, 'utf-8'))
const productRoutes = productData.map((item) => `/products/${item.slug}`)
const baseRoutes = ['/', '/products', '/cart', '/checkout', '/wishlist', '/about', '/contact', '/404']

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'og-image.jpg', 'icons/icon-192.svg', 'icons/icon-512.svg'],
      manifest: {
        name: 'NovaShop',
        short_name: 'NovaShop',
        description: 'Cửa hàng trực tuyến với giá tốt, giao nhanh.',
        theme_color: '#2563eb',
        background_color: '#111827',
        display: 'standalone',
        icons: [
          { src: 'icons/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' },
          { src: 'icons/icon-512.svg', sizes: '512x512', type: 'image/svg+xml' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,webp,json}'],
        runtimeCaching: [
          {
            urlPattern: /\/data\/products\.json$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'products-data',
              expiration: { maxEntries: 1, maxAgeSeconds: 86400 }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    devSourcemap: true
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['tests/setup.js']
  },
  ssgOptions: {
    formatting: 'prettify',
    script: 'async',
    dirStyle: 'nested',
    includedRoutes: () => [...baseRoutes, ...productRoutes]
  }
})


