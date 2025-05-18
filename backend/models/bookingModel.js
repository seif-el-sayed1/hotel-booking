const mongoose = require('mongoose');

const bookingModel  = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    guests: {
        type: Number,
        required: true  
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        required: true,
        default: 'cash'
    },
    isPaid: {
        type: Boolean,
        default: false
    },
},{timestamps: true});
// Create a compound index on hotel, room, checkInDate, and checkOutDate

module.exports = mongoose.model('Booking', bookingModel);