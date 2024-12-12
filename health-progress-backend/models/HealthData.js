
const express = require('express');
const router = express.Router();
const HealthData = require('../models/HealthData');

// GET: Fetch all health data
router.get('/healthMetrics', async (req, res) => {
  try {
    // Fetch health data from the database
    const healthMetrics = await HealthData.find().sort({ date: -1 }); // Sort by date (latest first)
    res.status(200).json(healthMetrics);
  } catch (error) {
    console.error('Error fetching health data:', error);
    res.status(500).json({ error: 'Failed to fetch health metrics.' });
  }
});

// POST: Add new health data
router.post('/healthMetrics', async (req, res) => {
  try {
    const { bloodPressure, glucoseLevel } = req.body;


class HealthData {
    constructor(userId, date, healthMetric, value) {
        this.userId = userId;
        this.date = date;
        this.healthMetric = healthMetric;
        this.value = value;
    }
}


    if (!bloodPressure || !glucoseLevel) {
      return res.status(400).json({ error: 'Blood Pressure and Glucose Level are required.' });
    }

    // Create a new health data entry
    const newHealthData = new HealthData({
      bloodPressure,
      glucoseLevel,
    });

    // Save to the database
    await newHealthData.save();

    res.status(201).json({ message: 'Health data added successfully.', data: newHealthData });
  } catch (error) {
    console.error('Error adding health data:', error);
    res.status(500).json({ error: 'Failed to add health data.' });
  }
});

module.exports = router;
