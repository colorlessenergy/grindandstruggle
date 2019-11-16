const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  token: {
    type: String
  }
});

UserSchema.pre('save', function (next) {
  let user = this;

  if (!user.email) {
    return next(new Error('Missing Email'));
  }

  if (!user.username) {
    return next(new Error('Missing Username'));
  }

  if (!user.password) {
    return next(new Error('Missing Password'));
  }

  // check if the password is already hash
  // don't hash it

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.hash(user.password, 10)
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(err => {
      next(new Error('server error'));
    })
});

const User = mongoose.model('User', UserSchema);

module.exports = User;