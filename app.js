const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');
const vanRoutes = require('./src/routes/vanRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const errorMiddleware = require('./src/middlewares/errorMiddleware');

dotenv.config();
const app = express();

// Database connection
mongoose.connect(process.env.uri )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Define routes
app.use('/users', userRoutes);
app.use('/vans', vanRoutes);
app.use('/bookings', bookingRoutes);
app.use('/payments', paymentRoutes);
app.use('/reviews', reviewRoutes);





// Error handling middleware
app.use(errorMiddleware);
app.get('/', (req, res) => { res.send('Hello World!'); });
const PORT = process.env.PORT || 8003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;