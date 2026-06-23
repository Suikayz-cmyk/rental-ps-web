<script setup>
import { ref, onMounted } from "vue";
import { getDashboardStats } from "../services/dashboardService";
import { getRooms } from "../services/roomService";
import { createBooking, getBookings, finishBooking } from "../services/bookingService";
import "../css/dashboard.css"; 
import "../css/modal.css";

// State statistik utama
const stats = ref({
  totalRooms: 0,
  availableRooms: 0,
  usedRooms: 0,
  activeBookings: 0,
  totalTransactions: 0,
  totalRevenue: 0
});

// State daftar objek data dari backend
const rooms = ref([]);
const bookings = ref([]);

// State kontrol Modal / Form Pemesanan Langsung
const showOrderModal = ref(false);
const selectedRoomForOrder = ref(null);
const customerName = ref("");
const duration = ref(1);

// State kontrol Modal Penyelesaian Sesi & Pembayaran
const showPaymentModal = ref(false);
const selectedBookingForPayment = ref(null);

const loadDashboardData = async () => {
  try {
    const statsRes = await getDashboardStats();
    if (statsRes.success || statsRes.data) {
      stats.value = statsRes.data || statsRes;
    }

    const roomsRes = await getRooms();
    if (roomsRes.success || roomsRes.data) {
      rooms.value = roomsRes.data || roomsRes;
    }

    const bookingRes = await getBookings();
    if (bookingRes.success || bookingRes.data) {
      bookings.value = bookingRes.data || bookingRes;
    }
  } catch (err) {
    console.error("Gagal memuat data dashboard terintegrasi:", err);
  }
};

const getActiveBookingForRoom = (roomId) => {
  return bookings.value.find((b) => b.roomId === roomId && (b.status === "active" || b.status === "occupied"));
};

// --- ALUR FUNGSI AKSES PEMESANAN ---
const openOrderModal = (room) => {
  selectedRoomForOrder.value = room;

  customerName.value = "";
  duration.value = 1;

  showOrderModal.value = true;
};

const closeOrderModal = () => {
  showOrderModal.value = false;
  selectedRoomForOrder.value = null;
};

const handleCreateBooking = async () => {

  if (
    !customerName.value ||
    !selectedRoomForOrder.value ||
    duration.value < 1
  ) {
    alert("Lengkapi nama customer dan durasi bermain");
    return;
  }

  try {

    await createBooking(
      customerName.value,
      selectedRoomForOrder.value.id,
      duration.value
    );

    alert(
      `Booking untuk ${selectedRoomForOrder.value.name} berhasil dibuat!`
    );

    closeOrderModal();

    await loadDashboardData();

  } catch (err) {

    alert(
      err.response?.data?.message ||
      "Gagal membuat pemesanan langsung"
    );

  }

};

// --- ALUR FUNGSI PENYELESAIAN & PEMBAYARAN ---
const openPaymentModal = (booking) => {
  selectedBookingForPayment.value = booking;
  showPaymentModal.value = true;
};

const closePaymentModal = () => {
  showPaymentModal.value = false;
  selectedBookingForPayment.value = null;
};

const handleProcessPayment = async () => {
  if (!selectedBookingForPayment.value) return;
  
  try {
    await finishBooking(selectedBookingForPayment.value.id);
    alert("Pembayaran lunas! Sesi rental diselesaikan.");
    closePaymentModal();
    loadDashboardData(); 
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Gagal memproses penyelesaian pembayaran");
  }
};

const formatRupiah = (number) => {
  if (!number) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(number);
};

onMounted(() => {
  loadDashboardData();
});
</script>

