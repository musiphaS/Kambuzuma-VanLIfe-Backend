const Review = require('../models/ReviewModel');
const mongoose = require('mongoose');

const createReview = async (reviewData) => {
  if (reviewData.van) {
    reviewData.van = new mongoose.Types.ObjectId(reviewData.van);
  }
  if (reviewData.user) {
    reviewData.user = new mongoose.Types.ObjectId(reviewData.user);
  }
  const review = new Review(reviewData);
  await review.save();
  return review;
};

const getReviewsForHost = async (vanId) => {
  const reviews = await Review.find({ van: vanId });
  return reviews;
};

const getAllReviews = async () => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  return reviews;
};

module.exports = {
  createReview,
  getReviewsForHost,
  getAllReviews,
};