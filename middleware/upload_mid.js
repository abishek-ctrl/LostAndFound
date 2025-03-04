const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join("uploads/"));
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const checkFileFilter = (req,file, cb) => {
    if(file.mimetype.startsWith("image")){
        cb(null,true);
    }else{
        cb(new Error("The uploaded item is not an image. Only Images are allowed."))
    }
};

module.exports = multer({
    storage : storage ,
    fileFilter : checkFileFilter,
    limits: {
        fileSize : 5 * 1024*1024
    }
});