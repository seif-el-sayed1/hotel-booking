const express = require('express');
const router = express.Router();
const multer = require('multer');

const ownerHotelController = require("../controllers/ownerHotelController")
const verifyToken = require("../middlewares/verifyToken")
const setImage = require("../middlewares/setImage")

// Room Images
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `food-${Date.now()}.${ext}`;
        cb(null, fileName);
    }
})
const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0];
    if(imageType === 'image') {
        return cb(null, true)
    } else {
        return cb(appError.create('file must be an image', 400), false)
    }
}

const upload = multer({ 
    storage: diskStorage,
    fileFilter
})

// Route to register a hotel
router.post('/register', verifyToken, ownerHotelController.registerHotel);
// Route to update hotel details
router.put('/update', verifyToken, ownerHotelController.updateHotelDetails);

// Route to add a room
router.post('/add-room', verifyToken, 
                upload.array('images', 4), setImage.setRoomImages, ownerHotelController.addRoom);
// Route to get owner rooms
router.get('/rooms', verifyToken, ownerHotelController.getOwnerRooms);
// Route to update a room
router.put('/update-room', verifyToken, upload.array('images', 4), setImage.setRoomImages, ownerHotelController.updateRoom);
// Route to toggle room availability
router.put('/toggle-availability', verifyToken, ownerHotelController.toggleRoomAvailability);

module.exports = router;