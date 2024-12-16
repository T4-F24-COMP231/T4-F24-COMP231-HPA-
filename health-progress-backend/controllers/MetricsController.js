const axios = require('axios');

exports.getMetrics = async (req, res) => {
    try {
        const response = await axios.get(process.env.WEARABLE_API_URL, {
            headers: {
                Authorization: `Bearer ${process.env.WEARABLE_API_KEY}`,
            },
        });

        const { heartRate, oxygenSaturation } = response.data;

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
