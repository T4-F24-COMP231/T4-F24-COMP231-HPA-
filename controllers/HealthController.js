const HealthData = require('../models/HealthData');

exports.getHealthData = (req, res) => {
    // Example response
    res.json({ message: 'Fetching health data' });
};

exports.createHealthData = (req, res) => {
    const { userId, date, healthMetric, value } = req.body;
    const newHealthData = new HealthData(userId, date, healthMetric, value);
    // Process to save or manipulate data 
    res.json({ message: 'Health data created', data: newHealthData });
};
