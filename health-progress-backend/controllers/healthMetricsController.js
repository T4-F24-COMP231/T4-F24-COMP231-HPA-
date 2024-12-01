// Import the HealthMetrics model
const HealthMetrics = require('../models/HealthMetrics');

// CREATE: Add new health metrics
const createHealthMetrics = async (data) => {
  try {
    const newHealthData = new HealthMetrics(data); // Create a new HealthMetrics instance
    const savedData = await newHealthData.save(); // Save the new data to the database
    console.log('Health data saved successfully:', savedData);
    return savedData; // Return saved data
  } catch (err) {
    console.error('Error saving health data:', err);
    throw err; // Throw error if saving fails
  }
};

// READ: Get health metrics by patient_id
const getHealthMetricsByPatientId = async (patientId) => {
  try {
    const data = await HealthMetrics.find({ patient_id: patientId }); // Find records by patient_id
    if (data.length === 0) {
      console.log('No data found for this patient.');
    } else {
      console.log('Health data retrieved:', data);
    }
    return data; // Return found data
  } catch (err) {
    console.error('Error fetching health data:', err);
    throw err; // Throw error if fetching fails
  }
};

// READ: Get health metrics by timestamp range
const getHealthMetricsByTimestampRange = async (startDate, endDate) => {
  try {
    const data = await HealthMetrics.find({
      timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) }
    }); // Find records within a timestamp range
    console.log('Health data retrieved by timestamp:', data);
    return data; // Return found data
  } catch (err) {
    console.error('Error fetching health data by timestamp:', err);
    throw err; // Throw error if fetching fails
  }
};

// UPDATE: Update health metrics by patient_id and timestamp
const updateHealthMetrics = async (patientId, timestamp, updatedData) => {
  try {
    const updatedRecord = await HealthMetrics.updateOne(
        { patient_id: patientId, timestamp: new Date(timestamp) }, // Find record by patient_id and timestamp
        { $set: updatedData } // Update the record with the new data
    );
    if (updatedRecord.nModified > 0) {
      console.log('Health data updated successfully:', updatedRecord);
    } else {
      console.log('No records updated, check the patient_id and timestamp.');
    }
    return updatedRecord; // Return update result
  } catch (err) {
    console.error('Error updating health data:', err);
    throw err; // Throw error if update fails
  }
};

// DELETE: Delete health metrics by patient_id and timestamp
const deleteHealthMetrics = async (patientId, timestamp) => {
  try {
    const deletedRecord = await HealthMetrics.deleteOne({
      patient_id: patientId,
      timestamp: new Date(timestamp) // Find record by patient_id and timestamp
    });
    if (deletedRecord.deletedCount > 0) {
      console.log('Health data deleted successfully');
    } else {
      console.log('No records found to delete.');
    }
    return deletedRecord; // Return deletion result
  } catch (err) {
    console.error('Error deleting health data:', err);
    throw err; // Throw error if deletion fails
  }
};

// DELETE: Delete all health metrics by patient_id
const deleteHealthMetricsByPatientId = async (patientId) => {
  try {
    const deletedRecords = await HealthMetrics.deleteMany({
      patient_id: patientId // Find all records for the patient_id
    });
    console.log(`${deletedRecords.deletedCount} health data records deleted.`);
    return deletedRecords; // Return deletion result
  } catch (err) {
    console.error('Error deleting health data by patient_id:', err);
    throw err; // Throw error if deletion fails
  }
};

// Export the CRUD functions for use in other parts of the application
module.exports = {
  createHealthMetrics,
  getHealthMetricsByPatientId,
  getHealthMetricsByTimestampRange,
  updateHealthMetrics,
  deleteHealthMetrics,
  deleteHealthMetricsByPatientId
};
