const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Room = sequelize.define('Room', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  psType: {
    type: DataTypes.ENUM('PS4', 'PS5'),
    allowNull: false
  },

  pricePerHour: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  status: {
    type: DataTypes.ENUM(
      'kosong',
      'dipakai',
      'maintenance'
    ),
    defaultValue: 'kosong'
  }
});

module.exports = Room;