<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Sidebar from "./components/Sidebar.vue";

const route = useRoute();

const showSidebar = computed(() => {
  return [
    "/dashboard",
    "/rooms",
    "/bookings",
    "/transactions"
  ].includes(route.path);
});
</script>

<template>
  <div class="main-app-layout">
    <Sidebar v-if="showSidebar" />
    <div class="main-app-content">
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
  min-width: 0;
  box-sizing: border-box;
}
</style>
