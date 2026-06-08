const express = require('express');

const router =
  express.Router();

const { getAllRooms, createRoom, getRoomById} = require('../controllers/roomController');

router.get(
  '/',
  getAllRooms
);

router.post(
  '/',
  createRoom
);

router.get(
  '/:id',
  getRoomById
);

module.exports = router;