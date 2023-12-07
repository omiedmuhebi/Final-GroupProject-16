let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    default: "",
    trim: true,
    required: 'Display name is required'
  },
  created: {
    type: Date,
    default: Date.now
  },
  update: {
    type: Date,
    default: Date.now
  }
}, {
  collection: "users"
});

// configure options for user model
let options = {
  missingPasswordError: 'Wrong/missing password'
};
userSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('User', userSchema);
