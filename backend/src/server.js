require('dotenv').config();

const app = require('./app');
const sequelize = require('./config/database');

require('./models');

const PORT = process.env.PORT || 5000;

async function syncEnumColumns() {
  if (sequelize.getDialect() !== 'mysql') {
    return;
  }

  await sequelize.query(`
    ALTER TABLE \`Bookings\`
    MODIFY \`status\` ENUM('', 'pending', 'active', 'finished', 'cancelled', 'completed')
    NOT NULL DEFAULT 'pending'
  `);

  await sequelize.query(`
    UPDATE \`Bookings\`
    SET \`status\` = 'finished'
    WHERE \`status\` = 'completed'
  `);

  await sequelize.query(`
    UPDATE \`Bookings\`
    SET \`status\` = 'pending'
    WHERE \`status\` = ''
  `);

  await sequelize.query(`
    ALTER TABLE \`Bookings\`
    MODIFY \`status\` ENUM('pending', 'active', 'finished', 'cancelled')
    NOT NULL DEFAULT 'pending'
  `);

  await sequelize.query(`
    ALTER TABLE \`Transactions\`
    MODIFY \`paymentStatus\` ENUM('', 'pending', 'unpaid', 'paid', 'cancelled', 'success', 'failed')
    NOT NULL DEFAULT 'pending'
  `);

  await sequelize.query(`
    UPDATE \`Transactions\`
    SET \`paymentStatus\` = 'pending'
    WHERE \`paymentStatus\` IN ('', 'unpaid')
  `);

  await sequelize.query(`
    UPDATE \`Transactions\`
    SET \`paymentStatus\` = 'paid'
    WHERE \`paymentStatus\` = 'success'
  `);

  await sequelize.query(`
    UPDATE \`Transactions\`
    SET \`paymentStatus\` = 'cancelled'
    WHERE \`paymentStatus\` = 'failed'
  `);

  await sequelize.query(`
    ALTER TABLE \`Transactions\`
    MODIFY \`paymentStatus\` ENUM('pending', 'paid', 'cancelled')
    NOT NULL DEFAULT 'pending'
  `);
}

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database Connected');

    await sequelize.sync();
    await syncEnumColumns();
    console.log('Database Synced');

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });

  } catch (error) {
    console.error(error);
  }
}

startServer();
