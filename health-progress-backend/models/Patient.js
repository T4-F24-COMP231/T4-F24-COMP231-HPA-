// 引入 mongoose
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    nationality: { type: String, required: true },
    disease: { type: String, required: true },
    severity: { type: String, enum: ['Mild', 'Moderate', 'Severe', 'Critical'], required: true }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
