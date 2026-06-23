const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {

  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  paymentStatus: {
    type: DataTypes.ENUM(
      'paid',
      'unpaid'
    ),
    defaultValue: 'paid'
  }

});

module.exports = Transaction;