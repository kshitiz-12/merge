const path = require('path');

exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Return the relative path to the uploaded file
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
};
