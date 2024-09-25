const express = require('express');
const router = express.Router();
const reviewService = require('../services/reviewServices');  // Adjust the path as needed

// POST route to create a new review
router.post('/', async (req, res) => {
  try {
    const reviewData = req.body;
    const newReview = await reviewService.createReview(reviewData);
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Error creating review', error: error.message });
  }
});

// GET route to retrieve reviews for a specific van
router.get('/:vanId', async (req, res) => {
  try {
    const vanId = req.params.vanId;
    const reviews = await reviewService.getReviewsForHost(vanId);
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error retrieving reviews:', error);
    res.status(500).json({ message: 'Error retrieving reviews', error: error.message });
  }
});

module.exports = router;