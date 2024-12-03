const Appointment = require('../models/Appointment');

// Schedule an appointment
exports.scheduleAppointment = async (req, res) => {
    try {
        const { patientId, providerId, appointmentDate } = req.body;

        if (!patientId || !providerId || !appointmentDate) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newAppointment = new Appointment({ patientId, providerId, appointmentDate });
        await newAppointment.save();

        res.status(201).json({ message: 'Appointment scheduled successfully', data: newAppointment });
    } catch (error) {
        res.status(500).json({ error: 'Error scheduling appointment', details: error.message });
    }
};

// Reschedule an appointment
exports.rescheduleAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { appointmentDate } = req.body;

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            { appointmentDate, status: 'rescheduled' },
            { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment rescheduled successfully', data: updatedAppointment });
    } catch (error) {
        res.status(500).json({ error: 'Error rescheduling appointment', details: error.message });
    }
};

// Cancel an appointment
exports.cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const canceledAppointment = await Appointment.findByIdAndUpdate(
            id,
            { status: 'canceled' },
            { new: true }
        );

        if (!canceledAppointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment canceled successfully', data: canceledAppointment });
    } catch (error) {
        res.status(500).json({ error: 'Error canceling appointment', details: error.message });
    }
};
