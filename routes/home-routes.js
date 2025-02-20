const express= require("express");

const authMiddleware = require("../middleware/auth_mid");
const router = express.Router();

router.get("/welcome",authMiddleware , (req,res) => {
    const {username , userId, role} = req.user;

    res.json({
        message : "Welcome to the Home Page",
        user : {
        username,
        _id : userId,
        role,
    },
    });
});

module.exports = router;