<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// Fungsi untuk mengecek menu mana yang sedang aktif
const isActive = (path) => route.path === path;

const logout = () => {
  localStorage.clear();
  router.push("/");
};
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-brand">
      <div class="brand-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.12 4.25A4.75 4.75 0 0 0 13.41 8h-2.82a4.75 4.75 0 0 0-4.71-3.75C3.27 4.25 1 6.55 1 9.42v3c0 2.22 1.39 4.11 3.33 4.81l.46 2.76A1.75 1.75 0 0 0 6.51 21.5h1.34a1.75 1.75 0 0 0 1.71-1.38l.38-2.12h4.12l.38 2.12a1.75 1.75 0 0 0 1.71 1.38h1.34a1.75 1.75 0 0 0 1.72-1.51l.46-2.76a5.006 5.006 0 0 0 3.33-4.81v-3c0-2.87-2.27-5.17-4.88-5.17zM7.5 12h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0v1h1a.5.5 0 0 1 0 1zm11-1a1 1 0 1 1-1 1 1 1 0 0 1 1-1zm-2 2a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"/>
        </svg>
      </div>
      <div class="brand-text">
        <h1>PSRental</h1>
        <span>Admin Panel</span>
      </div>
    </div>

    <nav class="sidebar-menu">
      <button 
        :class="['menu-item', { active: isActive('/dashboard') }]" 
        @click="router.push('/dashboard')"
      >
        <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25z" />
          </svg>
        </span>
        <span class="label">Dashboard</span>
        <span v-if="isActive('/dashboard')" class="arrow">›</span>
      </button>

      <button 
        :class="['menu-item', { active: isActive('/rooms') }]" 
        @click="router.push('/rooms')"
      >
        <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 20.25h12m-12-3h12m3-10.5V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V6.75m18 0A2.25 2.25 0 0 0 18.75 4.5H5.25A2.25 2.25 0 0 0 3 6.75m18 0v9.75" />
          </svg>
        </span>
        <span class="label">Manajemen Ruangan</span>
      </button>

      <button 
        :class="['menu-item', { active: isActive('/bookings') }]" 
        @click="router.push('/bookings')"
      >
        <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>
        </span>
        <span class="label">Pemesanan Aktif</span>
      </button>

      <button 
        :class="['menu-item', { active: isActive('/transactions') }]" 
        @click="router.push('/transactions')"
      >
        <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-3.75A1.5 1.5 0 0 1 3.75 1.5h12A1.5 1.5 0 0 1 17.25 3v3.75m-15 0h15M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
          </svg>
        </span>
        <span class="label">Riwayat Transaksi</span>
      </button>
    </nav>

    <div class="sidebar-footer">
      <div class="user-info">
        <span class="user-title">Logged in as</span>
        <span class="user-name">Administrator</span>
      </div>
      
      <button class="logout-button" @click="logout">
        <span class="icon-logout">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
        </span>
        Logout
      </button>
    </div>
  </aside>
</template>

<style scoped>
/* Load file CSS luar */
@import "../css/sidebar.css";
</style>