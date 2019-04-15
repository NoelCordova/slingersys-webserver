const mongoose = require("mongoose");
let Schema = mongoose.Schema;

// Schema options:
// collection: name of the collection
// versionKey: remove the _v propertie on the db
let UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    username: {
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
      default: process.env.ROLE_USER
    }
  },
  { collection: process.env.DB_USERS, versionKey: false }
);

module.exports = mongoose.model("User", UserSchema);
