<template>
  <footer class="footer">
    <div class="shell grid two">
      <section>
        <h2>NovaShop</h2>
        <p>Giải pháp thời trang thông minh với giao hàng nhanh và bảo hành minh bạch.</p>
        <p class="muted">© {{ new Date().getFullYear() }} NovaShop</p>
      </section>
      <section>
        <h3>Liên hệ</h3>
        <ul>
          <li>Email: trancongminhgenmini@gmail.com</li>
          <li>Hotline: 0392864769</li>
          <li>Địa chỉ: Hehee Street, TP.Đà Nẵng</li>
        </ul>
      </section>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background: #0f172a;
  color: #e2e8f0;
  padding: 3rem 0;
  margin-top: 4rem;
}
.footer h2 {
  font-size: 1.5rem;
}
.footer ul {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 0.35rem;
}
</style>
