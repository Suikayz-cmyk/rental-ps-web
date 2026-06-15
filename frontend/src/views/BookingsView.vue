<script setup>
import { ref, onMounted } from "vue";
import {
  getBookings,
  createBooking,
  finishBooking,
  cancelBooking
} from "../services/bookingService";
import { getRooms } from "../services/roomService";
import "../css/booking.css"; // Memuat style css terpisah

const bookings = ref([]);
const rooms = ref([]);

const customerName = ref(""); 
const selectedRoom = ref("");
const duration = ref(1);

const showForm = ref(false); // Mengatur visibilitas form tambah data

const loadData = async () => {
  try {
    const bookingRes = await getBookings();
    bookings.value = bookingRes.data || [];

    const roomRes = await getRooms();
    rooms.value = roomRes.data || [];
  } catch (err) {
    console.error("Gagal memuat data dari API:", err);
  }
};

onMounted(() => {
  loadData();
});

const addBooking = async () => {
  if (!selectedRoom.value || duration.value < 1) {
    alert("Lengkapi data terlebih dahulu");
    return;
  }

  try {
    await createBooking(selectedRoom.value, duration.value);
    alert("Booking berhasil dibuat");

    customerName.value = "";
    selectedRoom.value = "";
    duration.value = 1;
    showForm.value = false;

    loadData();
  } catch (err) {
    alert(err.response?.data?.message || "Gagal membuat booking");
  }
};

const finishBookingHandler = async (booking) => {
  try {
    await finishBooking(booking.id);
    alert("Pembayaran berhasil, sesi rental selesai!");
    loadData();
  } catch (err) {
    console.error("Gagal menyelesaikan booking:", err);
    alert(err.response?.data?.message || "Gagal memproses pembayaran");
  }
};

const deleteBooking = async (id) => {
  if (!confirm("Apakah Anda yakin ingin membatalkan sewa ini?")) return;

  try {
    await cancelBooking(id);
    alert("Booking berhasil dibatalkan");
    loadData();
  } catch (err) {
    console.error("Gagal membatalkan booking:", err);
    alert("Gagal membatalkan booking");
  }
};

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(number);
};
</script>

<template>
  <div class="booking-page-container">
    <Sidebar />

    <div class="booking-content">
      <div class="booking-header">
        <div>
          <h1>Pemesanan Aktif</h1>
          <p>Kelola sesi bermain yang sedang berjalan</p>
        </div>
        <button class="btn-toggle-form" @click="showForm = !showForm">
          {{ showForm ? 'Tutup Form' : '+ Tambah Pesanan' }}
        </button>
      </div>

      <div v-if="showForm" class="form-inline-box">
        <input
          v-model="customerName"
          placeholder="Nama Customer"
        />

        <select v-model="selectedRoom">
          <option value="">Pilih Ruangan</option>
          <option
            v-for="room in rooms.filter(r => r.status === 'kosong')"
            :key="room.id"
            :value="room.id"
          >
            {{ room.name }} - {{ room.psType }} - {{ formatRupiah(room.pricePerHour) }}
          </option>
        </select>

        <input
          v-model="duration"
          type="number"
          min="1"
          placeholder="Durasi (Jam)"
        />

        <button class="btn-submit-booking" @click="addBooking">
          Simpan Sesi
        </button>
      </div>

      <div class="booking-list">
        <div 
          v-for="booking in bookings.filter(b => b.status === 'active')" 
          :key="booking.id" 
          class="booking-card"
        >
          <div class="booking-card-header">
            <div class="customer-name-wrapper">
              <span class="icon-user">👤</span>
              <span>{{ customerName || 'Customer' }}</span>
            </div>
            <span class="badge-playing">Sedang Bermain</span>
          </div>

          <div class="room-detail-sub">
            {{ booking.Room?.name || 'Ruangan' }} • {{ booking.Room?.psType || '-' }} • ID Sesi: #{{ booking.id }}
          </div>

          <button class="btn-delete-absolute" @click="deleteBooking(booking.id)" title="Batalkan Sesi">
            🗑️
          </button>

          <br />

          <div class="booking-specs-grid">
            <div class="spec-box">
              <p class="spec-label">Durasi</p>
              <p class="spec-value">{{ booking.duration }} Jam</p>
            </div>
            
            <div class="spec-box">
              <p class="spec-label">Jenis PS</p>
              <p class="spec-value">{{ booking.Room?.psType || '-' }}</p>
            </div>

            <div class="spec-box">
              <p class="spec-label">Total</p>
              <p class="spec-value highlight-total">{{ formatRupiah(booking.totalPrice) }}</p>
            </div>
          </div>

          <button class="btn-finish-payment" @click="finishBookingHandler(booking)">
            ✓ Selesai & Bayar
          </button>
        </div>

        <div v-if="bookings.filter(b => b.status === 'active').length === 0" class="empty-state">
          Tidak ada sesi pemesanan atau bermain yang sedang berjalan saat ini.
        </div>
      </div>
    </div>
  </div>
</template>