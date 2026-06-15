<script setup>
import { ref, onMounted } from "vue";
import {
  getRooms,
  createRoom,
  deleteRoom as removeRoom,
  updateRoom
} from "../services/roomService";
import "../css/room.css"; 

const rooms = ref([]);

// --- STATE MODAL TAMBAH RUANGAN ---
const showAddModal = ref(false);
const roomName = ref("");
const psType = ref("PS4");
const pricePerHour = ref(10000);

// --- STATE MODAL EDIT RUANGAN ---
const showEditModal = ref(false);
const editingRoomId = ref(null);
const editRoomName = ref("");
const editPsType = ref("PS4");
const editPricePerHour = ref(10000);
const editStatus = ref("kosong");

const loadRooms = async () => {
  try {
    const result = await getRooms();
    rooms.value = result.data || result;
  } catch (err) {
    console.error("Gagal mengambil data room", err);
  }
};

onMounted(() => {
  loadRooms();
});

// --- ALUR TAMBAH RUANGAN (MODAL POPUP) ---
const openAddModal = () => {
  // Reset ke nilai default setiap kali dibuka
  roomName.value = "";
  psType.value = "PS4";
  pricePerHour.value = 10000;
  showAddModal.value = true;
};

const closeAddModal = () => {
  showAddModal.value = false;
};

const handleAddRoom = async () => {
  if (!roomName.value.trim()) {
    alert("Nama ruangan wajib diisi");
    return;
  }

  try {
    await createRoom({
      name: roomName.value,
      psType: psType.value,
      pricePerHour: Number(pricePerHour.value),
      status: "kosong"
    });

    alert("Ruangan berhasil ditambahkan");
    closeAddModal();
    await loadRooms();
  } catch (err) {
    console.error(err);
    alert("Gagal menambahkan ruangan");
  }
};

// --- ALUR EDIT RUANGAN (MODAL POPUP) ---
const openEditModal = (room) => {
  editingRoomId.value = room.id;
  editRoomName.value = room.name;
  editPsType.value = room.psType;
  editPricePerHour.value = room.pricePerHour;
  editStatus.value = room.status || "kosong";
  
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  editingRoomId.value = null;
};

const handleUpdateRoom = async () => {
  if (!editRoomName.value.trim()) {
    alert("Nama ruangan tidak boleh kosong");
    return;
  }

  const payload = {
    name: editRoomName.value,
    psType: editPsType.value,
    pricePerHour: Number(editPricePerHour.value),
    status: editStatus.value
  };

  try {
    await updateRoom(editingRoomId.value, payload);
    alert("Ruangan berhasil diperbarui");
    closeEditModal();
    await loadRooms();
  } catch (err) {
    console.error(err);
    alert("Gagal memperbarui ruangan");
  }
};

