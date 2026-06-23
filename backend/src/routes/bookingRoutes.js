const express = require('express');

const router =
  express.Router();

const verifyToken =
  require('../middleware/authMiddleware');

const {
  getAllBookings,
  createBooking,
  finishBooking,
  cancelBooking,
  approveBooking
} = require('../controllers/bookingController');

router.get(
  '/',
  getAllBookings
);

router.post(
  '/',
  createBooking
);

router.patch(
  '/:id/finish',
  finishBooking
);

router.patch(
  '/:id/cancel',
  cancelBooking
);

router.patch(
  '/:id/approve',
  verifyToken,
  approveBooking
);

module.exports = router;