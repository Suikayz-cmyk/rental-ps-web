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

const authMiddleware =
  require('../middleware/authMiddleware');

router.get('/', getAllRooms);

router.get('/:id', getRoomById);

router.post(
  '/',
  authMiddleware,
  validateRoom,
  createRoom
);

router.delete(
  '/:id',
  authMiddleware,
  deleteRoom
);

router.put(
  '/:id',
  validateRoom,
  updateRoom
);

router.delete('/:id', deleteRoom);

module.exports = router;