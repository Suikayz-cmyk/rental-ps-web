const {
  Customer,
  Booking,
  Room
} = require('../models');

const getCustomers =
  async (req, res) => {

    try {

      const customers =
        await Customer.findAll();

      res.status(200).json({
        success: true,
        data: customers
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

};

const createCustomer =
  async (req, res) => {

    try {

      const {
        name,
        phone
      } = req.body;

      const customer =
        await Customer.create({
          name,
          phone
        });

      res.status(201).json({
        success: true,
        message:
          'Customer berhasil ditambahkan',
        data: customer
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

};

const updateCustomer =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const {
        name,
        phone
      } = req.body;

      const customer =
        await Customer.findByPk(id);

      if (!customer) {
        return res.status(404).json({
          success: false,
          message:
            'Customer tidak ditemukan'
        });
      }

      await customer.update({
        name,
        phone
      });

      res.status(200).json({
        success: true,
        message:
          'Customer berhasil diperbarui',
        data: customer
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

};

const deleteCustomer =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const customer =
        await Customer.findByPk(id);

      if (!customer) {
        return res.status(404).json({
          success: false,
          message:
            'Customer tidak ditemukan'
        });
      }

      await customer.destroy();

      res.status(200).json({
        success: true,
        message:
          'Customer berhasil dihapus'
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

};
const customerLogin =
  async (req, res) => {

    try {

      const { phone } =
        req.body;

      const customer =
        await Customer.findOne({
          where: {
            phone
          }
        });

      if (!customer) {

        return res.status(404).json({
          success: false,
          message:
            'Customer tidak ditemukan'
        });

      }

      res.status(200).json({
        success: true,
        message:
          'Login berhasil',
        data: customer
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

};

const getCustomerBookings =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const bookings =
        await Booking.findAll({

          where: {
            customerId: id
          },

          include: [
            {
              model: Room
            }
          ],

          order: [
            ['createdAt', 'DESC']
          ]

        });

      res.status(200).json({
        success: true,
        data: bookings
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

};

const registerCustomer =
  async (req, res) => {

    try {

      const {
        name,
        phone
      } = req.body;

      const existingCustomer =
        await Customer.findOne({
          where: {
            phone
          }
        });

      if (existingCustomer) {

        return res.status(400).json({
          success: false,
          message:
            'Nomor HP sudah terdaftar'
        });

      }

      const customer =
        await Customer.create({
          name,
          phone
        });

      res.status(201).json({
        success: true,
        message:
          'Registrasi berhasil',
        data: customer
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

};

module.exports = {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  customerLogin,
  getCustomerBookings,
  registerCustomer
};