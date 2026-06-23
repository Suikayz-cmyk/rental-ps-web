const { Customer } =
  require('../models');

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

module.exports = {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer
};