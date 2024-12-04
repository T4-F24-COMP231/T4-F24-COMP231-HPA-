const axios = require('axios');

// Fetch real-time metrics from the wearable API
exports.getMetrics = async (req, res) => {
    try {
        // Make a request to the wearable API
        const response = await axios.get(process.env.WEARABLE_API_URL, {
            headers: {
                Authorization: `Bearer ${process.env.WEARABLE_API_KEY}`,
            },
        });

        // Extract the relevant data
        const { heartRate, oxygenSaturation } = response.data;

        // Return the data to the client
        res.status(200).json({
            message: 'Real-time health metrics retrieved successfully',
            data: {
                heartRate,
                oxygenSaturation,
            },
        });
    } catch (error) {
        console.error('Error fetching metrics:', error.message);
        res.status(500).json({ error: 'Failed to fetch health metrics' });
    }
};
