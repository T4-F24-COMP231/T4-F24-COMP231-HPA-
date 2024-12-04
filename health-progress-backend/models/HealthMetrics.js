const mongoose = require('mongoose');

const HealthMetricsSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    heartRate: { type: Object, required: false },
    oxygenSaturation: { type: Object, required: false },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('HealthMetrics', HealthMetricsSchema);
