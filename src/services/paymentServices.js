// services/paymentService.js
const Payment = require('../models/PaymentModel');

const createPayment = async (paymentData) => {
  const payment = new Payment(paymentData);
  await payment.save();
  return payment;
};

const getPayment = async (paymentId) => {
  const payment = await Payment.findById(paymentId);
  return payment;
};

module.exports = {
  createPayment,
  getPayment,
};
