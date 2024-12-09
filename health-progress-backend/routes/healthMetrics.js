// Import necessary modules
const express = require('express');
const router = express.Router();

// Import the health metrics controller (the functions handling CRUD operations)
const {
    createHealthMetrics,
    getHealthMetricsByPatientId,
    getHealthMetricsByTimestampRange,
    updateHealthMetrics,
    deleteHealthMetrics,
    deleteHealthMetricsByPatientId
} = require('../controllers/healthMetricsController');

// POST: Create new health metrics
router.post('/', async (req, res) => {
    try {
        const healthData = req.body; // Get data from request body
        const savedData = await createHealthMetrics(healthData); // Call controller function
        res.status(201).json(savedData); // Respond with the saved data
    } catch (err) {
        res.status(500).json({ message: 'Error saving health data', error: err });
    }
});

// GET: Get health metrics by patient_id
router.get('/:patient_id', async (req, res) => {
    try {
        const patientId = req.params.patient_id; // Get patient_id from the URL params
        const data = await getHealthMetricsByPatientId(patientId); // Call controller function
        if (data.length === 0) {
            return res.status(404).json({ message: 'No data found for this patient.' });
        }
        res.status(200).json(data); // Respond with the found data
    } catch (err) {
        res.status(500).json({ message: 'Error fetching health data', error: err });
    }
});

// GET: Get health metrics by timestamp range (startDate and endDate)
router.get('/timestamp_range', async (req, res) => {
    try {
        const { startDate, endDate } = req.query; // Get dates from query params
        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Start date and end date are required.' });
        }
        const data = await getHealthMetricsByTimestampRange(startDate, endDate); // Call controller function
        res.status(200).json(data); // Respond with the found data
    } catch (err) {
        res.status(500).json({ message: 'Error fetching health data by timestamp', error: err });
    }
});

// PUT: Update health metrics by patient_id and timestamp
router.put('/:patient_id/:timestamp', async (req, res) => {
    try {
        const patientId = req.params.patient_id; // Get patient_id from the URL params
        const timestamp = req.params.timestamp; // Get timestamp from the URL params
        const updatedData = req.body; // Get updated data from the request body
        const updatedRecord = await updateHealthMetrics(patientId, timestamp, updatedData); // Call controller function
        if (updatedRecord.nModified === 0) {
            return res.status(404).json({ message: 'No record updated. Check the patient_id and timestamp.' });
        }
        res.status(200).json(updatedRecord); // Respond with the updated data
    } catch (err) {
        res.status(500).json({ message: 'Error updating health data', error: err });
    }
});

// DELETE: Delete health metrics by patient_id and timestamp
router.delete('/:patient_id/:timestamp', async (req, res) => {
    try {
        const patientId = req.params.patient_id; // Get patient_id from the URL params
        const timestamp = req.params.timestamp; // Get timestamp from the URL params
        const deletedRecord = await deleteHealthMetrics(patientId, timestamp); // Call controller function
        if (deletedRecord.deletedCount === 0) {
            return res.status(404).json({ message: 'No record found to delete.' });
        }
        res.status(200).json({ message: 'Health data deleted successfully' }); // Respond with success message
    } catch (err) {
        res.status(500).json({ message: 'Error deleting health data', error: err });
    }
});

// DELETE: Delete all health metrics by patient_id
router.delete('/:patient_id', async (req, res) => {
    try {
        const patientId = req.params.patient_id; // Get patient_id from the URL params
        const deletedRecords = await deleteHealthMetricsByPatientId(patientId); // Call controller function
        res.status(200).json({ message: `${deletedRecords.deletedCount} health data records deleted.` }); // Respond with number of records deleted
    } catch (err) {
        res.status(500).json({ message: 'Error deleting health data by patient_id', error: err });
    }
});

// Export the router to be used in the main server file
module.exports = router;
