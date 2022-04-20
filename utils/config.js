require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
    .replace('<user>', process.env.DB_USER)
    .replace('<password>', encodeURIComponent(process.env.DB_PASSWORD))
  : process.env.MONGODB_URI
    .replace('<user>', process.env.DB_USER)
    .replace('<password>', encodeURIComponent(process.env.DB_PASSWORD));

module.exports = {
  MONGODB_URI,
  PORT
};