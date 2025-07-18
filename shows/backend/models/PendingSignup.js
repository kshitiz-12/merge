const mongoose = require('mongoose');

const pendingSignupSchema = new mongoose.Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: String,
  otp: String,
  otpExpires: Date,
});

module.exports = mongoose.model('PendingSignup', pendingSignupSchema);
