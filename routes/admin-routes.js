const express = require("express");
const authMiddleware = require("../middleware/auth_mid");
const adminMiddleware = require("../middleware/admin_mid");

const router = express.Router();

router.get("/admin", authMiddleware, adminMiddleware, (req, res) => {
    res.json({ message: "Welcome Admin" });
});

module.exports = router;