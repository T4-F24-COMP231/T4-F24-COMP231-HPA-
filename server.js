require('dotenv').config();
const express = require('express');
const healthRoutes = require('./routes/HealthRoutes');
const appointmentController = require('../controllers/AppointmentController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/health', healthRoutes); // Health-related routes
app.use('/api/appointments', appointmentRoutes); // Appointment-related routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
