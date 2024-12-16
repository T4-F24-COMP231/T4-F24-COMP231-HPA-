const express = require('express');
const router = express.Router();
const metricsController = require('../controllers/MetricsController');

router.get('/', metricsController.getMetrics);

module.exports = router;
