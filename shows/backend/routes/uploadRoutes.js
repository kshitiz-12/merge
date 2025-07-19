const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const uploadController = require('../controllers/uploadcontroller');
const { adminAuth } = require('../middleware/auth');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage });

// POST /api/upload (admin only)
router.post('/', adminAuth, upload.single('image'), uploadController.uploadImage);

module.exports = router;
