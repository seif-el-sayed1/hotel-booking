const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const verifyToken = require("../middlewares/verifyToken")
const multer  = require('multer'); 
const setImage = require("../middlewares/setImage")


const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `user-${Date.now()}.${ext}`;
        cb(null, fileName);
    }
})
const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0];
    if(imageType === 'image') {
        return cb(null, true)
    } else {
        return cb(new Error('file must be an image'), false);
    }
}

const upload = multer({ 
    storage: diskStorage,
    fileFilter
})

router.route('/register').post(userController.register)

router.route('/login').post(userController.login)

router.route('/logout').post(userController.logout)

router.route('/send-verify-otp').post(verifyToken, userController.sendVerifyOtp)
router.route('/verify-email').post(verifyToken, userController.verifyEmail)

router.route('/send-reset-otp').post(userController.sendResetOtp)
router.route('/reset-password').post(userController.resetPassword)

router.route('/getUser').get(verifyToken, userController.userData)

router.route('/is-auth').get(verifyToken, userController.isAuthenticated)

router.route('/update-user').patch(verifyToken, upload.single('image'), setImage.setUserImage, userController.updateUser)

router.route('/search-history').post(verifyToken, userController.searchHistory)

module.exports = router;