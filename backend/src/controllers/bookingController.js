const {
  Room,
  Booking,
  Transaction
} = require('../models');

const createBooking =
  async (req, res) => {

    try {

      const {
        roomId,
        duration
      } = req.body;

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

      const totalPrice =
        room.pricePerHour * duration;

      const booking =
        await Booking.create({
          roomId,
          duration,
          totalPrice
        });

      await room.update({
        status: 'dipakai'
      });

      res.status(201).json({
        success: true,
        message:
          'Booking berhasil dibuat',
        data: booking
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }
};

const finishBooking =
  async (req, res) => {

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

      if (
        booking.status !== 'active'
      ) {
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
        message:
          error.message
      });

    }

};

const cancelBooking = async (
  req,
  res
) => {

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

    if (
      booking.status !== 'active'
    ) {
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
  createBooking,
  finishBooking,
  cancelBooking
};