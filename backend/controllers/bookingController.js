const bookingModel = require('../models/bookingModel');
const roomModel = require('../models/roomModel');

const checkAvailability = async ({checkInDate, checkOutDate, room}) => {
    try {
        const booking = await bookingModel.find({
            room,
            checkInDate: {$lte: checkOutDate},
            checkOutDate: {$gte: checkInDate}
        })
        const isAvailable = booking.length == 0
        return isAvailable
    } catch (error) {
        console.log(error.message);
    }
}

const checkAvailabilityApi = async (req, res) => {
    const {room, checkInDate, checkOutDate} = req.body
    try {
        const isAvailable = await checkAvailability({room, checkInDate, checkOutDate})
        
        return res.json({success: true, isAvailable})
    } catch (error) {
        return res.json({success:false, isAvailable})
    }
}

const createBooking = async (req, res) => {
    const {room, checkInDate ,checkOutDate} = req.body

    try {
        if (!hotel || !room || !checkOutDate) {
            return res.json({success: false, message: 'Please provide all fields'})
        }

        const isAvailable = await checkAvailability({room, checkInDate, checkOutDate})
        if (!isAvailable) {
            return res.json({success: false, message: 'Room is not available'})
        }    

        const roomData = await roomModel.findById(room).populate('hotel')

        const checkIn = new Date(checkInDate)
        const checkOut = new Date(checkOutDate)
        const timeDiff = checkOut.getTime() - checkIn.getTime()
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24))
        
        const totalPrice = roomData.pricePerNight * nights

        const newBooking = new bookingModel({
            user: req.user.id,
            room,
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        })
        return res.json({success: true, message: 'Booking created successfully'})
    } catch (error) {
        return res.json({success:false, message: error.message})
    }
}

const getUserBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.find({user: req.user.id}).populate('room hotel').sort({createdAt: -1})
        if (!bookings) {
            return res.json({success: false, message: 'No bookings found'})
        }
        return res.json({success: true, bookings})

    } catch (error) {
        return res.json({success:false, message: error.message})
    }
}


module.exports = {
    checkAvailabilityApi,
    createBooking,
    getUserBookings
}