const path = require('path');
const { Sequelize } = require('sequelize');

// Ensure .env is loaded reliably regardless of current working directory.
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// When deploying to platforms like Render, the database URL is provided via DATABASE_URL.
// Fall back to individual vars (DB_NAME, DB_USER, etc.) if DATABASE_URL is not set.
if (process.env.DATABASE_URL) {
  module.exports = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    },
  });
  return;
}

const requiredVars = ['DB_NAME', 'DB_USER', 'DB_PASS', 'DB_HOST', 'DB_PORT'];
const missing = requiredVars.filter((key) => !process.env[key]);
if (missing.length) {
  throw new Error(
    `Missing required environment variables: ${missing.join(', ')}. ` +
      'Ensure your .env file exists and is loaded (e.g. run from the backend folder).'
  );
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = sequelize;




