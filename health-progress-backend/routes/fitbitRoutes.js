const express = require('express');
const router = express.Router();
const FitbitController = require('../controllers/FitbitController');
const querystring = require('querystring');

// Redirect to Fitbit's authorization page
router.get('/auth', (req, res) => {
    const fitbitAuthURL = 'https://www.fitbit.com/oauth2/authorize';

    // Build the authorization URL
    const queryParams = querystring.stringify({
        response_type: 'code',
        client_id: process.env.FITBIT_CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URI,
        scope: 'heartrate oxygen_saturation activity profile',
        expires_in: 86400, // 1 day
    });

    res.redirect(`${fitbitAuthURL}?${queryParams}`);
});

// Route to handle Fitbit callback and exchange token
router.get('/callback', FitbitController.exchangeToken);

// Route to fetch heart rate data
router.get('/heart-rate', FitbitController.getHeartRateData);

// Route to fetch oxygen saturation data
router.get('/oxygen', FitbitController.getOxygenData);

module.exports = router;
