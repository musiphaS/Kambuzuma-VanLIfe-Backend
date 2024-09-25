const Review = require('../models/ReviewModel');
const mongoose = require('mongoose');

const createReview = async (reviewData) => {
  // reviewData.van = new mongoose.Types.ObjectId(reviewData.van);
  reviewData.user = new mongoose.Types.ObjectId();
  reviewData.van = new mongoose.Types.ObjectId();
  const review = new Review(reviewData);
  await review.save();
  return review;
};

const getReviewsForHost = async (vanId) => {
  const reviews = await Review.find({ van: vanId });
  return reviews;
};

module.exports = {
  createReview,
  getReviewsForHost,
};


