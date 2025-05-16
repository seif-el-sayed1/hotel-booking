const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['owner', 'user'],
        require: true,
        default: 'user'
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    verifyOtp: {
        type: Number,
        default: ''
    },
    verifyOtpExpired: {
        type: Number,
        default: 0
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetOtp: {
        type: Number,
        default: ''
    },
    resetOtpExpired: {
        type: Number,
        default: 0
    }

})

module.exports = mongoose.model("users", userModel)