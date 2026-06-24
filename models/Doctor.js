const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  specialization: {
    type: String,
    required: true
  },
  qualifications: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  consultationFee: {
    type: Number,
    required: true
  },
  hospitalName: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    default: ''
  },
  availableDays: {
    type: [String],
    default: []
  },
  availableSlots: {
    type: [String],
    default: []
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  }
});

module.exports = mongoose.model('Doctor', doctorSchema);