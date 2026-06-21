<script setup>
import { ref, onMounted } from "vue";

import {
  getPublicRooms,
  createPublicBooking
} from "../services/publicService";

const rooms = ref([]);

const name = ref("");
const phone = ref("");
const duration = ref(1);

const loadRooms = async () => {
  try {
    const result = await getPublicRooms();
    rooms.value = result.data;
  } catch (error) {
    console.error(error);
  }
};

const bookingRoom = async (roomId) => {

  if (!name.value.trim()) {
    alert("Nama wajib diisi");
    return;
  }

  if (!phone.value.trim()) {
    alert("Nomor HP wajib diisi");
    return;
  }

  if (duration.value < 1) {
    alert("Durasi minimal 1 jam");
    return;
  }

  if (phone.value.length < 10) {
    alert("Nomor HP tidak valid");
    return;
  }

  try {
    await createPublicBooking({
      name: name.value,
      phone: phone.value,
      roomId,
      duration: Number(duration.value)
    });

    alert("Booking berhasil!");

    name.value = "";
    phone.value = "";
    duration.value = 1;

    await loadRooms();
  } catch (error) {
    console.error(error);
    alert("Booking gagal");
  }
};

onMounted(() => {
  loadRooms();
});
</script>

<template>
  <div style="padding: 30px">
    <h1>Booking Rental PS</h1>

<div
  v-for="room in rooms"
  :key="room.id"
  style="
    border:1px solid #ddd;
    padding:20px;
    margin-bottom:20px;
  "
>
  <h3>{{ room.name }}</h3>

  <p>{{ room.psType }}</p>

  <p>
    Rp {{ room.pricePerHour }}/jam
  </p>

  <p>
    Status:
    {{ room.status }}
  </p>

  <div v-if="room.status === 'kosong'">

    <input
      v-model="name"
      placeholder="Nama"
    />

    <br /><br />

    <input
      v-model="phone"
      placeholder="Nomor HP"
    />

    <br /><br />

    <input
      v-model="duration"
      type="number"
      min="1"
    />

    <br /><br />

    <button
      @click="bookingRoom(room.id)"
    >
      Booking
    </button>

  </div>

  <div v-else>
    Room sedang dipakai
  </div>
</div>
  </div>
</template>
