const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('patientId', 'name photo')
      .populate('doctorId', 'doctorName');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get reviews by doctor
router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const reviews = await Review.find({ doctorId: req.params.doctorId })
      .populate('patientId', 'name photo');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get reviews by patient
router.get('/patient/:patientId', async (req, res) => {
  try {
    const reviews = await Review.find({ patientId: req.params.patientId })
      .populate('doctorId', 'doctorName specialization');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create review
router.post('/', async (req, res) => {
  try {
    const review = new Review(req.body);
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update review
router.put('/:id', async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete review
router.delete('/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;