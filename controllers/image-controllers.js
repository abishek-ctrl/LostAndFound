const Image = require("../models/Image");
const {uploadtoCloud} = require("../help/cloudHelp");
const fs= require("fs");
const cloudinary = require("../config/cloudinary")

const uploadImage = async(req,res) =>{
    try{
        if(!req.file){
            return res.status(400).json({
                message : "Please upload an image."
            })
        }
        const {url, publicId} = await uploadtoCloud(req.file.path);

        const newImage = new Image({
            url,
            publicId,
            uploadedBy : req.user.userId,
        });
        await newImage.save();

        fs.unlinkSync(req.file.path);

        res.status(201).json({
            message : "Image Uploaded!",
            image : newImage
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            message : "Something went wrong! Please try uploading again."
        })
    }
}

const fetchImage = async(req,res) =>{
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;
        const skip = (page -1) * limit;

        const sortBy = req.query.sortBy || "createdAt";
        const sortOrder = req.query.sortOrder === "asc" ? 1 :-1;
        const totalImages= await Image.countDocuments();
        const totalPages = Math.ceil(totalImages/limit);

        const sortObj = {};
        sortObj[sortBy] = sortOrder;
        const images = await Image.find().sort(sortObj).skip(skip).limit(limit);

        if(images){
            res.status(200).json({
                currentPage : page,
                totalPages : totalPages,
                totalImages : totalImages,
                data : images
            });
        }
    }catch(e){
        console.log(e);
        res.status(404).json({
            message: "Couldn't Fetch the Image."
        })
    }
}

const deleteImage = async(req,res) =>{
    try{
        const imgdlt= req.params.id;
        const userid= req.user.userid;

        const image = await Image.findById(imgdlt);

        if(!image){
            return res.status(404).json({
                message : "Image not found!"
            })
        }

        if(image.uploadedBy.toString()!==userid){
            return res.status(403).json({
                message: "You are not authorized to delete this image."
            })
        };

        await cloudinary.uploader.destroy(imgdlt);

        res.status(200).json({
            message: "Image uploaded Successfully."
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            message: "Couldn't Delete the Image."
        })
    }
}

module.exports = {uploadImage,fetchImage,deleteImage};