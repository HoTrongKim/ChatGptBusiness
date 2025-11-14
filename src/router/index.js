export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      title: 'NovaShop — Mua sắm thông minh',
      description: 'Khám phá giải pháp AI doanh nghiệp cùng NovaShop.'
    }
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('@/pages/Products.vue'),
    meta: {
      title: 'Danh mục sản phẩm | NovaShop',
      description: 'Lọc và tìm kiếm gói AI phù hợp cho đội nhóm.'
    }
  },
  {
    path: '/products/:slug',
    name: 'product-detail',
    component: () => import('@/pages/ProductDetail.vue'),
    props: true,
    meta: {
      title: 'Chi tiết sản phẩm | NovaShop',
      description: 'Thông tin gói ChatGPT Business và đánh giá thực tế.'
    }
  },
  { path: '/cart', name: 'cart', component: () => import('@/pages/Cart.vue'), meta: { title: 'Giỏ hàng | NovaShop' } },
  { path: '/checkout', name: 'checkout', component: () => import('@/pages/Checkout.vue'), meta: { title: 'Thanh toán | NovaShop' } },
  { path: '/wishlist', name: 'wishlist', component: () => import('@/pages/Wishlist.vue'), meta: { title: 'Yêu thích | NovaShop' } },
  { path: '/about', name: 'about', component: () => import('@/pages/About.vue'), meta: { title: 'Về NovaShop' } },
  { path: '/contact', name: 'contact', component: () => import('@/pages/Contact.vue'), meta: { title: 'Liên hệ NovaShop' } },
  { path: '/404', name: '404', component: () => import('@/pages/NotFound.vue'), meta: { title: 'Không tìm thấy trang' } },
  { path: '/:pathMatch(.*)*', redirect: '/404' }
]

export function attachGuards(router) {
  if (import.meta.env.SSR) return
  router.beforeEach((to, from, next) => {
    const supports =
      document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!supports || !from.name) {
      next()
      return
    }
    document.startViewTransition(() => next())
  })
}
