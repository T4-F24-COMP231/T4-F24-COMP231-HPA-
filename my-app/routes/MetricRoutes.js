const express = require('express');
const router = express.Router();
const metricsController = require('../controllers/MetricsController');

// Route to get real-time health metrics
router.get('/', metricsController.getMetrics);

module.exports = router;
