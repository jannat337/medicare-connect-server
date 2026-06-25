const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const { search, specialization, sortBy } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { doctorName: { $regex: search, $options: 'i' } },
        { specialization: { $regex: search, $options: 'i' } }
      ];
    }

    if (specialization) {
      query.specialization = { $regex: specialization, $options: 'i' };
    }

    let sortOption = {};
    if (sortBy === 'fee') sortOption = { consultationFee: 1 };
    else if (sortBy === 'experience') sortOption = { experience: -1 };

    const doctors = await Doctor.find(query).sort(sortOption);
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single doctor
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create doctor
router.post('/', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    const newDoctor = await doctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update doctor
router.put('/:id', async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify doctor (admin)
router.patch('/:id/verify', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { verificationStatus: req.body.verificationStatus },
      { new: true }
    );
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;