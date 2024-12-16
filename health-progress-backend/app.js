const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const appointmentRoutes = require('./routes/appointmentRoutes');

require('dotenv').config();

const app = express();


app.use(bodyParser.json());


connectDB();


app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 5032;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
