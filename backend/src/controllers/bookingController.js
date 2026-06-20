const {
  Room,
  Booking,
  Transaction,
  Customer
} = require('../models');

const getAllBookings = async (req, res) => {

  try {

    const bookings =
      await Booking.findAll({
        include: [
          {
            model: Room,
            attributes: [
              'id',
              'name',
              'psType',
              'pricePerHour',
              'status'
            ]
          },
          {
            model: Customer,
            attributes: [
              'id',
              'name',
              'phone'
            ]
          }
        ]
      });

    res.status(200).json({
      success: true,
      data: bookings
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const createBooking = async (req, res) => {

  try {

    const {
      customerName,
      roomId,
      duration
    } = req.body;

    if (!customerName) {
      return res.status(400).json({
        success: false,
        message: 'Nama customer wajib diisi'
      });
    }

    const room =
      await Room.findByPk(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Ruangan tidak ditemukan'
      });
    }

    if (room.status !== 'kosong') {
      return res.status(400).json({
        success: false,
        message: 'Ruangan sedang digunakan'
      });
    }

    if (duration < 1) {
      return res.status(400).json({
        success: false,
        message: 'Minimal booking 1 jam'
      });
    }

    let customer =
      await Customer.findOne({
        where: {
          name: customerName
        }
      });

    if (!customer) {

      customer =
        await Customer.create({
          name: customerName,
          phone: '-'
        });

    }

    const totalPrice =
      room.pricePerHour * duration;

    const booking =
      await Booking.create({
        customerId: customer.id,
        roomId,
        duration,
        totalPrice
      });

    await room.update({
      status: 'dipakai'
    });

    res.status(201).json({
      success: true,
      message: 'Booking berhasil dibuat',
      data: booking
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const finishBooking = async (req, res) => {

  try {

    const { id } = req.params;

    const booking =
      await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking tidak ditemukan'
      });
    }

    if (booking.status !== 'active') {
      return res.status(400).json({
        success: false,
        message:
          'Booking sudah selesai atau dibatalkan'
      });
    }

    const room =
      await Room.findByPk(
        booking.roomId
      );

    await booking.update({
      status: 'finished'
    });

    await Transaction.create({
      bookingId: booking.id,
      amount: booking.totalPrice,
      paymentStatus: 'paid'
    });

    await room.update({
      status: 'kosong'
    });

    res.status(200).json({
      success: true,
      message:
        'Booking berhasil diselesaikan'
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const cancelBooking = async (req, res) => {

  try {

    const { id } = req.params;

    const booking =
      await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message:
          'Booking tidak ditemukan'
      });
    }

    if (booking.status !== 'active') {
      return res.status(400).json({
        success: false,
        message:
          'Booking sudah selesai atau dibatalkan'
      });
    }

    const room =
      await Room.findByPk(
        booking.roomId
      );

    await booking.update({
      status: 'cancelled'
    });

    await room.update({
      status: 'kosong'
    });

    res.status(200).json({
      success: true,
      message:
        'Booking berhasil dibatalkan'
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  getAllBookings,
  createBooking,
  finishBooking,
  cancelBooking
};