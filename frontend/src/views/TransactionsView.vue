<script setup>
import { ref, onMounted, computed } from "vue";
import {
  getTransactions,
  updateTransaction,
  deleteTransaction
} from "../services/transactionService";
import { getRooms } from "../services/roomService"; // Import service ruangan untuk memuat semua kamar
import "../css/transaction.css";

const transactions = ref([]);
const allRooms = ref([]); // State untuk menampung semua ruangan yang terdaftar
const selectedRoom = ref("");
const selectedDate = ref("");

const showEditModal = ref(false);

const editForm = ref({
  id: null,
  amount: 0,
  paymentStatus: "paid"
});

const openEditModal = (tx) => {

  editForm.value = {
    id: tx.id,
    amount: tx.amount,
    paymentStatus: tx.paymentStatus
  };

  showEditModal.value = true;

};

const loadData = async () => {
  try {
    // Memuat data transaksi dan semua ruangan secara paralel
    const [resTransactions, resRooms] = await Promise.all([
      getTransactions(),
      getRooms()
    ]);

    transactions.value = resTransactions.data || resTransactions || [];
    
    // Menampung semua data ruangan asli dari master data ruangan
    const roomsData = resRooms.data || resRooms || [];
    allRooms.value = roomsData.map(room => room.name).sort();
  } catch (err) {
    console.error("Gagal memuat data:", err);
  }
};

const saveTransaction = async () => {

  try {

    await updateTransaction(
      editForm.value.id,
      {
        amount:
          editForm.value.amount,
        paymentStatus:
          editForm.value.paymentStatus
      }
    );

    showEditModal.value = false;

    await loadData();

    alert(
      "Transaksi berhasil diperbarui"
    );

  } catch (error) {

    console.error(error);

    alert(
      "Gagal memperbarui transaksi"
    );

  }

};

const handleDelete = async (id) => {

  const confirmed =
    confirm(
      "Yakin ingin menghapus transaksi?"
    );

  if (!confirmed) return;

  try {

    await deleteTransaction(id);

    await loadData();

    alert(
      "Transaksi berhasil dihapus"
    );

  } catch (error) {

    console.error(error);

    alert(
      "Gagal menghapus transaksi"
    );

  }

};

// Filter data dinamis (Berdasarkan Ruangan dan Tanggal)
const filteredTransactions = computed(() => {
  if (!Array.isArray(transactions.value)) return [];
  
  return transactions.value.filter((tx) => {
    const roomName = tx.Booking?.Room?.name || tx.Room?.name || tx.roomName || "";
    const createdAt = tx.createdAt || "";

    const matchesRoom = selectedRoom.value === "" || roomName === selectedRoom.value;
    const matchesDate = selectedDate.value === "" || createdAt.startsWith(selectedDate.value);

    return matchesRoom && matchesDate;
  });
});

const totalRevenue = computed(() => {
  return filteredTransactions.value.reduce((sum, tx) => {
    const price = tx.totalPrice || tx.Booking?.totalPrice || tx.amount || 0;
    return sum + price;
  }, 0);
});

const formatRupiah = (number) => {
  if (!number) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(number);
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

onMounted(() => {
  loadData();
});
</script>

<template>
  <div class="transaction-page-container">
    <Sidebar />

    <div class="transaction-content">
      <div class="transaction-header">
        <div>
          <h1>Riwayat Transaksi</h1>
          <p>Semua transaksi rental PS</p>
        </div>
      </div>

      <div class="summary-grid">
        <div class="summary-card total">
          <p class="summary-title">Total Transaksi</p>
          <h2 class="summary-value">{{ filteredTransactions.length }}</h2>
        </div>

        <div class="summary-card paid">
          <p class="summary-title">Sudah Dibayar</p>
          <h2 class="summary-value">{{ filteredTransactions.length }}</h2>
        </div>

        <div class="summary-card revenue">
          <p class="summary-title">Total Pendapatan</p>
          <h2 class="summary-value revenue-text">{{ formatRupiah(totalRevenue) }}</h2>
        </div>
      </div>

      <div class="search-filter-box">
        <div class="filter-select-wrapper" style="flex: 1;">
          <select v-model="selectedRoom" class="filter-select" style="width: 100%;">
            <option value="">Semua Ruangan</option>
            <option v-for="room in allRooms" :key="room" :value="room">
              {{ room }}
            </option>
          </select>
        </div>
        
        <input type="date" v-model="selectedDate" class="date-input" />
      </div>

      <div class="table-container">
        <table class="transaction-table">
          <thead>
            <tr>
              <th width="60">No</th>
              <th>Ruangan</th>
              <th>PS</th>
              <th>Durasi</th>
              <th>Total</th>
              <th>Status</th>
              <th>Tanggal</th>
              <th width="90">Aksi</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(tx, index) in filteredTransactions" :key="tx.id">
              <td>{{ index + 1 }}</td>
              
              <td class="tx-room-name" style="font-weight: 600;">
                {{ tx.Booking?.Room?.name || tx.Room?.name || 'PS Room' }}
              </td>
              
              <td>
                <span class="badge-ps-type">{{ tx.Booking?.Room?.psType || tx.Room?.psType || 'PS5' }}</span>
              </td>
              
              <td>{{ tx.Booking?.duration || tx.duration || 1 }}j</td>
              
              <td class="tx-price-text">
                {{ formatRupiah(tx.amount) }}
              </td>
              
              <td>
                <span
                  :class="
                    tx.paymentStatus === 'paid'
                      ? 'badge-status-paid'
                      : 'badge-status-unpaid'
                  "
                >
                  {{ tx.paymentStatus }}
                </span>
              </td>
              
              <td>{{ formatDate(tx.createdAt) }}</td>

              <td>
                <div class="tx-actions">
                  <button
                    class="btn-tx-action edit"
                    title="Ubah"
                    @click="openEditModal(tx)"
                  >
                    ✏️
                  </button>

                  <button
                    class="btn-tx-action delete"
                    title="Hapus"
                    @click="handleDelete(tx.id)"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="filteredTransactions.length === 0">
              <td colspan="8" style="text-align: center; color: #717a8c; padding: 25px;">
                Tidak ada data transaksi yang ditemukan.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="showEditModal"
        class="modal-overlay"
      >
        <div class="modal-content">

          <h3>Edit Transaksi</h3>

          <div class="form-group">
            <label>Total Pembayaran</label>

            <input
              type="number"
              v-model="editForm.amount"
            />
          </div>

          <div class="form-group">
            <label>Status Pembayaran</label>

            <select
              v-model="editForm.paymentStatus"
            >
              <option value="paid">
                Paid
              </option>

              <option value="unpaid">
                Unpaid
              </option>
            </select>
          </div>

          <div class="modal-actions">

            <button
              @click="saveTransaction"
            >
              Simpan
            </button>

            <button
              @click="
                showEditModal = false
              "
            >
              Batal
            </button>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>