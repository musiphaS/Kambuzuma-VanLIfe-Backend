const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('User list');
});

router.post('/create', (req, res) => {
  // Create user logic
  res.send('User created');
});

router.get('/:id', (req, res) => {
  // Get user by ID logic
  res.send(`User ${req.params.id}`);
});

router.put('/:id', (req, res) => {
  // Update user logic
  res.send(`User ${req.params.id} updated`);
});

router.delete('/:id', (req, res) => {
  // Delete user logic
  res.send(`User ${req.params.id} deleted`);
});

module.exports = router;