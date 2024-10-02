const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');
const vanRoutes = require('./src/routes/vanRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const errorMiddleware = require('./src/middlewares/errorMiddleware');

const User = require('./src/models/UserModel');
const Booking = require('./src/models/BookingModel');
const Van = require('./src/models/VanModels');

mongoose.model('User', User.schema);
mongoose.model('Booking', Booking.schema);
mongoose.model('Van', Van.schema);


dotenv.config();
const app = express();
// gb jb jasfbjgrbjrws

// Database connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
  app.use(express.json());

// Define routes
app.use('/users', userRoutes);
app.use('/vans', vanRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/payments', paymentRoutes);
app.use('/reviews', reviewRoutes);





// Error handling middleware
app.use(errorMiddleware);
app.get('/', (req, res) => { res.send('HELLO WORLD!'); });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;