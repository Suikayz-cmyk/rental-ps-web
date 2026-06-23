<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Sidebar from "./components/Sidebar.vue";

const route = useRoute();

// Sidebar hanya disembunyikan di halaman login ("/")
const showSidebar = computed(() => {
  return route.path !== "/";
});
</script>

<template>
  <div class="main-app-layout">
    
    <Sidebar v-if="showSidebar" />

    <div :class="['main-app-content', { 'with-sidebar': showSidebar }]">
      <router-view />
    </div>

  </div>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #0a0a1a;
  color: white;
}

/* Layout utama dengan Flexbox */
.main-app-layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

/* Area konten utama */
.main-app-content {
  flex: 1;
  min-width: 0; /* Mencegah tabel atau komponen lebar merusak layout flexbox */
  box-sizing: border-box;
  transition: margin-left 0.2s ease; /* Transisi halus saat pindah dari/ke login */
}

/* Jarak aman digeser ke kanan sebesar lebar sidebar (260px) hanya ketika login berhasil */
.main-app-content.with-sidebar {
  margin-left: 260px; 
}
</style>