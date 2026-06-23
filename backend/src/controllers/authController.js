const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const registerAdmin = async (
  req,
  res
) => {

  try {

    const {
      username,
      password
    } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message:
          'Username dan password wajib diisi'
      });
    }

    const existingAdmin =
      await Admin.findOne({
        where: {
          username
        }
      });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message:
          'Username sudah digunakan'
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const admin =
      await Admin.create({
        username,
        password: hashedPassword
      });

    res.status(201).json({
      success: true,
      message:
        'Admin berhasil didaftarkan',
      data: {
        id: admin.id,
        username: admin.username
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const loginAdmin = async (
  req,
  res
) => {

  try {

    const {
      username,
      password
    } = req.body;

    const admin =
      await Admin.findOne({
        where: {
          username
        }
      });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message:
          'Username atau password salah'
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message:
          'Username atau password salah'
      });
    }

    const token =
      jwt.sign(
        {
          id: admin.id,
          username: admin.username
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d'
        }
      );

    res.status(200).json({
      success: true,
      message: 'Login berhasil',
      token
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  registerAdmin,
  loginAdmin
};