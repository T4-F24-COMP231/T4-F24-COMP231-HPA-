const express = require('express');
const router = express.Router();
const Device = require('../models/Device');
 
// Discover Devices
router.get('/discoverDevices', (req, res) => {
    const availableDevices = [
      { id: 'emulator-12345', name: 'Watch Emulator', compatible: true },
      { id: 'device-67890', name: "John's Watch", compatible: true },
      { id: 'unknown-device', name: 'Unknown Device', compatible: false },
    ];
    res.json({ devices: availableDevices });
  });
  
  router.post('/registerDevice', async (req, res) => {
    const { userId, deviceId, deviceName } = req.body;
  
    // Dummy compatibility check (use real logic as needed)
    const compatibleDevices = ['emulator-12345', 'device-67890'];
    if (!compatibleDevices.includes(deviceId)) {
      return res.status(400).json({ error: 'Device is incompatible.' });
    }
  
    try {
      const existingDevice = await Device.findOne({ deviceId });
      if (existingDevice) {
        return res.status(400).json({ error: 'Device is already registered.' });
      }
  
      const newDevice = new Device({ userId, deviceId, deviceName });
      await newDevice.save();
  
      res.status(201).json({ message: 'Device registered successfully!', device: newDevice });
    } catch (error) {
      console.error('Error registering device:', error);
      res.status(500).json({ error: 'Failed to register device.' });
    }
  });
 
// Get all registered devices
router.get('/registeredDevices', async (req, res) => {
  try {
    const devices = await Device.find(); // Fetch all registered devices
    res.status(200).json({ devices });
  } catch (error) {
    console.error('Error fetching registered devices:', error);
    res.status(500).json({ error: 'Failed to fetch registered devices.' });
  }
});
 
module.exports = router;

