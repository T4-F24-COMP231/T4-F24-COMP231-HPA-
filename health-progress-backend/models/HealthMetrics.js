// Import mongoose
const mongoose = require('mongoose');

// Define the HealthMetrics schema
const healthMetricsSchema = new mongoose.Schema({
    patient_id: { type: String, required: true }, // Unique identifier for the patient
    timestamp: { type: Date, required: true },    // Timestamp for the health data record
    heart_rate: { type: Number, required: true },  // Heart rate (beats per minute)
    steps: { type: Number, required: true },       // Number of steps taken
    sleep_duration: { type: Number, required: true }, // Sleep duration in hours
    sleep_quality: { type: String, enum: ['Good', 'Average', 'Poor'], required: true }, // Sleep quality (Good, Average, Poor)
    blood_pressure_systolic: { type: Number, required: true }, // Systolic blood pressure
    blood_pressure_diastolic: { type: Number, required: true }, // Diastolic blood pressure
    temperature: { type: Number, required: true }, // Body temperature (in Celsius)
    is_synced: { type: Boolean, default: false }   // Flag indicating if data is synced
});

// Create the HealthMetrics model
const HealthMetrics = mongoose.model('HealthMetrics', healthMetricsSchema);

// Export the model
module.exports = HealthMetrics;
