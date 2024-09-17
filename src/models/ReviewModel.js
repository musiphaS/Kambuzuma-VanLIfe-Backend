import mongoose from "mongoose";

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

export default mongoose.model("review", reviewSchema);