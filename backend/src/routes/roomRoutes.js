const express = require('express');

const router =
  express.Router();

const validateRoom =
  require('../middleware/roomValidation');

const {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom
} = require('../controllers/roomController');

router.get('/', getAllRooms);

router.get('/:id', getRoomById);

router.post(
  '/',
  validateRoom,
  createRoom
);

router.put(
  '/:id',
  validateRoom,
  updateRoom
);

router.delete('/:id', deleteRoom);

module.exports = router;