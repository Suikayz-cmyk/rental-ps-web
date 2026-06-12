const express = require('express');
const cors = require('cors');

const roomRoutes =
require('./routes/roomRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  '/api/rooms',
  roomRoutes
);

const authRoutes =
  require('./routes/authRoutes');

app.use(
  '/api/auth',
  authRoutes
);

module.exports = app;