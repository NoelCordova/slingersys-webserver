const mongoose = require('mongoose');
const { ROLE_USER, DB_COLLECTION_USERS } = require('../config');

const { Schema } = mongoose;

// Schema options:
// collection: name of the collection
// versionKey: remove the _v propertie on the db
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    role: {
      type: String,
      required: true,
      default: ROLE_USER,
    },
  },
  { collection: DB_COLLECTION_USERS, versionKey: false },
);

module.exports = mongoose.model('User', UserSchema);
