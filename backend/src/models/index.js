const Room = require('./Room');
const Booking = require('./Booking');
const Transaction = require('./Transaction');
const Customer = require('./Customer');

Room.hasMany(Booking, {
  foreignKey: 'roomId'
});

Booking.belongsTo(Room, {
  foreignKey: 'roomId'
});

Booking.hasOne(Transaction, {
  foreignKey: 'bookingId'
});

Transaction.belongsTo(Booking, {
  foreignKey: 'bookingId'
});

Customer.hasMany(Booking, {
  foreignKey: 'customerId'
});

Booking.belongsTo(Customer, {
  foreignKey: 'customerId'
});

module.exports = {
  Room,
  Booking,
  Transaction,
  Customer
};