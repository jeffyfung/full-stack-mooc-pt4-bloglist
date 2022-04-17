require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI
  .replace('<user>', process.env.DB_USER)
  .replace('<password>', encodeURIComponent(process.env.DB_PASSWORD));

module.exports = {
  MONGODB_URI,
  PORT
}