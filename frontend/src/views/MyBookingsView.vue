<script setup>
import {
  ref,
  onMounted
} from "vue";

import {
  getMyBookings
} from "../services/customerAuthService";

const bookings = ref([]);

const customer =
  JSON.parse(
    localStorage.getItem(
      "customer"
    )
  );

const loadBookings =
  async () => {

    const result =
      await getMyBookings(
        customer.id
      );

    bookings.value =
      result.data;

  };

onMounted(() => {
  loadBookings();
});
</script>

<template>

  <div
    style="
      padding:30px;
    "
  >

    <h1>
      Booking Saya
    </h1>

    <h3>
      Halo,
      {{ customer.name }}
    </h3>

    <div
      v-for="booking in bookings"
      :key="booking.id"
    >

      <hr />

      <h3>
        {{ booking.Room.name }}
      </h3>

      <p>
        Status:
        {{ booking.status }}
      </p>

      <p>
        Durasi:
        {{ booking.duration }} jam
      </p>

      <p>
        Total:
        Rp {{ booking.totalPrice }}
      </p>

    </div>

  </div>

</template>