const mongoose = require('mongoose');
const crypto = require('crypto');
var jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true
    },
    hash: String,
    salt: String
  });

// Password encryption
  UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  };

  UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
  };

  UserSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      username: this.username,
      exp: parseInt(expiry.getTime() / 1000),
    }, process.env.HASH_SECRET); // stored secret as env var
  };

  module.exports = mongoose.model('User', UserSchema);