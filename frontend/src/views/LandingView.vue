<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goBooking = () => {
  router.push("/booking");
};

const goLogin = () => {
  router.push("/admin/login");
};
</script>

<template>
  <div class="landing-container">
    <h1>Rental PS Online</h1>
<p>
  Booking PlayStation 4 & PlayStation 5
  secara online.
</p>

<button @click="goBooking">
  Booking Sekarang
</button>

<button @click="goLogin">
  Login Admin
</button>

  </div>
</template>
