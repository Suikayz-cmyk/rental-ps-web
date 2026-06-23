const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {

  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  paymentStatus: {
    type: DataTypes.ENUM(
      'pending',
      'paid',
      'cancelled'
    ),
    defaultValue: 'pending'
  }

});

module.exports = Transaction;