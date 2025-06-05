const hotelModel = require('../models/hotelModel')
const roomModel = require('../models/roomModel')
const bookingModel = require('../models/bookingModel')
const users = require('../models/userModels')

// Hotel controller 
const registerHotel = async (req, res) => {
    const {hotelName, city, contact, address} = req.body
    const owner = req.user.id
    try {
        const hotel = await hotelModel.findOne({owner})
        const user = await users.findById(req.user.id)
        if(!hotelName || !city || !contact || !address) {
            return res.json({success: false, message: 'Please fill all the fields'})
        }
        if(!user) {
            return res.json({success: false, message: 'User not found'})
        }

        if (hotel) {
            return res.json({success: false, message: 'Hotel already registered'})
        }
        const newHotel = new hotelModel({
            owner: req.user.id,
            hotelName,
            contact,
            city,
            address,
        })

        user.role = 'owner'
        await user.save()
        
        await newHotel.save()
        return res.json({success: true, message: 'Hotel added successfully', hotel: newHotel})
        
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

const updateHotelDetails = async (req, res) => {
    const {hotelName, description, city, location, price} = req.body
    const owner  = req.user.id
    try {
        const hotel = await hotelModel.findOne({owner})
        if (!hotel) {
            return res.json({success: false, message: 'Hotel not found'})
        }
        hotel.hotelName = hotelName
        hotel.description = description
        hotel.city = city
        hotel.location = location
        hotel.price = price

        await hotel.save()
        return res.json({success: true, message: 'Hotel updated successfully'})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

const getHotelBooking = async (req, res) => {
    try {
        const hotel = await hotelModel.findOne({owner: req.user.id})
        if (!hotel) {
            return res.json({success: false, message: 'Hotel not found'})
        }
        const bookings = await bookingModel.find({hotel: hotel._id}).populate("room hotel user").sort({createdAt: -1})
        if (bookings.length === 0) {
            return res.json({success: false, message: 'No bookings found'})
        }

        const totalBookings = bookings.length
        const totalEarnings = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0)

        return res.json({success: true, bookings, totalBookings, totalRevenue: totalEarnings})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

// Rooms Controller
const addRoom = async (req, res) => {
    const {roomType, pricePerNight, amenities} = req.body
    try {
        const hotel = await hotelModel.findOne({owner: req.user.id})
        if (!hotel) {
            return res.json({success: false, message: 'Hotel not found'})
        }
        if(!roomType || !pricePerNight) {
            return res.json({success: false, message: 'Please fill all the fields'})
        }
        if (req.images.length !== 4) {
            return res.json({success: false, message: 'Please upload 4 images'})
        }
        const parsedAmenities = JSON.parse(amenities);
        const room = new roomModel({
            hotel: hotel._id,
            roomType,
            pricePerNight,
            amenities: parsedAmenities,
            images: req.images,
        })
        await room.save()
        return res.json({success: true, message: 'Room added successfully'})
        
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

const getOwnerRooms = async (req, res) => {
    const owner = req.user.id
    try {
        const hotel = await hotelModel.findOne({owner})
        if (!hotel) {
            return res.json({success: false, message: 'Hotel not found'})
        }
        const rooms = await roomModel.find({hotel: hotel._id})
        return res.json({success: true, rooms})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

const updateRoom = async (req, res) => {
    const {roomId, roomType, pricePerNight, services} = req.body
    try {
        const room = await roomModel.findById(roomId)
        if (!room) {
            return res.json({success: false, message: 'Room not found'})
        }
        if (req.images.length !== 4) {
            return res.json({success: false, message: 'Please upload 4 images'})
        }
        room.roomType = roomType
        room.pricePerNight = pricePerNight
        room.services = services
        room.images = req.images
        await room.save()
        return res.json({success: true, message: 'Room updated successfully'})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

const toggleRoomAvailability = async (req, res) => {
    const {roomId} = req.body
    try {
        const room = await roomModel.findById(roomId)
        if (!room) {
            return res.json({success: false, message: 'Room not found'})
        }
        room.isAvailable = !room.isAvailable
        await room.save()
        return res.json({success: true, message: 'Room availability updated successfully'})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

const getAllRooms = async (req, res) => {
    try {
        const rooms = await roomModel.find({issAvailable: true}).populate({
            path: 'hotel',
            populate: {
                path: 'owner',
                select: 'name'
            }
        }).sort({createdAt: -1})
        return res.json({success: true, data: rooms})

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

module.exports = {
    registerHotel,
    updateHotelDetails,
    getHotelBooking,
    addRoom,
    getOwnerRooms,
    updateRoom,
    toggleRoomAvailability,
    getAllRooms
}
