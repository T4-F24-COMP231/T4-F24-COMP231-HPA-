const axios = require('axios');


exports.authorize = (req, res) => {
    const fitbitAuthURL = 'https://www.fitbit.com/oauth2/authorize';
    const queryParams = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.FITBIT_CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URI,
        scope: 'heartrate activity profile oxygen_saturation',
        expires_in: '86400', 
    });

    res.redirect(`${fitbitAuthURL}?${queryParams}`);
};

const axios = require('axios');

exports.exchangeToken = async (req, res) => {
    const { code } = req.query; 

    if (!code) {
        return res.status(400).json({ error: 'Authorization code is missing' });
    }

    try {
        const response = await axios.post('https://api.fitbit.com/oauth2/token', null, {
            params: {
                client_id: process.env.FITBIT_CLIENT_ID,
                client_secret: process.env.FITBIT_CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: process.env.REDIRECT_URI, 
                code,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const { access_token, refresh_token } = response.data;

      
        req.session.accessToken = access_token;
        req.session.refreshToken = refresh_token;

        res.status(200).json({ message: 'Tokens retrieved successfully', access_token, refresh_token });
    } catch (error) {
        console.error('Error exchanging token:', error.message);
        res.status(500).json({ error: 'Failed to retrieve tokens' });
    }
};


exports.getHeartRateData = async (req, res) => {
    const accessToken = req.session.accessToken;

    if (!accessToken) {
        return res.status(401).json({ error: 'Unauthorized: Access token is missing' });
    }

    try {
        const response = await axios.get(
            'https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        res.status(200).json({ message: 'Heart rate data retrieved successfully', data: response.data });
    } catch (error) {
        console.error('Error fetching heart rate data:', error.message);
        res.status(500).json({ error: 'Failed to fetch heart rate data' });
    }
};


exports.getOxygenData = async (req, res) => {
    const accessToken = req.session.accessToken;

    if (!accessToken) {
        return res.status(401).json({ error: 'Unauthorized: Access token is missing' });
    }

    try {
        const response = await axios.get(
            'https://api.fitbit.com/1/user/-/spo2.json',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        res.status(200).json({ message: 'Oxygen saturation data retrieved successfully', data: response.data });
    } catch (error) {
        console.error('Error fetching oxygen saturation data:', error.message);
        res.status(500).json({ error: 'Failed to fetch oxygen saturation data' });
    }
};