<template>
  <div class="dashboard-container">
    <Sidebar />

    <div class="dashboard-content">
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <p>Selamat datang, Admin! Kelola rental PS kamu di sini.</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card available">
          <p class="stat-title">Ruangan Kosong</p>
          <h2 class="stat-value">{{ stats.availableRooms }}</h2>
        </div>

        <div class="stat-card used">
          <p class="stat-title">Ruangan Dipakai</p>
          <h2 class="stat-value">{{ stats.usedRooms }}</h2>
        </div>

        <div class="stat-card bookings">
          <p class="stat-title">Transaksi Hari Ini</p>
          <h2 class="stat-value">{{ stats.totalTransactions }}</h2>
        </div>

        <div class="stat-card revenue">
          <p class="stat-title">Pendapatan Hari Ini</p>
          <h2 class="stat-value">{{ formatRupiah(stats.totalRevenue) }}</h2>
        </div>
      </div>

      <h3 class="section-title">Status Ruangan</h3>
      
      <div class="rooms-grid">
        <div 
          v-for="room in rooms" 
          :key="room.id" 
          :class="['room-card', room.status === 'kosong' ? 'is-available' : 'is-occupied']"
          @click="room.status === 'kosong' && openOrderModal(room)"
        >
          <div class="room-card-top">
            <span :class="['badge-status', room.status === 'kosong' ? 'kosong' : 'dipakai']">
              <span class="status-dot"></span>
              {{ room.status === 'kosong' ? 'Kosong' : 'Dipakai' }}
            </span>
            <span class="room-type-tag">{{ room.psType }}</span>
          </div>
          
          <div class="room-info-middle">
            <h4 class="room-name">{{ room.name }}</h4>
            <p class="room-price">{{ formatRupiah(room.pricePerHour) }}/jam</p>
          </div>
          
          <div v-if="room.status !== 'kosong' && getActiveBookingForRoom(room.id)" class="active-session-subbox" @click.stop>
            <p class="active-duration-price">
              🕒 {{ getActiveBookingForRoom(room.id).duration }} Jam · {{ formatRupiah(getActiveBookingForRoom(room.id).totalPrice) }}
            </p>
            <button 
              class="btn-quick-pay" 
              @click="openPaymentModal(getActiveBookingForRoom(room.id))"
            >
              Proses Pembayaran
            </button>
          </div>

          <button v-if="room.status === 'kosong'" class="btn-order">
            + Pesan Sekarang
          </button>
        </div>
      </div>
    </div>

    <div v-if="showOrderModal" class="modal-overlay" @click.self="closeOrderModal">
      <div class="modal-box">
        <div class="modal-header">
          <h3>Mulai Sesi Baru</h3>
          <button class="btn-close-modal" @click="closeOrderModal">✕</button>
        </div>
        <div class="modal-body">
          <p class="modal-subtitle">Ruangan: <strong>{{ selectedRoomForOrder?.name }} ({{ selectedRoomForOrder?.psType }})</strong></p>
          
          <div class="form-group">
            <label>Nama Customer</label>
            <input v-model="customerName" type="text" placeholder="Masukkan nama customer" />
          </div>

          <div class="form-group">
            <label>Durasi Bermain (Jam)</label>
            <input v-model="duration" type="number" min="1" placeholder="Contoh: 2" />
          </div>

          <div class="modal-calculated-box">
            <span>Estimasi Biaya:</span>
            <span class="calculated-price">{{ formatRupiah((selectedRoomForOrder?.pricePerHour || 0) * duration) }}</span>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" @click="closeOrderModal">Batal</button>
          <button class="btn-primary" @click="handleCreateBooking">Konfirmasi Main</button>
        </div>
      </div>
    </div>

    <div v-if="showPaymentModal" class="modal-overlay" @click.self="closePaymentModal">
      <div class="modal-box payment-theme">
        <div class="modal-header">
          <h3>Konfirmasi Pembayaran</h3>
          <button class="btn-close-modal" @click="closePaymentModal">✕</button>
        </div>
        <div class="modal-body space-y-md">
          <div class="detail-row">
            <span class="row-label">Sesi ID</span>
            <span class="row-value">#{{ selectedBookingForPayment?.id }}</span>
          </div>
          <div class="detail-row">
            <span class="row-label">Durasi Pakai</span>
            <span class="row-value">{{ selectedBookingForPayment?.duration }} Jam</span>
          </div>
          
          <hr class="modal-divider" />
          
          <div class="detail-row total-row">
            <span class="row-label text-bold">Total Bayar</span>
            <span class="row-value price-highlight">{{ formatRupiah(selectedBookingForPayment?.totalPrice) }}</span>
          </div>
        </div>
        <div class="modal-footer gap-full">
          <button class="btn-modal-unpaid" @click="closePaymentModal">Belum Dibayar</button>
          <button class="btn-modal-confirm-paid" @click="handleProcessPayment">✓ Sudah Dibayar</button>
        </div>
      </div>
    </div>
  </div>
</template>