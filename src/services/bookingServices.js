const Booking = require('../models/BookingModel');

const bookingService = {
  // Create a new booking
  createBooking: async (data) => {
    try {
      const booking = new Booking(data);
      return await booking.save();
    } catch (error) {
      throw error;
    }
  },

  // Get all bookings
  getAllBookings: async () => {
    try {
      return await Booking.find().populate('userId hostId vanId');
    } catch (error) {
      throw error;
    }
  },

  // Get booking by ID
  getBookingById: async (id) => {
    try {
      return await Booking.findById(id).populate('userId hostId vanId');
    } catch (error) {
      throw error;
    }
  },

  // Update booking by ID
  updateBooking: async (id, data) => {
    try {
      return await Booking.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw error;
    }
  },

  // Delete booking by ID
  deleteBooking: async (id) => {
    try {
      return await Booking.findByIdAndRemove(id);
    } catch (error) {
      throw error;
    }
  },

  // Get bookings by user ID
  getBookingsByUser: async (userId) => {
    try {
      return await Booking.find({ userId }).populate('hostId vanId');
    } catch (error) {
      throw error;
    }
  },

  // Get bookings by host ID
  getBookingsByHost: async (hostId) => {
    try {
      return await Booking.find({ hostId }).populate('userId vanId');
    } catch (error) {
      throw error;
    }
  },
};

module.exports = bookingService;