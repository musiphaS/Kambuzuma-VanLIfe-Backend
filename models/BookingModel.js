import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    van: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vans',
        required: true
      },

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },

      startDate: {
        type: Date,
        required: true
      },

      endDate: {
        type: Date,
        required: true
      },

      status: {
        type: String,
        enum: ['confirmed', 'cancelled'],
        default: 'pending'
      },

      hostVansIds: [{
        type: mongoose.Schema.ObjectId,
        ref: 'van',
        default: []
      }]
    
});

export default mongoose.model("User", bookingSchema);