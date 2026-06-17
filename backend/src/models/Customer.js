const { DataTypes } =
  require('sequelize');

const sequelize =
  require('../config/database');

const Customer =
  sequelize.define(
    'Customer',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }
  );

module.exports = Customer;