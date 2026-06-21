const express = require('express');
const router = express.Router();

const {
createPublicBooking,
getPublicRooms
} = require('../controllers/publicBookingController');

router.post('/booking', createPublicBooking);
router.get('/rooms', getPublicRooms);
router.post('/booking', createPublicBooking);

module.exports = router;