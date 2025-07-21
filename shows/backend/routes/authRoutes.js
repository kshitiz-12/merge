const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { auth } = require('../middleware/auth');

router.post('/register', authController.register); // now triggers OTP, not immediate signup
router.post('/verify-signup-otp', authController.verifySignupOtp); // new endpoint for OTP verification
router.post('/login', authController.login);
router.put('/profile', auth, authController.updateProfile);
router.put('/change-password', auth, authController.changePassword);
router.get('/profile', auth, authController.getProfile);

module.exports = router;
