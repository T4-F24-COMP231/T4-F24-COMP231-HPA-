const express = require('express');
const HealthData = require('../models/HealthData');
const router = express.Router();

// Get all health data
router.get('/', async (req, res) => {
  try {
    const data = await HealthData.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Add new health data
router.post('/', async (req, res) => {
  const { bloodPressure, glucoseLevel } = req.body;

  try {
    const newHealthData = new HealthData({
      bloodPressure,
      glucoseLevel,
    });

    const savedData = await newHealthData.save();
    res.json(savedData);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
