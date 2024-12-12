const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Schedule an appointment
router.post('/', async (req, res) => {
  try {
    const { patient, provider, appointmentDate } = req.body;
    if (new Date(appointmentDate) <= new Date()) {
      return res.status(400).json({ message: 'Appointment date must be in the future.' });
    }
    const appointment = await Appointment.create({ patient, provider, appointmentDate });
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reschedule an appointment
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { appointmentDate } = req.body;

    if (new Date(appointmentDate) <= new Date()) {
      return res.status(400).json({ message: 'Appointment date must be in the future.' });
    }

    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found.' });

    appointment.appointmentDate = appointmentDate;
    appointment.status = 'Rescheduled';
    await appointment.save();

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Cancel an appointment
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found.' });

    appointment.status = 'Canceled';
    await appointment.save();

    res.json({ message: 'Appointment canceled.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
