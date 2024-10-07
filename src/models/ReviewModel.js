const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  van: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Van',
    required: false, // Make this optional for now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // Make this optional for now
  },
  name: { // Add this field to store the reviewer's name
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Review', reviewSchema);