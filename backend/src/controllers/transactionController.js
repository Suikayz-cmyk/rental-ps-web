const {
  Transaction,
  Booking,
  Room,
  Customer
} = require('../models');

const getTransactions =
  async (req, res) => {

    try {

      const transactions =
        await Transaction.findAll({
          include: [
            {
              model: Booking,
              include: [
                {
                  model: Room
                },
                {
                  model: Customer
                }
              ]
            }
          ]
        });

      res.status(200).json({
        success: true,
        data: transactions
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

};

const updateTransaction =
  async (req, res) => {

    try {

      const { id } = req.params;

      const {
        amount,
        paymentStatus
      } = req.body;

      const transaction =
        await Transaction.findByPk(id);

      if (!transaction) {
        return res.status(404).json({
          success: false,
          message:
            'Transaksi tidak ditemukan'
        });
      }

      if (amount <= 0) {
        return res.status(400).json({
          success: false,
          message:
            'Amount harus lebih dari 0'
        });
      }

      if (
        paymentStatus !== 'paid' &&
        paymentStatus !== 'pending' &&
        paymentStatus !== 'cancelled'
      ) {
        return res.status(400).json({
          success: false,
          message:
            'Status pembayaran tidak valid'
        });
      }

      await transaction.update({
        amount,
        paymentStatus
      });

      res.status(200).json({
        success: true,
        message:
          'Transaksi berhasil diperbarui',
        data: transaction
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }

};

const deleteTransaction =
  async (req, res) => {

    try {

      const { id } = req.params;

      const transaction =
        await Transaction.findByPk(id);

      if (!transaction) {
        return res.status(404).json({
          success: false,
          message:
            'Transaksi tidak ditemukan'
        });
      }

      await transaction.destroy();

      res.status(200).json({
        success: true,
        message:
          'Transaksi berhasil dihapus'
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }

};

module.exports = {
  getTransactions,
  updateTransaction,
  deleteTransaction
};
