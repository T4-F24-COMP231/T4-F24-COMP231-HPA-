const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');

// Schedule an appointment
router.post('/appointments', async (req, res) => {
  const { userId, providerId, date, time } = req.body;

  try {
    // Check for double booking
    const existingAppointment = await Appointment.findOne({ providerId, date, time });
    if (existingAppointment) {
      return res.status(400).json({ error: 'This time slot is already booked.' });
    }

    const appointment = new Appointment({ userId, providerId, date, time });
    await appointment.save();
    res.status(201).json({ message: 'Appointment scheduled successfully!', appointment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to schedule appointment.' });
  }
});

// Reschedule an appointment
router.put('/appointments/:id', async (req, res) => {
  const { date, time } = req.body;

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { date, time },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found.' });
    }
    res.status(200).json({ message: 'Appointment rescheduled successfully!', appointment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reschedule appointment.' });
  }
});

// Cancel an appointment
router.delete('/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found.' });
    }
    res.status(200).json({ message: 'Appointment canceled successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel appointment.' });
  }
});
