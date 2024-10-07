const express = require('express');
const router = express.Router();
const userService = require('../services/userServices');


// to allow our frontend app to make requests to the Api although they are on different domains

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Allow-Control-Allow-Methods',' POST, GET, PUT, DELETE, PATCH')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all users', error: error.message });
  }
});

// POST new user
router.post('/', async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating new user', error: error.message });
  }
});

// GET user by ID
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

// PUT: update user details
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const update = req.body;
    const updatedUser = await userService.updateUser(userId, update);
    
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

// DELETE: delete user
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await userService.deleteUser(userId);
    
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

module.exports = router;