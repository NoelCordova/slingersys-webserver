const mongoose = require("mongoose");
const { MONGO_URI } = require("../config");
const options = {
  useNewUrlParser: true,
  useCreateIndex: true
};

module.exports = mongoose.connect(MONGO_URI, options);
