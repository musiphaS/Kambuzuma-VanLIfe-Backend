const mongoose = require('mongoose');

const PaymentModel = new mongoose.Schema({
 

    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookings',
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      paymentMethod: {
        type: String,
        enum: ['card', 'bank transfer'],
        required: true
      },
      paymentDate: {
        type: Date,
        required: true
      },
      status: {
        type: String,
        enum: ['paid', 'pending', 'failed'],
        default: 'paid'
      }
    });



module.exports = mongoose.model("payments" , PaymentModel);