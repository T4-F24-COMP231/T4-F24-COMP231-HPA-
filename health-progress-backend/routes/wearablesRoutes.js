const express = require('express');
const router = express.Router();
const WearableData = require('../models/WearableData'); // Adjust path if necessary

router.post('/syncWearable', async (req, res) => {
  const { userId, heartRate, steps, sleepHours } = req.body;

  // Validate input
  if (!userId || !heartRate || !steps || !sleepHours) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Save wearable data to the database
    const wearableData = new WearableData({
      userId,
      heartRate,
      steps,
      sleepHours,
      syncedAt: new Date(),
    });

    await wearableData.save();
    res.status(200).json({ message: 'Wearable data synced successfully!' });
  } catch (error) {
    console.error('Error syncing wearable data:', error);
    res.status(500).json({ error: 'Failed to sync data.' });
  }
});

module.exports = router;
  