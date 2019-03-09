const mongoose = require('mongoose');
let Schema = mongoose.Schema;

// This is added bc a warnig:
// DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true);

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
    required: true
  }
}, { collection: 'users', versionKey: false });


module.exports = mongoose.model('User', UserSchema);