<script setup>

const props = defineProps({
  bookingDetails: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['confirm', 'cancel']);

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(number);
};

const confirmPayment = () => {
  emits('confirm');
};

const cancelPayment = () => {
  emits('cancel');
};
</script>

<template>
  <div class="modal-overlay" @click.self="cancelPayment">
    <div class="modal-box">
      <div class="modal-header">
        <h3>Konfirmasi Pembayaran</h3>
        <button @click="cancelPayment" class="btn-close-modal">✕</button>
      </div>

      <div class="modal-body">
        <p class="modal-subtitle">
          Silakan selesaikan pembayaran untuk menyelesaikan booking Anda.
        </p>

        <div class="form-group">
            <label>Detail Booking</label>
            <div class="modal-calculated-box">
                <span>{{ bookingDetails.room.name }} ({{ bookingDetails.duration }} Jam)</span>
                <span class="calculated-price">{{ formatRupiah(bookingDetails.totalPrice) }}</span>
            </div>
        </div>

        <div class="form-group">
          <label>Metode Pembayaran</label>
            <select class="form-group input">
                <option>Bank Transfer (Dummy)</option>
                <option>E-Wallet (Dummy)</option>
            </select>
        </div>

        <div class="form-group">
            <label>Upload Bukti Bayar (Simulasi)</label>
            <button class="btn-secondary" style="width: 100%; text-align: center;">Pilih File</button>
            <p style="font-size: 12px; color: #64748b; margin-top: 8px;">Ini hanya simulasi, Anda dapat langsung menekan tombol konfirmasi.</p>
        </div>

      </div>

      <div class="modal-footer">
        <button @click="cancelPayment" class="btn-secondary">Batal</button>
        <button @click="confirmPayment" class="btn-primary">Konfirmasi Pembayaran</button>
      </div>
    </div>
  </div>
</template>

