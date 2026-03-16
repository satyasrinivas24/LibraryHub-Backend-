require('dotenv').config();
const { Client } = require('pg');
const pass = process.env.DB_PASS;
console.log('pass type:', typeof pass, 'value:', pass);
const client = new Client({ host: process.env.DB_HOST, port: process.env.DB_PORT, user: process.env.DB_USER, password: pass, database: process.env.DB_NAME });
client.connect().then(() => {
  console.log('connected');
  return client.end();
}).catch(err => {
  console.error('connect error', err.message);
  process.exit(1);
});
