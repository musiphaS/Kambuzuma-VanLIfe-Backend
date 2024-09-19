// services/bookingService.js
const Booking = require('../models/BookingModel'); // Model for Booking
const createBooking = async (userId, hostId, vanId, startDate, endDate) => {
const pendingApproval = true;
const isApproved = false;
// Logic for creating a booking
const booking = new Booking({
        userId,
        hostId,
        vanId,
        startDate,
        endDate,
        pendingApproval,
        isApproved,
});
    await booking.save();
    return booking;
};

const updateBooking = async (bookingId, update) => {
    const booking = await Booking.findByIdAndUpdate(bookingId, updates, { new: true});
    return booking;
}

const getBookingsForUser = async (userId) => {
    const booking = await Booking.findByIdAndUpdate(bookingId, updates, { new: true });
    return booking;
}

const getBookingsForHost = async (userId) => {
    const bookings = await Booking.find({ userId })
    return bookings
}

const deleteBooking = async (bookingId) => {
    await Booking.findByIdAndDelete(bookingId);
};

module.exports = {
    createBooking,
    updateBooking,
    getBookingsForUser,
    getBookingsForHost,
    deleteBooking,
};
