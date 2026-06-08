const express = require('express');

const router =
  express.Router();

const {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom
} = require('../controllers/roomController');

router.get('/', getAllRooms);

router.post('/', createRoom);

router.get('/:id', getRoomById);

router.put('/:id', updateRoom);

router.delete('/:id', deleteRoom);

module.exports = router;