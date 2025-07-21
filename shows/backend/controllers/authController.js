const User = require('../models/User');
const PendingSignup = require('../models/PendingSignup');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Helper: Generate 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Helper: Send OTP via email
async function sendEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Signup OTP Code',
    text: `Your OTP code is: ${otp}`,
  });
}

// Register (Step 1: Send OTP)
exports.register = async (req, res) => {
  try {
    const { name, username, email, phone, password } = req.body;
    // Check if user or pending signup already exists
    if (await User.findOne({ $or: [{ email }, { username }, { phone }] })) {
      return res.status(400).json({ error: 'User already exists' });
    }
    if (await PendingSignup.findOne({ $or: [{ email }, { username }, { phone }] })) {
      return res.status(400).json({ error: 'Signup already pending for this user' });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    const hashed = await bcrypt.hash(password, 10);

    const pending = new PendingSignup({
      name,
      username,
      email,
      phone,
      password: hashed,
      otp,
      otpExpires,
    });
    await pending.save();

    await sendEmail(email, otp);

    res.json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

// Verify Signup OTP (Step 2: Complete Registration)
exports.verifySignupOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const pending = await PendingSignup.findOne({ email });
    if (!pending) return res.status(404).json({ error: 'No pending signup found' });
    if (pending.otp !== otp) return res.status(400).json({ error: 'Invalid OTP' });
    if (pending.otpExpires < new Date()) return res.status(400).json({ error: 'OTP expired' });

    // Create user
    const user = new User({
      name: pending.name,
      username: pending.username,
      email: pending.email,
      phone: pending.phone,
      password: pending.password,
      isAdmin: false,
    });
    await user.save();
    await PendingSignup.deleteOne({ _id: pending._id });

    res.json({ message: 'Signup successful! You can now log in.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
};

// Login (email or username)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Try to find user by email OR username
    const user = await User.findOne({
      $or: [{ email }, { username: email }]
    });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token, user: { name: user.name, email: user.email, isAdmin: user.isAdmin } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update user profile (name, phone)
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { name, phone },
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ name: user.name, phone: user.phone, email: user.email });
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).json({ error: 'Old password incorrect' });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ name: user.name, phone: user.phone, email: user.email });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
