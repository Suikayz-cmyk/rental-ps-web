<script setup>
import {
  ref,
  onMounted
} from "vue";
import { useRouter } from "vue-router";

import {
  getMyBookings
} from "../services/customerAuthService";
import "../css/customer.css";

const bookings = ref([]);
const router = useRouter();

const customer = ref(
  JSON.parse(
    localStorage.getItem("customer")
  )
);

const loadBookings = async () => {
  try {
    const result = await getMyBookings(customer.value.id);
    bookings.value = result.data || [];
  } catch (error) {
    console.error(error);
    alert("Gagal memuat booking");
  }
};

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(number || 0);
};

const getStatusLabel = (status) => {
  if (status === "pending") return "Menunggu Approval";
  if (status === "active") return "Sedang Bermain";
  if (status === "finished") return "Selesai";
  if (status === "cancelled") return "Dibatalkan";
  return status;
};

onMounted(() => {
  if (!customer.value?.id) {
    router.push("/customer/login");
    return;
  }

  loadBookings();
});
</script>

<template>
  <div class="customer-shell public-page">
    <div class="customer-page-header">
      <div>
        <h1>Booking Saya</h1>
        <p>Halo, {{ customer?.name }}. Pantau status booking kamu di sini.</p>
      </div>

      <div class="customer-actions">
        <button
          class="btn-primary"
          @click="router.push('/')"
        >
          Pesan Lagi
        </button>
      </div>
    </div>

    <div class="booking-history-grid">
      <div
        v-for="booking in bookings"
        :key="booking.id"
        class="booking-history-card"
      >
        <div class="booking-card-top">
          <span :class="['status-badge', booking.status]">
            <span class="status-dot"></span>
            {{ getStatusLabel(booking.status) }}
          </span>

          <span class="room-type-tag">
            #{{ booking.id }}
          </span>
        </div>

        <h3 class="booking-room-name">
          {{ booking.Room?.name || 'Ruangan' }}
        </h3>

        <p class="booking-meta">
          {{ booking.Room?.psType || '-' }}
        </p>

        <div class="booking-detail-row">
          <span>Durasi</span>
          <strong>{{ booking.duration }} Jam</strong>
        </div>

        <div class="booking-detail-row">
          <span>Total</span>
          <strong>{{ formatRupiah(booking.totalPrice) }}</strong>
        </div>
      </div>

      <div
        v-if="bookings.length === 0"
        class="empty-state"
      >
        Kamu belum punya booking.
      </div>
    </div>
  </div>
</template>
