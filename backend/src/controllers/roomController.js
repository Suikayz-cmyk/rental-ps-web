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

    const room = await Room.create({
      name,
      psType,
      pricePerHour,
      status
    });

    res.status(201).json({
      success: true,
      message: 'Ruangan berhasil ditambahkan',
      data: room
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
  console.log(req.admin);
};

const getRoomById = async (req, res) => {
  try {

    const { id } = req.params;

    const room = await Room.findByPk(id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Ruangan tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Detail ruangan berhasil diambil',
      data: room
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const updateRoom = async (req, res) => {
  try {

    const { id } = req.params;

    const room = await Room.findByPk(id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Ruangan tidak ditemukan'
      });
    }

    const {
      name,
      psType,
      pricePerHour,
      status
    } = req.body;

    await room.update({
      name,
      psType,
      pricePerHour,
      status
    });

    res.status(200).json({
      success: true,
      message: 'Ruangan berhasil diperbarui',
      data: room
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const deleteRoom = async (req, res) => {
  try {

    const { id } = req.params;

    const room = await Room.findByPk(id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Ruangan tidak ditemukan'
      });
    }

    await room.destroy();

    res.status(200).json({
      success: true,
      message: 'Ruangan berhasil dihapus'
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
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom
};