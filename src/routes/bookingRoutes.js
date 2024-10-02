const express = require('express');
const router = express.Router();
const bookingService = require('../services/bookingServices');

router.post('/', async (req, res) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).send(booking);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.send(bookings);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);
    res.send(booking);
  } catch (error) {
    res.status(404).send({ message: 'Booking not found' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedBooking = await bookingService.updateBooking(req.params.id, req.body);
    res.send(updatedBooking);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await bookingService.deleteBooking(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await bookingService.getBookingsByUser(req.params.userId);
    res.send(bookings);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get('/host/:hostId', async (req, res) => {
  try {
    const bookings = await bookingService.getBookingsByHost(req.params.hostId);
    res.send(bookings);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;