const deleteRoom = async (id) => {
  if (!confirm("Apakah Anda yakin ingin menghapus ruangan ini?")) {
    return;
  }

  try {
    await removeRoom(id);
    await loadRooms();
  } catch (err) {
    console.error(err);
    alert("Gagal menghapus ruangan");
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
  <div class="room-management-container">
    <Sidebar />

    <div class="room-content">
      <div class="room-header">
        <div>
          <h1>Manajemen Ruangan</h1>
          <p>Kelola data ruangan PS yang tersedia</p>
        </div>
        <button class="btn-add-header" @click="openAddModal">
          + Tambah Ruangan
        </button>
      </div>

      <div class="table-responsive">
        <table class="modern-table">
          <thead>
            <tr>
              <th width="80">No</th>
              <th>Nama Ruangan</th>
              <th>Jenis PS</th>
              <th>Harga/Jam</th>
              <th>Status</th>
              <th width="120">Aksi</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(room, index) in rooms" :key="room.id">
              <td>{{ index + 1 }}</td>
              <td class="text-room-name">{{ room.name }}</td>
              <td><span class="badge-ps">{{ room.psType }}</span></td>
              <td class="text-price">{{ formatRupiah(room.pricePerHour) }}</td>
              <td>
                <span :class="['badge-status-room', room.status === 'kosong' ? 'kosong' : 'dipakai']">
                  {{ room.status === 'kosong' ? 'Kosong' : 'Dipakai' }}
                </span>
              </td>
              <td>
                <div class="action-buttons">
                  <button class="btn-action edit" @click="openEditModal(room)" title="Edit Ruangan">
                    ✏️
                  </button>
                  <button class="btn-action delete" @click="deleteRoom(room.id)" title="Hapus Ruangan">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="rooms.length === 0">
              <td colspan="6" style="text-align: center; color: #717a8c; padding: 25px;">
                Belum ada data ruangan yang terdaftar.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="showAddModal" class="modal-overlay" @click.self="closeAddModal">
      <div class="modal-box edit-room-theme">
        <div class="modal-header">
          <h3>Tambah Ruangan Baru</h3>
          <button class="btn-close-modal" @click="closeAddModal">✕</button>
        </div>
        
        <div class="modal-body space-y-md">
          <div class="form-group-vertical">
            <label>Nama Ruangan</label>
            <input v-model="roomName" type="text" placeholder="Contoh: PS Room 5" />
          </div>

          <div class="form-group-vertical">
            <label>Jenis PS</label>
            <div class="ps-type-segmented">
              <button 
                type="button"
                :class="['segmented-btn', { active: psType === 'PS4' }]" 
                @click="psType = 'PS4'"
              >
                PS4
              </button>
              <button 
                type="button"
                :class="['segmented-btn', { active: psType === 'PS5' }]" 
                @click="psType = 'PS5'"
              >
                PS5
              </button>
            </div>
          </div>

          <div class="form-group-vertical">
            <label>Harga per Jam (Rp)</label>
            <input v-model="pricePerHour" type="number" placeholder="Contoh: 10000" />
          </div>
        </div>

        <div class="modal-footer gap-full">
          <button class="btn-modal-cancel" @click="closeAddModal">Batal</button>
          <button class="btn-modal-update" @click="handleAddRoom">Tambah</button>
        </div>
      </div>
    </div>

    <div v-if="showEditModal" class="modal-overlay" @click.self="closeEditModal">
      <div class="modal-box edit-room-theme">
        <div class="modal-header">
          <h3>Edit Ruangan</h3>
          <button class="btn-close-modal" @click="closeEditModal">✕</button>
        </div>
        
        <div class="modal-body space-y-md">
          <div class="form-group-vertical">
            <label>Nama Ruangan</label>
            <input v-model="editRoomName" type="text" placeholder="Masukkan nama ruangan..." />
          </div>

          <div class="form-group-vertical">
            <label>Jenis PS</label>
            <div class="ps-type-segmented">
              <button 
                type="button"
                :class="['segmented-btn', { active: editPsType === 'PS4' }]" 
                @click="editPsType = 'PS4'"
              >
                PS4
              </button>
              <button 
                type="button"
                :class="['segmented-btn', { active: editPsType === 'PS5' }]" 
                @click="editPsType = 'PS5'"
              >
                PS5
              </button>
            </div>
          </div>

          <div class="form-group-vertical">
            <label>Harga per Jam (Rp)</label>
            <input v-model="editPricePerHour" type="number" placeholder="Contoh: 15000" />
          </div>

          <div class="form-group-vertical">
            <label>Status</label>
            <select v-model="editStatus" class="modal-select-status">
              <option value="kosong">Kosong</option>
              <option value="dipakai">Dipakai</option>
            </select>
          </div>
        </div>

        <div class="modal-footer gap-full">
          <button class="btn-modal-cancel" @click="closeEditModal">Batal</button>
          <button class="btn-modal-update" @click="handleUpdateRoom">✓ Update</button>
        </div>
      </div>
    </div>

  </div>
</template>