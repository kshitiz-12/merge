const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register); // now triggers OTP, not immediate signup
router.post('/verify-signup-otp', authController.verifySignupOtp); // new endpoint for OTP verification
router.post('/login', authController.login);

module.exports = router;
