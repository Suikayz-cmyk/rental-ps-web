const { Customer, Room, Booking, Transaction } = require('../models');
const { Op } = require('sequelize');

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

const existingBooking = await Booking.findOne({
  where: {
    roomId,
    status: {
      [Op.in]: ['pending', 'active']
    }
  }
});

if (existingBooking) {
  return res.status(400).json({
    success: false,
    message: 'Room sudah memiliki booking aktif atau menunggu approval'
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
  status: 'pending'
});

// Buat transaksi otomatis
const transaction = await Transaction.create({
  bookingId: booking.id,
  amount: totalPrice,
  paymentStatus: 'pending'
});

return res.status(201).json({
  success: true,
  message: 'Booking berhasil dibuat',
  data: {
    booking,
    transaction,
    customer
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
    const rooms = await Room.findAll({
      raw: true
    });

    const activeBookings = await Booking.findAll({
      where: {
        status: {
          [Op.in]: ['pending', 'active']
        }
      },
      raw: true
    });

    const bookingByRoomId = new Map(
      activeBookings.map((booking) => [
        booking.roomId,
        booking.status
      ])
    );

    const roomsWithEffectiveStatus = rooms.map((room) => {
      const bookingStatus = bookingByRoomId.get(room.id);

      if (bookingStatus === 'pending') {
        return {
          ...room,
          status: 'pending'
        };
      }

      if (bookingStatus === 'active') {
        return {
          ...room,
          status: 'dipakai'
        };
      }

      return room;
    });

    res.status(200).json({
      success: true,
      data: roomsWithEffectiveStatus
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
