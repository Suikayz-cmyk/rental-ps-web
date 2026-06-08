require('dotenv').config();

const app = require('./app');
const sequelize = require('./config/database');

require('./models/Room');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database Connected');

    await sequelize.sync();
    console.log('Database Synced');

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });

  } catch (error) {
    console.error(error);
  }
}

startServer();