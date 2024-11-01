const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');
const vanRoutes = require('./src/routes/vanRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const errorMiddleware = require('./src/middlewares/errorMiddleware');
const cors = require('cors');

const User = require('./src/models/UserModel');
const Booking = require('./src/models/BookingModel');
const Van = require('./src/models/VanModels');

// Define Mongoose models
mongoose.model('User', User.schema);
mongoose.model('Booking', Booking.schema);
mongoose.model('Van', Van.schema);

dotenv.config();
const app = express();



// Define allowed origins
const allowedOrigins = [
  'https://kambuzuma-vanlife-backend-production.up.railway.app', // Production backend URL
  'http://localhost:3000', // Local development for frontend
  'http://localhost:3001', // Local development for another frontend
  'https://kambuzuma-vanlife.netlify.app', // Production frontend URL
];

// CORS middleware
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Log and deny requests from disallowed origins
    console.warn(`CORS error: Origin ${origin} not allowed`);
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
};

// Use CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Pre-flight handling for all routes


// Database connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if unable to connect to the database
  });

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
module.exports = app;
