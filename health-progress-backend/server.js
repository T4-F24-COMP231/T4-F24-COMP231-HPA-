const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const healthRoutes = require('./routes/HealthRoutes');
const wearableRoutes = require('./routes/wearablesRoutes')
const healthMetricsRouter = require('./routes/healthMetrics');
// const healthRoutes = require('./routes/healthRoutes');
const patientCrud = require('./routes/patientCrud');
const healthMetrics = require('./routes/healthMetrics.js');
// const {forTest} = require("./controllers/patientCrudController");

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Database connection failed:', err));

//curd and health_metrics
app.use('/apii/patient_crud', patientCrud);  //patient_crud api
app.use('/apii/health_metrics', healthMetrics);  //health_metrics api

// Routes
app.use('/health', healthRoutes);
app.use('/api', wearableRoutes);
app.use('/api', healthMetricsRouter);



// app.get('/test', forTest);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
