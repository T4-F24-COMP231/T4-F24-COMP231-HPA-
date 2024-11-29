require('dotenv').config(); // Load environment variables
const express = require('express');
const session = require('express-session');
const fitbitRoutes = require('./routes/fitbitRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

// Register Fitbit routes
app.use('/auth/fitbit', fitbitRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
