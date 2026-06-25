const express = require('express');
const router = express.Router();
const Prescription = require('../models/Prescription');

// Get all prescriptions
router.get('/', async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate('patientId', 'name email')
      .populate('doctorId', 'doctorName specialization')
      .populate('appointmentId');
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get prescription by appointment
router.get('/appointment/:appointmentId', async (req, res) => {
  try {
    const prescription = await Prescription.findOne({ 
      appointmentId: req.params.appointmentId 
    })
      .populate('patientId', 'name email')
      .populate('doctorId', 'doctorName specialization');
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get prescriptions by patient
router.get('/patient/:patientId', async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ 
      patientId: req.params.patientId 
    })
      .populate('doctorId', 'doctorName specialization');
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create prescription
router.post('/', async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    const newPrescription = await prescription.save();
    res.status(201).json(newPrescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update prescription
router.put('/:id', async (req, res) => {
  try {
    const updatedPrescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPrescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;