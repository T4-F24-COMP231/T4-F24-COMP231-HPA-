const mongoose = require('mongoose');

const WearableDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  heartRate: {
    type: Number,
    required: true,
  },
  steps: {
    type: Number,
    required: true,
  },
  sleepHours: {
    type: Number,
    required: true,
  },
  syncedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('WearableData', WearableDataSchema);
