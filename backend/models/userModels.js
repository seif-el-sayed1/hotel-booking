const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    image: {
        type: String,
        require: true,
        default: ''
    },
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
    searchHistory: [{type: String, require: true}],
    
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
}, {timestamps: true})

module.exports = mongoose.model("users", userModel)