const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('patientId', 'name email')
      .populate('doctorId', 'doctorName specialization')
      .populate('appointmentId');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get payments by patient
router.get('/patient/:patientId', async (req, res) => {
  try {
    const payments = await Payment.find({ patientId: req.params.patientId })
      .populate('doctorId', 'doctorName specialization')
      .populate('appointmentId');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create payment
router.post('/', async (req, res) => {
  try {
    const payment = new Payment(req.body);
    const newPayment = await payment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create payment intent (Stripe)
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd'
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;