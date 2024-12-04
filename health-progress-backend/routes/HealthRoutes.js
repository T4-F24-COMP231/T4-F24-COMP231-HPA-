const express = require('express');
const router = express.Router();
const healthController = require('../controllers/HealthController');

// Get all health data
router.get('/', healthController.getHealthData);

// Add health data
router.post('/', healthController.createHealthData);

module.exports = router;
