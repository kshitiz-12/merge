const express = require('express');
const router = express.Router();
const loyaltyController = require('../controllers/loyaltyController');
const { auth } = require('../middleware/auth');

router.get('/', auth, loyaltyController.getLoyaltyPoints);
router.post('/redeem', auth, loyaltyController.redeemPoints);

module.exports = router; 