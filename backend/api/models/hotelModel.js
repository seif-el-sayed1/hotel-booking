const mongoose = require('mongoose')

const hotelModel = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hotelName : {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: Number,
        require: true,
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    address : {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: true})


module.exports = mongoose.model('Hotel', hotelModel)
