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

const authRoutes =
  require('./routes/authRoutes');

app.use(
  '/api/auth',
  authRoutes
);

module.exports = app;