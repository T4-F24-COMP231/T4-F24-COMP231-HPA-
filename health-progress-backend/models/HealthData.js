const mongoose = require('mongoose');

const healthSchema = new mongoose.Schema({
  patientId: String,
  bloodPressure: String,
  glucoseLevel: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HealthData', healthSchema);
