const express = require('express');

const router =
  express.Router();

const {
  createBooking,
  finishBooking,
  cancelBooking
} = require('../controllers/bookingController');

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