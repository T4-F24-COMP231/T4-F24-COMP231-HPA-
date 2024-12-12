const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({

  name: { type: String, required: true },
  specialization: { type: String, required: true },
});

    name: { type: String, required: true },
    specialty: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
}, { timestamps: true });


module.exports = mongoose.model('Provider', ProviderSchema);
