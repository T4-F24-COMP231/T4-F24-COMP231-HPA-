const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
});

module.exports = mongoose.model('Provider', ProviderSchema);
