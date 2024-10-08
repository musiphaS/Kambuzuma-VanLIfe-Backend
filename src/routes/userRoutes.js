const express = require('express');
const router = express.Router();
const userService = require('../services/userServices');


// to allow our frontend app to make requests to the Api although they are on different domains

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept', 'Authorization');
  next();
});

app.options('/users', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'POST, GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.send();
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
  console.log('Received signup request with data:', JSON.stringify(req.body, null, 2));
  
  try {
    const userData = req.body;
    
    // Basic validation
    if (!userData.name || !userData.username || !userData.email || !userData.password) {
      console.log('Validation failed: Missing required fields');
      return res.status(400).json({ message: 'All fields (name, username, email, password) are required' });
    }
    
    console.log('Attempting to create user with service');
    const newUser = await userService.createUser(userData);
    
    console.log('User created successfully:', JSON.stringify(newUser, null, 2));
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error in user creation:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation Error', details: error.message });
    }
    
    if (error.code === 11000) {
      return res.status(409).json({ message: 'User with this email or username already exists' });
    }
    
    res.status(500).json({ message: 'Error creating new user', error: error.message });
  }
});

// POST: user login
router.post('/login', async (req, res) => {
  console.log('Received login request with data:', JSON.stringify(req.body, null, 2));
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log('Validation failed: Missing email or password');
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    console.log('Attempting to login user with service');
    const user = await userService.loginUser(email, password);
    console.log('User logged in successfully:', JSON.stringify(user, null, 2));
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error in user login:', error);
    if (error.message === 'Invalid credentials') {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (error.name === 'MongoError') {
      return res.status(500).json({ message: 'Database error', error: error.message });
    }
    res.status(500).json({ message: 'Error logging in', error: error.message });
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