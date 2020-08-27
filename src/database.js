const mongoose = require('mongoose');
const {DB_URI} = require('./config/db');

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((db) => {
    console.log('MongoDB is connected...');
  })
  .catch((err) => {
    console.log('ERROR: MongoDB is not connected...');
  });
