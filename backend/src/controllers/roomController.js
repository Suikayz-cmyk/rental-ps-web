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

module.exports = {
  getAllRooms
};