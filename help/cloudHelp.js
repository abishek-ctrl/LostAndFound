const cloudinary = require("../config/cloudinary");

const uploadtoCloud = async (filepath) =>{
    try{
        const res= await cloudinary.uploader.upload(filepath);
        return{
            url : res.secure_url,
            publicId : res.public_id,
        };
    } catch(e){
        console.error(e);
        res.status(500).json({
            message: "Error while uploading to cloudinary.",
        });
    }
}

module.exports = {uploadtoCloud};