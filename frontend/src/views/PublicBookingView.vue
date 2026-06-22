<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import {
  getPublicRooms,
  createPublicBooking
} from "../services/publicService";

const rooms = ref([]);
const router = useRouter();
const name = ref("");
const phone = ref("");
const duration = ref(1);
const customer = ref(null);

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

    alert(
      "Booking berhasil dibuat!"
    );

    router.push(
      "/my-bookings"
    );

    name.value = "";
    phone.value = "";
    duration.value = 1;

    await loadRooms();
  } catch (error) {
    console.error(error);
    alert("Booking gagal");
  }
};

const logoutCustomer = () => {

  localStorage.removeItem(
    "customer"
  );

  location.reload();

};

onMounted(() => {

  loadRooms();

  const savedCustomer =
    localStorage.getItem(
      "customer"
    );

  if (savedCustomer) {

    customer.value =
      JSON.parse(
        savedCustomer
      );

    name.value =
      customer.value.name;

    phone.value =
      customer.value.phone;

  }

});
</script>

<template>
  <div style="padding: 30px">
    <div
  style="
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:20px;
  "
>

  <h1>
    Booking Rental PS
  </h1>

  <div
  style="
    display:flex;
    gap:10px;
  "
>

  <button
    @click="
      router.push(
        '/customer/login'
      )
    "
  >
    Login Customer
  </button>

  <button
    @click="
      router.push(
        '/admin/login'
      )
    "
  >
    Login Admin
  </button>

  <button
    @click="logoutCustomer"
  >
    Logout Customer
  </button>
</div>
</div>
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

    <div v-if="!customer">

      <input
        v-model="name"
        placeholder="Nama"
      />

      <br /><br />

      <input
        v-model="phone"
        placeholder="Nomor HP"
      />

    </div>

    <div v-else>

      <p>
        👤 {{ customer.name }}
      </p>

      <p>
        📞 {{ customer.phone }}
      </p>

    </div>
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
