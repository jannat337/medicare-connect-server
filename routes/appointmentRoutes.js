const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId', 'name email photo')
      .populate('doctorId', 'doctorName specialization');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get appointments by patient
router.get('/patient/:patientId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.params.patientId })
      .populate('doctorId', 'doctorName specialization consultationFee profileImage');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get appointments by doctor
router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.params.doctorId })
      .populate('patientId', 'name email photo');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create appointment
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    const newAppointment = await appointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update appointment status
router.patch('/:id/status', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { appointmentStatus: req.body.appointmentStatus },
      { new: true }
    );
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update appointment (reschedule)
router.put('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete appointment
router.delete('/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;