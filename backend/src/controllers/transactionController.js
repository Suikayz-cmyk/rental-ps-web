const {
  Transaction,
  Booking,
  Room
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

module.exports = {
  getTransactions
};