const { Customer, Room, Booking, Transaction } = require('../models');

const createPublicBooking = async (req, res) => {
try {
const {
name,
phone,
roomId,
duration
} = req.body;

// Validasi sederhana
if (!name || !phone || !roomId || !duration) {
  return res.status(400).json({
    success: false,
    message: 'Semua field wajib diisi'
  });
}

// Cari customer berdasarkan nomor HP
let customer = await Customer.findOne({
  where: {
    phone
  }
});

// Jika belum ada, buat customer baru
if (!customer) {
  customer = await Customer.create({
    name,
    phone
  });
}

// Cari room
const room = await Room.findByPk(roomId);

if (!room) {
  return res.status(404).json({
    success: false,
    message: 'Room tidak ditemukan'
  });
}

// Cek apakah room sedang dipakai
if (room.status === 'dipakai') {
  return res.status(400).json({
    success: false,
    message: 'Room sedang dipakai'
  });
}

// Hitung total harga
const totalPrice = room.pricePerHour * duration;

// Buat booking
const booking = await Booking.create({
  customerId: customer.id,
  roomId,
  duration,
  totalPrice,
  status: 'active'
});

// Update status room
await room.update({
  status: 'dipakai'
});

// Buat transaksi otomatis
const transaction = await Transaction.create({
  bookingId: booking.id,
  amount: totalPrice,
  paymentStatus: 'unpaid'
});

return res.status(201).json({
  success: true,
  message: 'Booking berhasil dibuat',
  data: {
    booking,
    transaction
  }
});


} catch (error) {
console.error(error);


return res.status(500).json({
  success: false,
  message: 'Terjadi kesalahan server',
  error: error.message
});


}
};

const getPublicRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();

    res.status(200).json({
      success: true,
      data: rooms
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
createPublicBooking,
getPublicRooms
};
