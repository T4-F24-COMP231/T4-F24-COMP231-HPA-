const express = require('express');
const router = express.Router();
const { addHealthData, getAllHealthData } = require('../controllers/healthController');

router.post('/add', addHealthData);
router.get('/all', getAllHealthData);

module.exports = router;
