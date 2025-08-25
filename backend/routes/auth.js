const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  login,
  sendOTP,
  verifyOTP,
  resetPassword,
  changePassword
} = require('../controllers/authController');

// Public routes
router.post('/login', login);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);

// Protected routes
router.post('/change-password', authenticateToken, changePassword);

module.exports = router;
