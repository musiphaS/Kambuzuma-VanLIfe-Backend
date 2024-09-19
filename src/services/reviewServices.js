const Review = require('../models/ReviewModel');

const createReview = async (reviewData) => {
  const review = new Review(reviewData);
  await review.save();
  return review;
};

const getReviewsForHost = async (hostId) => {
  const reviews = await Review.find({ hostId });
  return reviews;
};

module.exports = {
  createReview,
  getReviewsForHost,
};
