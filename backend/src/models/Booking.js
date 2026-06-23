const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Booking = sequelize.define('Booking', {

    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM(
            'active',
            'finished',
            'cancelled'
        ),
        defaultValue: 'active'
    },

    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

});

module.exports = Booking;