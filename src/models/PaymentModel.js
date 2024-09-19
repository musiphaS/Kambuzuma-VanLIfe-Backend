
// models/PaymentModel.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentId: { 
    type: String, 
    unique: true, 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  paymentMethod: { 
    type: String, 
    enum: ['credit card', 'paypal', 'bank transfer'], 
    required: true 
  },
  currency: { 
    type: String, 
    enum: ['USD', 'EUR', 'GBP'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'successful', 'failed'], 
    default: 'pending' 
  },
  paymentDate: { 
    type: Date, 
    default: Date.now 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, 
{ 
  timestamps: true 
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;