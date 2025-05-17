const setFileUrl = async (req, res, next) => {
    if (!req.file) {
        return res.status(404).json({success: false, message: "Please Enter the Image "})
    }
    req.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    next();
    
}
module.exports = setFileUrl;