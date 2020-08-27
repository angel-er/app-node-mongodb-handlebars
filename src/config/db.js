require('dotenv').config();

const {DB_URI, PORT, SECRET_KEY} = process.env;

module.exports = {
  DB_URI,
  PORT,
  SECRET_KEY,
};
