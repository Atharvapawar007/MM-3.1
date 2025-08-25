const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  getBusDetails,
  getBusLocation,
  getETA,
  updateBusLocation
} = require('../controllers/busController');

// Protected routes
router.get('/details', authenticateToken, getBusDetails);
router.get('/location', authenticateToken, getBusLocation);
router.get('/eta', authenticateToken, getETA);

// Admin route (would need additional admin auth in production)
router.post('/update-location', updateBusLocation);

module.exports = router;
