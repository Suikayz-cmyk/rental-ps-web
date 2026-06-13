const Room = require('./Room');
const Booking = require('./Booking');
const Transaction = require('./Transaction');

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

module.exports = {
  Room,
  Booking,
  Transaction
};