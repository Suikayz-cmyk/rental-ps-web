const {
  Room,
  Booking,
  Transaction
} = require('../models');

const getDashboardStats =
  async (req, res) => {

    try {

      const totalRooms =
        await Room.count();

      const availableRooms =
        await Room.count({
          where: {
            status: 'kosong'
          }
        });

      const usedRooms =
        await Room.count({
          where: {
            status: 'dipakai'
          }
        });

      const activeBookings =
        await Booking.count({
          where: {
            status: 'active'
          }
        });

      const totalTransactions =
        await Transaction.count();

      const totalRevenue =
        await Transaction.sum(
          'amount'
        );

      res.status(200).json({
        success: true,
        data: {
          totalRooms,
          availableRooms,
          usedRooms,
          activeBookings,
          totalTransactions,
          totalRevenue
        }
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

};

module.exports = {
  getDashboardStats
};