const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/AppointmentController');

// Schedule an appointment
router.post('/', appointmentController.scheduleAppointment);

// Reschedule an appointment
router.put('/:id', appointmentController.rescheduleAppointment);

// Cancel an appointment
router.delete('/:id', appointmentController.cancelAppointment);

module.exports = router;
