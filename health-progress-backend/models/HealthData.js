
const express = require('express');
const router = express.Router();
const HealthData = require('../models/HealthData');

router.get('/healthMetrics', async (req, res) => {
  try {
    const healthMetrics = await HealthData.find().sort({ date: -1 }); 
    res.status(200).json(healthMetrics);
  } catch (error) {
    console.error('Error fetching health data:', error);
    res.status(500).json({ error: 'Failed to fetch health metrics.' });
  }
});


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

   
    const newHealthData = new HealthData({
      bloodPressure,
      glucoseLevel,
    });

  
    await newHealthData.save();

    res.status(201).json({ message: 'Health data added successfully.', data: newHealthData });
  } catch (error) {
    console.error('Error adding health data:', error);
    res.status(500).json({ error: 'Failed to add health data.' });
  }
});

module.exports = router;
