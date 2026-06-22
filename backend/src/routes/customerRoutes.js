const express =
  require('express');

const router =
  express.Router();

const {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  customerLogin,
  getCustomerBookings,
  registerCustomer
} = require('../controllers/customerController');

router.post(
  '/register',
  registerCustomer
);

router.post(
  '/login',
  customerLogin
);

router.get(
  '/:id/bookings',
  getCustomerBookings
);

router.get(
  '/',
  getCustomers
);

router.post(
  '/',
  createCustomer
);

router.put(
  '/:id',
  updateCustomer
);

router.delete(
  '/:id',
  deleteCustomer
);

module.exports = router;