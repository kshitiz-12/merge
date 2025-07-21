const express = require('express');
const router = express.Router();
const favouriteController = require('../controllers/favouriteController');
const { auth } = require('../middleware/auth');

router.get('/', auth, favouriteController.getFavourites);
router.post('/add', auth, favouriteController.addFavourite);
router.post('/remove', auth, favouriteController.removeFavourite);

module.exports = router; 