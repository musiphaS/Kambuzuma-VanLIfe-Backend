const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
      rating: {
        type: Number,
        required: true
      },
      comment:   {
        type: String,
        required: true
      }
});


module.exports = mongoose.model("review", reviewSchema);