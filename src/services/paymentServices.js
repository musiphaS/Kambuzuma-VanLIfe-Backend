


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

const getAllPayments = async () => {
  const payments = await Payment.find();
  return payments;
};

const updatePayment = async (paymentId, updateData) => {
  const updatedPayment = await Payment.findByIdAndUpdate(paymentId, updateData, { new: true });
  return updatedPayment;
};

const deletePayment = async (paymentId) => {
  const deletedPayment = await Payment.findByIdAndDelete(paymentId);
  return deletedPayment;
};

module.exports = {
  createPayment,
  getPayment,
  getAllPayments,
  updatePayment,
  deletePayment,
};

