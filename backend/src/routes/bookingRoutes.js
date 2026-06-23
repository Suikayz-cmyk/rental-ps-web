const express = require('express');

const router =
  express.Router();

const {
  getAllBookings,
  createBooking,
  finishBooking,
  cancelBooking
} = require(
  '../controllers/bookingController'
);

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

module.exports = router;