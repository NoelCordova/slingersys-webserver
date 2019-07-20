/* eslint-disable no-console */

const mongoose = require('mongoose');

const { MONGO_URI, VALID_SIGNUP_TOKEN } = require('../config');
const Config = require('../models/config.model');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
};

async function initConfigCollection() {
  try {
    const configExists = await Config.findOne({}, { validSignupToken: 1 });

    if (configExists === null || configExists === undefined) {
      await Config.create({ validSignupToken: VALID_SIGNUP_TOKEN });
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

async function dbConnection() {
  try {
    await mongoose.connect(MONGO_URI, options);
    await initConfigCollection();
    console.log('DB Online');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}


module.exports = { dbConnection };
