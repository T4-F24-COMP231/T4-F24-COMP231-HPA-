const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    patientId: { type: String, required: true },
    providerId: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    status: { type: String, enum: ['scheduled', 'rescheduled', 'canceled'], default: 'scheduled' },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
