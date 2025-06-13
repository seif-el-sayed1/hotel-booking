const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingController');
const verifyToken = require('../middlewares/verifyToken');

// Route to check room availability
router.post('/check-availability', bookingController.checkAvailabilityApi);
// Route to create a booking
router.post('/create-booking', verifyToken, bookingController.createBooking);
// Route to get user bookings
router.get('/get-bookings', verifyToken, bookingController.getUserBookings);

// Route to stripe payment
router.post('/stripe-payment', verifyToken, bookingController.stripePayment);
module.exports = router;