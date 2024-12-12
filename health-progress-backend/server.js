const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS
const healthRoutes = require('./routes/HealthRoutes');
const wearableRoutes = require('./routes/wearablesRoutes');
const healthMetricsRouter = require('./routes/healthMetrics');
const deviceRoutes = require('./routes/deviceRoutes');
const issueRoutes = require('./routes/issueRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
// const providerRoutes = require('./routes/providerRoutes');
const messageRoutes = require('./routes/messagingRoutes');

dotenv.config();

const app = express();

// Enable CORS
app.use(
  cors({
    origin: ['http://10.0.2.2', 'http://localhost'], // Allow emulator and localhost
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  })
);

// Middleware for parsing JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Database connection failed:', err));

// Routes
app.use('/health', healthRoutes);
app.use('/api/wearables', wearableRoutes);
app.use('/api/metrics', healthMetricsRouter);
app.use('/api/devices', deviceRoutes);
app.use('/api/issues', issueRoutes);
// app.use('/api', appointmentRoutes);
// app.use('/api', providerRoutes);
// app.use('/api', messageRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
