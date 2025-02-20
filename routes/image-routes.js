const express= require("express");
const authMiddleware = require("../middleware/auth_mid");
const adminMiddleware = require("../middleware/admin_mid");
const uploadMiddleware = require("../middleware/upload_mid");

const {
    uploadImage,
    fetchImage,
    deleteImage,
} = require("../controllers/image-controllers");

const router = express.Router();

router.post("/upload",authMiddleware,adminMiddleware,uploadMiddleware.single("image"),uploadImage);

router.get("/get",authMiddleware,fetchImage);

router.delete("/:id",authMiddleware,adminMiddleware,deleteImage);

module.exports= router;
