// const app = require('./app');
// const { sequelize } = require('./models');
// require('dotenv').config();

// const PORT = process.env.PORT || 5000;

// const start = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('✅ Database connected successfully.');

//     // Sync models (create tables if not exist)
//     await sequelize.sync({ alter: true });
//     console.log('✅ Database synced.');

//     app.listen(PORT, () => {
//       console.log(`🚀 LibraryHub server running on http://localhost:${PORT}`);
//     });
//   } catch (err) {
//     console.error('❌ Failed to start server:', err);
//     process.exit(1);
//   }
// };

// start();

// const app = require('./app');
// const { sequelize } = require('./models');
// require('dotenv').config();

// const PORT = process.env.PORT || 5000;

// const start = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('✅ Database connected successfully.');

//     await sequelize.sync({ alter: true });
//     console.log('✅ Database synced.');

//     // Only start server locally
//     if (process.env.VERCEL !== "1") {
//       app.listen(PORT, () => {
//         console.log(`🚀 LibraryHub server running on http://localhost:${PORT}`);
//       });
//     }

//   } catch (err) {
//     console.error('❌ Failed to start server:', err);
//     process.exit(1);
//   }
// };

// start();

// module.exports = app;


const app = require('./app');
const { sequelize } = require('./models');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Only run this locally
if (!process.env.VERCEL) {
  const start = async () => {
    try {
      await sequelize.authenticate();
      console.log('✅ Database connected successfully.');

      await sequelize.sync({ alter: true });
      console.log('✅ Database synced.');

      app.listen(PORT, () => {
        console.log(`🚀 LibraryHub server running on http://localhost:${PORT}`);
      });

    } catch (err) {
      console.error('❌ Failed to start server:', err);
    }
  };

  start();
}

module.exports = app;