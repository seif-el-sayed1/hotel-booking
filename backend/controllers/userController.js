const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer")
const transporter = require("../config/nodemailer")
const users = require("../models/userModels")
const {EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE} = require("../config/emailTemplates")
const cloudinary = require('cloudinary').v2;


const register = async (req, res) => {
    const {name, email, password} = req.body
    try {
        const existUser = await users.findOne({email: email})        
        if(!name || !email || !password) {
            return res.json({Success: false, message: "Name,Email and Password are Required"})
        }

        if(existUser) {
            return res.json({Success: false, message: "User Already Exist"})
        }
        if(!validator.isEmail(email)) {
            return res.json({Success: false, message: "Invalid email"})
        }
        if(!validator.isStrongPassword(password)) {
            return res.json({Success: false, message: "Please Enter Strong Password"})
        }
        
        const response = await cloudinary.uploader.upload(req.file.path);
        const image = response.secure_url;
        
        const hashPassword = await bcrypt.hash(password, 10)
        
        const user = new users({
            image,
            name,
            email, 
            password: hashPassword
        })
        await user.save()
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '10m'})
        res.cookie('token', token, {maxAge:600000, httpOnly:true, secure:true, sameSite:"none"})

        return res.json({Success: true, message: "Sign Up"})
    } catch(error) {
        return res.json({Success: false, message: error.message})
    }
}
const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await users.findOne({email: email})
        if(!email || !password) {
            return res.json({Success: false, message: "Email and Password are Required"})
        }
        if(!user) {
            return res.json({Success: false, message: "User not Found"})
        }

        const truePassword = await bcrypt.compare(password, user.password)
        if(!truePassword) {
            return res.json({Success: false, message: "Wrong Password"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '10m'})
        res.cookie('token', token, {maxAge:600000, httpOnly:true, secure:true, sameSite:"none"})

        return res.json({Success: true, message: "Logged In"})
    } catch (error) {
        return res.json({Success: false, message: error.message})
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token', {httpOnly:true, secure:true, sameSite:"none"})
        return res.json({Success: true, message: "Logged Out"})
    } catch (error) {
        return res.json({Success: false, message: error.message})
    }
}

const sendVerifyOtp = async (req, res) => {
    try {
        const user = await users.findById(req.user.id)
        if(user.isVerified) {
            return res.json({Success: false, message: "Email Already Verified"})
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.verifyOtp = otp
        user.verifyOtpExpired = Date.now() + 24 * 60 * 60 * 1000      
        await user.save()
        
        const mailOption = {
            from: process.env.EMAIL_SENDER,
            to: user.email, 
            subject: "Verify Your Email",
            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        }
        await transporter.sendMail(mailOption)

        return res.json({Success: true, message: "Verification Otp Sent , Check Your Email"})
    } catch (error) {
        return res.json({Success: false, message: error.message})
    }
}

const verifyEmail = async(req, res) => {
    const {otp} = req.body
    try {
        const user = await users.findById(req.user.id)
        if(!otp) {
            return res.json({Success: false, message: "Please Enter The Otp"})
        }
        if(user.verifyOtp != otp || user.verifyOtpExpired < Date.now()) {
            return res.json({Success: false, message: "Invalid Otp"})
        }

        user.isVerified = true
        user.verifyOtp = ''
        user.verifyOtpExpired = 0
        await user.save()
        return res.json({Success: true, message: "Verified Email Successfully"})
    } catch (error) {
        return res.json({Success: false, message: error.message})
    }
}
const sendResetOtp = async (req, res) => {
    const {email} = req.body
    try {
        const user = await users.findOne({email})
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        if(!user) {
            return res.json({Success: false, message: "Email not Found"})
        }
        user.resetOtp = otp
        user.resetOtpExpired = Date.now() + 24 * 60 * 60 * 1000      
        await user.save()

        const mailOption = {
            from: process.env.EMAIL_SENDER,
            to: email, 
            subject: "Reset Your Password",
            html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        }
        await transporter.sendMail(mailOption)

        return res.json({Success: true, message: "Reset Otp sent , Check Your Email"})
    } catch (error) {
        return res.json({Success: false, message: error.message})
    }
}
const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body
    try {
        const user = await users.findOne({email})
        if(!otp || !newPassword) {
            return res.json({Success: false, message: "Otp and New Password are Required"})
        }
        if(user.resetOtp != otp || user.resetOtpExpired < Date.now()) {
            return res.json({Success: false, message: "Invalid Otp"})
        }
        const hashNewPassword = await bcrypt.hash(newPassword, 10)
        const samePassword = await bcrypt.compare(newPassword, user.password)
        if(samePassword) {
            return res.json({Success: false, message: 'The Password Is already Used'})
        }
        user.password = hashNewPassword
        user.resetOtp = ""
        user.resetOtpExpired = 0    
        await user.save()

        return res.json({Success: true, message: "Reset Password Successfully"})
    } catch (error) {
        return res.json({Success: false, message: error.message})
    }
}

const userData = async (req, res) => {
    try {
        const user = await users.findById(req.user.id)
        if(!user) {
            return res.json({Success: false, message: "User not found"})
        }
    
        return res.json({Success: true, userData: user})
    } catch (error) {
        return res.json({Success: false, message: error.message})
    }
}

const isAuthenticated = async (req, res) => {
    try {
        return res.json({Success: true})
    } catch(error) {
        return res.json({Success: false, message: error.message})
    }
}

const updateUser = async (req, res) => {
    const {newName, newPassword} = req.body
    try {
        const user = await users.findById(req.user.id)
        if(!user) {
            return res.json({Success: false, message: "user not found"})
        }
        const names = await users.findOne({name: newName})
        if (names) {
            return res.json({Success: false, message: "Name already used"})
        } 

        const samePassword = await bcrypt.compare(newPassword, user.password)
        if(!samePassword) {
            return res.json({Success: false, message: 'Please Check Your Old Password'})
        }
        user.image = req.image
        user.name = newName
        user.password = newPassword
        
        await user.save()
        return res.json({Success: true, message: "User Updated Successfully"})

    } catch (error) {
        return res.json({Success: false, message: error.message})
    }
}

const searchHistory = async (req, res) => {
    const {destination}  = req.body
    try {
        const user = await users.findById(req.user.id)
        if (!user) {
            return res.json({Success: false, message: "User not found"})
        }
        if (user.searchHistory.length < 3 ) {
            user.searchHistory.push(destination)
        } else {
            user.searchHistory.shift()
            user.searchHistory.push(destination)
        }

        await user.save()
        return res.json({Success: true, message: "Search History Added Successfully"})
    } catch (error) {
        return res.json({Success: false, message: error.message})
    }
}

module.exports = {
    register,
    login,
    logout, 
    sendVerifyOtp,
    verifyEmail,
    sendResetOtp,
    resetPassword,
    userData,
    isAuthenticated,
    updateUser,
    searchHistory
}