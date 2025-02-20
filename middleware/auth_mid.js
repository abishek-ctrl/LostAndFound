const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({message: "Access Denied"});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(e){
        return res.status(500).json({
            message: "Access Denied. Please Login to continue."
        });
    }
};

module.exports = authMiddleware;