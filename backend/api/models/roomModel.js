const mongoose = require('mongoose');

const roomModel = new mongoose.Schema({
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Hotel',
    }, 
    roomType: {
        type: String,
        required: true,
    },
    pricePerNight: {
        type: Number,
        required: true,
    },
    amenities: [{type: String, required: true}],
    images: [{type: String, required: true}],
    isAvailable: {
        type: Boolean,
        default: true,
    }
})

module.exports = mongoose.model('Room', roomModel)