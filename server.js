require('dotenv').config();
const express = require('express');
const healthRoutes = require('./routes/HealthRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/health', healthRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
