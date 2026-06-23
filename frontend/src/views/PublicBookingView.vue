<script setup>
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import PaymentConfirmation from "../components/PaymentConfirmation.vue";
import {
  getPublicRooms,
  createPublicBooking
} from "../services/publicService";
import "../css/customer.css";
import "../css/modal.css";

const router = useRouter();

const rooms = ref([]);
const name = ref("");
const phone = ref("");
const duration = ref(1);
const customer = ref(null);
const showPaymentModal = ref(false);
const selectedRoomData = ref(null);

const availableRooms = computed(() =>
  rooms.value.filter((room) => room.status === "kosong").length
);

const pendingRooms = computed(() =>
  rooms.value.filter((room) => room.status === "pending").length
);

const usedRooms = computed(() =>
  rooms.value.filter((room) => room.status === "dipakai").length
);

const loadRooms = async () => {
  try {
    const result = await getPublicRooms();
    rooms.value = result.data || [];
  } catch (error) {
    console.error(error);
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
  if (status === "kosong") return "Kosong";
  if (status === "pending") return "Menunggu Approval";
  return "Dipakai";
};

const startBookingProcess = (room) => {
  if (!customer.value && (!name.value || !phone.value)) {
    alert("Silakan isi nama dan nomor telepon Anda untuk melanjutkan booking.");
    return;
  }

  selectedRoomData.value = room;
  showPaymentModal.value = true;
};

const cancelBookingProcess = () => {
  showPaymentModal.value = false;
  selectedRoomData.value = null;
};

const confirmBooking = async () => {
  if (duration.value < 1) {
    alert("Durasi minimal 1 jam");
    return;
  }

  try {
    const bookingName = customer.value ? customer.value.name : name.value;
    const bookingPhone = customer.value ? customer.value.phone : phone.value;

    if (!bookingName || !bookingPhone) {
      alert("Nama dan nomor telepon wajib diisi.");
      return;
    }
    
    await createPublicBooking({
      name: bookingName,
      phone: bookingPhone,
      roomId: selectedRoomData.value.id,
      duration: Number(duration.value)
    });

    alert("Booking berhasil dibuat dan menunggu approval admin");

    duration.value = 1;
    await loadRooms();
    cancelBookingProcess();

    if (customer.value) {
      router.push("/my-bookings");
    } else {
      name.value = "";
      phone.value = "";
    }
  } catch (error) {
    console.error(error);
    alert(
      error.response?.data?.message ||
      "Booking gagal"
    );
  }
};

const logoutCustomer = () => {
  localStorage.removeItem("customer");
  customer.value = null;
  name.value = "";
  phone.value = "";
};

onMounted(() => {
  loadRooms();

  const savedCustomer = localStorage.getItem("customer");

  if (savedCustomer) {
    customer.value = JSON.parse(savedCustomer);
    name.value = customer.value.name;
    phone.value = customer.value.phone;
  }
});
</script>

<template>
  <div class="customer-shell public-page">
    <div class="public-header">
      <div class="public-title">
        <h1>Booking Rental PS</h1>
        <p>Pilih ruangan kosong, ajukan booking, lalu tunggu approval admin.</p>
      </div>

      <div class="public-actions">
        <button
          v-if="!customer"
          class="btn-primary"
          @click="
            router.push({
              path: '/customer/login',
              query: { redirect: '/' }
            })
          "
        >
          Login Customer
        </button>

        <button
          v-if="customer"
          class="btn-secondary"
          @click="router.push('/my-bookings')"
        >
          Booking Saya
        </button>

        <button
          class="btn-secondary"
          @click="router.push('/admin/login')"
        >
          Login Admin
        </button>

        <button
          v-if="customer"
          class="btn-danger"
          @click="logoutCustomer"
        >
          Logout
        </button>
      </div>
    </div>

    <div v-if="!customer" class="guest-info-panel">
      <h2>Informasi Tamu</h2>
      <p>Anda belum login. Silakan isi nama dan nomor telepon untuk melanjutkan booking.</p>
      <div class="guest-inputs">
        <input v-model="name" type="text" placeholder="Nama Lengkap Anda">
        <input v-model="phone" type="text" placeholder="Nomor Telepon (WhatsApp)">
      </div>
    </div>

    <div class="customer-summary-grid">
      <div class="customer-summary-card available">
        <p>Ruangan Kosong</p>
        <h2>{{ availableRooms }}</h2>
      </div>

      <div class="customer-summary-card pending">
        <p>Menunggu Approval</p>
        <h2>{{ pendingRooms }}</h2>
      </div>

      <div class="customer-summary-card used">
        <p>Sedang Dipakai</p>
        <h2>{{ usedRooms }}</h2>
      </div>
    </div>

    <div
      v-if="customer"
      class="customer-mini-panel"
    >
      <p>
        Login sebagai <strong>{{ customer.name }}</strong> - {{ customer.phone }}
      </p>
    </div>

    <div class="public-room-grid">
      <div
        v-for="room in rooms"
        :key="room.id"
        :class="['public-room-card', { 'is-available': room.status === 'kosong' }]"
        @click="room.status === 'kosong' && startBookingProcess(room)"
      >
        <div class="room-card-top">
          <span :class="['status-badge', room.status]">
            <span class="status-dot"></span>
            {{ getStatusLabel(room.status) }}
          </span>

          <span class="room-type-tag">{{ room.psType }}</span>
        </div>

        <h3 class="room-name">{{ room.name }}</h3>
        <p class="room-price">{{ formatRupiah(room.pricePerHour) }}/jam</p>

        <div class="duration-control">
          <label>Durasi</label>
          <input
            v-model="duration"
            type="number"
            min="1"
            @click.stop
          />
        </div>

        <button
          v-if="room.status === 'kosong'"
          class="btn-primary"
          @click.stop="startBookingProcess(room)"
        >
          Booking Room
        </button>

        <button
          v-else
          class="btn-secondary"
          disabled
        >
          Tidak Tersedia
        </button>
      </div>

      <div
        v-if="rooms.length === 0"
        class="empty-state"
      >
        Belum ada ruangan yang tersedia.
      </div>
    </div>

    <PaymentConfirmation
      v-if="showPaymentModal"
      :booking-details="{
        room: selectedRoomData,
        duration: duration,
        totalPrice: (selectedRoomData?.pricePerHour || 0) * duration,
      }"
      @confirm="confirmBooking"
      @cancel="cancelBookingProcess"
    />
  </div>
</template>
