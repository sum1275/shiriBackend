
const express = require('express');
const multer = require('multer');
const uploadController = require('../controllers/uploadController');
const { signup, login, logout } = require("../controllers/authController");

const router = express.Router();
const upload = multer({ dest: 'uploads/' });


// Add the new upload endpoint
router.post('/monthly-data', upload.single('file'), uploadController.uploadFile);

// Error handling middleware for multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).send(err.message);
  }
  next(err);
});

module.exports = router;