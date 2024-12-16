const HealthData = require('../models/HealthData');

const healthDataStore = [];

exports.getHealthData = (req, res) => {
    res.status(200).json({ message: 'Health data retrieved successfully', data: healthDataStore });
};

exports.createHealthData = (req, res) => {
    const { userId, date, healthMetric, value } = req.body;

    if (!userId || !date || !healthMetric || value === undefined) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newHealthData = new HealthData(userId, date, healthMetric, value);
    healthDataStore.push(newHealthData);

    res.status(201).json({ message: 'Health data created successfully', data: newHealthData });
};
