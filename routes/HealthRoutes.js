const express = require('express');
const router = express.Router();
const healthController = require('../controllers/HealthController');

router.get('/', healthController.getHealthData);
router.post('/', healthController.createHealthData);

module.exports = router;
