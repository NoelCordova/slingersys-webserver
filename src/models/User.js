const { KEYS } = require('../services/utils');
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Schema options:
// collection: name of the collection
// versionKey: remove the _v propertie on the db
let UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  role: {
    type: String,
    required: true,
    default: KEYS.ROLE_USER
  }
}, { collection: KEYS.DB_USERS, versionKey: false });


module.exports = mongoose.model('User', UserSchema);