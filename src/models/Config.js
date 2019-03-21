const mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Schema options:
// collection: name of the collection
// versionKey: remove the _v propertie on the db
let ConfigSchema = new Schema({
  validSignupToken: {
    type: String
  }
}, { collection: process.env.DB_CONFIG, versionKey: false });


module.exports = mongoose.model('Config', ConfigSchema);