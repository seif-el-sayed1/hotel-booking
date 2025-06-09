const setUserImage = async (req, res, next) => {
    if (!req.file) {
        return res.status(404).json({success: false, message: "Please Enter the Image "})
    }
    req.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    next();
    
}

const setRoomImages = async (req, res, next) => {
    if (!req.files) {
        return res.status(404).json({success: false, message: "Please Enter the Image "})
    }
    req.images = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
    next();
}

module.exports = {
    setUserImage,  
    setRoomImages
};