const express = require('express');
const cors = require('cors');

const roomRoutes =
require('./routes/roomRoutes');

const bookingRoutes =
  require('./routes/bookingRoutes');

const transactionRoutes =
  require(
    './routes/transactionRoutes');

const dashboardRoutes =
  require(
    './routes/dashboardRoutes'
  );

const customerRoutes =
  require(
    './routes/customerRoutes'
  );

const authRoutes =
  require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  '/api/rooms',
  roomRoutes
);

app.use(
  '/api/bookings',
  bookingRoutes
);

app.use(
  '/api/transactions',
  transactionRoutes
);

app.use(
  '/api/dashboard',
  dashboardRoutes
);

app.use(
  '/api/auth',
  authRoutes
);

app.use(
  '/api/customers',
  customerRoutes
);

module.exports = app;