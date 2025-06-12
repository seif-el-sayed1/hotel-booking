const express = require('express');
const router = express.Router();
const ownerHotelController = require("../controllers/ownerHotelController")
const verifyToken = require("../middlewares/verifyToken")
const upload = require("../middlewares/uploadImage")

// Route to register a hotel
router.post('/register', verifyToken, ownerHotelController.registerHotel);
// Route to update hotel details
router.put('/update', verifyToken, ownerHotelController.updateHotelDetails);
// Route to get hotel bookings
router.get('/bookings', verifyToken, ownerHotelController.getHotelBooking);

// Route to add a room
router.post('/add-room', verifyToken, 
                upload.array('images', 4), ownerHotelController.addRoom);
// Route to get owner rooms
router.get('/rooms', verifyToken, ownerHotelController.getOwnerRooms);
// Route to update a room
router.put('/update-room', verifyToken, upload.array('images', 4), ownerHotelController.updateRoom);
// Route to toggle room availability
router.put('/toggle-availability', verifyToken, ownerHotelController.toggleRoomAvailability);

// Route to get all rooms 
router.get('/get-rooms', ownerHotelController.getAllRooms)

module.exports = router;