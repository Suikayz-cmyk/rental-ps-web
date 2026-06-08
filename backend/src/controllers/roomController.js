const Room = require('../models/Room');

const getAllRooms = async (req, res) => {
  try {

    const rooms =
      await Room.findAll();

    res.status(200).json({
      success: true,
      message:
        'Data ruangan berhasil diambil',
      data: rooms
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const createRoom = async (req, res) => {
  try {

    const {
      name,
      psType,
      pricePerHour,
      status
    } = req.body;

    const room =
      await Room.create({
        name,
        psType,
        pricePerHour,
        status
      });

    res.status(201).json({
      success: true,
      message:
        'Ruangan berhasil ditambahkan',
      data: room
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  getAllRooms,
  createRoom
};