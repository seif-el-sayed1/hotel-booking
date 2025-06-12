const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const verifyToken = require("../middlewares/verifyToken")
const upload = require("../middlewares/uploadImage")


router.route('/register').post(upload.single('image'),userController.register)
router.route('/login').post(userController.login)
router.route('/logout').post(userController.logout)

router.route('/send-verify-otp').post(verifyToken, userController.sendVerifyOtp)
router.route('/verify-email').post(verifyToken, userController.verifyEmail)

router.route('/send-reset-otp').post(userController.sendResetOtp)
router.route('/reset-password').post(userController.resetPassword)

router.route('/getUser').get(verifyToken, userController.userData)

router.route('/is-auth').get(verifyToken, userController.isAuthenticated)

router.route('/update-user').patch(verifyToken, upload.single('image'), userController.updateUser)

router.route('/search-history').post(verifyToken, userController.searchHistory)

module.exports = router;