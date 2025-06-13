const bookingModel = require('../models/bookingModel');
const roomModel = require('../models/roomModel');
const stripe = require('stripe')

const checkAvailability = async ({checkInDate, checkOutDate, roomId}) => {
    try {
        const booking = await bookingModel.find({
            room: roomId,
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
    const {roomId, checkInDate, checkOutDate} = req.body
    try {
        const isAvailable = await checkAvailability({roomId, checkInDate, checkOutDate})
        
        return res.json({success: true, isAvailable})
    } catch (error) {
        return res.json({success:false, isAvailable})
    }
}

const createBooking = async (req, res) => {
    const {roomId, checkInDate ,checkOutDate, guests} = req.body

    try {
        if (!roomId || !checkOutDate || !checkInDate || !guests) {
            return res.json({success: false, message: 'Please provide all fields'})
        }

        const isAvailable = await checkAvailability({roomId, checkInDate, checkOutDate})
        if (!isAvailable) {
            return res.json({success: false, message: 'Room is not available'})
        }    

        const roomData = await roomModel.findById(roomId).populate('hotel')

        const checkIn = new Date(checkInDate)
        const checkOut = new Date(checkOutDate)
        const timeDiff = checkOut.getTime() - checkIn.getTime()
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24))
        
        const totalPrice = roomData.pricePerNight * nights

        const newBooking = new bookingModel({
            user: req.user.id,
            room: roomData._id,
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        })
        await newBooking.save()
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
const stripePayment = async (req, res) => {
    try {
        const {bookingId} = req.body

        const booking = await bookingModel.findById(bookingId)
        const roomData = await roomModel.findById(booking.room).populate("hotel")
        const totalPrice = booking.totalPrice
        const {origin} = req.headers

        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

        const line_items = [
            {
                price_data: {
                        currency: "usd",
                        product_data: {
                            name: roomData.hotel.hotelName,
                        },
                        unit_amount: totalPrice * 100
                },
                quantity: 1
            }
        ]
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${origin}/loader/my-bookings`,
            cancel_url: `${origin}/my-bookings`,
            metadata: {
                bookingId,
            }
        })
        return res.json({success: true, url: session.url})
    } catch (error) {
        return res.json({success:false, message: error.message})
    }
}


module.exports = {
    checkAvailabilityApi,
    createBooking,
    getUserBookings,
    stripePayment   
}