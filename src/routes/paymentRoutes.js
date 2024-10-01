const express = require('express')
const router = express.Router();
const PaymentService = require("../services/paymentServices");


// // GET all available payments


router.post('/', async (req, res) => {
  try {
    const paymentData = req.body;
    const newPayment = await PaymentService.createPayment(paymentData);
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment', error: error.message });
  }
});








// GET: Fetch all payments
router.get('/', async (req, res) => {
  try {
    const payments = await PaymentService.getAllPayments();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments', error: error.message });
  }
});

// GET: Fetch a payment by ID
router.get('/:id', async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await PaymentService.getPayment(paymentId);
    if (payment) {
      res.status(200).json(payment);
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment', error: error.message });
  }
});

// PUT: Update a payment
router.put('/:id', async (req, res) => {
  try {
    const paymentId = req.params.id;
    const updateData = req.body;
    const updatedPayment = await PaymentService.updatePayment(paymentId, updateData);
    if (updatedPayment) {
      res.status(200).json(updatedPayment);
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating payment', error: error.message });
  }
});

// DELETE: Remove a payment
router.delete('/:id', async (req, res) => {
  try {
    const paymentId = req.params.id;
    const deletedPayment = await PaymentService.deletePayment(paymentId);
    if (deletedPayment) {
      res.status(200).json({ message: 'Payment deleted successfully' });
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting payment', error: error.message });
  }
});

module.exports = router;

