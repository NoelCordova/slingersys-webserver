const mongoose = require('mongoose');
const { DB_URI } = require('../config');

module.exports =  mongoose.connect(
  DB_URI,
  { useNewUrlParser: true, useCreateIndex: true },
  (error) => error === null ? console.log('Database connectet!') : console.error(error)
);