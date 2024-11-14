const HealthData = require('../models/HealthData');

// Add Health Data
exports.addHealthData = async (req, res) => {
  try {
    const newData = new HealthData(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Health Data
exports.getAllHealthData = async (req, res) => {
  try {
    const data = await HealthData.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
