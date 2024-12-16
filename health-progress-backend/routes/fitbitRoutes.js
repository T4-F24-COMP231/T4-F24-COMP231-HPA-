const express = require('express');
const router = express.Router();
const FitbitController = require('../controllers/FitbitController');
const querystring = require('querystring');

router.get('/auth', (req, res) => {
    const fitbitAuthURL = 'https://www.fitbit.com/oauth2/authorize';

    const queryParams = querystring.stringify({
        response_type: 'code',
        client_id: process.env.FITBIT_CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URI,
        scope: 'heartrate oxygen_saturation activity profile',
        expires_in: 86400, 
    });

    res.redirect(`${fitbitAuthURL}?${queryParams}`);
});

router.get('/callback', FitbitController.exchangeToken);

router.get('/heart-rate', FitbitController.getHeartRateData);

router.get('/oxygen', FitbitController.getOxygenData);

module.exports = router;
