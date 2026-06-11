const validateRoom = (req, res, next) => {

  const {
    name,
    psType,
    pricePerHour,
    status
  } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Nama ruangan wajib diisi'
    });
  }

  if (!['PS4', 'PS5'].includes(psType)) {
    return res.status(400).json({
      success: false,
      message: 'PS Type hanya boleh PS4 atau PS5'
    });
  }

  if (!pricePerHour || pricePerHour <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Harga per jam harus lebih dari 0'
    });
  }

  if (
    !['kosong', 'dipakai', 'maintenance']
      .includes(status)
  ) {
    return res.status(400).json({
      success: false,
      message:
        'Status hanya boleh kosong, dipakai, atau maintenance'
    });
  }

  next();
};

module.exports = validateRoom;