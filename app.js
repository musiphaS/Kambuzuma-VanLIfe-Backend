const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes'); // Ensure this file exports a router
const vanRoutes = require('./src/routes/vanRoutes'); // Ensure this file exports a router
const bookingRoutes = require('./src/routes/bookingRoutes'); // Ensure this file exports a router
const paymentRoutes = require('./src/routes/paymentRoutes'); // Ensure this file exports a router
const reviewRoutes = require('./src/routes/reviewRoutes'); // Ensure this file exports a router
const errorMiddleware = require('./src/middlewares/errorMiddleware');
const cors = require('cors');

// Load environment variables
dotenv.config();
const app = express();

// Define allowed origins
const allowedOrigins = [
  'https://kambuzuma-vanlife-backend-production.up.railway.app',
  'http://localhost:3000',
  'http://localhost:3001',
  'https://kambuzuma-vanlife.netlify.app',
];

// CORS middleware
const corsOptions = {
  origin: (origin, callback) => {
    console.log(`CORS validation: Origin ${origin}`);
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.warn(`CORS error: Origin ${origin} not allowed`);
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Use CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Database connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Middleware to parse JSON requests
app.use(express.json());

// Define routes
app.use('/users', userRoutes);
app.use('/vans', vanRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/payments', paymentRoutes);
app.use('/reviews', reviewRoutes);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling middleware
app.use(errorMiddleware);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('HELLO WORLD!');
});

// Start the server
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

// Export the app for testing purposes
// 
module.exports = app;
