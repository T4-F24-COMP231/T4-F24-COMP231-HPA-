const mongoose = require('mongoose');

const HealthDataSchema = new mongoose.Schema({
  bloodPressure: {
    type: Number,
    required: true,
  },
  glucoseLevel: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const HealthData = mongoose.model('HealthData', HealthDataSchema);

module.exports = HealthData;
