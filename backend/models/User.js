const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  phoneNumber: String,
  password: String,
  otp: String,
  otpExpiresAt: Date,
});

module.exports = mongoose.model('User', UserSchema);
