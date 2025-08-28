const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  login
} = require('../controllers/authController');

// Public routes
router.post('/login', login);

module.exports = router;
