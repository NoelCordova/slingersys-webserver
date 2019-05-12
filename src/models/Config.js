const mongoose = require('mongoose');
const { DB_COLLECTION_CONFIG } = require('../config');

const { Schema } = mongoose;

// Schema options:
// collection: name of the collection
// versionKey: remove the _v propertie on the db
const ConfigSchema = new Schema(
  {
    validSignupToken: {
      type: String,
    },
  },
  { collection: DB_COLLECTION_CONFIG, versionKey: false },
);

module.exports = mongoose.model('Config', ConfigSchema);
