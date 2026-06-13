const Room = require('./Room');
const Booking = require('./Booking');

Room.hasMany(Booking, {
  foreignKey: 'roomId'
});

Booking.belongsTo(Room, {
  foreignKey: 'roomId'
});

module.exports = {
  Room,
  Booking
};