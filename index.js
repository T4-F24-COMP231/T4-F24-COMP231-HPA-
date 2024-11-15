require('dotenv').config();  // Load environment variables at the top

const express = require('express');
const session = require('express-session');
const axios = require('axios');

const app = express();

// Debug: Check if SESSION_SECRET is loaded
console.log("Session Secret:", process.env.SESSION_SECRET);  // Should log your session secret to the console

app.use(session({
  secret: process.env.SESSION_SECRET,  // Ensure this is correctly set
  resave: false,
  saveUninitialized: true
}));

// Root route to provide a link for initiating Fitbit OAuth
app.get('/', (req, res) => {
  res.send('Welcome! Go to <a href="/auth/fitbit">/auth/fitbit</a> to start the Fitbit authentication process.');
});

// Route to initiate Fitbit OAuth
app.get('/auth/fitbit', (req, res) => {
  const authUrl = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${process.env.FITBIT_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&scope=activity%20heartrate`;
  res.redirect(authUrl);
});

// Callback route to handle Fitbit's response
app.get('/auth/fitbit/callback', async (req, res) => {
  const code = req.query.code;

  try {
    // Create the Basic Auth header by encoding client_id and client_secret using Buffer
    const authHeader = 'Basic ' + Buffer.from(`${process.env.FITBIT_CLIENT_ID}:${process.env.FITBIT_CLIENT_SECRET}`).toString('base64');

    const response = await axios.post(
      'https://api.fitbit.com/oauth2/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        redirect_uri: process.env.REDIRECT_URI,
        code: code,
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': authHeader
        }
      }
    );

    // Store access token in the session
    req.session.token = response.data.access_token;
    res.send('Authentication successful! You can now fetch Fitbit data.');
  } catch (error) {
    console.error('Error fetching access token:', error.response ? error.response.data : error.message);
    res.status(500).send('Authentication failed.');
  }
});

// Route to fetch data from Fitbit
app.get('/data/fitbit', async (req, res) => {
  if (!req.session.token) {
    return res.status(401).send('Not authenticated');
  }

  try {
    const response = await axios.get('https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json', {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Fitbit data:', error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});